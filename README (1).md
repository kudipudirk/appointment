# ✦ Booking Page — Setup Guide

## 1. Mee details pettandi (2 min)
`index.html` open chesi, `CONFIG` section lo marchandi:
- `name` → mee peru
- `instagram` → mee insta username (@ lekunda)
- `tagline`, `slots` (timings), `services` (vibes), `offDays` (holidays)
- `photo` → optional. Mee photo ni `me.jpg` ga same folder lo petti `photo: "me.jpg"` ani rayandi

## 2. Bookings save avvadaniki — Google Sheet connect (5 min)
GitHub Pages lo backend undadu, so free Google Sheet ni use chestunnam.

1. [sheets.new](https://sheets.new) open chesi kotha sheet create cheyandi (peru: "My Bookings")
2. Menu lo **Extensions → Apps Script**
3. Akkada unna code anta delete chesi, `Code.gs` file lo unna code paste cheyandi → **Save**
4. **Deploy → New deployment** → ⚙️ icon → **Web app** select cheyandi
   - Execute as: **Me**
   - Who has access: **Anyone**
5. **Deploy** → Google permissions adugutundi → **Allow** (Advanced → "Go to project" click cheyali)
6. Vachina **Web app URL** (`https://script.google.com/macros/s/.../exec`) copy chesi,
   `index.html` lo `scriptUrl: "PASTE_HERE"` lo pettandi

Ika evaru book chesina mee Google Sheet lo kotha row vastundi 📲
(Phone lo Google Sheets app install chesukunte ekkada nunchaina chudochu.)

> `scriptUrl` empty ga unte site test mode lo run avtundi — bookings aa browser lo matrame save avtayi.

## 3. GitHub Pages lo deploy (3 min)
1. GitHub lo kotha **public** repo create cheyandi (e.g. `book`)
2. **Add file → Upload files** → `index.html` (inka photo unte adhi) upload → **Commit**
3. **Settings → Pages** → Source: **Deploy from a branch** → Branch: `main`, folder `/ (root)` → **Save**
4. 1–2 min lo mee link ready: `https://YOUR-USERNAME.github.io/book/`

> Repo peru `YOUR-USERNAME.github.io` ani pedithe link inka short: `https://YOUR-USERNAME.github.io` ✨

## 4. Insta bio lo
Profile → **Edit profile → Links → Add external link** → mee GitHub link paste cheyandi. Done! 🔥

## Later changes
Code.gs marchithe: Apps Script lo **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy** (URL same untundi).
