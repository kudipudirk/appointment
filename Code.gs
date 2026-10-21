/**
 * Booking backend — Google Apps Script
 * Bookings anni "Bookings" ane sheet lo save avtayi.
 */
const SHEET_NAME = 'Bookings';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['Booked At', 'ID', 'Name', 'Instagram', 'Vibe', 'Date', 'Time', 'Note']);
    sh.setFrozenRows(1);
    sh.getRange('1:1').setFontWeight('bold');
  }
  return sh;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Returns already-booked slots so the website can grey them out
function doGet(e) {
  const rows = getSheet_().getDataRange().getDisplayValues().slice(1);
  const booked = rows.map(r => r[5] + '|' + r[6]);
  return json_({ ok: true, booked: booked });
}

// Saves a new booking (with a lock so two people can't grab the same slot)
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    if (!d.name || !d.instagram || !d.date || !d.time || !d.service) {
      return json_({ ok: false, error: 'Missing details' });
    }
    const sh = getSheet_();
    const rows = sh.getDataRange().getDisplayValues().slice(1);
    if (rows.some(r => r[5] === d.date && r[6] === d.time)) {
      return json_({ ok: false, error: 'That slot was just taken' });
    }
    const clip = (s, n) => String(s || '').slice(0, n);
    // leading ' keeps Sheets from turning date/time into other formats
    sh.appendRow([
      new Date(), clip(d.id, 20), clip(d.name, 60), clip(d.instagram, 40),
      clip(d.service, 60), "'" + clip(d.date, 10), "'" + clip(d.time, 10), clip(d.note, 300)
    ]);
    return json_({ ok: true, id: d.id });
  } catch (err) {
    return json_({ ok: false, error: 'Server error' });
  } finally {
    lock.releaseLock();
  }
}
