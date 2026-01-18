# 014 - Guard scroll logic from CSP-blocked Maps

## Goal
Prevent Google Maps CSP failures from breaking other homepage interactions.

## Checklist
- [x] Lazy-initialize Google Maps so a blocked script does not throw during parsing.
- [x] Keep map link clicks as safe no-ops when Maps is unavailable.

## Decisions
- Delay creation of `google.maps.LatLng` until map initialization to keep unrelated UI scripts running.
