#!/usr/bin/env node
/**
 * Phase 2: merge 12 IsoKit lessons into dist/data.js (Milvus 3.0 teaching baseline).
 */
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dataPath = path.join(root, 'dist/data.js');
const scope = {};
vm.runInNewContext(
  fs.readFileSync(dataPath, 'utf8') + ';this.SOURCES=SOURCES;this.GROUPS=GROUPS;this.LESSONS=LESSONS;',
  scope
);
const { SOURCES, GROUPS, LESSONS } = scope;

Object.assign(SOURCES, {
  four_layers: {
    name: 'Milvus · Four Layers',
    url: 'https://milvus.io/docs/four_layers.md',
    note: 'Access / Coordinator / Worker / Storage 四层解耦；本站 3.0 教学称协调器为 MixCoord。',
    kind: '官方文档 · 3.0'
  },
  woodpecker: {
    name: 'Milvus · Woodpecker Architecture',
    url: 'https://milvus.io/docs/woodpecker_architecture.md',
    note: '零盘 WAL；MemoryBuffer / QuorumBuffer。文档常写「2.6」引入 → 3.0 仍沿用。',
    kind: '官方文档'
  },
  woodpecker_admin: {
    name: 'Milvus · Woodpecker Admin',
    url: 'https://milvus.io/docs/woodpecker.md',
    note: 'Woodpecker 运维与配置入口。',
    kind: '官方文档 · 运维'
  },
  load_release: {
    name: 'Milvus · Load & Release',
    url: 'https://milvus.io/docs/load-and-release.md',
    note: '检索前必须 Load；可按字段加载；Release 释放 QueryNode 资源。',
    kind: '官方文档'
  },
  bitset: {
    name: 'Milvus · Bitset',
    url: 'https://milvus.io/docs/bitset.md',
    note: '过滤与删除的位图机制；与 Time Travel 交叉。',
    kind: '官方文档'
  },
  delete_entities: {
    name: 'Milvus · Delete Entities',
    url: 'https://milvus.io/docs/delete-entities.md',
    note: '按主键或过滤条件删除；底层多以软删 bitset 表达。',
    kind: '官方文档'
  },
  upsert_entities: {
    name: 'Milvus · Upsert Entities',
    url: 'https://milvus.io/docs/upsert-entities.md',
    note: 'Upsert 语义可理解为按主键删后插的教学路径。',
    kind: '官方文档'
  },
  multi_vector: {
    name: 'Milvus · Multi-Vector Hybrid Search',
    url: 'https://milvus.io/docs/multi-vector-search.md',
    note: '多向量字段并行 ANN，再经 Ranker 归并。',
    kind: '官方文档'
  },
  rrf_ranker: {
    name: 'Milvus · RRF Ranker',
    url: 'https://milvus.io/docs/rrf-ranker.md',
    note: 'Reciprocal Rank Fusion：按名次倒数融合多路 TopK。',
    kind: '官方文档'
  },
  filtered_search: {
    name: 'Milvus · Filtered Search',
    url: 'https://milvus.io/docs/filtered-search.md',
    note: '标量过滤与向量检索协同；含 iterative filtering 等策略。',
    kind: '官方文档'
  },
  clustering_compaction: {
    name: 'Milvus · Clustering Compaction',
    url: 'https://milvus.io/docs/clustering-compaction.md',
    note: '按聚类键重排段；PartitionStats 剪枝搜索范围。',
    kind: '官方文档'
  },
  force_merge: {
    name: 'Milvus · Force Merge / Compaction',
    url: 'https://milvus.io/docs/force-merge.md',
    note: '手动触发段合并的入口（与自动 compaction 对照）。',
    kind: '官方文档'
  },
  partition_key: {
    name: 'Milvus · Partition Key',
    url: 'https://milvus.io/docs/use-partition-key.md',
    note: '标量字段作 Partition Key；写入哈希路由，检索按 filter 剪枝。',
    kind: '官方文档'
  },
  manage_partitions: {
    name: 'Milvus · Manage Partitions',
    url: 'https://milvus.io/docs/manage-partitions.md',
    note: '手工分区管理与上限；可与 Partition Key 对照。',
    kind: '官方文档'
  },
  storage_v3: {
    name: 'Milvus 3.0 · Storage V3',
    url: 'https://milvus.io/docs/storage-v3.md',
    note: '版本化布局 + Manifest；默认关闭；Snapshots / External Collection 等依赖。',
    kind: '官方文档 · 3.0'
  },
  tiered_storage: {
    name: 'Milvus · Tiered Storage Overview',
    url: 'https://milvus.io/docs/tiered-storage-overview.md',
    note: 'Load 时只缓存元数据，字段/索引按需拉取与驱逐。文档常写 2.6.4+。',
    kind: '官方文档'
  },
  warm_up: {
    name: 'Milvus · Tiered Storage Warm Up',
    url: 'https://milvus.io/docs/warm-up.md',
    note: '预热策略，降低冷查询尖刺。',
    kind: '官方文档'
  },
  snapshots: {
    name: 'Milvus · Snapshots',
    url: 'https://milvus.io/docs/snapshots.md',
    note: '基于 Manifest 的轻量时间点镜像；非长周期 Backup 替代品。',
    kind: '官方文档 · 3.0'
  },
  manage_snapshots: {
    name: 'Milvus · Manage Snapshots',
    url: 'https://milvus.io/docs/manage-snapshots.md',
    note: '创建 / Pin / Restore 操作入口。',
    kind: '官方文档 · 3.0'
  },
  cdc_overview: {
    name: 'Milvus · CDC Overview',
    url: 'https://milvus.io/docs/milvus_cdc_overview.md',
    note: '跨集群 Primary/Standby 变更复制拓扑。',
    kind: '官方文档'
  },
  cdc_failover: {
    name: 'Milvus · CDC Failover',
    url: 'https://milvus.io/docs/cdc_failover.md',
    note: '主不可用时提升备；可用性优先，可能丢未复制写入。',
    kind: '官方文档'
  },
  cdc_setup: {
    name: 'Milvus · Set up CDC Replication',
    url: 'https://milvus.io/docs/set_up_cdc_replication.md',
    note: '配置主备复制关系。',
    kind: '官方文档'
  }
});

