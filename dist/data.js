// Audited teaching content for Milvus Systems Explorer (Phase 2 · 20 topics).
// Frames: label, from, to, event, explanation, state, relation kind.
// Teaching model for Milvus 3.0 GA architecture (MixCoord, Streaming Node, Woodpecker WAL).
// Not a production specification or formal protocol proof.
const SOURCES = {
  "arch_overview": {
    "name": "Milvus 3.0 · Architecture Overview",
    "url": "https://milvus.io/docs/architecture_overview.md",
    "note": "四层架构：Access / MixCoord / Worker（Streaming·Query·Data）/ Storage；Woodpecker WAL。",
    "kind": "官方文档 · 3.0"
  },
  "streaming_service": {
    "name": "Milvus 3.0 · Streaming Service",
    "url": "https://milvus.io/docs/streaming_service.md",
    "note": "StreamingCoord（在协调器内）绑定 WAL 与 Streaming Node；Growing 查询与密封。",
    "kind": "官方文档 · 3.0"
  },
  "consistency": {
    "name": "Milvus · Consistency Guarantees",
    "url": "https://milvus.io/docs/consistency.md",
    "note": "Strong / Bounded / Session / Eventually 行为说明（API 级）。",
    "kind": "官方文档"
  },
  "index_overview": {
    "name": "Milvus · Index Overview",
    "url": "https://milvus.io/docs/index.md",
    "note": "向量索引类型总览；IVF / HNSW 为教学对照。",
    "kind": "官方文档"
  },
  "hnsw": {
    "name": "Milvus · HNSW",
    "url": "https://milvus.io/docs/hnsw.md",
    "note": "HNSW 图索引参数与检索路径。",
    "kind": "官方文档"
  },
  "ivf_flat": {
    "name": "Milvus · IVF_FLAT",
    "url": "https://milvus.io/docs/ivf-flat.md",
    "note": "IVF_FLAT 聚类桶与 nprobe 扫描模型。",
    "kind": "官方文档"
  },
  "replica": {
    "name": "Milvus · Replica",
    "url": "https://milvus.io/docs/replica.md",
    "note": "多副本查询与容错边界。",
    "kind": "官方文档"
  },
  "timestamps": {
    "name": "Milvus · Timestamps",
    "url": "https://milvus.io/docs/timestamps.md",
    "note": "TSO、TimeTick 与可见性语义入口。",
    "kind": "官方文档"
  },
  "upgrade_30": {
    "name": "Milvus · Upgrade to 3.0 (Operator)",
    "url": "https://milvus.io/docs/upgrade_milvus_cluster-operator.md",
    "note": "3.0 拓扑：MixCoord、StreamingNode、Woodpecker、etcd、MinIO；相对 2.x 的组件合并。",
    "kind": "官方文档 · 3.0"
  },
  "design_docs": {
    "name": "Milvus · Design Docs (GitHub)",
    "url": "https://github.com/milvus-io/milvus/tree/master/docs/design_docs",
    "note": "社区设计文档；以当前版本文档与源码为准。",
    "kind": "设计文档"
  },
  "papers": {
    "name": "Milvus · Academic Papers",
    "url": "https://milvus.io/docs/reference/papers.md",
    "note": "系统论文与参考入口。",
    "kind": "论文 / 参考"
  },
  "four_layers": {
    "name": "Milvus · Four Layers",
    "url": "https://milvus.io/docs/four_layers.md",
    "note": "Access / Coordinator / Worker / Storage 四层解耦；本站 3.0 教学称协调器为 MixCoord。",
    "kind": "官方文档 · 3.0"
  },
  "woodpecker": {
    "name": "Milvus · Woodpecker Architecture",
    "url": "https://milvus.io/docs/woodpecker_architecture.md",
    "note": "零盘 WAL；MemoryBuffer / QuorumBuffer。文档常写「2.6」引入 → 3.0 仍沿用。",
    "kind": "官方文档"
  },
  "woodpecker_admin": {
    "name": "Milvus · Woodpecker Admin",
    "url": "https://milvus.io/docs/woodpecker.md",
    "note": "Woodpecker 运维与配置入口。",
    "kind": "官方文档 · 运维"
  },
  "load_release": {
    "name": "Milvus · Load & Release",
    "url": "https://milvus.io/docs/load-and-release.md",
    "note": "检索前必须 Load；可按字段加载；Release 释放 QueryNode 资源。",
    "kind": "官方文档"
  },
  "bitset": {
    "name": "Milvus · Bitset",
    "url": "https://milvus.io/docs/bitset.md",
    "note": "过滤与删除的位图机制；与 Time Travel 交叉。",
    "kind": "官方文档"
  },
  "delete_entities": {
    "name": "Milvus · Delete Entities",
    "url": "https://milvus.io/docs/delete-entities.md",
    "note": "按主键或过滤条件删除；底层多以软删 bitset 表达。",
    "kind": "官方文档"
  },
  "upsert_entities": {
    "name": "Milvus · Upsert Entities",
    "url": "https://milvus.io/docs/upsert-entities.md",
    "note": "Upsert 语义可理解为按主键删后插的教学路径。",
    "kind": "官方文档"
  },
  "multi_vector": {
    "name": "Milvus · Multi-Vector Hybrid Search",
    "url": "https://milvus.io/docs/multi-vector-search.md",
    "note": "多向量字段并行 ANN，再经 Ranker 归并。",
    "kind": "官方文档"
  },
  "rrf_ranker": {
    "name": "Milvus · RRF Ranker",
    "url": "https://milvus.io/docs/rrf-ranker.md",
    "note": "Reciprocal Rank Fusion：按名次倒数融合多路 TopK。",
    "kind": "官方文档"
  },
  "filtered_search": {
    "name": "Milvus · Filtered Search",
    "url": "https://milvus.io/docs/filtered-search.md",
    "note": "标量过滤与向量检索协同；含 iterative filtering 等策略。",
    "kind": "官方文档"
  },
  "clustering_compaction": {
    "name": "Milvus · Clustering Compaction",
    "url": "https://milvus.io/docs/clustering-compaction.md",
    "note": "按聚类键重排段；PartitionStats 剪枝搜索范围。",
    "kind": "官方文档"
  },
  "force_merge": {
    "name": "Milvus · Force Merge / Compaction",
    "url": "https://milvus.io/docs/force-merge.md",
    "note": "手动触发段合并的入口（与自动 compaction 对照）。",
    "kind": "官方文档"
  },
  "partition_key": {
    "name": "Milvus · Partition Key",
    "url": "https://milvus.io/docs/use-partition-key.md",
    "note": "标量字段作 Partition Key；写入哈希路由，检索按 filter 剪枝。",
    "kind": "官方文档"
  },
  "manage_partitions": {
    "name": "Milvus · Manage Partitions",
    "url": "https://milvus.io/docs/manage-partitions.md",
    "note": "手工分区管理与上限；可与 Partition Key 对照。",
    "kind": "官方文档"
  },
  "storage_v3": {
    "name": "Milvus 3.0 · Storage V3",
    "url": "https://milvus.io/docs/storage-v3.md",
    "note": "版本化布局 + Manifest；默认关闭；Snapshots / External Collection 等依赖。",
    "kind": "官方文档 · 3.0"
  },
  "tiered_storage": {
    "name": "Milvus · Tiered Storage Overview",
    "url": "https://milvus.io/docs/tiered-storage-overview.md",
    "note": "Load 时只缓存元数据，字段/索引按需拉取与驱逐。文档常写 2.6.4+。",
    "kind": "官方文档"
  },
  "warm_up": {
    "name": "Milvus · Tiered Storage Warm Up",
    "url": "https://milvus.io/docs/warm-up.md",
    "note": "预热策略，降低冷查询尖刺。",
    "kind": "官方文档"
  },
  "snapshots": {
    "name": "Milvus · Snapshots",
    "url": "https://milvus.io/docs/snapshots.md",
    "note": "基于 Manifest 的轻量时间点镜像；非长周期 Backup 替代品。",
    "kind": "官方文档 · 3.0"
  },
  "manage_snapshots": {
    "name": "Milvus · Manage Snapshots",
    "url": "https://milvus.io/docs/manage-snapshots.md",
    "note": "创建 / Pin / Restore 操作入口。",
    "kind": "官方文档 · 3.0"
  },
  "cdc_overview": {
    "name": "Milvus · CDC Overview",
    "url": "https://milvus.io/docs/milvus_cdc_overview.md",
    "note": "跨集群 Primary/Standby 变更复制拓扑。",
    "kind": "官方文档"
  },
  "cdc_failover": {
    "name": "Milvus · CDC Failover",
    "url": "https://milvus.io/docs/cdc_failover.md",
    "note": "主不可用时提升备；可用性优先，可能丢未复制写入。",
    "kind": "官方文档"
  },
  "cdc_setup": {
    "name": "Milvus · Set up CDC Replication",
    "url": "https://milvus.io/docs/set_up_cdc_replication.md",
    "note": "配置主备复制关系。",
    "kind": "官方文档"
  }
};
const GROUPS = [
  {
    "id": "dataplane",
    "name": "数据面与检索性能",
    "en": "DATA PLANE & SEARCH",
    "color": "#00A1EA",
    "question": "段如何生长密封、索引与过滤/混合检索如何加速，Load 后 SN/QN 如何归并？"
  },
  {
    "id": "write_consistency",
    "name": "写入与一致性",
    "en": "WRITE PATH & CONSISTENCY",
    "color": "#0077B6",
    "question": "3.0 写入如何进 WAL/Woodpecker，删除 Upsert 与 Partition Key 如何改可见集？"
  },
  {
    "id": "control_ha",
    "name": "控制面与高可用",
    "en": "CONTROL PLANE & HA",
    "color": "#0284C7",
    "question": "四层如何分流，MixCoord/etcd 管什么，副本与 CDC 主备如何继续服务？"
  },
  {
    "id": "storage_lifecycle",
    "name": "存储与生命周期",
    "en": "STORAGE & LIFECYCLE",
    "color": "#0EA5E9",
    "question": "Compaction 如何重排段、Storage V3 / Tiered / Snapshot 如何管冷热与时间点？"
  }
];
const LESSONS = [
  {
    "group": 0,
    "id": "segment-lifecycle",
    "title": "段生命周期与密封",
    "en": "SEGMENT LIFECYCLE · 3.0",
    "summary": "Milvus 3.0：增量由 Streaming Node 维护为 Growing；密封后成为历史 Sealed，DataNode 建索引，QueryNode 加载；MixCoord 调度 handoff。教学模型，非生产协议证明。",
    "nodes": [
      "StreamingNode",
      "Growing 段",
      "DataNode",
      "QueryNode"
    ],
    "steps": [
      [
        "写入进 Growing",
        0,
        1,
        "APPEND GROWING",
        "Streaming Node 在分片上追加 WAL 后，把增量保留为可搜的 Growing 段（相对 2.x：不再由 Proxy 直写外部 MQ 再由 DataNode 独自沉淀写入路径）。",
        "Growing 可搜",
        "data"
      ],
      [
        "达到密封策略",
        1,
        0,
        "SEAL POLICY",
        "按段大小/空闲/内存等策略，Streaming Node 将 Growing 转为不可变 Sealed（历史段），并持久相关数据视图。",
        "Growing → Sealed",
        "control"
      ],
      [
        "DataNode 建索引",
        0,
        2,
        "BUILD INDEX",
        "MixCoord 把索引/compaction 等离线任务交给 DataNode（3.0 已合并原 IndexNode）。",
        "索引产物入对象存储",
        "request"
      ],
      [
        "QueryNode handoff",
        2,
        3,
        "LOAD / HANDOFF",
        "QueryNode 从对象存储加载 Sealed+索引；协调器完成从 Growing 到历史检索视图的 handoff。",
        "历史检索切到 Indexed",
        "data"
      ]
    ],
    "principle": "Streaming 管增量与密封；DataNode 管离线加工；QueryNode 管历史检索。",
    "tradeoff": "更早密封利于索引化与稳定延迟，但增加小段与 compaction；过晚则 Growing 内存与实时扫描成本升高。",
    "pitfall": "不要把 2.x「DataNode 订阅 MQ 写段」当成 3.0 唯一真相：3.0 写入与 Growing 生命周期以 Streaming Node + WAL 为中心。",
    "code": [
      "sn = streamingNode.for(pchannel)",
      "sn.append(wal, rows)           # growing searchable",
      "sealed = sn.sealWhen(policy)   # immutable historical",
      "dataNode.buildIndex(sealed)",
      "mixCoord.handoff(to=queryNode)"
    ],
    "sources": [
      "arch_overview",
      "streaming_service",
      "upgrade_30"
    ],
    "related": [
      "insert-path",
      "vector-index",
      "query-node",
      "compaction-clustering",
      "load-release",
      "storage-v3"
    ],
    "fault": {
      "name": "密封滞后 · Growing 膨胀",
      "nodes": [
        "写入压力",
        "StreamingNode",
        "对象存储",
        "查询路径"
      ],
      "steps": [
        [
          "持续高压写入",
          0,
          1,
          "BURST APPEND",
          "短时大量追加使 Growing 远超习惯工作集；Streaming Node 仍要提供 Growing 查询。",
          "Growing 行数激增",
          "data"
        ],
        [
          "密封任务受阻",
          1,
          1,
          "SEAL DELAY",
          "资源或策略导致密封推迟；历史段与索引尚未就绪。",
          "仍停在 Growing",
          "local"
        ],
        [
          "持久化变慢",
          1,
          2,
          "SLOW PERSIST",
          "对象存储抖动拖慢密封/持久；教学用一次慢写入代表存储延迟。",
          "历史视图未就绪",
          "lost"
        ],
        [
          "查询代价偏高",
          1,
          3,
          "HEAVY GROWING",
          "handoff 前更多工作落在 Growing 路径；应观察密封滞后而非只看 insert QPS。",
          "可搜但成本高",
          "check"
        ]
      ],
      "code": [
        "if growing.bytes > budget and seal.lagging():",
        "  alert('seal_pending / growing_bytes')",
        "  # do not assume indexed sealed already serving"
      ]
    }
  },
  {
    "group": 0,
    "id": "vector-index",
    "title": "向量索引检索路径",
    "en": "IVF_FLAT / HNSW",
    "summary": "索引仍由 DataNode 等离线构建并落对象存储；查询时 Sealed 走索引，Growing 走实时路径。本课用 IVF_FLAT 与 HNSW 对照教学。",
    "nodes": [
      "查询向量",
      "IVF 粗排",
      "HNSW 图",
      "候选精排"
    ],
    "steps": [
      [
        "选择索引方案",
        0,
        1,
        "PICK INDEX",
        "为向量字段选择 IVF_FLAT 或 HNSW 等；3.0 中索引构建任务由统一调度下发到 DataNode。",
        "索引类型已选定",
        "compare"
      ],
      [
        "IVF：近邻桶",
        0,
        1,
        "nprobe BUCKETS",
        "先选 nprobe 个近邻簇，只扫描桶内向量，降低全库扫描。",
        "候选 ⊂ 全库",
        "request"
      ],
      [
        "HNSW：图跳跃",
        0,
        2,
        "GRAPH WALK",
        "从高层入口贪心下行，用 ef 控制探索宽度，得到候选集。",
        "候选沿边扩展",
        "request"
      ],
      [
        "精排 TopK",
        3,
        0,
        "TOPK DIST",
        "对候选算度量并取 TopK。参数与召回/延迟权衡见官方索引页。",
        "返回近似近邻",
        "data"
      ]
    ],
    "principle": "索引用可接受近似换掉数量级扫描；Growing 与 Sealed 路径不同，归并在查询计划里完成。",
    "tradeoff": "IVF 参数直观；HNSW 常更高召回但构图与内存更贵。二者都不是默认的精确全局扫描。",
    "pitfall": "把 nprobe/ef 调极大 ≠ 精确检索；精确需求用 FLAT/明确精确模式，并承担代价。",
    "code": [
      "if index == IVF_FLAT:",
      "  buckets = pickNearestCentroids(q, nprobe)",
      "  cands = scan(buckets)",
      "elif index == HNSW:",
      "  cands = greedySearch(graph, q, ef)",
      "return topK(exactDistance(q, cands))"
    ],
    "sources": [
      "index_overview",
      "ivf_flat",
      "hnsw"
    ],
    "related": [
      "segment-lifecycle",
      "query-node",
      "insert-path",
      "filtered-search",
      "hybrid-search-rrf"
    ],
    "fault": {
      "name": "参数过小 · 召回塌陷",
      "nodes": [
        "查询向量",
        "过小 nprobe",
        "过小 ef",
        "评测集"
      ],
      "steps": [
        [
          "上线偏小参数",
          0,
          1,
          "nprobe=1",
          "为追延迟压低 nprobe/ef，探索覆盖不足。",
          "候选过窄",
          "request"
        ],
        [
          "真近邻未进入",
          1,
          3,
          "MISS TRUE NN",
          "真近邻所在桶/子图未被触及，结果缺关键项。",
          "召回下降",
          "reject"
        ],
        [
          "提高探索对照",
          0,
          2,
          "RAISE ef/nprobe",
          "在评测集上提高参数，观察召回-延迟曲线。",
          "召回↑ 延迟↑",
          "compare"
        ],
        [
          "固化评测门槛",
          3,
          3,
          "RECALL GATE",
          "发布前用召回门槛约束参数；索引是产品决策。",
          "先测再调",
          "local"
        ]
      ],
      "code": [
        "recall = evaluate(topk, groundTruth)",
        "if recall < gate: raise nprobe_or_ef"
      ]
    }
  },
  {
    "group": 0,
    "id": "query-node",
    "title": "查询归并 · SN + QN",
    "en": "SEARCH PATH · 3.0",
    "summary": "3.0 查询：Proxy 将请求交给持有分片的 Streaming Node；SN 查 Growing 并作为 Query Delegator 联系 QueryNode 查 Sealed，再多层归并。",
    "nodes": [
      "Proxy",
      "StreamingNode",
      "QueryNode",
      "对象存储"
    ],
    "steps": [
      [
        "Proxy 路由到 SN",
        0,
        1,
        "ROUTE SHARD",
        "Proxy 按分片把 search 交给对应 Streaming Node（相对 2.x：查询委托不再主要落在 QueryNode 侧）。",
        "SN 收到查询",
        "request"
      ],
      [
        "SN 查 Growing",
        1,
        1,
        "SEARCH GROWING",
        "Streaming Node 本地检索 Growing，并生成/协调查询计划。",
        "增量候选就绪",
        "local"
      ],
      [
        "QN 查 Sealed",
        1,
        2,
        "SEARCH SEALED",
        "SN 联系已 Load 的 QueryNode；QN 必要时从对象存储加载历史段/索引并检索。",
        "历史候选就绪",
        "request"
      ],
      [
        "多层归并返回",
        2,
        0,
        "REDUCE TOPK",
        "QueryNode 段级归并 → Streaming Node 分片归并 → Proxy 全局归并后返回客户端。",
        "全局 TopK",
        "data"
      ]
    ],
    "principle": "流批分离：SN 管增量与委托，QN 管历史，Proxy 做最终归并。",
    "tradeoff": "委托上收到 SN 改善写侧共识与扩展，但运维需同时关注 SN 与 QN 健康；未 Load 则历史段不可用。",
    "pitfall": "仍按 2.x 思维假设「Proxy 只打 QueryNode」会误判故障面；3.0 要同时看 Streaming Node。",
    "code": [
      "sn = proxy.shardStreamingNode(collection, shard)",
      "growing = sn.searchGrowing(q, k)",
      "sealed = sn.delegator.queryNodes.searchSealed(q, k)",
      "return proxy.reduce(sn.reduce(growing, sealed))"
    ],
    "sources": [
      "arch_overview",
      "streaming_service",
      "replica"
    ],
    "related": [
      "segment-lifecycle",
      "vector-index",
      "replica-failover",
      "load-release",
      "hybrid-search-rrf",
      "arch-four-layers"
    ],
    "fault": {
      "name": "集合未 Load",
      "nodes": [
        "客户端",
        "Proxy",
        "MixCoord",
        "空 QueryNode"
      ],
      "steps": [
        [
          "直接 Search",
          0,
          1,
          "SEARCH",
          "集合尚未 Load，无可用历史查询视图。",
          "缺 serving view",
          "request"
        ],
        [
          "协调器无视图",
          1,
          2,
          "LOOKUP VIEW",
          "MixCoord/查询视图中没有可服务的段分布。",
          "路由失败",
          "check"
        ],
        [
          "请求被拒绝",
          2,
          1,
          "REJECT",
          "教学模型：明确失败优于静默空结果被当成「没数据」。",
          "查询未执行",
          "reject"
        ],
        [
          "Load 后再搜",
          2,
          3,
          "LOAD",
          "执行 Load，QueryNode 拉取 Sealed；再经 SN 路径搜索。",
          "可服务",
          "control"
        ]
      ],
      "code": [
        "if not collection.isLoaded: raise CollectionNotLoaded",
        "collection.load()",
        "return search(...)"
      ]
    }
  },
  {
    "group": 1,
    "id": "insert-path",
    "title": "写入路径 · WAL",
    "en": "INSERT · STREAMING + WAL",
    "summary": "Milvus 3.0：Client → Proxy → Streaming Node → WAL（默认教学用 Woodpecker 零盘；也可 Pulsar/Kafka）。相对 2.x Proxy 直写外部 MQ、DataNode 订阅沉淀的拓扑已改变。",
    "nodes": [
      "Proxy",
      "StreamingNode",
      "WAL · Woodpecker",
      "Growing 缓冲"
    ],
    "steps": [
      [
        "Proxy 校验路由",
        0,
        0,
        "VALIDATE",
        "Proxy 校验 schema/权限等，解析目标分片对应的 Streaming Node。",
        "请求合法",
        "local"
      ],
      [
        "SN 追加 WAL",
        0,
        1,
        "APPEND WAL",
        "Streaming Node 将插入写入 WAL 存储；Woodpecker 可直写对象存储（零盘），也可使用 Pulsar/Kafka。",
        "耐久日志已提交",
        "data"
      ],
      [
        "写入确认",
        1,
        2,
        "WAL COMMIT",
        "WAL 提交后具备故障恢复基础；Write-Ahead Buffer 可支持尾读，避免每次回源。",
        "ACK 条件满足",
        "data"
      ],
      [
        "进入 Growing",
        1,
        3,
        "GROWING VIEW",
        "提交后的增量进入 Growing 查询视图，供 SN 实时检索；密封与索引异步推进。",
        "增量可搜",
        "data"
      ]
    ],
    "principle": "WAL 是突变的权威前置日志；Streaming Node 拥有分片级写与 Growing 读。",
    "tradeoff": "Woodpecker 降低 MQ 运维，但要把对象存储与 WAL 配置纳入容量规划；外部 MQ 仍可用但运维模型不同。",
    "pitfall": "把「insert ACK」理解成「已在所有 QueryNode 索引可搜」；ACK 首先关于 WAL/流式路径，索引与 handoff 仍异步。",
    "code": [
      "sn = proxy.locateStreamingNode(shard)",
      "sn.append(walBackend, InsertMsg(rows, ts))  # Woodpecker/Pulsar/Kafka",
      "growing.buffer(rows)",
      "ackClient()"
    ],
    "sources": [
      "arch_overview",
      "streaming_service",
      "upgrade_30"
    ],
    "related": [
      "segment-lifecycle",
      "timetravel",
      "mixcoord-meta",
      "streaming-woodpecker",
      "delete-upsert-bitset",
      "partition-key"
    ],
    "fault": {
      "name": "WAL 追加受阻",
      "nodes": [
        "Proxy",
        "StreamingNode",
        "WAL 后端",
        "监控"
      ],
      "steps": [
        [
          "客户端持续写入",
          0,
          1,
          "INSERT",
          "业务压力仍打到 Proxy/SN。",
          "请求涌入",
          "request"
        ],
        [
          "WAL 写入超时",
          1,
          2,
          "APPEND TIMEOUT",
          "Woodpecker/对象存储或外部 MQ 抖动，追加失败或极慢。",
          "耐久未确认",
          "lost"
        ],
        [
          "对客户端失败",
          1,
          0,
          "NACK",
          "未获 WAL 提交则不能假装成功；客户端应重试并注意幂等。",
          "写入未 ACK",
          "reject"
        ],
        [
          "告警与排障",
          1,
          3,
          "ALERT",
          "盯 WAL 错误率、SN 健康与对象存储延迟，而不是只看 Proxy QPS。",
          "以 WAL 为信号",
          "control"
        ]
      ],
      "code": [
        "try: sn.append(wal, msg)",
        "except Timeout:",
        "  alert('wal_append_fail'); raise"
      ]
    }
  },
  {
    "group": 1,
    "id": "timetravel",
    "title": "时间戳与可见性",
    "en": "TSO / TIMETICK · 3.0",
    "summary": "MixCoord 提供集群 TSO；Streaming Node / WAL 推进 TimeTick 与可读水位；查询用 guarantee 时间判断可见集。教学简化。",
    "nodes": [
      "MixCoord · TSO",
      "StreamingNode",
      "TimeTick",
      "查询快照"
    ],
    "steps": [
      [
        "分配时间戳",
        0,
        1,
        "ALLOC TS",
        "插入等从 MixCoord 的 TSO 取得单调时间戳（3.0 协调器合并后仍承担 TSO 职责）。",
        "msg.ts = T",
        "request"
      ],
      [
        "按 TS 入 WAL",
        1,
        1,
        "ORDERED LOG",
        "Streaming Node 按 TSO 顺序维护 WAL 可读序列；同通道内总序由此约束。",
        "有序日志",
        "local"
      ],
      [
        "推进 TimeTick",
        1,
        2,
        "TIMETICK",
        "TimeTick 声明此前时间戳消息已齐，推动分片可读水位。",
        "watermark ↑",
        "control"
      ],
      [
        "查询读快照",
        2,
        3,
        "READ AT Ts",
        "查询携带 guaranteeTs / 一致性策略，只看见水位允许的插入集合。",
        "可见 ≤ readTs",
        "check"
      ]
    ],
    "principle": "可见性由时间戳与水位共同决定，不是单独由 insert 返回决定。",
    "tradeoff": "更强即时可见要等更高水位；放宽级别可降延迟但读到更旧视图。",
    "pitfall": "Timetravel/travel 语义以当前版本文档为准，并受保留与压缩策略限制。",
    "code": [
      "ts = mixCoord.allocTimestamp()",
      "sn.append(wal, Insert(ts))",
      "sn.onTimeTick(tickTs)",
      "visible = rows where row.ts <= readTs and tickOk(readTs)"
    ],
    "sources": [
      "timestamps",
      "streaming_service",
      "consistency"
    ],
    "related": [
      "insert-path",
      "consistency-levels",
      "mixcoord-meta",
      "delete-upsert-bitset",
      "filtered-search"
    ],
    "fault": {
      "name": "TimeTick 停滞",
      "nodes": [
        "StreamingNode",
        "卡住的 Tick",
        "Strong 查询",
        "陈旧视图"
      ],
      "steps": [
        [
          "WAL 仍可追加",
          0,
          0,
          "APPEND OK",
          "业务写入偶发仍成功，日志继续。",
          "日志在前进",
          "local"
        ],
        [
          "Tick 未推进",
          0,
          1,
          "TICK STALL",
          "TimeTick 同步异常，可读水位冻结。",
          "watermark 停",
          "lost"
        ],
        [
          "强读等待",
          2,
          1,
          "WAIT WATERMARK",
          "Strong 等待水位追上 guaranteeTs，延迟升高或超时。",
          "读被挡住",
          "check"
        ],
        [
          "弱读见旧视图",
          2,
          3,
          "STALE READ",
          "Eventually/旧会话可能长时间看不到新行；先查 Tick/SN 健康。",
          "可见性滞后",
          "reject"
        ]
      ],
      "code": [
        "if now - lastTimeTick > budget:",
        "  alert('timetick_stall')"
      ]
    }
  },
  {
    "group": 1,
    "id": "consistency-levels",
    "title": "四级一致性行为",
    "en": "CONSISTENCY LEVELS",
    "summary": "Strong / Bounded / Session / Eventually 描述查询相对写入的新鲜度承诺；3.0 仍通过流式水位与会话语义兑现，本课讲行为差异。",
    "nodes": [
      "写入完成",
      "Strong 读",
      "Session 读",
      "Eventually 读"
    ],
    "steps": [
      [
        "写入已 ACK",
        0,
        0,
        "INSERT ACK",
        "WAL 路径确认后客户端收到成功；后续读的可见性仍取决于级别。",
        "写入已确认",
        "local"
      ],
      [
        "Strong：等到齐",
        0,
        1,
        "READ STRONG",
        "等待相关水位满足后再读，通常延迟最高、新鲜度最强。",
        "必见已确认写",
        "check"
      ],
      [
        "Session：读己之写",
        0,
        2,
        "READ SESSION",
        "同一会话能读到自己写过的内容；跨会话不承诺立刻看见他人写入。",
        "会话内一致",
        "check"
      ],
      [
        "Eventually：尽快",
        0,
        3,
        "READ EVENTUAL",
        "用较旧快照尽快返回；Bounded 限制陈旧上限。都是延迟-新鲜度旋钮。",
        "可能短暂陈旧",
        "compare"
      ]
    ],
    "principle": "一致性级别是 API 上的新鲜度旋钮，不是四套无关存储引擎。",
    "tradeoff": "更强一致 → 更高尾延迟；更弱 → 更快但要容忍短暂旧读。",
    "pitfall": "在 Eventually 下做写后即读校验失败时，误判丢数；先核对级别与会话。",
    "code": [
      "insert(rows)",
      "search(level=Strong)",
      "search(level=Session)",
      "search(level=Eventually)",
      "search(level=Bounded, window=τ)"
    ],
    "sources": [
      "consistency",
      "timestamps",
      "streaming_service"
    ],
    "related": [
      "timetravel",
      "insert-path",
      "query-node",
      "delete-upsert-bitset"
    ],
    "fault": {
      "name": "级别误用 · 误判丢数",
      "nodes": [
        "写入客户端",
        "Eventually 查询",
        "校验脚本",
        "Strong 复检"
      ],
      "steps": [
        [
          "写后立刻弱读",
          0,
          1,
          "WRITE→EVENTUAL",
          "Eventually 下立刻 search，未看见新行。",
          "结果缺新行",
          "request"
        ],
        [
          "误报丢失",
          1,
          2,
          "FALSE ALARM",
          "把「不可见」当成「丢失」。",
          "告警噪声",
          "reject"
        ],
        [
          "Strong/Session 复检",
          0,
          3,
          "RECHECK",
          "提高级别后新行出现。",
          "数据仍在",
          "check"
        ],
        [
          "校正测试",
          2,
          2,
          "FIX TEST",
          "测试显式设置与业务匹配的级别。",
          "语义对齐",
          "local"
        ]
      ],
      "code": [
        "insert(row)",
        "assert row in search(level=Session)  # or Strong"
      ]
    }
  },
  {
    "group": 2,
    "id": "mixcoord-meta",
    "title": "MixCoord 与元数据",
    "en": "MIXCOORD + ETCD · 3.0",
    "summary": "3.0 用单一活跃 MixCoord 合并原 Root/Query/Data Coord：DDL/DCL/TSO、Streaming 绑定、查询拓扑、历史任务调度；元数据仍在 etcd。",
    "nodes": [
      "客户端 DDL",
      "MixCoord",
      "etcd",
      "Streaming 绑定"
    ],
    "steps": [
      [
        "提交 DDL",
        0,
        1,
        "CREATE COLL",
        "创建集合等 DDL 进入 MixCoord（不再拆成多个独立 Coord 进程通信）。",
        "DDL 已受理",
        "request"
      ],
      [
        "写入 etcd",
        1,
        2,
        "PUT META",
        "权威元数据提交到 etcd；集群获得集合定义真相。",
        "etcd 已提交",
        "data"
      ],
      [
        "绑定 WAL / SN",
        1,
        3,
        "BIND WAL",
        "MixCoord 内 Streaming 协调逻辑把 WAL/PChannel 绑定到 Streaming Node，并暴露拓扑发现。",
        "SN↔WAL 已绑定",
        "control"
      ],
      [
        "DDL 对集群可见",
        2,
        0,
        "VISIBLE",
        "Proxy/节点取得元数据版本后，集合可被写入与 Load。",
        "元数据一致视图",
        "data"
      ]
    ],
    "principle": "一个活跃协调器 + etcd 元数据；工作节点按绑定与视图执行。",
    "tradeoff": "MixCoord 简化分布式编程与运维，但协调器仍是脑：需关注其 HA/主备与 etcd 依赖。",
    "pitfall": "文档或旧图仍写 RootCoord/QueryCoord/DataCoord 时，在 3.0 应映射为 MixCoord 内逻辑职责，而非三套现行必装进程。",
    "code": [
      "meta = mixCoord.createCollection(schema)",
      "etcd.txnPut(collectionKey, meta)",
      "mixCoord.bindWAL(pchannel, streamingNode)",
      "notifyServingViews(meta.version)"
    ],
    "sources": [
      "arch_overview",
      "upgrade_30",
      "streaming_service"
    ],
    "related": [
      "insert-path",
      "timetravel",
      "replica-failover",
      "arch-four-layers",
      "cdc-replication"
    ],
    "fault": {
      "name": "etcd 抖动 · DDL 失败",
      "nodes": [
        "客户端",
        "MixCoord",
        "etcd 抖动",
        "已有元数据"
      ],
      "steps": [
        [
          "DDL 发送",
          0,
          1,
          "ALTER",
          "客户端发起变更。",
          "请求在途",
          "request"
        ],
        [
          "etcd 超时",
          1,
          2,
          "TXN TIMEOUT",
          "etcd 选举/网络抖动致事务超时。",
          "提交未确认",
          "lost"
        ],
        [
          "返回错误",
          1,
          0,
          "DDL ERROR",
          "客户端需重试，并确认是否已部分成功。",
          "DDL 未完成",
          "reject"
        ],
        [
          "读权威元数据",
          0,
          3,
          "DESCRIBE",
          "用官方 API 读 etcd 视图，避免重复创建或手工改元数据。",
          "以 etcd 为准",
          "check"
        ]
      ],
      "code": [
        "try: mixCoord.ddl(req)",
        "except Timeout:",
        "  actual = describeCollection(); retryOnlyIfNeeded(actual)"
      ]
    }
  },
  {
    "group": 2,
    "id": "replica-failover",
    "title": "副本与故障切换",
    "en": "REPLICA / FAILOVER · 3.0",
    "summary": "历史段可在多 QueryNode 上多副本；Streaming Node 通过 WAL fencing 在节点间迁移以保分流式 HA。本课主场景讲查询副本，故障场景讲 QN 宕机切换。",
    "nodes": [
      "Proxy",
      "StreamingNode",
      "QueryNode-1",
      "QueryNode-2"
    ],
    "steps": [
      [
        "配置多副本",
        0,
        1,
        "SET REPLICAS",
        "Load 指定 replica；MixCoord 把 Sealed 分布到多个 QueryNode。",
        "副本因子 = N",
        "control"
      ],
      [
        "SN 委托查询",
        1,
        2,
        "DELEGATE",
        "Streaming Node 作为分片委托，将 Sealed 检索打到健康 QueryNode。",
        "QN-1 服务中",
        "request"
      ],
      [
        "副本待命",
        1,
        3,
        "STANDBY",
        "QN-2 持有同段另一副本，可分担或接管。",
        "QN-2 已加载",
        "data"
      ],
      [
        "归并返回",
        2,
        0,
        "MERGE",
        "结果经 SN/Proxy 归并返回；用户无感拓扑。",
        "查询成功",
        "data"
      ]
    ],
    "principle": "QN 副本换历史查询可用；SN/WAL 迁移换流式面可用——两层不要混为一谈。",
    "tradeoff": "副本耗内存与加载时间；replica=1 时单 QN 故障即丢该历史视图能力。",
    "pitfall": "副本不能替代对象存储与 etcd 耐久；也不是自动跨机房灾备说明书。",
    "code": [
      "collection.load(replica_number=2)",
      "targets = mixCoord.pickHealthyQueryReplicas(shard)",
      "return streamingNode.delegatedSearch(targets)"
    ],
    "sources": [
      "replica",
      "arch_overview",
      "streaming_service"
    ],
    "related": [
      "query-node",
      "mixcoord-meta",
      "segment-lifecycle",
      "cdc-replication",
      "load-release"
    ],
    "fault": {
      "name": "QueryNode 宕机切换",
      "nodes": [
        "StreamingNode",
        "故障 QN-1",
        "存活 QN-2",
        "MixCoord"
      ],
      "steps": [
        [
          "QN 心跳丢失",
          1,
          1,
          "QN DOWN",
          "QN-1 崩溃或网络隔离。",
          "QN-1 不可用",
          "local"
        ],
        [
          "委托请求失败",
          0,
          1,
          "RPC FAIL",
          "SN 打向 QN-1 的检索失败/超时。",
          "主路径中断",
          "lost"
        ],
        [
          "改写存活副本",
          3,
          2,
          "REROUTE",
          "MixCoord 更新查询视图，委托改打 QN-2。",
          "QN-2 接管",
          "control"
        ],
        [
          "查询继续",
          2,
          0,
          "SEARCH OK",
          "仍有健康副本则可继续；副本耗尽需恢复或重新 Load。",
          "降级可用",
          "data"
        ]
      ],
      "code": [
        "if not healthy(qn1):",
        "  targets = remainingReplicas(shard)",
        "  if not targets: raise NoAvailableReplica",
        "  return search(targets)"
      ]
    }
  },
  {
    "group": 2,
    "id": "arch-four-layers",
    "title": "四层架构与请求分流",
    "en": "FOUR LAYERS · REQUEST PATH",
    "summary": "Milvus 3.0 教学地图：Access（Proxy）/ MixCoord（文档常写 Coordinator）/ Worker（Streaming·Query·Data）/ Storage（etcd+对象存储+WAL）。DDL、DML、DQL 走不同分流。教学模型，非生产协议证明。",
    "nodes": [
      "Client / Proxy",
      "MixCoord",
      "Worker 节点",
      "Storage"
    ],
    "steps": [
      [
        "Access 接入",
        0,
        0,
        "VALIDATE",
        "无状态 Proxy 校验请求并做结果归并；对外统一入口。",
        "请求已准入",
        "local"
      ],
      [
        "控制面分流",
        0,
        1,
        "DDL / TSO",
        "DDL/DCL/TSO、WAL 绑定、查询视图与离线任务调度由单一活跃 MixCoord 承担（文档层名 Coordinator）。",
        "拓扑与元数据",
        "control"
      ],
      [
        "工作面执行",
        1,
        2,
        "DISPATCH",
        "Streaming Node 管写与 Growing；QueryNode 管 Sealed 检索；DataNode 管 compaction/索引。",
        "执行落在 Worker",
        "request"
      ],
      [
        "存储解耦",
        2,
        3,
        "PERSIST",
        "etcd 存元数据；对象存储存段/索引；WAL（Woodpecker 或 MQ）存突变日志。计算可水平扩展。",
        "存算分离",
        "data"
      ]
    ],
    "principle": "四层可独立扩展；请求按 DDL/DML/DQL 分流，不要假设所有路径都打同一个节点。",
    "tradeoff": "解耦带来弹性与运维面变宽：要同时理解 MixCoord、Streaming 与对象存储依赖。",
    "pitfall": "官方图资产名可能仍写 2.6 / Coordinator；本站 3.0 基线统一称 MixCoord，勿把 Root/Query/Data Coord 当成现行必装三进程。",
    "code": [
      "req = proxy.validate(clientRequest)",
      "if req.isDDL: mixCoord.handleDDL(req)          # Layer 2",
      "elif req.isDML: streamingNode.append(wal, req) # Layer 3 write",
      "elif req.isDQL: sn.delegator.search(...)       # Growing+Sealed",
      "# Layer 4: etcd meta + object storage + WAL backend"
    ],
    "sources": [
      "arch_overview",
      "four_layers",
      "upgrade_30"
    ],
    "related": [
      "mixcoord-meta",
      "insert-path",
      "query-node",
      "streaming-woodpecker"
    ],
    "fault": {
      "name": "缓存拓扑过期",
      "nodes": [
        "Proxy",
        "陈旧缓存",
        "MixCoord",
        "正确 Worker"
      ],
      "steps": [
        [
          "Proxy 用旧视图",
          0,
          0,
          "STALE CACHE",
          "Proxy 本地拓扑缓存未刷新，仍指向旧 Streaming/Query 绑定。",
          "路由依据过期",
          "local"
        ],
        [
          "打到错误目标",
          1,
          2,
          "LOOKUP FAIL",
          "按陈旧视图查找服务，协调器侧校验或 RPC 失败。",
          "分流失败",
          "check"
        ],
        [
          "请求被拒/超时",
          0,
          1,
          "REJECT",
          "教学模型：明确失败优于静默打到错误分片。",
          "客户端收到错",
          "reject"
        ],
        [
          "刷新后再分流",
          2,
          3,
          "REFRESH VIEW",
          "向 MixCoord 拉新拓扑，再落到正确 Worker。",
          "路径恢复",
          "control"
        ]
      ],
      "code": [
        "view = proxy.cachedTopology()",
        "if view.version < mixCoord.servingVersion:",
        "  proxy.refresh(mixCoord.discover())"
      ]
    }
  },
  {
    "group": 1,
    "id": "streaming-woodpecker",
    "title": "Streaming · Woodpecker WAL",
    "en": "STREAMING + WOODPECKER",
    "summary": "打开 insert-path 的 WAL 黑盒：Streaming Node 拥有分片写与 Growing；Woodpecker 以零盘架构把日志落对象存储（也可 Pulsar/Kafka）。文档多写「2.6 引入」，3.0 仍为默认/推荐 WAL 之一。教学简化。",
    "nodes": [
      "StreamingNode",
      "Woodpecker Client",
      "对象存储 / Quorum",
      "Growing"
    ],
    "steps": [
      [
        "SN 接收写入",
        0,
        1,
        "APPEND REQ",
        "Streaming Node 把插入交给 Woodpecker 客户端（或外部 MQ 适配层）。",
        "进入 WAL 路径",
        "request"
      ],
      [
        "缓冲并确认",
        1,
        2,
        "BUFFER / QUORUM",
        "MemoryBuffer：内存攒批后刷对象存储（延迟更高）；QuorumBuffer：三副本法定数确认后异步落盘（低延迟）。",
        "耐久条件满足",
        "data"
      ],
      [
        "元数据协调",
        1,
        1,
        "ETCD META",
        "Woodpecker 用 etcd 协调日志状态；无本地盘也可恢复。",
        "日志状态一致",
        "local"
      ],
      [
        "进入 Growing",
        0,
        3,
        "GROWING VIEW",
        "WAL 提交后增量进入 Growing，供 SN 实时检索；密封与索引仍异步。",
        "增量可搜",
        "data"
      ]
    ],
    "principle": "WAL 是突变权威前置日志；Woodpecker 用对象存储换掉本地盘/外部 Broker 运维面。",
    "tradeoff": "MemoryBuffer 运维简单但写延迟偏高；QuorumBuffer 更低延迟但引入 quorum 组件。外部 Pulsar/Kafka 仍可用。",
    "pitfall": "文档标题写「Milvus 2.6」不等于 3.0 弃用；教学上按 3.0 + MixCoord + Streaming Node 表述，并在旁注版本偏斜。",
    "code": [
      "sn = streamingNode.for(pchannel)",
      "if wal == Woodpecker:",
      "  ack = woodpecker.append(mode=MemoryBuffer|QuorumBuffer, msg)",
      "else:",
      "  ack = mq.append(Pulsar|Kafka, msg)",
      "growing.buffer(msg); return ack"
    ],
    "sources": [
      "woodpecker",
      "streaming_service",
      "woodpecker_admin"
    ],
    "related": [
      "insert-path",
      "segment-lifecycle",
      "arch-four-layers",
      "timetravel"
    ],
    "fault": {
      "name": "对象存储刷盘失败",
      "nodes": [
        "StreamingNode",
        "Woodpecker",
        "对象存储",
        "客户端"
      ],
      "steps": [
        [
          "持续追加",
          0,
          1,
          "APPEND",
          "业务写入仍打到 SN/Woodpecker。",
          "请求涌入",
          "request"
        ],
        [
          "刷盘超时",
          1,
          2,
          "FLUSH FAIL",
          "S3/MinIO 抖动致异步上传或 quorum 后刷盘失败。",
          "耐久未闭环",
          "lost"
        ],
        [
          "对客户端 NACK",
          1,
          3,
          "NACK",
          "未满足耐久条件则不能假装成功。",
          "写入未确认",
          "reject"
        ],
        [
          "告警与切换",
          0,
          0,
          "ALERT",
          "盯 WAL 错误率与对象存储延迟；必要时评估 MQ 后端或配额。",
          "以 WAL 为信号",
          "local"
        ]
      ],
      "code": [
        "try: woodpecker.append(msg)",
        "except StorageTimeout:",
        "  alert('woodpecker_flush_fail'); raise"
      ]
    }
  },
  {
    "group": 0,
    "id": "load-release",
    "title": "Load / Release",
    "en": "LOAD · RELEASE · SEGMENTS",
    "summary": "检索前必须 Load：MixCoord 分配查询视图，QueryNode 拉取 Sealed 段/索引；Release 释放内存。3.0 中 Growing 仍由 Streaming Node 维护，但历史检索依赖已 Load 的 QN。教学模型。",
    "nodes": [
      "客户端",
      "MixCoord",
      "QueryNode",
      "对象存储"
    ],
    "steps": [
      [
        "发起 Load",
        0,
        1,
        "LOAD COLL",
        "客户端 load_collection；通常需向量字段已建索引。",
        "Load 已受理",
        "request"
      ],
      [
        "分配查询视图",
        1,
        2,
        "ASSIGN SEG",
        "MixCoord 把 Sealed 段分布到 QueryNode（可含 replica）。",
        "拓扑已下发",
        "control"
      ],
      [
        "拉取段与索引",
        2,
        3,
        "FETCH",
        "QueryNode 从对象存储加载索引与字段数据（或 Tiered 下仅元数据）。",
        "段进入可服务",
        "data"
      ],
      [
        "可搜确认",
        2,
        0,
        "LOADED",
        "get_load_state=Loaded 后，SN 委托的 Sealed 检索可用。",
        "历史视图就绪",
        "check"
      ]
    ],
    "principle": "未 Load 则没有可服务的历史查询视图；Load 是用户侧「为何搜不到」的第一课。",
    "tradeoff": "全量 Load 延迟最低但吃内存；字段级 Load / Tiered 省资源但首查可能更慢。",
    "pitfall": "Load 成功不等于 Growing 也已索引完；刚插入的增量仍走 SN Growing 路径。Release 后改 mmap 等配置再 Load 才生效。",
    "code": [
      "mixCoord.assignSegments(collection, queryNodes)",
      "for seg in sealed:",
      "  qn.load(seg, indexFiles)  # or metadata-only if tiered",
      "assert get_load_state() == Loaded",
      "collection.release()  # free QN cache"
    ],
    "sources": [
      "load_release",
      "arch_overview",
      "replica"
    ],
    "related": [
      "query-node",
      "segment-lifecycle",
      "tiered-storage",
      "replica-failover"
    ],
    "fault": {
      "name": "半加载 · 搜不到",
      "nodes": [
        "客户端",
        "MixCoord",
        "资源不足 QN",
        "监控"
      ],
      "steps": [
        [
          "Load 超时/卡死",
          0,
          1,
          "LOAD HANG",
          "段很多或 QN 内存不足，Load 进度长期不到 100%。",
          "状态非 Loaded",
          "request"
        ],
        [
          "部分段未就绪",
          1,
          2,
          "PARTIAL",
          "部分 QueryNode 失败，服务视图残缺。",
          "视图不完整",
          "lost"
        ],
        [
          "Search 被拒",
          0,
          1,
          "REJECT",
          "集合未完全 Loaded 时检索失败或结果残缺（视版本行为）。",
          "不可用",
          "reject"
        ],
        [
          "扩容或减负",
          1,
          3,
          "RESIZE",
          "加 QN / 降 replica / 字段级 Load / 开 Tiered，再重试。",
          "重新可服务",
          "control"
        ]
      ],
      "code": [
        "state = get_load_state(collection)",
        "if state != Loaded:",
        "  alert('load_incomplete'); retry_or_scale()"
      ]
    }
  },
  {
    "group": 1,
    "id": "delete-upsert-bitset",
    "title": "Delete/Upsert · Bitset",
    "en": "DELETE · UPSERT · BITSET",
    "summary": "删除多为段内软删 bitset；过滤 bitset 与删除 bitset 在检索前求交；Upsert 教学上可视为按主键删后插。与 Time Travel 水位交叉。教学简化。",
    "nodes": [
      "客户端",
      "StreamingNode / WAL",
      "删除 Bitset",
      "查询计划"
    ],
    "steps": [
      [
        "提交 Delete/Upsert",
        0,
        1,
        "DELETE/UPSERT",
        "按主键或 filter 删除，或 Upsert；突变先入 WAL/流式路径。",
        "突变已进日志",
        "data"
      ],
      [
        "标记软删",
        1,
        2,
        "SET DEL BIT",
        "对应行在段删除 bitset 置位；物理空间稍后由 compaction 回收。",
        "行逻辑删除",
        "control"
      ],
      [
        "与过滤求交",
        2,
        3,
        "AND BITSETS",
        "检索时 filter_bitset 与 del_bitset（及时间可见性）组合，得到可计算行集。",
        "候选行掩码",
        "check"
      ],
      [
        "Upsert 再插入",
        1,
        1,
        "RE-INSERT",
        "Upsert：删旧后插入新版本行（新 ts）；可见性仍受一致性级别约束。",
        "新版本可写",
        "local"
      ]
    ],
    "principle": "删除首先改可见性掩码，不是立刻抹掉对象存储文件；查询永远先过 bitset。",
    "tradeoff": "软删使删除很快，但段内空洞升高，依赖 compaction；强一致读删除结果仍要等水位。",
    "pitfall": "bitset 文档示例里 filter/delete 组合与 Time Travel 细节以当前版本文档为准；勿把「delete ACK」当成「物理文件已删」。",
    "code": [
      "sn.append(wal, Delete(pks_or_expr, ts))",
      "del_bitset.mark(rows)",
      "visible = filter_bitset AND NOT del_bitset  # teaching",
      "# upsert ≈ delete(pk) + insert(new_row)"
    ],
    "sources": [
      "bitset",
      "delete_entities",
      "upsert_entities"
    ],
    "related": [
      "timetravel",
      "insert-path",
      "filtered-search",
      "compaction-clustering"
    ],
    "fault": {
      "name": "删后弱读仍见旧行",
      "nodes": [
        "写入方",
        "Eventually 查询",
        "Bitset 水位",
        "Strong 复检"
      ],
      "steps": [
        [
          "Delete 已 ACK",
          0,
          0,
          "DELETE ACK",
          "客户端收到删除成功。",
          "日志已提交",
          "local"
        ],
        [
          "弱读仍命中",
          0,
          1,
          "STALE HIT",
          "Eventually 下仍可能短暂看见旧行。",
          "可见性滞后",
          "request"
        ],
        [
          "水位未追上",
          2,
          1,
          "WATERMARK LAG",
          "删除对应 ts 尚未进入可读水位。",
          "掩码未生效",
          "lost"
        ],
        [
          "Strong 复检",
          0,
          3,
          "RECHECK",
          "提高一致性级别后旧行消失；先核对级别再报丢删。",
          "语义对齐",
          "check"
        ]
      ],
      "code": [
        "delete(pk)",
        "assert pk not in search(level=Strong)"
      ]
    }
  },
  {
    "group": 0,
    "id": "hybrid-search-rrf",
    "title": "混合检索 · RRF",
    "en": "HYBRID SEARCH · RRF",
    "summary": "多向量字段并行 ANN，各路产出局部 TopK，再用 RRF（或加权）归并成全局排序。稠密+稀疏、多模态是典型场景。教学模型。",
    "nodes": [
      "多路查询",
      "ANN 字段 A",
      "ANN 字段 B",
      "RRF 归并"
    ],
    "steps": [
      [
        "拆成多路 ANN",
        0,
        1,
        "MULTI ANN",
        "Proxy/计划层为每个向量字段发起一路近似近邻检索。",
        "多路并行",
        "request"
      ],
      [
        "字段 A TopK",
        0,
        1,
        "TOPK A",
        "例如稠密向量路得到名次列表。",
        "A 路候选",
        "data"
      ],
      [
        "字段 B TopK",
        0,
        2,
        "TOPK B",
        "稀疏/另一模态路得到另一名次列表。",
        "B 路候选",
        "data"
      ],
      [
        "RRF 融合",
        3,
        0,
        "RRF FUSE",
        "score(d)=Σ 1/(k+rank_i(d))；也可 Weighted Ranker。返回融合 TopK。",
        "全局排序",
        "compare"
      ]
    ],
    "principle": "混合检索 = 多路召回 + 排序融合；RRF 用名次而非原始距离，降低量纲冲突。",
    "tradeoff": "路数与每路 TopK 影响延迟与召回；权重/RRF 参数是产品决策，需评测集。",
    "pitfall": "某路字段未建索引或未 Load 会导致该路失败/降级；不要假设「一路空结果仍完美融合」。",
    "code": [
      "rankA = ann(field=dense, qA, limit=k)",
      "rankB = ann(field=sparse, qB, limit=k)",
      "for d in union(rankA, rankB):",
      "  score[d] += 1/(offset + rankA.pos(d)) + 1/(offset + rankB.pos(d))",
      "return topK(score)"
    ],
    "sources": [
      "multi_vector",
      "rrf_ranker",
      "index_overview"
    ],
    "related": [
      "query-node",
      "vector-index",
      "filtered-search",
      "load-release"
    ],
    "fault": {
      "name": "一路未索引 · 融合偏斜",
      "nodes": [
        "查询",
        "缺索引字段",
        "仅一路 TopK",
        "评测"
      ],
      "steps": [
        [
          "发起混合搜",
          0,
          1,
          "HYBRID",
          "配置了两路，但 B 字段无索引/未 Load。",
          "B 路不可用",
          "request"
        ],
        [
          "B 路失败",
          1,
          0,
          "ANN FAIL",
          "该路返回空或错误。",
          "缺一路召回",
          "reject"
        ],
        [
          "结果被 A 主导",
          0,
          2,
          "SKEW",
          "融合几乎只反映 A 路名次。",
          "排序偏斜",
          "data"
        ],
        [
          "补齐后再评",
          2,
          3,
          "FIX+EVAL",
          "为各路建索引并 Load，用评测集看融合效果。",
          "先测再上线",
          "check"
        ]
      ],
      "code": [
        "assert all(field.hasIndex and field.loaded for field in hybridFields)",
        "return hybrid_search(...)"
      ]
    }
  },
  {
    "group": 0,
    "id": "filtered-search",
    "title": "过滤检索 · Bitset",
    "en": "FILTERED SEARCH · BITSET",
    "summary": "标量 filter 生成 bitset，与删除/时间可见性掩码求交后，再在幸存行上做 ANN 或迭代过滤。教学对照 pre-filter 直觉与 iterative filtering。",
    "nodes": [
      "查询 + Filter",
      "Filter Bitset",
      "删除/时间掩码",
      "ANN 候选"
    ],
    "steps": [
      [
        "解析过滤表达式",
        0,
        1,
        "EVAL FILTER",
        "布尔表达式落到标量索引/扫描，得到 filter_bitset。",
        "属性掩码就绪",
        "request"
      ],
      [
        "与删除掩码求交",
        1,
        2,
        "AND DEL",
        "去掉已删且在读快照下不可见的行。",
        "可计算行集",
        "check"
      ],
      [
        "向量检索",
        2,
        3,
        "ANN ON MASK",
        "在掩码约束下检索（或迭代过滤：先向量再滤）。",
        "候选生成",
        "data"
      ],
      [
        "返回 TopK",
        3,
        0,
        "TOPK",
        "对幸存候选精排返回；复杂 filter 可能走 iterative 路径。",
        "过滤后近邻",
        "data"
      ]
    ],
    "principle": "过滤检索的本质是 bitset 与 ANN 的协同，不是「先全库 ANN 再偶然滤一下」的默认保证。",
    "tradeoff": "高选择性 filter 宜尽早剪枝；极复杂表达式可能更适合 iterative filtering，但迭代有延迟风险。",
    "pitfall": "漏写 Partition Key 条件会导致跨分区全扫；filter 与 delete bitset 语义以文档为准，勿与 SQL WHERE 一一等同。",
    "code": [
      "filter_bs = eval(expr)",
      "alive = filter_bs AND NOT del_bs AND visible(ts)",
      "cands = ann(q, mask=alive)  # or iterative_filter(ann, expr)",
      "return topK(cands)"
    ],
    "sources": [
      "filtered_search",
      "bitset",
      "index_overview"
    ],
    "related": [
      "vector-index",
      "delete-upsert-bitset",
      "partition-key",
      "timetravel"
    ],
    "fault": {
      "name": "过滤过宽 · 几乎全扫",
      "nodes": [
        "松散 Filter",
        "巨大 Bitset",
        "ANN",
        "延迟尖刺"
      ],
      "steps": [
        [
          "极宽条件",
          0,
          1,
          "WEAK FILTER",
          "filter 几乎为真，掩码接近全 1。",
          "剪枝失效",
          "request"
        ],
        [
          "候选爆炸",
          1,
          2,
          "HUGE SET",
          "ANN/标量路径近似全段扫描。",
          "代价≈无过滤",
          "data"
        ],
        [
          "延迟升高",
          2,
          3,
          "LATENCY",
          "尾延迟与 CPU 飙升。",
          "体验变差",
          "lost"
        ],
        [
          "收紧或分区",
          0,
          0,
          "TIGHTEN",
          "加 Partition Key / 聚类键 / 更有选择性谓词。",
          "恢复剪枝",
          "local"
        ]
      ],
      "code": [
        "if selectivity(expr) < gate:",
        "  prefer partition_key_or_clustering(expr)"
      ]
    }
  },
  {
    "group": 3,
    "id": "compaction-clustering",
    "title": "Compaction / Clustering",
    "en": "COMPACTION · CLUSTERING",
    "summary": "密封后小段由 DataNode 合并；Clustering Compaction 按聚类键重排实体并维护 PartitionStats，使带键过滤的检索可剪枝到少数段。教学模型。",
    "nodes": [
      "MixCoord",
      "DataNode",
      "小段 / 重排段",
      "PartitionStats"
    ],
    "steps": [
      [
        "触发 Compaction",
        0,
        1,
        "SCHEDULE",
        "MixCoord 把合并/聚类任务下发给 DataNode（自动或手动）。",
        "任务已派发",
        "control"
      ],
      [
        "合并或重排",
        1,
        2,
        "REWRITE",
        "普通 compaction 合并小段；clustering 按聚类键把相近值写入同段。",
        "新段落对象存储",
        "data"
      ],
      [
        "更新统计",
        1,
        3,
        "PARTITIONSTATS",
        "聚类后更新全局 PartitionStats：键值范围 ↔ 段映射。",
        "剪枝索引就绪",
        "data"
      ],
      [
        "查询剪枝",
        3,
        0,
        "PRUNE",
        "带聚类键条件的 search/query 只扫相关段。",
        "搜索范围缩小",
        "check"
      ]
    ],
    "principle": "Compaction 回收空洞并整形布局；Clustering 把「过滤键局部性」写进段分布。",
    "tradeoff": "重写段消耗 IO/CPU，期间可能放大存储；过度频繁 compaction 得不偿失。",
    "pitfall": "未设聚类键或查询不带该键，就得不到剪枝；不要把 clustering 当成通用「自动变快」开关。",
    "code": [
      "job = mixCoord.compact(collection, clustering=True)",
      "dataNode.rewriteSegments(by=clusteringKey)",
      "partitionStats.update(segmentRanges)",
      "search(expr on key) -> only mapped segments"
    ],
    "sources": [
      "clustering_compaction",
      "force_merge",
      "arch_overview"
    ],
    "related": [
      "segment-lifecycle",
      "filtered-search",
      "storage-v3",
      "delete-upsert-bitset"
    ],
    "fault": {
      "name": "Compaction 堆积",
      "nodes": [
        "写入压力",
        "任务队列",
        "DataNode",
        "小段爆炸"
      ],
      "steps": [
        [
          "密封过快",
          0,
          1,
          "SEAL BURST",
          "大量小段进入待合并队列。",
          "队列变长",
          "data"
        ],
        [
          "Worker 跟不上",
          1,
          2,
          "SLOW JOB",
          "DataNode 资源不足，compaction 滞后。",
          "重写延迟",
          "lost"
        ],
        [
          "小段仍很多",
          2,
          3,
          "FRAGMENT",
          "查询仍扫过多段，延迟升高。",
          "剪枝未兑现",
          "check"
        ],
        [
          "扩容或降频密封",
          0,
          0,
          "TUNE",
          "加 DataNode、调密封策略或手动 force compact。",
          "恢复整形",
          "local"
        ]
      ],
      "code": [
        "if pending_compactions > budget:",
        "  alert('compaction_backlog'); scale_data_nodes()"
      ]
    }
  },
  {
    "group": 1,
    "id": "partition-key",
    "title": "Partition Key 路由",
    "en": "PARTITION KEY ROUTING",
    "summary": "指定标量字段为 Partition Key 后，集合内自动维护固定数量分区；写入按 hash(key)%N 落入分区，检索带该键 filter 时只扫命中分区。用于多租户与剪枝。教学模型。",
    "nodes": [
      "写入实体",
      "Hash 路由",
      "目标分区",
      "带键检索"
    ],
    "steps": [
      [
        "声明 Partition Key",
        0,
        0,
        "SCHEMA",
        "建表时标记标量字段为 Partition Key，并设定 partitions_num。",
        "分区池已建",
        "local"
      ],
      [
        "写入哈希落点",
        0,
        1,
        "HASH KEY",
        "insert 时用键值哈希并对分区数取模。",
        "路由函数确定",
        "control"
      ],
      [
        "落入分区",
        1,
        2,
        "INSERT PART",
        "实体写入对应分区的段/流式路径。",
        "数据已隔离落点",
        "data"
      ],
      [
        "检索剪枝",
        3,
        2,
        "FILTER KEY",
        "search 带 Partition Key 条件时只扫描匹配分区。",
        "搜索范围缩小",
        "check"
      ]
    ],
    "principle": "Partition Key 用固定分区池换「按键隔离 + 检索剪枝」，突破手工分区数量与运维负担。",
    "tradeoff": "键分布不均可致热点分区；漏写键条件则退化为多分区扫描。",
    "pitfall": "手工 manage-partitions 与 Partition Key 是两条路，不要混用心智模型；检索 filter 必须能落到 Partition Key 才有剪枝。",
    "code": [
      "part_id = hash(entity[partition_key]) % partitions_num",
      "insert_into(partition=part_id, entity)",
      "search(filter=f\"{partition_key} == x\")  # prune to parts"
    ],
    "sources": [
      "partition_key",
      "manage_partitions",
      "filtered_search"
    ],
    "related": [
      "filtered-search",
      "insert-path",
      "hybrid-search-rrf",
      "compaction-clustering"
    ],
    "fault": {
      "name": "漏写键条件 · 全分区扫",
      "nodes": [
        "查询",
        "无键 Filter",
        "全部分区",
        "延迟"
      ],
      "steps": [
        [
          "检索未带键",
          0,
          1,
          "NO KEY FILTER",
          "业务 filter 未包含 Partition Key。",
          "无法剪枝",
          "request"
        ],
        [
          "扫过所有分区",
          1,
          2,
          "SCAN ALL",
          "计划覆盖分区池全部成员。",
          "范围≈全集",
          "data"
        ],
        [
          "延迟尖刺",
          2,
          3,
          "LATENCY",
          "多租户场景被放大。",
          "体验变差",
          "lost"
        ],
        [
          "强制带键",
          0,
          0,
          "REQUIRE KEY",
          "API/网关要求查询必须带租户键。",
          "恢复剪枝",
          "local"
        ]
      ],
      "code": [
        "if partition_key not in filter:",
        "  raise MissingPartitionKeyFilter"
      ]
    }
  },
  {
    "group": 3,
    "id": "storage-v3",
    "title": "Storage V3（3.0）",
    "en": "STORAGE V3 · MANIFEST",
    "summary": "Milvus 3.0 的版本化存储布局：Manifest 描述集合数据，支持 parquet/vortex 等列存，并为 Snapshot、External Collection 等能力奠基。默认关闭，启用后新写与 compaction 输出走 V3。教学模型。",
    "nodes": [
      "配置开关",
      "DataNode 写入",
      "Manifest",
      "Query / Snapshot"
    ],
    "steps": [
      [
        "启用 Storage V3",
        0,
        0,
        "ENABLE",
        "打开 common.storage.useLoonFFI 等开关后生效；旧数据仍可读直至被重写。",
        "双布局共存",
        "local"
      ],
      [
        "新写用 V3",
        0,
        1,
        "WRITE V3",
        "新写入与 compaction 输出按 dataNode.storage.format（默认 parquet）落列存。",
        "段文件更新",
        "data"
      ],
      [
        "生成 Manifest",
        1,
        2,
        "MANIFEST",
        "Manifest 独立描述数据文件集合，解耦物理格式。",
        "版本化视图",
        "control"
      ],
      [
        "上游能力接通",
        2,
        3,
        "CONSUME",
        "查询、Snapshot、外表等按 Manifest 定位文件。",
        "特性可用",
        "check"
      ]
    ],
    "principle": "Storage V3 先解决「数据如何随 schema/外表演化」，不是默认的性能银弹。",
    "tradeoff": "启用后迁移依赖 compaction 重写；格式（parquet vs vortex）需基准测试再选。",
    "pitfall": "未启用 Storage V3 时不要假设 Snapshot/External Collection 等依赖特性已可用；协调器重启后的 flush 布局冲突见 release notes。",
    "code": [
      "if useLoonFFI:",
      "  files = dataNode.flush(format=parquet|vortex)",
      "  manifest.bind(files, schemaVersion)",
      "reader.open(manifest)  # QN / snapshot / external"
    ],
    "sources": [
      "storage_v3",
      "arch_overview",
      "upgrade_30"
    ],
    "related": [
      "snapshots",
      "compaction-clustering",
      "segment-lifecycle",
      "tiered-storage"
    ],
    "fault": {
      "name": "布局冲突 · flush 失败",
      "nodes": [
        "DataNode",
        "旧布局预期",
        "V3 Manifest",
        "MixCoord"
      ],
      "steps": [
        [
          "开关刚切换",
          0,
          0,
          "TOGGLE",
          "集群部分节点仍按旧布局假设 flush。",
          "认知分裂",
          "local"
        ],
        [
          "写路径冲突",
          0,
          1,
          "LAYOUT CLASH",
          "flush 发现与预期布局不一致。",
          "任务失败",
          "reject"
        ],
        [
          "Manifest 未更新",
          1,
          2,
          "STALE META",
          "可读视图短暂不一致。",
          "特性半可用",
          "lost"
        ],
        [
          "统一版本再重试",
          3,
          0,
          "ALIGN",
          "按官方升级/配置对齐后重跑 compaction/flush。",
          "布局一致",
          "control"
        ]
      ],
      "code": [
        "assert all_nodes.storageFlag == expected",
        "retry_flush_or_compact()"
      ]
    }
  },
  {
    "group": 3,
    "id": "tiered-storage",
    "title": "Tiered Storage · 冷热",
    "en": "TIERED STORAGE · CACHE",
    "summary": "相对全量 Load：QueryNode 先只缓存元数据，字段与索引按需拉取，并可驱逐本地缓存而不删远端对象。文档常写 2.6.4+，3.0 文档树仍收录。教学模型。",
    "nodes": [
      "Load 请求",
      "QueryNode 元数据",
      "按需拉字段/索引",
      "驱逐缓存"
    ],
    "steps": [
      [
        "元数据优先 Load",
        0,
        1,
        "LOAD META",
        "Load 时缓存 schema、chunk map、远端引用等小元数据。",
        "可发现即可服务",
        "data"
      ],
      [
        "首查按需拉取",
        1,
        2,
        "FETCH CHUNK",
        "命中冷数据时按 chunk/索引粒度从对象存储拉取并缓存。",
        "缓存填充",
        "request"
      ],
      [
        "服务检索",
        2,
        1,
        "SEARCH",
        "后续命中走本地缓存；未命中再回源。",
        "热数据加速",
        "check"
      ],
      [
        "驱逐保容量",
        1,
        3,
        "EVICT",
        "内存/盘压力下驱逐字段缓存；远端对象仍在。",
        "容量让给更热数据",
        "control"
      ]
    ],
    "principle": "Tiered 把「可服务」与「全量驻留」拆开，用缓存换更大集合与更快 Load。",
    "tradeoff": "首查/冷查询可能尖刺；分析型、超大集合更受益，极低延迟在线检索需 Warm Up。",
    "pitfall": "文档版本写 2.6.4+ 时，教学按「引入自 2.6.4，3.0 沿用」旁注；驱逐≠删除集合数据。",
    "code": [
      "qn.load(segment, mode=metadata_only)",
      "on_query:",
      "  if not cache.has(chunk): cache.put(fetch(object_store, chunk))",
      "  if memory.pressure: cache.evict(lru)"
    ],
    "sources": [
      "tiered_storage",
      "warm_up",
      "load_release"
    ],
    "related": [
      "load-release",
      "query-node",
      "storage-v3",
      "segment-lifecycle"
    ],
    "fault": {
      "name": "冷查询延迟尖刺",
      "nodes": [
        "突发查询",
        "空缓存",
        "对象存储",
        "用户"
      ],
      "steps": [
        [
          "冷段被打中",
          0,
          1,
          "COLD HIT",
          "长时间未访问的字段/索引不在缓存。",
          "需回源",
          "request"
        ],
        [
          "回源拉取",
          1,
          2,
          "GET OBJECT",
          "对象存储延迟叠加，首查变慢。",
          "尾延迟升高",
          "lost"
        ],
        [
          "用户感知超时",
          2,
          3,
          "TIMEOUT",
          "无 Warm Up 时尖刺被放大。",
          "体验差",
          "reject"
        ],
        [
          "预热关键段",
          1,
          1,
          "WARM UP",
          "对热点集合/字段做 warm-up，再迎流量。",
          "尖刺收敛",
          "local"
        ]
      ],
      "code": [
        "warm_up(collection, fields=hot)",
        "search(...)  # fewer cold fetches"
      ]
    }
  },
  {
    "group": 3,
    "id": "snapshots",
    "title": "Snapshot 创建 / Pin / Restore",
    "en": "SNAPSHOTS · 3.0",
    "summary": "Snapshot 是集合在某时间点的轻量镜像：主要存元数据与 Manifest 引用，不复制整库向量。适合短中期回滚/版本化；长周期灾备仍用 Backup。依赖 Storage V3 能力面。教学模型。",
    "nodes": [
      "集合",
      "Flush / Manifest",
      "Snapshot 元数据",
      "Restore 新集合"
    ],
    "steps": [
      [
        "对齐时间点",
        0,
        1,
        "FLUSH",
        "创建前使相关段状态进入可引用的 Manifest 视图。",
        "点时视图就绪",
        "control"
      ],
      [
        "写入 Snapshot",
        1,
        2,
        "CREATE SNAP",
        "记录 schema/索引路径/段 Manifest 引用到 snapshot 元数据（如 JSON+Avro）。",
        "轻量镜像已存",
        "data"
      ],
      [
        "Pin 防回收",
        2,
        2,
        "PIN",
        "Pin 防止底层文件被生命周期任务过早回收。",
        "引用受保护",
        "local"
      ],
      [
        "Restore",
        2,
        3,
        "RESTORE",
        "从 snapshot 恢复为新集合（或文档所述目标），再 Load 使用。",
        "时间点可重现",
        "data"
      ]
    ],
    "principle": "Snapshot 引用而非复制数据文件；快 ≠ 可替代独立 Backup。",
    "tradeoff": "创建极快、存储开销小，但不防对象存储整体损坏；保留窗口通常是天到周级。",
    "pitfall": "未提交 Storage V3 的段可能无法被正确快照（见 release notes）；Unpin 后文件可能被回收导致 Restore 失败。",
    "code": [
      "flush(collection)",
      "snap = create_snapshot(collection, name)",
      "pin(snap)",
      "restore(snap) -> new_collection",
      "new_collection.load()"
    ],
    "sources": [
      "snapshots",
      "manage_snapshots",
      "storage_v3"
    ],
    "related": [
      "storage-v3",
      "segment-lifecycle",
      "compaction-clustering",
      "load-release"
    ],
    "fault": {
      "name": "未 Pin · 引用失效",
      "nodes": [
        "Snapshot",
        "生命周期 GC",
        "缺失对象",
        "Restore"
      ],
      "steps": [
        [
          "创建后未 Pin",
          0,
          0,
          "NO PIN",
          "仅创建快照，未固定引用。",
          "可被回收",
          "local"
        ],
        [
          "底层文件回收",
          0,
          1,
          "GC",
          "compaction/TTL 等回收了仍被引用的对象。",
          "引用悬空",
          "lost"
        ],
        [
          "Restore 失败",
          1,
          3,
          "RESTORE FAIL",
          "Manifest 指向的文件不存在。",
          "无法恢复",
          "reject"
        ],
        [
          "Pin + 保留策略",
          0,
          0,
          "PIN POLICY",
          "对需要保留的 snapshot 显式 Pin，并设保留窗口。",
          "引用可还原",
          "local"
        ]
      ],
      "code": [
        "snap = create_snapshot(coll)",
        "pin(snap)  # required for retention window",
        "restore(snap)"
      ]
    }
  },
  {
    "group": 2,
    "id": "cdc-replication",
    "title": "CDC 主备复制与 Failover",
    "en": "CDC · PRIMARY / STANDBY",
    "summary": "Milvus CDC 把主集群 WAL 变更复制到备集群，构成跨集群灾备；备可读。Failover 在主不可用时提升备，可用性优先，可能丢失尚未复制的写入。对照集群内 replica。教学模型。",
    "nodes": [
      "Primary 集群",
      "CDC Node",
      "Standby 集群",
      "应用流量"
    ],
    "steps": [
      [
        "主接受写入",
        0,
        1,
        "WAL CHANGE",
        "Primary 接受读写；CDC 读取其 WAL 变更流。",
        "变更被捕获",
        "data"
      ],
      [
        "复制到备",
        1,
        2,
        "REPLICATE",
        "CDC 把变更应用到 Standby；备侧通常只读。",
        "备落后 ≤ lag",
        "data"
      ],
      [
        "备可服务读",
        2,
        3,
        "READ TRAFFIC",
        "应用可将读流量打到备，降低主负载。",
        "读扩容/就近",
        "request"
      ],
      [
        "计划内切换",
        0,
        2,
        "SWITCHOVER",
        "主仍可达时用 Switchover，尽量避免丢数（对照 Failover）。",
        "角色对调",
        "control"
      ]
    ],
    "principle": "CDC 解决跨集群复制；集群内 QueryNode replica 解决单集群查询 HA——两层不要混用。",
    "tradeoff": "复制 lag 决定 Failover 丢数窗口；多备增加资源与拓扑复杂度。",
    "pitfall": "Failover 不等待旧主，未复制写入可能丢失；主仍可达时应优先 Switchover。CDC 节点需部署在可能升主的集群上。",
    "code": [
      "cdc.replicate(source=primary, target=standby)",
      "# planned:",
      "switchover(primary, standby)  # prefer when primary alive",
      "# emergency:",
      "failover(standby)  # may lose unreplicated writes"
    ],
    "sources": [
      "cdc_overview",
      "cdc_failover",
      "cdc_setup"
    ],
    "related": [
      "replica-failover",
      "insert-path",
      "streaming-woodpecker",
      "mixcoord-meta"
    ],
    "fault": {
      "name": "Failover · 丢未复制写",
      "nodes": [
        "故障 Primary",
        "CDC Lag",
        "新 Primary(备)",
        "客户端"
      ],
      "steps": [
        [
          "主完全不可用",
          0,
          0,
          "PRIMARY DOWN",
          "旧主无法响应，无法做 Switchover。",
          "写入口中断",
          "local"
        ],
        [
          "存在复制落后",
          0,
          1,
          "LAG > 0",
          "部分 WAL 变更尚未到达备。",
          "窗口内数据在途",
          "lost"
        ],
        [
          "提升备为新主",
          1,
          2,
          "FAILOVER",
          "可用性优先：备升主并接受新写。",
          "写恢复",
          "control"
        ],
        [
          "客户端感知丢数",
          2,
          3,
          "DATA LOSS?",
          "未复制写入可能永久丢失；需业务幂等与对账。",
          "RPO > 0",
          "reject"
        ]
      ],
      "code": [
        "if primary.unreachable and rto_critical:",
        "  promote(standby)  # accept RPO = cdc_lag",
        "else:",
        "  switchover(...)"
      ]
    }
  }
];
