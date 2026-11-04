import React from 'react';
import { Box, Glow, Plate, path } from 'react-isokit';
import { POSITIONS, VIEW_BOX, routeBetween, truncateRoute, toWorld, labelLines, illustrationFor, bodyHeight } from './isokit-model.mjs';
import { TravelDot } from './travel-dot.jsx';

function FaceMark({ kind }) {
  if (kind === 'compute') return <>
    <rect className="iso-symbol" x="32" y="17" width="32" height="28" rx="5" />
    <path className="iso-symbol" d="M38 12v5m10-5v5m10-5v5M38 45v5m10-5v5m10-5v5M27 23h5m-5 14h5m32-14h5m-5 14h5" />
    <rect className="iso-symbol-core" x="40" y="25" width="16" height="12" rx="2" />
  </>;
  if (kind === 'queue') return <>
    <rect className="iso-symbol" x="23" y="16" width="50" height="32" rx="7" />
    <path className="iso-symbol" d="M33 32h30m-9-8 9 8-9 8" />
  </>;
  if (kind === 'storage') return <>
    <rect className="iso-symbol" x="26" y="16" width="44" height="32" rx="5" />
    <path className="iso-symbol" d="M34 25h28M34 33h28M34 41h15" />
  </>;
  if (kind === 'control') return <>
    <circle className="iso-symbol" cx="48" cy="31" r="17" />
    <path className="iso-symbol" d="M48 20v12m0 0-9 9m9-9 9 9" />
  </>;
  if (kind === 'search') return <>
    <circle className="iso-symbol" cx="42" cy="28" r="12" />
    <path className="iso-symbol" d="M51 37 62 48" />
    <circle className="iso-symbol-core" cx="42" cy="28" r="4" />
  </>;
  if (kind === 'graph') return <>
    <circle className="iso-symbol-core" cx="48" cy="22" r="4" />
    <circle className="iso-symbol-core" cx="32" cy="40" r="4" />
    <circle className="iso-symbol-core" cx="64" cy="40" r="4" />
    <circle className="iso-symbol" cx="48" cy="42" r="3.5" />
    <path className="iso-symbol" d="M48 26 35 37M48 26 61 37M35 40h26M48 26v12" />
  </>;
  if (kind === 'index') return <>
    <path className="iso-symbol" d="M28 44V24h8v20M40 44V18h8v26M52 44V28h8v16M64 44V22h8v22" />
    <path className="iso-symbol-core" d="M30 36h4v8h-4zm12-10h4v18h-4zm12 4h4v14h-4zm12-6h4v20h-4z" />
  </>;
  if (kind === 'filter') return <>
    <path className="iso-symbol" d="M28 16h40l-12 14v12l-16 8V30Z" />
    <path className="iso-symbol" d="M40 30h16" />
  </>;
  if (kind === 'bitset') return <>
    <rect className="iso-symbol-core" x="30" y="18" width="12" height="12" rx="1.5" />
    <rect className="iso-symbol" x="46" y="18" width="12" height="12" rx="1.5" />
    <rect className="iso-symbol" x="62" y="18" width="12" height="12" rx="1.5" />
    <rect className="iso-symbol" x="30" y="34" width="12" height="12" rx="1.5" />
    <rect className="iso-symbol-core" x="46" y="34" width="12" height="12" rx="1.5" />
    <rect className="iso-symbol" x="62" y="34" width="12" height="12" rx="1.5" />
  </>;
  if (kind === 'client') return <>
    <rect className="iso-symbol" x="28" y="16" width="40" height="26" rx="3" />
    <path className="iso-symbol" d="M34 24h18M34 30h12" />
    <path className="iso-symbol" d="M40 42h16v4H40Z" />
    <circle className="iso-symbol-core" cx="58" cy="27" r="3" />
  </>;
  if (kind === 'clock') return <>
    <circle className="iso-symbol" cx="48" cy="31" r="17" />
    <circle className="iso-symbol-core" cx="48" cy="31" r="2.2" />
    <path className="iso-symbol" d="M48 20v11l8 5" />
    <path className="iso-symbol" d="M48 16v3M48 43v3M31 31h3M62 31h3" />
  </>;
  if (kind === 'replica') return <>
    <rect className="iso-symbol" x="26" y="18" width="22" height="28" rx="3" />
    <rect className="iso-symbol" x="48" y="18" width="22" height="28" rx="3" />
    <path className="iso-symbol" d="M33 26h8M33 34h8M55 26h8M55 34h8" />
    <path className="iso-symbol-core" d="M42 30h12" />
  </>;
  if (kind === 'snapshot') return <>
    <path className="iso-symbol" d="M34 22h24l8 8v18H34Z" />
    <path className="iso-symbol" d="M58 22v8h8" />
    <path className="iso-symbol" d="M28 18h24l6 6v4" />
    <path className="iso-symbol" d="M40 36h16M40 42h10" />
  </>;
  if (kind === 'hash') return <>
    <path className="iso-symbol" d="M48 16v10M40 26h16" />
    <path className="iso-symbol" d="M48 26 34 40M48 26 62 40" />
    <path className="iso-symbol" d="M34 40v8M62 40v8" />
    <circle className="iso-symbol-core" cx="48" cy="22" r="3.5" />
    <rect className="iso-symbol" x="28" y="40" width="12" height="10" rx="2" />
    <rect className="iso-symbol" x="56" y="40" width="12" height="10" rx="2" />
  </>;
  if (kind === 'merge') return <>
    <path className="iso-symbol" d="M30 18v10l18 8 18-8V18" />
    <path className="iso-symbol" d="M48 36v12" />
    <path className="iso-symbol" d="M40 42h16m-4-5 4 5-4 5" />
    <circle className="iso-symbol-core" cx="30" cy="18" r="3" />
    <circle className="iso-symbol-core" cx="66" cy="18" r="3" />
    <circle className="iso-symbol-core" cx="48" cy="48" r="3" />
  </>;
  // record (default document)
  return <>
    <path className="iso-symbol" d="M32 14h22l10 10v26H32ZM54 14v12h10M39 34h17M39 42h17" />
  </>;
}