if (!GROUPS.some(g => g.id === 'storage_lifecycle')) {
  GROUPS.push({
    id: 'storage_lifecycle',
    name: '存储与生命周期',
    en: 'STORAGE & LIFECYCLE',
    color: '#0EA5E9',
    question: 'Compaction 如何重排段、Storage V3 / Tiered / Snapshot 如何管冷热与时间点？'
  });
}

GROUPS[0].question = '段如何生长密封、索引与过滤/混合检索如何加速，Load 后 SN/QN 如何归并？';
GROUPS[1].question = '3.0 写入如何进 WAL/Woodpecker，删除 Upsert 与 Partition Key 如何改可见集？';
GROUPS[2].question = '四层如何分流，MixCoord/etcd 管什么，副本与 CDC 主备如何继续服务？';

const PHASE2 = [
  {
    group: 2,
    id: 'arch-four-layers',
    title: '四层架构与请求分流',
    en: 'FOUR LAYERS · REQUEST PATH',
    summary: 'Milvus 3.0 教学地图：Access（Proxy）/ MixCoord（文档常写 Coordinator）/ Worker（Streaming·Query·Data）/ Storage（etcd+对象存储+WAL）。DDL、DML、DQL 走不同分流。教学模型，非生产协议证明。',
    nodes: ['Client / Proxy', 'MixCoord', 'Worker 节点', 'Storage'],
    steps: [
      ['Access 接入', 0, 0, 'VALIDATE', '无状态 Proxy 校验请求并做结果归并；对外统一入口。', '请求已准入', 'local'],
      ['控制面分流', 0, 1, 'DDL / TSO', 'DDL/DCL/TSO、WAL 绑定、查询视图与离线任务调度由单一活跃 MixCoord 承担（文档层名 Coordinator）。', '拓扑与元数据', 'control'],
      ['工作面执行', 1, 2, 'DISPATCH', 'Streaming Node 管写与 Growing；QueryNode 管 Sealed 检索；DataNode 管 compaction/索引。', '执行落在 Worker', 'request'],
      ['存储解耦', 2, 3, 'PERSIST', 'etcd 存元数据；对象存储存段/索引；WAL（Woodpecker 或 MQ）存突变日志。计算可水平扩展。', '存算分离', 'data']
    ],
    principle: '四层可独立扩展；请求按 DDL/DML/DQL 分流，不要假设所有路径都打同一个节点。',
    tradeoff: '解耦带来弹性与运维面变宽：要同时理解 MixCoord、Streaming 与对象存储依赖。',
    pitfall: '官方图资产名可能仍写 2.6 / Coordinator；本站 3.0 基线统一称 MixCoord，勿把 Root/Query/Data Coord 当成现行必装三进程。',
    code: [
      'req = proxy.validate(clientRequest)',
      'if req.isDDL: mixCoord.handleDDL(req)          # Layer 2',
      'elif req.isDML: streamingNode.append(wal, req) # Layer 3 write',
      'elif req.isDQL: sn.delegator.search(...)       # Growing+Sealed',
      '# Layer 4: etcd meta + object storage + WAL backend'
    ],
    sources: ['arch_overview', 'four_layers', 'upgrade_30'],
    related: ['mixcoord-meta', 'insert-path', 'query-node', 'streaming-woodpecker'],
    fault: {
      name: '缓存拓扑过期',
      nodes: ['Proxy', '陈旧缓存', 'MixCoord', '正确 Worker'],
      steps: [
        ['Proxy 用旧视图', 0, 1, 'STALE CACHE', 'Proxy 本地拓扑缓存未刷新，仍指向旧 Streaming/Query 绑定。', '路由依据过期', 'local'],
        ['打到错误目标', 1, 2, 'LOOKUP FAIL', '按陈旧视图查找服务，协调器侧校验或 RPC 失败。', '分流失败', 'check'],
        ['请求被拒/超时', 0, 1, 'REJECT', '教学模型：明确失败优于静默打到错误分片。', '客户端收到错', 'reject'],
        ['刷新后再分流', 2, 3, 'REFRESH VIEW', '向 MixCoord 拉新拓扑，再落到正确 Worker。', '路径恢复', 'control']
      ],
      code: [
        'view = proxy.cachedTopology()',
        'if view.version < mixCoord.servingVersion:',
        '  proxy.refresh(mixCoord.discover())'
      ]
    }
  },
  {
    group: 1,
    id: 'streaming-woodpecker',
    title: 'Streaming · Woodpecker WAL',
    en: 'STREAMING + WOODPECKER',
    summary: '打开 insert-path 的 WAL 黑盒：Streaming Node 拥有分片写与 Growing；Woodpecker 以零盘架构把日志落对象存储（也可 Pulsar/Kafka）。文档多写「2.6 引入」，3.0 仍为默认/推荐 WAL 之一。教学简化。',
    nodes: ['StreamingNode', 'Woodpecker Client', '对象存储 / Quorum', 'Growing'],
    steps: [
      ['SN 接收写入', 0, 1, 'APPEND REQ', 'Streaming Node 把插入交给 Woodpecker 客户端（或外部 MQ 适配层）。', '进入 WAL 路径', 'request'],
      ['缓冲并确认', 1, 2, 'BUFFER / QUORUM', 'MemoryBuffer：内存攒批后刷对象存储（延迟更高）；QuorumBuffer：三副本法定数确认后异步落盘（低延迟）。', '耐久条件满足', 'data'],
      ['元数据协调', 1, 1, 'ETCD META', 'Woodpecker 用 etcd 协调日志状态；无本地盘也可恢复。', '日志状态一致', 'local'],
      ['进入 Growing', 0, 3, 'GROWING VIEW', 'WAL 提交后增量进入 Growing，供 SN 实时检索；密封与索引仍异步。', '增量可搜', 'data']
    ],
    principle: 'WAL 是突变权威前置日志；Woodpecker 用对象存储换掉本地盘/外部 Broker 运维面。',
    tradeoff: 'MemoryBuffer 运维简单但写延迟偏高；QuorumBuffer 更低延迟但引入 quorum 组件。外部 Pulsar/Kafka 仍可用。',
    pitfall: '文档标题写「Milvus 2.6」不等于 3.0 弃用；教学上按 3.0 + MixCoord + Streaming Node 表述，并在旁注版本偏斜。',
    code: [
      'sn = streamingNode.for(pchannel)',
      'if wal == Woodpecker:',
      '  ack = woodpecker.append(mode=MemoryBuffer|QuorumBuffer, msg)',
      'else:',
      '  ack = mq.append(Pulsar|Kafka, msg)',
      'growing.buffer(msg); return ack'
    ],
    sources: ['woodpecker', 'streaming_service', 'woodpecker_admin'],
    related: ['insert-path', 'segment-lifecycle', 'arch-four-layers', 'timetravel'],
    fault: {
      name: '对象存储刷盘失败',
      nodes: ['StreamingNode', 'Woodpecker', '对象存储', '客户端'],
      steps: [
        ['持续追加', 0, 1, 'APPEND', '业务写入仍打到 SN/Woodpecker。', '请求涌入', 'request'],
        ['刷盘超时', 1, 2, 'FLUSH FAIL', 'S3/MinIO 抖动致异步上传或 quorum 后刷盘失败。', '耐久未闭环', 'lost'],
        ['对客户端 NACK', 1, 3, 'NACK', '未满足耐久条件则不能假装成功。', '写入未确认', 'reject'],
        ['告警与切换', 0, 0, 'ALERT', '盯 WAL 错误率与对象存储延迟；必要时评估 MQ 后端或配额。', '以 WAL 为信号', 'local']
      ],
      code: [
        'try: woodpecker.append(msg)',
        'except StorageTimeout:',
        "  alert('woodpecker_flush_fail'); raise"
      ]
    }
  },
  {
    group: 0,
    id: 'load-release',
    title: 'Load / Release',
    en: 'LOAD · RELEASE · SEGMENTS',
    summary: '检索前必须 Load：MixCoord 分配查询视图，QueryNode 拉取 Sealed 段/索引；Release 释放内存。3.0 中 Growing 仍由 Streaming Node 维护，但历史检索依赖已 Load 的 QN。教学模型。',
    nodes: ['客户端', 'MixCoord', 'QueryNode', '对象存储'],
    steps: [
      ['发起 Load', 0, 1, 'LOAD COLL', '客户端 load_collection；通常需向量字段已建索引。', 'Load 已受理', 'request'],
      ['分配查询视图', 1, 2, 'ASSIGN SEG', 'MixCoord 把 Sealed 段分布到 QueryNode（可含 replica）。', '拓扑已下发', 'control'],
      ['拉取段与索引', 2, 3, 'FETCH', 'QueryNode 从对象存储加载索引与字段数据（或 Tiered 下仅元数据）。', '段进入可服务', 'data'],
      ['可搜确认', 2, 0, 'LOADED', 'get_load_state=Loaded 后，SN 委托的 Sealed 检索可用。', '历史视图就绪', 'check']
    ],
    principle: '未 Load 则没有可服务的历史查询视图；Load 是用户侧「为何搜不到」的第一课。',
    tradeoff: '全量 Load 延迟最低但吃内存；字段级 Load / Tiered 省资源但首查可能更慢。',
    pitfall: 'Load 成功不等于 Growing 也已索引完；刚插入的增量仍走 SN Growing 路径。Release 后改 mmap 等配置再 Load 才生效。',
    code: [
      'mixCoord.assignSegments(collection, queryNodes)',
      'for seg in sealed:',
      '  qn.load(seg, indexFiles)  # or metadata-only if tiered',
      'assert get_load_state() == Loaded',
      'collection.release()  # free QN cache'
    ],
    sources: ['load_release', 'arch_overview', 'replica'],
    related: ['query-node', 'segment-lifecycle', 'tiered-storage', 'replica-failover'],
    fault: {
      name: '半加载 · 搜不到',
      nodes: ['客户端', 'MixCoord', '资源不足 QN', '监控'],
      steps: [
        ['Load 超时/卡死', 0, 1, 'LOAD HANG', '段很多或 QN 内存不足，Load 进度长期不到 100%。', '状态非 Loaded', 'request'],
        ['部分段未就绪', 1, 2, 'PARTIAL', '部分 QueryNode 失败，服务视图残缺。', '视图不完整', 'lost'],
        ['Search 被拒', 0, 1, 'REJECT', '集合未完全 Loaded 时检索失败或结果残缺（视版本行为）。', '不可用', 'reject'],
        ['扩容或减负', 1, 3, 'RESIZE', '加 QN / 降 replica / 字段级 Load / 开 Tiered，再重试。', '重新可服务', 'control']
      ],
      code: [
        'state = get_load_state(collection)',
        'if state != Loaded:',
        "  alert('load_incomplete'); retry_or_scale()"
      ]
    }
  },
  {
    group: 1,
    id: 'delete-upsert-bitset',
    title: 'Delete/Upsert · Bitset',
    en: 'DELETE · UPSERT · BITSET',
    summary: '删除多为段内软删 bitset；过滤 bitset 与删除 bitset 在检索前求交；Upsert 教学上可视为按主键删后插。与 Time Travel 水位交叉。教学简化。',
    nodes: ['客户端', 'StreamingNode / WAL', '删除 Bitset', '查询计划'],
    steps: [
      ['提交 Delete/Upsert', 0, 1, 'DELETE/UPSERT', '按主键或 filter 删除，或 Upsert；突变先入 WAL/流式路径。', '突变已进日志', 'data'],
      ['标记软删', 1, 2, 'SET DEL BIT', '对应行在段删除 bitset 置位；物理空间稍后由 compaction 回收。', '行逻辑删除', 'control'],
      ['与过滤求交', 2, 3, 'AND BITSETS', '检索时 filter_bitset 与 del_bitset（及时间可见性）组合，得到可计算行集。', '候选行掩码', 'check'],
      ['Upsert 再插入', 1, 1, 'RE-INSERT', 'Upsert：删旧后插入新版本行（新 ts）；可见性仍受一致性级别约束。', '新版本可写', 'local']
    ],
    principle: '删除首先改可见性掩码，不是立刻抹掉对象存储文件；查询永远先过 bitset。',
    tradeoff: '软删使删除很快，但段内空洞升高，依赖 compaction；强一致读删除结果仍要等水位。',
    pitfall: 'bitset 文档示例里 filter/delete 组合与 Time Travel 细节以当前版本文档为准；勿把「delete ACK」当成「物理文件已删」。',
    code: [
      'sn.append(wal, Delete(pks_or_expr, ts))',
      'del_bitset.mark(rows)',
      'visible = filter_bitset AND NOT del_bitset  # teaching',
      '# upsert ≈ delete(pk) + insert(new_row)'
    ],
    sources: ['bitset', 'delete_entities', 'upsert_entities'],
    related: ['timetravel', 'insert-path', 'filtered-search', 'compaction-clustering'],
    fault: {
      name: '删后弱读仍见旧行',
      nodes: ['写入方', 'Eventually 查询', 'Bitset 水位', 'Strong 复检'],
      steps: [
        ['Delete 已 ACK', 0, 0, 'DELETE ACK', '客户端收到删除成功。', '日志已提交', 'local'],
        ['弱读仍命中', 0, 1, 'STALE HIT', 'Eventually 下仍可能短暂看见旧行。', '可见性滞后', 'request'],
        ['水位未追上', 2, 1, 'WATERMARK LAG', '删除对应 ts 尚未进入可读水位。', '掩码未生效', 'lost'],
        ['Strong 复检', 0, 3, 'RECHECK', '提高一致性级别后旧行消失；先核对级别再报丢删。', '语义对齐', 'check']
      ],
      code: [
        'delete(pk)',
        'assert pk not in search(level=Strong)'
      ]
    }
  },
  {
    group: 0,
    id: 'hybrid-search-rrf',
    title: '混合检索 · RRF',
    en: 'HYBRID SEARCH · RRF',
    summary: '多向量字段并行 ANN，各路产出局部 TopK，再用 RRF（或加权）归并成全局排序。稠密+稀疏、多模态是典型场景。教学模型。',
    nodes: ['多路查询', 'ANN 字段 A', 'ANN 字段 B', 'RRF 归并'],
    steps: [
      ['拆成多路 ANN', 0, 1, 'MULTI ANN', 'Proxy/计划层为每个向量字段发起一路近似近邻检索。', '多路并行', 'request'],
      ['字段 A TopK', 0, 1, 'TOPK A', '例如稠密向量路得到名次列表。', 'A 路候选', 'data'],
      ['字段 B TopK', 0, 2, 'TOPK B', '稀疏/另一模态路得到另一名次列表。', 'B 路候选', 'data'],
      ['RRF 融合', 3, 0, 'RRF FUSE', 'score(d)=Σ 1/(k+rank_i(d))；也可 Weighted Ranker。返回融合 TopK。', '全局排序', 'compare']
    ],
    principle: '混合检索 = 多路召回 + 排序融合；RRF 用名次而非原始距离，降低量纲冲突。',
    tradeoff: '路数与每路 TopK 影响延迟与召回；权重/RRF 参数是产品决策，需评测集。',
    pitfall: '某路字段未建索引或未 Load 会导致该路失败/降级；不要假设「一路空结果仍完美融合」。',
    code: [
      'rankA = ann(field=dense, qA, limit=k)',
      'rankB = ann(field=sparse, qB, limit=k)',
      'for d in union(rankA, rankB):',
      '  score[d] += 1/(offset + rankA.pos(d)) + 1/(offset + rankB.pos(d))',
      'return topK(score)'
    ],
    sources: ['multi_vector', 'rrf_ranker', 'index_overview'],
    related: ['query-node', 'vector-index', 'filtered-search', 'load-release'],
    fault: {
      name: '一路未索引 · 融合偏斜',
      nodes: ['查询', '缺索引字段', '仅一路 TopK', '评测'],
      steps: [
        ['发起混合搜', 0, 1, 'HYBRID', '配置了两路，但 B 字段无索引/未 Load。', 'B 路不可用', 'request'],
        ['B 路失败', 1, 1, 'ANN FAIL', '该路返回空或错误。', '缺一路召回', 'reject'],
        ['结果被 A 主导', 0, 2, 'SKEW', '融合几乎只反映 A 路名次。', '排序偏斜', 'data'],
        ['补齐后再评', 2, 3, 'FIX+EVAL', '为各路建索引并 Load，用评测集看融合效果。', '先测再上线', 'check']
      ],
      code: [
        'assert all(field.hasIndex and field.loaded for field in hybridFields)',
        'return hybrid_search(...)'
      ]
    }
  },
  {
    group: 0,
    id: 'filtered-search',
    title: '过滤检索 · Bitset',
    en: 'FILTERED SEARCH · BITSET',
    summary: '标量 filter 生成 bitset，与删除/时间可见性掩码求交后，再在幸存行上做 ANN 或迭代过滤。教学对照 pre-filter 直觉与 iterative filtering。',
    nodes: ['查询 + Filter', 'Filter Bitset', '删除/时间掩码', 'ANN 候选'],
    steps: [
      ['解析过滤表达式', 0, 1, 'EVAL FILTER', '布尔表达式落到标量索引/扫描，得到 filter_bitset。', '属性掩码就绪', 'request'],
      ['与删除掩码求交', 1, 2, 'AND DEL', '去掉已删且在读快照下不可见的行。', '可计算行集', 'check'],
      ['向量检索', 2, 3, 'ANN ON MASK', '在掩码约束下检索（或迭代过滤：先向量再滤）。', '候选生成', 'data'],
      ['返回 TopK', 3, 0, 'TOPK', '对幸存候选精排返回；复杂 filter 可能走 iterative 路径。', '过滤后近邻', 'data']
    ],
    principle: '过滤检索的本质是 bitset 与 ANN 的协同，不是「先全库 ANN 再偶然滤一下」的默认保证。',
    tradeoff: '高选择性 filter 宜尽早剪枝；极复杂表达式可能更适合 iterative filtering，但迭代有延迟风险。',
    pitfall: '漏写 Partition Key 条件会导致跨分区全扫；filter 与 delete bitset 语义以文档为准，勿与 SQL WHERE 一一等同。',
    code: [
      'filter_bs = eval(expr)',
      'alive = filter_bs AND NOT del_bs AND visible(ts)',
      'cands = ann(q, mask=alive)  # or iterative_filter(ann, expr)',
      'return topK(cands)'
    ],
    sources: ['filtered_search', 'bitset', 'index_overview'],
    related: ['vector-index', 'delete-upsert-bitset', 'partition-key', 'timetravel'],
    fault: {
      name: '过滤过宽 · 几乎全扫',
      nodes: ['松散 Filter', '巨大 Bitset', 'ANN', '延迟尖刺'],
      steps: [
        ['极宽条件', 0, 1, 'WEAK FILTER', 'filter 几乎为真，掩码接近全 1。', '剪枝失效', 'request'],
        ['候选爆炸', 1, 2, 'HUGE SET', 'ANN/标量路径近似全段扫描。', '代价≈无过滤', 'data'],
        ['延迟升高', 2, 3, 'LATENCY', '尾延迟与 CPU 飙升。', '体验变差', 'lost'],
        ['收紧或分区', 0, 0, 'TIGHTEN', '加 Partition Key / 聚类键 / 更有选择性谓词。', '恢复剪枝', 'local']
      ],
      code: [
        'if selectivity(expr) < gate:',
        "  prefer partition_key_or_clustering(expr)"
      ]
    }
  },
  {
    group: 3,
    id: 'compaction-clustering',
    title: 'Compaction / Clustering',
    en: 'COMPACTION · CLUSTERING',
    summary: '密封后小段由 DataNode 合并；Clustering Compaction 按聚类键重排实体并维护 PartitionStats，使带键过滤的检索可剪枝到少数段。教学模型。',
    nodes: ['MixCoord', 'DataNode', '小段 / 重排段', 'PartitionStats'],
    steps: [
      ['触发 Compaction', 0, 1, 'SCHEDULE', 'MixCoord 把合并/聚类任务下发给 DataNode（自动或手动）。', '任务已派发', 'control'],
      ['合并或重排', 1, 2, 'REWRITE', '普通 compaction 合并小段；clustering 按聚类键把相近值写入同段。', '新段落对象存储', 'data'],
      ['更新统计', 1, 3, 'PARTITIONSTATS', '聚类后更新全局 PartitionStats：键值范围 ↔ 段映射。', '剪枝索引就绪', 'data'],
      ['查询剪枝', 3, 0, 'PRUNE', '带聚类键条件的 search/query 只扫相关段。', '搜索范围缩小', 'check']
    ],
    principle: 'Compaction 回收空洞并整形布局；Clustering 把「过滤键局部性」写进段分布。',
    tradeoff: '重写段消耗 IO/CPU，期间可能放大存储；过度频繁 compaction 得不偿失。',
    pitfall: '未设聚类键或查询不带该键，就得不到剪枝；不要把 clustering 当成通用「自动变快」开关。',
    code: [
      'job = mixCoord.compact(collection, clustering=True)',
      'dataNode.rewriteSegments(by=clusteringKey)',
      'partitionStats.update(segmentRanges)',
      'search(expr on key) -> only mapped segments'
    ],
    sources: ['clustering_compaction', 'force_merge', 'arch_overview'],
    related: ['segment-lifecycle', 'filtered-search', 'storage-v3', 'delete-upsert-bitset'],
    fault: {
      name: 'Compaction 堆积',
      nodes: ['写入压力', '任务队列', 'DataNode', '小段爆炸'],
      steps: [
        ['密封过快', 0, 1, 'SEAL BURST', '大量小段进入待合并队列。', '队列变长', 'data'],
        ['Worker 跟不上', 1, 2, 'SLOW JOB', 'DataNode 资源不足，compaction 滞后。', '重写延迟', 'lost'],
        ['小段仍很多', 2, 3, 'FRAGMENT', '查询仍扫过多段，延迟升高。', '剪枝未兑现', 'check'],
        ['扩容或降频密封', 0, 0, 'TUNE', '加 DataNode、调密封策略或手动 force compact。', '恢复整形', 'local']
      ],
      code: [
        'if pending_compactions > budget:',
        "  alert('compaction_backlog'); scale_data_nodes()"
      ]
    }
  },
  {
    group: 1,
    id: 'partition-key',
    title: 'Partition Key 路由',
    en: 'PARTITION KEY ROUTING',
    summary: '指定标量字段为 Partition Key 后，集合内自动维护固定数量分区；写入按 hash(key)%N 落入分区，检索带该键 filter 时只扫命中分区。用于多租户与剪枝。教学模型。',
    nodes: ['写入实体', 'Hash 路由', '目标分区', '带键检索'],
    steps: [
      ['声明 Partition Key', 0, 0, 'SCHEMA', '建表时标记标量字段为 Partition Key，并设定 partitions_num。', '分区池已建', 'local'],
      ['写入哈希落点', 0, 1, 'HASH KEY', 'insert 时用键值哈希并对分区数取模。', '路由函数确定', 'control'],
      ['落入分区', 1, 2, 'INSERT PART', '实体写入对应分区的段/流式路径。', '数据已隔离落点', 'data'],
      ['检索剪枝', 3, 2, 'FILTER KEY', 'search 带 Partition Key 条件时只扫描匹配分区。', '搜索范围缩小', 'check']
    ],
    principle: 'Partition Key 用固定分区池换「按键隔离 + 检索剪枝」，突破手工分区数量与运维负担。',
    tradeoff: '键分布不均可致热点分区；漏写键条件则退化为多分区扫描。',
    pitfall: '手工 manage-partitions 与 Partition Key 是两条路，不要混用心智模型；检索 filter 必须能落到 Partition Key 才有剪枝。',
    code: [
      'part_id = hash(entity[partition_key]) % partitions_num',
      'insert_into(partition=part_id, entity)',
      'search(filter=f"{partition_key} == x")  # prune to parts'
    ],
    sources: ['partition_key', 'manage_partitions', 'filtered_search'],
    related: ['filtered-search', 'insert-path', 'hybrid-search-rrf', 'compaction-clustering'],
    fault: {
      name: '漏写键条件 · 全分区扫',
      nodes: ['查询', '无键 Filter', '全部分区', '延迟'],
      steps: [
        ['检索未带键', 0, 1, 'NO KEY FILTER', '业务 filter 未包含 Partition Key。', '无法剪枝', 'request'],
        ['扫过所有分区', 1, 2, 'SCAN ALL', '计划覆盖分区池全部成员。', '范围≈全集', 'data'],
        ['延迟尖刺', 2, 3, 'LATENCY', '多租户场景被放大。', '体验变差', 'lost'],
        ['强制带键', 0, 0, 'REQUIRE KEY', 'API/网关要求查询必须带租户键。', '恢复剪枝', 'local']
      ],
      code: [
        'if partition_key not in filter:',
        '  raise MissingPartitionKeyFilter'
      ]
    }
  },
  {
    group: 3,
    id: 'storage-v3',
    title: 'Storage V3（3.0）',
    en: 'STORAGE V3 · MANIFEST',
    summary: 'Milvus 3.0 的版本化存储布局：Manifest 描述集合数据，支持 parquet/vortex 等列存，并为 Snapshot、External Collection 等能力奠基。默认关闭，启用后新写与 compaction 输出走 V3。教学模型。',
    nodes: ['配置开关', 'DataNode 写入', 'Manifest', 'Query / Snapshot'],
    steps: [
      ['启用 Storage V3', 0, 0, 'ENABLE', '打开 common.storage.useLoonFFI 等开关后生效；旧数据仍可读直至被重写。', '双布局共存', 'local'],
      ['新写用 V3', 0, 1, 'WRITE V3', '新写入与 compaction 输出按 dataNode.storage.format（默认 parquet）落列存。', '段文件更新', 'data'],
      ['生成 Manifest', 1, 2, 'MANIFEST', 'Manifest 独立描述数据文件集合，解耦物理格式。', '版本化视图', 'control'],
      ['上游能力接通', 2, 3, 'CONSUME', '查询、Snapshot、外表等按 Manifest 定位文件。', '特性可用', 'check']
    ],
    principle: 'Storage V3 先解决「数据如何随 schema/外表演化」，不是默认的性能银弹。',
    tradeoff: '启用后迁移依赖 compaction 重写；格式（parquet vs vortex）需基准测试再选。',
    pitfall: '未启用 Storage V3 时不要假设 Snapshot/External Collection 等依赖特性已可用；协调器重启后的 flush 布局冲突见 release notes。',
    code: [
      'if useLoonFFI:',
      '  files = dataNode.flush(format=parquet|vortex)',
      '  manifest.bind(files, schemaVersion)',
      'reader.open(manifest)  # QN / snapshot / external'
    ],
    sources: ['storage_v3', 'arch_overview', 'upgrade_30'],
    related: ['snapshots', 'compaction-clustering', 'segment-lifecycle', 'tiered-storage'],
    fault: {
      name: '布局冲突 · flush 失败',
      nodes: ['DataNode', '旧布局预期', 'V3 Manifest', 'MixCoord'],
      steps: [
        ['开关刚切换', 0, 0, 'TOGGLE', '集群部分节点仍按旧布局假设 flush。', '认知分裂', 'local'],
        ['写路径冲突', 0, 1, 'LAYOUT CLASH', 'flush 发现与预期布局不一致。', '任务失败', 'reject'],
        ['Manifest 未更新', 1, 2, 'STALE META', '可读视图短暂不一致。', '特性半可用', 'lost'],
        ['统一版本再重试', 3, 0, 'ALIGN', '按官方升级/配置对齐后重跑 compaction/flush。', '布局一致', 'control']
      ],
      code: [
        'assert all_nodes.storageFlag == expected',
        'retry_flush_or_compact()'
      ]
    }
  },
  {
    group: 3,
    id: 'tiered-storage',
    title: 'Tiered Storage · 冷热',
    en: 'TIERED STORAGE · CACHE',
    summary: '相对全量 Load：QueryNode 先只缓存元数据，字段与索引按需拉取，并可驱逐本地缓存而不删远端对象。文档常写 2.6.4+，3.0 文档树仍收录。教学模型。',
    nodes: ['Load 请求', 'QueryNode 元数据', '按需拉字段/索引', '驱逐缓存'],
    steps: [
      ['元数据优先 Load', 0, 1, 'LOAD META', 'Load 时缓存 schema、chunk map、远端引用等小元数据。', '可发现即可服务', 'data'],
      ['首查按需拉取', 1, 2, 'FETCH CHUNK', '命中冷数据时按 chunk/索引粒度从对象存储拉取并缓存。', '缓存填充', 'request'],
      ['服务检索', 2, 1, 'SEARCH', '后续命中走本地缓存；未命中再回源。', '热数据加速', 'check'],
      ['驱逐保容量', 1, 3, 'EVICT', '内存/盘压力下驱逐字段缓存；远端对象仍在。', '容量让给更热数据', 'control']
    ],
    principle: 'Tiered 把「可服务」与「全量驻留」拆开，用缓存换更大集合与更快 Load。',
    tradeoff: '首查/冷查询可能尖刺；分析型、超大集合更受益，极低延迟在线检索需 Warm Up。',
    pitfall: '文档版本写 2.6.4+ 时，教学按「引入自 2.6.4，3.0 沿用」旁注；驱逐≠删除集合数据。',
    code: [
      'qn.load(segment, mode=metadata_only)',
      'on_query:',
      '  if not cache.has(chunk): cache.put(fetch(object_store, chunk))',
      '  if memory.pressure: cache.evict(lru)'
    ],
    sources: ['tiered_storage', 'warm_up', 'load_release'],
    related: ['load-release', 'query-node', 'storage-v3', 'segment-lifecycle'],
    fault: {
      name: '冷查询延迟尖刺',
      nodes: ['突发查询', '空缓存', '对象存储', '用户'],
      steps: [
        ['冷段被打中', 0, 1, 'COLD HIT', '长时间未访问的字段/索引不在缓存。', '需回源', 'request'],
        ['回源拉取', 1, 2, 'GET OBJECT', '对象存储延迟叠加，首查变慢。', '尾延迟升高', 'lost'],
        ['用户感知超时', 2, 3, 'TIMEOUT', '无 Warm Up 时尖刺被放大。', '体验差', 'reject'],
        ['预热关键段', 1, 1, 'WARM UP', '对热点集合/字段做 warm-up，再迎流量。', '尖刺收敛', 'local']
      ],
      code: [
        'warm_up(collection, fields=hot)',
        'search(...)  # fewer cold fetches'
      ]
    }
  },
  {
    group: 3,
    id: 'snapshots',
    title: 'Snapshot 创建 / Pin / Restore',
    en: 'SNAPSHOTS · 3.0',
    summary: 'Snapshot 是集合在某时间点的轻量镜像：主要存元数据与 Manifest 引用，不复制整库向量。适合短中期回滚/版本化；长周期灾备仍用 Backup。依赖 Storage V3 能力面。教学模型。',
    nodes: ['集合', 'Flush / Manifest', 'Snapshot 元数据', 'Restore 新集合'],
    steps: [
      ['对齐时间点', 0, 1, 'FLUSH', '创建前使相关段状态进入可引用的 Manifest 视图。', '点时视图就绪', 'control'],
      ['写入 Snapshot', 1, 2, 'CREATE SNAP', '记录 schema/索引路径/段 Manifest 引用到 snapshot 元数据（如 JSON+Avro）。', '轻量镜像已存', 'data'],
      ['Pin 防回收', 2, 2, 'PIN', 'Pin 防止底层文件被生命周期任务过早回收。', '引用受保护', 'local'],
      ['Restore', 2, 3, 'RESTORE', '从 snapshot 恢复为新集合（或文档所述目标），再 Load 使用。', '时间点可重现', 'data']
    ],
    principle: 'Snapshot 引用而非复制数据文件；快 ≠ 可替代独立 Backup。',
    tradeoff: '创建极快、存储开销小，但不防对象存储整体损坏；保留窗口通常是天到周级。',
    pitfall: '未提交 Storage V3 的段可能无法被正确快照（见 release notes）；Unpin 后文件可能被回收导致 Restore 失败。',
    code: [
      'flush(collection)',
      'snap = create_snapshot(collection, name)',
      'pin(snap)',
      'restore(snap) -> new_collection',
      'new_collection.load()'
    ],
    sources: ['snapshots', 'manage_snapshots', 'storage_v3'],
    related: ['storage-v3', 'segment-lifecycle', 'compaction-clustering', 'load-release'],
    fault: {
      name: '未 Pin · 引用失效',
      nodes: ['Snapshot', '生命周期 GC', '缺失对象', 'Restore'],
      steps: [
        ['创建后未 Pin', 0, 0, 'NO PIN', '仅创建快照，未固定引用。', '可被回收', 'local'],
        ['底层文件回收', 0, 1, 'GC', 'compaction/TTL 等回收了仍被引用的对象。', '引用悬空', 'lost'],
        ['Restore 失败', 1, 3, 'RESTORE FAIL', 'Manifest 指向的文件不存在。', '无法恢复', 'reject'],
        ['Pin + 保留策略', 0, 0, 'PIN POLICY', '对需要保留的 snapshot 显式 Pin，并设保留窗口。', '引用可还原', 'control']
      ],
      code: [
        'snap = create_snapshot(coll)',
        'pin(snap)  # required for retention window',
        'restore(snap)'
      ]
    }
  },
  {
    group: 2,
    id: 'cdc-replication',
    title: 'CDC 主备复制与 Failover',
    en: 'CDC · PRIMARY / STANDBY',
    summary: 'Milvus CDC 把主集群 WAL 变更复制到备集群，构成跨集群灾备；备可读。Failover 在主不可用时提升备，可用性优先，可能丢失尚未复制的写入。对照集群内 replica。教学模型。',
    nodes: ['Primary 集群', 'CDC Node', 'Standby 集群', '应用流量'],
    steps: [
      ['主接受写入', 0, 1, 'WAL CHANGE', 'Primary 接受读写；CDC 读取其 WAL 变更流。', '变更被捕获', 'data'],
      ['复制到备', 1, 2, 'REPLICATE', 'CDC 把变更应用到 Standby；备侧通常只读。', '备落后 ≤ lag', 'data'],
      ['备可服务读', 2, 3, 'READ TRAFFIC', '应用可将读流量打到备，降低主负载。', '读扩容/就近', 'request'],
      ['计划内切换', 0, 2, 'SWITCHOVER', '主仍可达时用 Switchover，尽量避免丢数（对照 Failover）。', '角色对调', 'control']
    ],
    principle: 'CDC 解决跨集群复制；集群内 QueryNode replica 解决单集群查询 HA——两层不要混用。',
    tradeoff: '复制 lag 决定 Failover 丢数窗口；多备增加资源与拓扑复杂度。',
    pitfall: 'Failover 不等待旧主，未复制写入可能丢失；主仍可达时应优先 Switchover。CDC 节点需部署在可能升主的集群上。',
    code: [
      'cdc.replicate(source=primary, target=standby)',
      '# planned:',
      'switchover(primary, standby)  # prefer when primary alive',
      '# emergency:',
      'failover(standby)  # may lose unreplicated writes'
    ],
    sources: ['cdc_overview', 'cdc_failover', 'cdc_setup'],
    related: ['replica-failover', 'insert-path', 'streaming-woodpecker', 'mixcoord-meta'],
    fault: {
      name: 'Failover · 丢未复制写',
      nodes: ['故障 Primary', 'CDC Lag', '新 Primary(备)', '客户端'],
      steps: [
        ['主完全不可用', 0, 0, 'PRIMARY DOWN', '旧主无法响应，无法做 Switchover。', '写入口中断', 'local'],
        ['存在复制落后', 0, 1, 'LAG > 0', '部分 WAL 变更尚未到达备。', '窗口内数据在途', 'lost'],
        ['提升备为新主', 1, 2, 'FAILOVER', '可用性优先：备升主并接受新写。', '写恢复', 'control'],
        ['客户端感知丢数', 2, 3, 'DATA LOSS?', '未复制写入可能永久丢失；需业务幂等与对账。', 'RPO > 0', 'reject']
      ],
      code: [
        'if primary.unreachable and rto_critical:',
        '  promote(standby)  # accept RPO = cdc_lag',
        'else:',
        '  switchover(...)'
      ]
    }
  }
];

