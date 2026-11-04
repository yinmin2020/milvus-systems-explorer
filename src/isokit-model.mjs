// Fixed layout for four logical participants. Boxes are illustrative, not physical hosts.
export const POSITIONS = [[155, 78], [505, 78], [505, 292], [155, 292]];
export const VIEW_BOX = '0 0 660 420';
const COS30 = Math.sqrt(3) / 2;

export const ILLUSTRATION_KINDS = Object.freeze([
  'compute', 'queue', 'storage', 'control', 'record',
  'search', 'graph', 'index', 'filter', 'bitset',
  'client', 'clock', 'replica', 'snapshot', 'hash', 'merge',
]);

const KIND_SET = new Set(ILLUSTRATION_KINDS);

export function toWorld([x, y]) {
  return [y + x / (2 * COS30), y - x / (2 * COS30), 0];
}

export function routeBetween(from, to) {
  if (from === to) return null;
  const [x1, y1] = POSITIONS[from], [x2, y2] = POSITIONS[to];
  const firstSide = x1 < 330 ? 1 : -1;
  const lastSide = x2 < 330 ? 1 : -1;
  const start = [x1 + firstSide * 102, y1 - 8];
  const end = [x2 + lastSide * 102, y2 - 8];
  if (y1 === y2) return [start, end];
  return [start, [330, start[1]], [330, end[1]], end];
}

export function pathLength(points) {
  return points.slice(1).reduce((n, p, i) => n + Math.hypot(p[0] - points[i][0], p[1] - points[i][1]), 0);
}

export function truncateRoute(points, fraction = 0.5) {
  let remaining = pathLength(points) * fraction;
  const output = [points[0]];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1], b = points[i];
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (remaining < length) {
      output.push([a[0] + (b[0] - a[0]) * remaining / length, a[1] + (b[1] - a[1]) * remaining / length]);
      return output;
    }
    output.push(b);
    remaining -= length;
  }
  return output;
}

export function labelLines(text, max = 18) {
  const lines = [];
  let line = '', units = 0;
  const tokens = text.match(/[A-Za-z0-9_=./+\-]+|[^\x00-\x7F]|\s+|./gu) || [];
  for (const token of tokens) {
    const width = [...token].reduce((n, ch) => n + (/[^\x00-\x7F]/.test(ch) ? 2 : 1), 0);
    if (units + width > max && line.trim()) { lines.push(line.trim()); line = ''; units = 0; }
    if (!line && /^\s+$/.test(token)) continue;
    line += token; units += width;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

/** Resolve FaceMark kind from an optional override or name heuristics (first match wins). */
export function illustrationFor(name, override) {
  if (override && KIND_SET.has(override)) return override;
  const n = String(name ?? '');
  // Replica / HA twins before generic Node / QueryNode rules.
  if (/QueryNode-\d|故障 QN|存活 QN|副本|Primary|Standby/.test(n)) return 'replica';
  // Bitset / mask before clock so 「时间掩码」 is not a clock.
  if (/Bitset|掩码|\b[Bb]its?\b/.test(n)) return 'bitset';
  if (/Filter|过滤|表达式/.test(n)) return 'filter';
  if (/RRF|归并|多路/.test(n)) return 'merge';
  if (/HNSW|图索引|\bef\b/.test(n)) return 'graph';
  if (/IVF|粗排|索引|nprobe|PartitionStats|缺索引/.test(n)) return 'index';
  // TSO / Tick before MixCoord control so 「MixCoord · TSO」 prefers clock.
  if (/TSO|TimeTick|\bTick\b|时间戳/.test(n)) return 'clock';
  if (/Snapshot|Restore|快照/.test(n)) return 'snapshot';
  if (/Hash|Partition|分区|路由/.test(n)) return 'hash';
  if (/WAL|Woodpecker|Growing|队列|缓冲|MsgStream/.test(n)) return 'queue';
  if (/MinIO|对象存储|Storage|磁盘|Segment|Sealed|Manifest|小段/.test(n)) return 'storage';
  if (/Client|Proxy|客户端|用户|写入方|写入客户端|应用/.test(n)) return 'client';
  if (/MixCoord|Coord|etcd|Delegat|监控|校验/.test(n)) return 'control';
  if (/StreamingNode|QueryNode|DataNode|Worker|Streaming|\bNode\b|QN/.test(n)) return 'compute';
  if (/查询向量|ANN|TopK|精排|评测|检索|查询/.test(n)) return 'search';
  return 'record';
}

/** Mild isometric body height cues by role; storage also gets a layered plate in the scene. */
export function bodyHeight(kind) {
  switch (kind) {
    case 'record': return 9;
    case 'bitset':
    case 'filter': return 10;
    case 'snapshot': return 11;
    case 'storage': return 12;
    case 'hash':
    case 'merge': return 14;
    case 'search':
    case 'graph':
    case 'index': return 16;
    case 'clock':
    case 'control': return 18;
    case 'client':
    case 'queue': return 20;
    case 'replica': return 22;
    case 'compute': return 24;
    default: return 16;
  }
}