function LogicalModule({ name, index, active, local, icon }) {
  const [x, y] = POSITIONS[index];
  const kind = illustrationFor(name, icon);
  const height = bodyHeight(kind);
  const labels = labelLines(name);
  const layered = kind === 'storage';
  return <g className={`logical-node iso-node ${active ? 'node-current' : ''}`} data-node={index}
    data-illustration={kind} transform={`translate(${x} ${y})`}>
    <title>{`${name} · 逻辑节点示意`}</title>
    <rect className="iso-label-bounds" x="-133" y="-80" width="266" height="206" fill="none" stroke="none" />
    <g className="iso-object">
    <ellipse className="iso-shadow" cx="0" cy="34" rx="83" ry="24" />
    <Box className="iso-base" x={-54} y={-38} z={-8} w={108} d={76} h={5} r={9} />
    {layered && <Box className="iso-layer" x={-48} y={-32} z={0} w={96} d={64} h={7} r={7} />}
    <Box className="iso-body" x={-48} y={-32} z={layered ? 9 : 0}
      w={96} d={64} h={height} r={8}
      top={<FaceMark kind={kind} />}
      front={<>
        <path className="ik-detail" d="M15 7h39" />
        <Glow on={active}><circle className={active ? 'ik-dot' : 'iso-idle-dot'} cx="80" cy="8" r="2.4" /></Glow>
      </>} />
    </g>
    {active && !local && <g className="iso-port">
      <path d={`M${x < 330 ? 78 : -78} -8H${x < 330 ? 102 : -102}`} />
      <circle cx={x < 330 ? 102 : -102} cy="-8" r="4" />
    </g>}
    <text className="iso-node-number" x="-106" y="-52">{String(index + 1).padStart(2, '0')}</text>
    {local && active && <g className="iso-local-mark" transform="translate(106 -52)">
      <circle r="10" /><circle r="3" />
    </g>}
    <text className="logical-label iso-node-label" textAnchor="middle">
      {labels.map((line, i) => <tspan key={i} x="0" y={labels.length === 1 ? 86 : labels.length === 2 ? 82 + i * 27 : 65 + i * 24}>{line}</tspan>)}
    </text>
  </g>;
}

export function MechanismScene({ label, nodes, frame, playing, motionMode = playing ? 'playing' : 'paused', motionVersion = 0, speed, stageKey, reducedMotion, dark, icons }) {
  const [, from, to, , , , kind] = frame;
  const lost = kind === 'lost', rejected = kind === 'reject' || lost;
  const transfer = kind === 'request' || kind === 'data';
  const fullRoute = routeBetween(from, to);
  const route = fullRoute && (lost ? truncateRoute(fullRoute) : fullRoute);
  const routeWorld = route?.map(toWorld);
  const marker = kind === 'compare' ? undefined : rejected ? 'url(#iso-reject)' : 'url(#iso-arrow)';
  return <Plate className="systems-iso" label={label} role="img" credit={false}
    viewBox={VIEW_BOX} theme={dark ? 'dark' : 'light'} data-kind={kind} data-renderer="react-isokit"
    data-stage={stageKey} data-playing={playing ? 'true' : 'false'}>
    <defs>
      <marker id="iso-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0 0 7 3.5 0 7Z" fill="var(--accent)" />
      </marker>
      <marker id="iso-reject" markerWidth="10" markerHeight="12" refX="5" refY="6" orient="auto">
        <path d="M2 2L8 10M8 2L2 10" fill="none" stroke="var(--fault)" strokeWidth="2" />
      </marker>
    </defs>
    {route && <g className="iso-connection">
      <path className="iso-wire-underlay" d={path(routeWorld)} />
      <path id="active-path" data-kind={kind} data-from={from} data-to={to}
        className={`semantic-edge ${transfer ? 'transfer' : 'logical'} ${rejected ? 'rejected' : ''}`}
        d={path(routeWorld)} markerEnd={marker} />
    </g>}
    {nodes.map((name, index) => <LogicalModule key={index} name={name} index={index}
      active={index === from || (!lost && index === to)} local={kind === 'local'} icon={icons?.[index]} />)}
    {transfer && !reducedMotion && <TravelDot points={route} duration={Math.round(2200 / speed)}
      mode={motionMode} motionKey={`${stageKey}:${motionVersion}`} />}
  </Plate>;
}
