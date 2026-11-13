# Biennale Fort Maps

3D visitor maps of the Red Fort and Purana Qila for The India Biennale '26 (4 Dec 2026 – 21 Mar 2027): exhibits directory, places, multi-stop walking routes, a narrated guided walk, 360° and aerial views, English and Hindi, a street map, and a touch-screen kiosk mode.

Three pages share the same data files:

- `index.html`: both venues, with a Red Fort / Purana Qila switch (`index.html#purana-qila` opens Purana Qila).
- `red-fort.html`: the Red Fort only.
- `purana-qila.html`: Purana Qila only.

Useful address options (add after the page name):

| Option | Effect |
|---|---|
| `?kiosk=1` | Kiosk mode on this device: welcome screen, auto-reset, large buttons. `?kiosk=0` turns it off. |
| `?lang=hi` | Start in Hindi. |
| `#purana-qila` | (index.html only) open Purana Qila. |

Example kiosk address: `https://<your-site>/purana-qila.html?kiosk=1`

See `HANDOVER.md` for kiosk set-up, content updates, analytics and troubleshooting, and `BRS_COMPLIANCE.md` for how the build maps to the requirements document.

## Files

| File | What it is |
|---|---|
| `index.html`, `red-fort.html`, `purana-qila.html` | The map pages. No build step. |
| `pois.json` | Red Fort data: places, visitor information, kiosk settings. |
| `pois-purana-qila.json` | Purana Qila data, same format. |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Offline support and "install as app". |
| `vendor/` | three.js 0.160.0 (MIT) and Leaflet 1.9.4 (BSD-2-Clause), served locally so the map works offline. |
| `panos/`, `photos/` | 360° photos and ordinary photos of places. |

## Edit the places

Edit the JSON file and commit. A place looks like this:

```json
{"id":"swiss","num":"01","name":"Swiss Embassy","name_hi":"स्विस दूतावास","cat":"biennale",
 "lat":28.6092763,"lng":77.2440627,"artist":"…","desc":"…","desc_hi":"…","note":"","note_hi":"","featured":true}
```

- `id`: unique, lowercase, no spaces. Don't change it once published (analytics use it).
- `cat`: `gate`, `monument`, `museum`, `garden`, `biennale` (exhibits), or `facility` (visitor services).
- Position: `lat` / `lng` in decimal degrees. These are used when present. Places without them use `x` / `z` (metres east and south of the venue's reference point in `geo`).
- `num`: exhibit number shown on the pin and in the Exhibits list.
- `name_hi`, `desc_hi`, `note_hi`: Hindi text. If missing, the English text is shown.
- `artist`, `featured` (highlight: pulsing pin, highlights walk), `staff` (hidden from visitors).
- `icon`: optional: `toilet`, `cafe`, `info`, `ticket`, `firstaid`, `water`, `parking`, `accessible`, `boat`, `exit`, `shop`, `photo`, `dig`, `event`, `lock`, `star`, `gate`, `dome`, `museum`, `tree`, `spark`.
- `photo`, `pano`: optional paths, e.g. `photos/swiss.jpg`, `panos/swiss.jpg`.
- `check`: a note for editors about data to confirm. Not shown to visitors.

The `info` block holds the visitor information (dates, hours, pass, rules, accessibility, help) in `en` and `hi`. The `kiosk` block holds the staff PIN, idle reset time, default "You are here" place and an optional analytics endpoint.

New places connect to the nearest walkway automatically.

## Test locally

```
python -m http.server 8000
```

then open http://localhost:8000. (Opening the file by double-click also works, using the copy of the data built into the page, but without offline support.)

## Notes

- Purana Qila places use the venue team's coordinates; the fort wall, gates and monuments in the 3D model are approximate. Red Fort positions are approximate.
- Only use photos you own or have permission to publish.
- Street map tiles © OpenStreetMap contributors (ODbL). They need a connection; already-viewed tiles are cached. For heavy kiosk use, consider a commercial or self-hosted tile service (see HANDOVER.md).
- Voice uses the browser's speech engine (Hindi if the device has a Hindi voice; otherwise stops are read in English).
