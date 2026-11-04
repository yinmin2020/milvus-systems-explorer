# Moving connector point correction

Date: 2026-11-03

## Root cause and correction

The visible circles in the initial IsoKit migration were fixed connector ports. Transfer animation used the library's dashed path, which was subtle and only mounted during autoplay. Manual step selection did not trigger movement. Autoplay also stopped immediately upon entering the final stage, removing its transfer before it could run.

The corrected scene keeps real IsoKit shapes and routing, and draws a distinct solid SVG circle above the route. An elapsed-time controller moves that circle by path distance, with constant speed through corners. Each request/data stage makes one trip. Manual selection triggers a preview; pause preserves position; resume continues; speed changes preserve progress. The last stage gets its own interval. Delayed frames count elapsed time from the play action, and pause paints the position for the actual stop time before cancelling the frame callback.

Control relations, checks, rejection, loss, local operations and comparisons do not gain a misleading moving data point. Reduced-motion mode omits motion. Course content (`dist/data.js`) remains unchanged.

## Evidence and scope

- Content contracts pass for 27 topics, 54 scenarios, 216 stages.
- Real IsoKit render checks pass for all 216 stages, including transfer-circle eligibility, paused-circle retention, reduced motion, interrupted routes, projection, and label bounds.
- Deterministic motion checks exercise real coordinate updates, bends, pause/resume, speed changes, a delayed first frame, final position after a dropped frame, callback cleanup, and the actual application's final-stage dwell.
- Browser: manual selection of cache stage 2 produced a preview circle at `(403, 70)` with progress `0.0000`, then `(257, 284)` with progress `1.0000`.
- Browser: autoplay paused at cache stage 3 progress `0.2310` / `(290.726, 284)`; a subsequent read retained that position. Resume advanced to `0.2423` without restarting.
- After the delayed-frame correction, cache stage 4 paused at progress `0.9595` / `(271.58, 70)` and remained unchanged on the next observation. Resume advanced to `0.9724`.
- Final browser run: autoplay from cache stage 3 completed stage 4 with `data-playing="false"`, `data-motion="paused"`, progress `1.0000`, and endpoint `(257, 70)`.
- `motion-preview.jpg` records a visible solid transfer point on the route. This is a targeted desktop motion check, not a new exhaustive browser run across all scenarios, mobile layouts, or themes.