const existingIds = new Set(LESSONS.map(l => l.id));
for (const lesson of PHASE2) {
  if (existingIds.has(lesson.id)) throw new Error('duplicate lesson id ' + lesson.id);
  LESSONS.push(lesson);
  existingIds.add(lesson.id);
}

// Light cross-links from MVP → Phase 2
const addRelated = (id, extras) => {
  const l = LESSONS.find(x => x.id === id);
  if (!l) return;
  for (const e of extras) if (!l.related.includes(e)) l.related.push(e);
};
addRelated('segment-lifecycle', ['compaction-clustering', 'load-release', 'storage-v3']);
addRelated('vector-index', ['filtered-search', 'hybrid-search-rrf']);
addRelated('query-node', ['load-release', 'hybrid-search-rrf', 'arch-four-layers']);
addRelated('insert-path', ['streaming-woodpecker', 'delete-upsert-bitset', 'partition-key']);
addRelated('timetravel', ['delete-upsert-bitset', 'filtered-search']);
addRelated('consistency-levels', ['delete-upsert-bitset']);
addRelated('mixcoord-meta', ['arch-four-layers', 'cdc-replication']);
addRelated('replica-failover', ['cdc-replication', 'load-release']);

const header = `// Audited teaching content for Milvus Systems Explorer (Phase 2 · 20 topics).
// Frames: label, from, to, event, explanation, state, relation kind.
// Teaching model for Milvus 3.0 GA architecture (MixCoord, Streaming Node, Woodpecker WAL).
// Not a production specification or formal protocol proof.
`;

const out =
  header +
  'const SOURCES = ' + JSON.stringify(SOURCES, null, 2) + ';\n' +
  'const GROUPS = ' + JSON.stringify(GROUPS, null, 2) + ';\n' +
  'const LESSONS = ' + JSON.stringify(LESSONS, null, 2) + ';\n';

fs.writeFileSync(dataPath, out);
console.log('Wrote', dataPath, 'lessons=', LESSONS.length, 'groups=', GROUPS.length);
