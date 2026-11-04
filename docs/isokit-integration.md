# IsoKit integration

Date: 2026-11-03

## Implementation

The mechanism view imports `react-isokit@0.5.0`, pinned alongside React and ReactDOM 19.3.1. `Plate` owns the SVG surface, `Box` draws the isometric modules, and `Glow` marks active logical units. Connectors are generated through the library's projection/path functions. The initial migration used `Signal` for requests/data; the subsequent motion correction replaces that dash animation with a visible circle controlled by elapsed time. The bundle and stylesheet are hosted locally; external script requests are not required.

Only the mechanism rendering layer was replaced. `dist/data.js` is byte-for-byte unchanged from the preceding content-audit commit. Course selection, independent normal/alternate scenarios, trace tables, pseudocode, sources, progress, theme, and knowledge graph remain controlled by the existing application.

Node shapes are illustrative logical entities. A storage stack does not assert a replica count or physical topology; queue illustrations do not encode occupancy. Labels remain horizontal. Rejected requests and undelivered messages remain distinct. Only the sender highlights when delivery is interrupted. Local operations and comparisons do not acquire false transmission arrows.

## Validation

- Production bundle built from pinned packages; build metadata verifies that the real IsoKit package is included.
- Content contracts: 27 themes, 54 independent scenarios, 216 stages; valid source and relation references.
- Real-library render regression: all 216 stages, each also rendered paused and with reduced motion. Checked node counts, IsoKit models, transfer markers, signal eligibility, half-route delivery interruption, sender-only highlight, round-trip coordinate projection, and two-line labels.
- Browser preview opened successfully and visually confirmed the actual isometric models, labels, relation line, existing controls and trace table in the cache lesson.
- Follow-up interactive/mobile/dark-theme browser regression could not complete: the browser action approval service returned capacity errors and a review timeout. The permitted retry also failed before executing. No alternate browser-control path was used. Initial desktop preview was visually checked; final-build browser coverage is therefore limited.

The later motion correction was checked with the working browser again: actual circle position changes, manual step preview, pause, and resume were observed. This targeted check does not replace a full mobile/dark-theme regression. See `motion-fix.md` for scope and evidence.

## Attribution

- [IsoKit website](https://aadilghani1.github.io/isokit/)
- [Official source](https://github.com/aadilghani1/isokit)
- [API and component usage](https://github.com/aadilghani1/isokit/blob/main/README.md)

The MIT licenses for IsoKit, React, ReactDOM and IsoKit's upstream notices are included under `dist/licenses/`. The dependency has no required hosted service or optional Pushary integration.
