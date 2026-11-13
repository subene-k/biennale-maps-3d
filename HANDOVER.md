# Handover: Biennale Fort Maps kiosk and web maps

For the venue team and the technical support contractor. Draft for review: test on the actual kiosk hardware before launch.

## 1. What is delivered

| Item | Where |
|---|---|
| Hosted build (any static web host, works offline after first load) | this folder (`index.html`, `red-fort.html`, `purana-qila.html`, data, `vendor/`, `sw.js`) |
| claude.ai versions (editing with the Manage tab, Claude voice) | "Biennale Fort Maps", "Red Fort Biennale Map", "Purana Qila Biennale Map" artifacts |
| Data | `pois.json` (Red Fort), `pois-purana-qila.json` (Purana Qila) |
| Requirements mapping | `BRS_COMPLIANCE.md` |

No server, database, API key or paid service is needed. The pages are plain HTML, CSS and JavaScript.

## 2. Kiosk set-up (55–65" landscape touch screen)

1. Host this folder over **HTTPS** (GitHub Pages, the ministry's web server, or a local web server on the kiosk PC). A service worker needs HTTPS or `localhost`.
2. Open the kiosk page once while online so it caches itself, e.g. `https://<site>/purana-qila.html?kiosk=1`.
3. Set the kiosk location: long-press the red logo (top left) for 2 seconds, or press Ctrl+Shift+K, enter the staff PIN, choose **“You are here”**, and the idle reset time.
4. Run Chrome or Edge in kiosk mode and start it with the PC:

   Windows shortcut target (Startup folder: `shell:startup`):
   ```
   "C:\Program Files\Google\Chrome\Application\chrome.exe" --kiosk --noerrdialogs --disable-session-crashed-bubble --disable-infobars --autoplay-policy=no-user-gesture-required --overscroll-history-navigation=0 --disable-pinch "https://<site>/purana-qila.html?kiosk=1"
   ```
   Or use Windows **Assigned Access** (single-app kiosk) with Microsoft Edge kiosk mode, which also restarts the browser if it closes.
5. Windows settings: turn off sleep and screen saver, turn off edge swipes (Group Policy “Allow edge swipe” = Disabled), set automatic sign-in for the kiosk account, and schedule a nightly restart (e.g. 03:00) for a clean memory state.
6. Sound: set system volume, and check that a voice exists (Settings → Time & language → Speech). Install the **Hindi (India)** speech pack so Hindi is read in Hindi; without it, stops are read in English.

### Kiosk behaviour
- Welcome screen in English and Hindi; touching it starts a session in that language.
- After the idle time (default 90 s) a “Still exploring?” message shows; 15 s later the map resets: language back to English, route, visited marks, search and filters cleared, camera home, welcome screen.
- A guided walk in progress counts as activity.
- Large touch targets, no text selection, no right-click menu, external links hidden, Manage tab hidden.

### Recovery
- Browser crash: the kiosk-mode browser restarts with Assigned Access, or the nightly restart picks it up.
- Network loss: the map keeps working from the offline cache. Street-map tiles not seen before won't load; the 3D map, exhibits, routes and walks are unaffected.
- Blank or frozen screen: restart the PC. If the page itself fails to load, clear the site data in Chrome (Settings → Privacy → Site data) and reload while online.

## 3. Updating content

**Option A: claude.ai artifacts (no code).** Editors open the artifact, use the **Manage** tab: add or move points (tap the map or type latitude/longitude), exhibit number, artist, English and Hindi text, photos and 360° photos, highlight, staff-only, and the visitor information. **Save for everyone** publishes. Each artifact has its own data; use “Copy data as JSON” to move edits to the hosted build.

**Option B: hosted build.** Edit `pois*.json` (see README) and commit/upload. Kiosks pick up the new data the next time they load the page online (the data files are fetched fresh, the cache is the fallback). To force it, restart the browser.

**Import:** Manage → “Import JSON file” accepts a full data file or a plain list of places; it checks ids, categories and positions before replacing.

**Changing the app itself** (code, not data): edit the HTML, then change `VERSION` in `sw.js` so kiosks drop the old cache.

## 4. Analytics and reporting

Each device keeps an anonymous event log (no names, no typed search text, no location): sessions, language, place views, 360° views, routes, guided walks started and completed, “visited” marks, searches (number of results only), resets.

- View: staff dialog → **Visitor engagement** (sessions, views, routes, walks, % Hindi, most popular places).
- Export: **Export CSV** / **Export JSON**. Do this weekly from each kiosk and combine in Excel. Up to 20,000 events are kept per device (oldest dropped first).
- Central collection (optional): put an HTTPS address in the data file's `kiosk.analyticsUrl`. Each kiosk then sends batches every minute as JSON `{device, rows:[[time, venue, event, placeId, language, kiosk, details], …]}`. You need a small endpoint to receive them (not included).

## 5. Security and privacy notes

- The staff PIN is in the public data file (`kiosk.pin`, default `2026`). It only stops visitors leaving kiosk mode; it is not a security control. Change it before launch, and don't reuse a real password.
- No personal data is collected. GPS (“Use my location”, hosted web only) is used on the visitor's device and not stored.
- Only publish photos you own or have rights to.
- The code is a working draft: run your usual static analysis (SAST) and testing before production.

## 6. Licences and attribution

- three.js 0.160.0: MIT. Leaflet 1.9.4: BSD-2-Clause. Licence files are in `vendor/`.
- Street map: © OpenStreetMap contributors, ODbL; the attribution shows on the map and in Info. The public OSM tile server is for light use; for several busy kiosks, use a commercial tile service or self-hosted tiles (change the tile URL in `openStreet()`).
- Fonts: Bricolage Grotesque, Inter, JetBrains Mono (SIL OFL), from Google Fonts; system fonts are used if offline.

## 7. Archival handover checklist

- [ ] Final copy of this folder (code + data + photos) on the client's storage and repository
- [ ] Exported data files from each claude.ai artifact (Manage → Copy data as JSON)
- [ ] Analytics exports (CSV) from every kiosk at the end of the Biennale
- [ ] List of kiosk devices, locations (“You are here”), PIN, and browser start-up settings
- [ ] Photo and 360° photo sources and permissions
- [ ] Open items from `BRS_COMPLIANCE.md` closed or accepted

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| No sound | Check volume; press **Test sound**; on Windows install a speech voice. |
| Hindi is read in English | Install the Hindi (India) speech pack. |
| Street map is grey | No connection, or tiles blocked by the network. Pins and outline still show. |
| “Use my location” missing | Only on the hosted site (not on claude.ai or in kiosk mode). |
| Changes don't appear on a kiosk | Reload while online; if the app code changed, bump `VERSION` in `sw.js`. |
| Forgot the PIN | Edit `kiosk.pin` in the data file, or clear the site data on the kiosk. |
