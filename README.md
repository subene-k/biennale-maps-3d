# Biennale Fort Maps

3D walking maps of the Red Fort and Purana Qila for The India Biennale '26: places, multi-stop routes, a narrated guided walk, 360° and aerial views.

Three pages share the same data files:

- `index.html`: both venues, with a Red Fort / Purana Qila switch (`index.html#purana-qila` opens Purana Qila).
- `red-fort.html`: the Red Fort only.
- `purana-qila.html`: Purana Qila only.

## Files

| File | What it is |
|---|---|
| `index.html` | The map page. No build step needed. |
| `pois.json` | Red Fort places (names, categories, icons, positions, descriptions, Biennale notes, photos). |
| `pois-purana-qila.json` | Purana Qila places, same format. |
| `panos/` | 360° photos (see `panos/README.md`). |
| `photos/` | Ordinary photos of places, shown with the description and during the guided walk. |

## Edit the places

Edit `pois.json` and commit. Each place looks like this:

```json
{"id":"diwaniam","name":"Diwan-i-Aam","cat":"monument","x":62,"z":30,
 "desc":"Hall of Public Audience...","note":"Biennale installation, artist, timings"}
```

- `id`: unique, lowercase, no spaces. Don't change it once published.
- `cat`: one of `gate`, `monument`, `museum`, `garden`, `biennale`, `facility`.
- `x`, `z`: position in metres from the centre of the fort. `x` grows to the east (towards the river), `z` grows to the south. Lahori Gate is at `x:-280, z:30`; Delhi Gate is at `x:-40, z:470`.
- `icon`: optional map icon: `toilet`, `cafe`, `info`, `ticket`, `firstaid`, `water`, `parking`, `accessible`, `boat`, `exit`, `shop`, `photo`, `dig`, `gate`, `dome`, `museum`, `tree`, `spark`. Without it, the category's icon is used.
- `note`: optional; shown highlighted as "At the Biennale" and read out on the guided walk.
- `pano`: optional path to a 360° photo, e.g. `panos/diwan-i-aam.jpg`.
- `photo`: optional path to a normal photo, e.g. `photos/diwan-i-aam.jpg` (landscape JPEG, about 1600 px wide).

New places connect to the nearest walkway automatically.

## Test locally

Opening `index.html` by double-click works, but uses the copy of the places built into the page. To test edits to `pois.json`, run a small local server in this folder:

```
python -m http.server 8000
```

then open http://localhost:8000.

## Notes

- Building positions are approximate and the "(example)" places are placeholders; confirm on site before launch.
- Only use photos you own or have permission to publish, and credit the photographer where required.
- Needs an internet connection: the 3D engine (three.js 0.160.0, MIT licence) loads from cdn.jsdelivr.net and fonts from Google Fonts.
- Voice uses the visitor's browser speech engine; visitors can mute it.
