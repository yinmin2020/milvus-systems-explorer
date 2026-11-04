// Audited teaching content for Milvus Systems Explorer (MVP).
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
  }
};
const GROUPS = [
  {
    "id": "dataplane",
    "name": "数据面与检索性能",
    "en": "DATA PLANE & SEARCH",
    "color": "#00A1EA",
    "question": "段如何生长密封、索引如何加速、Streaming/Query 如何归并？"
  },
  {
    "id": "write_consistency",
    "name": "写入与一致性",
    "en": "WRITE PATH & CONSISTENCY",
    "color": "#0077B6",
    "question": "3.0 写入如何进 WAL，时间戳如何决定可见性，四级一致性差在哪？"
  },
  {
    "id": "control_ha",
    "name": "控制面与高可用",
    "en": "CONTROL PLANE & HA",
    "color": "#0284C7",
    "question": "MixCoord 与 etcd 管什么，副本与 Streaming 故障时查询如何继续？"
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
      "query-node"
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
      "insert-path"
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
      "replica-failover"
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
      "mixcoord-meta"
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
      "mixcoord-meta"
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
      "query-node"
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
      "replica-failover"
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
      "segment-lifecycle"
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
  }
];
