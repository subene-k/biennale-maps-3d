# Requirements mapping (BRS: Interactive Touch-Based Discovery Kiosk)

Status: ✓ done · ◐ partly / needs client input · ✗ not done

| # | Requirement | Status | How it's met |
|---|---|---|---|
| 1 | Touch-based discovery kiosk, landscape 55–65", also mobile | ✓ | Kiosk mode (`?kiosk=1`): welcome screen, large targets, auto-reset. Same pages are responsive on phones. |
| 2 | Digital exhibition directory | ✓ | **Exhibits** tab: numbered list with artist, search, filters (All / To visit / Visited / Highlights). |
| 3 | Exhibit pins with number/ID, name, artist, description, photos, location | ✓ | Pins show the number; details show number, artist, English/Hindi text, photo, 360° photo. |
| 4 | Selected / visited / unvisited indicators | ✓ | Selected pin enlarges; visited pins carry a green tick; filters for visited/unvisited; walk arrivals mark as visited. |
| 5 | Visitor information | ✓ | **Info** tab: dates, hours, Biennale Pass, rules, accessibility, help, map-symbol legend, getting here. Editable in Manage. |
| 6 | Interactive site map and navigation | ✓ | 3D map of each fort; walkway routing; multi-stop routes; shortest order; distance and walking time; route reset and change. |
| 7 | Navigation from current or selected location | ✓ | Kiosk “You are here” is stop 1; “Directions from here”; GPS “Use my location” on the hosted site. |
| 8 | OpenStreetMap reference layer | ✓ | **Street map** button: OSM tiles with pins, fort outline and current route; attribution shown. |
| 9 | Pedestrian routing (OSRM/Valhalla suggested) | ◐ | On-site routing uses the venue's own walkway network (works offline, no service). “Directions in OpenStreetMap” link (OSRM foot profile) for getting to the venue. A self-hosted OSRM/Valhalla is not included. |
| 10 | 360° virtual walkthrough of selected spaces | ◐ | 360° view at every place, aerial view, “360° walkthrough” of highlights with narration. Real 360° photos must be supplied and uploaded per place. |
| 11 | Interactive hotspots and highlights | ✓ | Highlighted exhibits pulse; highlights walk; hotspots open details, 360° and directions. |
| 12 | English and Hindi interface | ✓ | EN / हिं switch everywhere, Hindi place text per field, Hindi voice where the device has one. Hindi translations of venue text need review by a native editor. |
| 13 | CMS for updates | ✓ | Manage tab (claude.ai): places, numbers, artists, EN/HI text, lat/lng, photos, 360° photos, highlights, staff-only, visitor info, JSON import/export. Hosted build: JSON files. |
| 14 | Offline accessibility | ✓ | Service worker caches pages, data and libraries; data embedded as a fallback. Street tiles cached as viewed. |
| 15 | Kiosk mode, auto-launch, recovery | ✓ | Kiosk mode in the app; browser kiosk flags, auto-start and recovery in HANDOVER.md. |
| 16 | Visitor engagement analytics and reporting | ✓ | Anonymous on-device log, on-screen report, CSV/JSON export, optional central endpoint. |
| 17 | Technical support, maintenance, archival handover | ◐ | HANDOVER.md (set-up, updates, troubleshooting, archive checklist). Support arrangements are a contract matter. |
| 18 | Pins anchored to real coordinates (AI artwork not geo-accurate) | ◐ | Purana Qila exhibits use the venue team's lat/lng. The lake, fort outline, Talaqi Darwaza, roads and Sher Mandal were traced from a reference map and are close but not surveyed; Humayun Darwaza, the mosque and baoli are placed approximately. Red Fort is approximate. |
| 19 | OSM attribution and licensing | ✓ | On the street map, Info tab, README, HANDOVER. |

## Data received and corrections made (Purana Qila)

| Point | Issue | Used |
|---|---|---|
| Pati | Latitude given as 20.6090035 (about 900 km south) | 28.6090035 |
| Hungary | Longitude given as 77.4053387 (about 15 km east) | 77.2453387 |
| PAV States | Two coordinates given (28.6111922, 77.2418841 and 28.6113953, 77.2420903) | The second; please confirm |
| Student entry / Student Entry Gate | Two nearby points with similar names | Both kept as separate gates; please confirm |
| Student by Ardee | Falls at the edge of the lake on the reference map | Kept as given; please confirm |
| Storage | Back-of-house | Marked staff only (hidden from visitors) |
| “Event (Sher Mandal)”, “Event (behind tricolour)” | Event spaces | Exhibit list with an event icon |

19 exhibit points are numbered 01–19 in the order received. The BRS mentions 34 pins; the remaining exhibits are still to come.

## Open items needing client input

1. Full exhibit list (all 34): number, title, artist, short description (EN + HI), photo.
2. Confirm the corrected coordinates above, and positions of gates, ticketing, toilets, first aid, drinking water, accessible routes and parking.
3. Opening hours, rules, help-desk and emergency contacts, accessibility information (EN + HI).
4. 360° photos of selected exhibition spaces (2:1 equirectangular).
5. Kiosk locations (“You are here”), PIN, idle time, and whether analytics go to a central endpoint.
6. Hosting choice (HTTPS) and whether a commercial map-tile service is wanted.
7. Native-speaker review of Hindi text.
8. Red Fort exhibit coordinates, so the Red Fort can be anchored the same way.
