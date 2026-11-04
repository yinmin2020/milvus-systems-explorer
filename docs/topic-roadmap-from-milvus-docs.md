# Milvus Systems Explorer — 主题扩展路线图（基于 milvus-docs）

> 扫描源：`https://github.com/milvus-io/milvus-docs` 浅克隆于 `/workspace/milvus-docs-scan`  
> 默认分支 / 版本树：`v3.0.x`（`version.json`: `"version": "v3.0.x", "released": "yes"`）  
> 内容根：`site/en/`（约 520+ 篇 `.md`）  
> 站点目标：让新手与熟手都能通过 IsoKit 交互图解快速理解机制，减少对长文档的依赖  
> 已上线 MVP（8）：`segment-lifecycle` · `vector-index` · `query-node` · `insert-path` · `timetravel` · `consistency-levels` · `mixcoord-meta` · `replica-failover`  
> 生成日期：2026-11-03（America/Anguilla）

---

## 1. 文档树与版本说明

### 1.1 分支与目录

| 项 | 现状 |
| --- | --- |
| 主文档分支 | `v3.0.x`（另有并行 `v2.6.x`、`v2.5.x`…；`master` 仍存在） |
| 英文内容 | `site/en/{about,getstarted,reference,userGuide,adminGuide,integrations,tutorials,faq,embeddings,rerankers,aiTools}/` |
| 菜单 | `site/en/menuStructure/en.json` |
| milvus.io URL 约定 | 多数页面为 `https://milvus.io/docs/<id>`，其中 `<id>` = frontmatter `id`（常带 `.md` 后缀，如 `architecture_overview.md`） |

### 1.2 版本命名偏斜（务必在图解旁注明）

官方 `v3.0.x` 文档里仍有多处 **2.x / 旧组件名** 残留，图解文案应以 **Milvus 3.0 教学基线** 为准，文档当「来源」而非逐字照抄：

| 现象 | 例 |
| --- | --- |
| 架构图资产名仍写 2.6 | `architecture_overview.md` 配图 `milvus_architecture_2_6.png` |
| Woodpecker 简介写「Milvus 2.6」 | `woodpecker_architecture.md` summary / 正文 |
| Tiered Storage 写「2.6.4+」 | `architecture_overview.md`、`tiered-storage-overview.md` |
| 文档称 **Coordinator**；Release Notes / 本站 MVP 称 **MixCoord** | 架构页统一说 Coordinator；`release_notes.md` 明确 MixCoord |
| 配置参考仍保留 Root/Query/Data/Index Coord & IndexNode | `reference/sys_config/configure_rootcoord.md` 等 |
| Coordinator HA 示例仍是 RootCoord + milvus:v2.2.3 | `reference/coordinator_ha.md` |

**教学口径（与现有 MVP 一致）**：MixCoord（单一活跃协调器）· Streaming Node · QueryNode / DataNode · WAL=Woodpecker 或 Pulsar/Kafka · etcd + Object Storage；IndexNode 职责已并入 DataNode。

### 1.3 IsoKit 适配判定（Fit）

| Fit | 含义 |
| --- | --- |
| **mechanism demo** | 适合 主流程 4 步 + 故障/边界 4 步（IsoKit 主菜） |
| **knowledge-map-only** | 适合总览/对照/选型地图；可做轻量场景，但不强行故障戏 |
| **reference card** | 只做卡片/外链「来源」，不值得 IsoKit 场景 |

---

## 2. 已覆盖 MVP（对照，勿重复造轮）

| ID | 中文标题 | 主要文档来源 | 关系 |
| --- | --- | --- | --- |
| `segment-lifecycle` | 段生命周期与密封 | `data_processing.md`, `architecture_overview.md` | 基线 |
| `vector-index` | 向量索引检索路径 | `index-explained.md`, `knowhere.md`, indexes/* | 基线 |
| `query-node` | 查询归并 · SN + QN | `architecture_overview.md`（Search flow）, `streaming_service.md` | 基线 |
| `insert-path` | 写入路径 · WAL | `data_processing.md`, insert-and-delete/* | 基线 |
| `timetravel` | 时间戳与可见性 | `timestamp.md`, `time_sync.md`, `bitset.md` | 基线 |
| `consistency-levels` | 四级一致性行为 | `tune_consistency.md` | 基线 |
| `mixcoord-meta` | MixCoord 与元数据 | `architecture_overview.md` Layer2, `main_components.md` | 基线；文档多写 Coordinator |
| `replica-failover` | 副本与故障切换 | `replica.md`, `coordinator_ha.md`（需纠偏旧名） | 基线 |

---

## 3. 候选主题总表（MVP 之外 ≈ 32）

图例：受众 = 新手 / 熟手 / 两者；Overlap = **new** / **extend:\<mvp-id\>**

### 3.1 Concepts / Architecture（优先补「脑中地图」）

#### A1 · `arch-four-layers` · 四层架构与请求分流
- **Source**: `site/en/reference/architecture/architecture_overview.md`, `four_layers.md`, `main_components.md`  
  URL: https://milvus.io/docs/architecture_overview.md · https://milvus.io/docs/four_layers.md · https://milvus.io/docs/main_components.md
- **Why diagrams**: Access / Coordinator / Workers / Storage 分层 + DDL vs DML vs DQL 分流表可做成路径动画；故障可做 Proxy 缓存失效找 Coordinator
- **Audience**: 两者（新手入口） · **Priority**: **P0** · **Fit**: knowledge-map-only（可加 1 条轻量 request-path demo）
- **Overlap**: extend:`mixcoord-meta`,`query-node`,`insert-path`（总览串联，不重复细讲）

#### A2 · `streaming-woodpecker` · Streaming Service 与 Woodpecker WAL
- **Source**: `streaming_service.md`, `woodpecker_architecture.md`, `adminGuide/woodpecker.md`  
  URL: https://milvus.io/docs/streaming_service.md · https://milvus.io/docs/woodpecker_architecture.md · https://milvus.io/docs/woodpecker.md
- **Why diagrams**: WAL 追加 → SN 消费 → Growing 查询 → Seal；Woodpecker zero-disk / 双部署模式对比；故障：SN 接管与 WAL 恢复
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`insert-path`（把 WAL 实现从「黑盒」打开）  
- **Version note**: 文档仍写「Woodpecker in Milvus 2.6」→ 图解标注「3.0 仍为默认/推荐 WAL 之一」

#### A3 · `storage-v3` · Storage V3 列存与 Manifest
- **Source**: `storage-v3.md`（及 release notes 中 Storage V3 条目）  
  URL: https://milvus.io/docs/storage-v3.md
- **Why diagrams**: 格式/manifest/启用条件；故障：coordinator 重启后 flush 布局冲突（release notes 真实故障很适合 4-step fault）
- **Audience**: 熟手 · **P0** · **Fit**: mechanism demo
- **Overlap**: new（与 segment-lifecycle 衔接：sealed 段存储形态）

#### A4 · `coordinator-ha` · MixCoord 主备与切换
- **Source**: `coordinator_ha.md`, `main_components.md`, release notes（MixCoord rolling upgrade）  
  URL: https://milvus.io/docs/coordinator_ha.md
- **Why diagrams**: active-standby 状态机；故障：etcd 抖动 / 滚动升级 Terminating
- **Audience**: 熟手 · **P1** · **Fit**: mechanism demo
- **Overlap**: extend:`mixcoord-meta`,`replica-failover`  
- **Version note**: 文档示例仍 RootCoord/v2.2.3 → 必须改写为 MixCoord

#### A5 · `data-plane-batch` · DataNode：索引构建与 Compaction 调度
- **Source**: `data_processing.md`（index building）, `architecture_overview.md` Historical Data Management  
  URL: https://milvus.io/docs/data_processing.md
- **Why diagrams**: Seal 后任务下发 → DataNode 建索引/合并 → Object Storage → QN 替换 Growing；故障：任务堆积/索引未就绪查询降级
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`segment-lifecycle`,`vector-index`

#### A6 · `knowhere-stack` · Knowhere 在检索栈中的位置
- **Source**: `knowhere.md`, `index-explained.md`  
  URL: https://milvus.io/docs/knowhere.md · https://milvus.io/docs/index-explained.md
- **Why diagrams**: QN → Knowhere → Faiss/HNSW/DiskANN 调用链；对比「索引选型」更偏知识地图
- **Audience**: 熟手 · **P2** · **Fit**: knowledge-map-only
- **Overlap**: extend:`vector-index`

---

### 3.2 User Guide — Collections / Schema / CRUD

#### U1 · `load-release` · Load / Release 与段装载
- **Source**: `userGuide/collections/load-and-release.md`  
  URL: https://milvus.io/docs/load-and-release.md
- **Why diagrams**: 未 Load 不可搜 → Coordinator 分配 → QN 拉取 segment/index → Loaded；故障：半加载、Release 后 mmap 配置变更
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`query-node`,`segment-lifecycle`

#### U2 · `partition-key` · Partition / Partition Key 路由
- **Source**: `manage-partitions.md`, `use-partition-key.md`, `multi_tenancy.md`  
  URL: https://milvus.io/docs/manage-partitions.md · https://milvus.io/docs/use-partition-key.md · https://milvus.io/docs/multi_tenancy.md
- **Why diagrams**: 写入按 key 落入分区 → 检索带 filter 剪枝；Isolation 模式对比；故障：漏写 partition key 导致全扫
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: new（与 multi-tenancy 策略地图可互链）

#### U3 · `delete-upsert-bitset` · Delete / Upsert 与 Bitset
- **Source**: `delete-entities.md`, `upsert-entities.md`, `bitset.md`  
  URL: https://milvus.io/docs/delete-entities.md · https://milvus.io/docs/upsert-entities.md · https://milvus.io/docs/bitset.md
- **Why diagrams**: 软删 bitset + Time Travel 交叉（文档自带 ts=150/250/350 例子，几乎可直接改编为 4 步）；Upsert=删+插路径
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`timetravel`,`insert-path`

#### U4 · `schema-mental-model` · Schema：主键 / 向量 / 标量 / Dynamic
- **Source**: `schema/schema.md`, `dense-vector.md`, `sparse_vector.md`, `enable-dynamic-field.md`, `primary-field.md`  
  URL: https://milvus.io/docs/schema.md 等
- **Why diagrams**: 字段类型决策树 +「为何必须有主键/向量维度」；不宜强行故障戏
- **Audience**: 新手 · **P1** · **Fit**: knowledge-map-only
- **Overlap**: new

#### U5 · `collection-ttl-alias` · TTL、Alias 与集合变更
- **Source**: `set-collection-ttl.md`, `manage-aliases.md`, `modify-collection.md`, `add-fields-to-an-existing-collection.md`  
  URL: https://milvus.io/docs/set-collection-ttl.md 等
- **Why diagrams**: Alias 切换零停机；TTL 触发清理与 compaction 联动；在线加字段
- **Audience**: 熟手 · **P2** · **Fit**: mechanism demo（偏运维）
- **Overlap**: extend:`segment-lifecycle`（TTL/compaction）

#### U6 · `bulk-import` · Bulk Import 路径
- **Source**: `data-import/import-data.md`, `prepare-source-data.md`, `idempotent-import.md`  
  URL: https://milvus.io/docs/import-data.md
- **Why diagrams**: 文件 → import job → DataNode/管道 → sealed；故障：幂等重试
- **Audience**: 熟手 · **P2** · **Fit**: mechanism demo
- **Overlap**: extend:`insert-path`

---

### 3.3 User Guide — Search / Index / Ranking

#### S1 · `hybrid-search-rrf` · 多向量混合检索与 RRF
- **Source**: `multi-vector-search.md`, `rrf-ranker.md`, `weighted-ranker.md`  
  URL: https://milvus.io/docs/multi-vector-search.md · https://milvus.io/docs/rrf-ranker.md
- **Why diagrams**: 多路 ANN → 局部 TopK → RRF/Weighted 归并；故障：权重失衡 / 某路字段未建索引
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`query-node`,`vector-index`

#### S2 · `filtered-search` · 标量过滤检索与 Bitset 协同
- **Source**: `filtered-search.md`, `boolean/boolean.md`, `bitset.md`, `scalar_index.md`  
  URL: https://milvus.io/docs/filtered-search.md · https://milvus.io/docs/bitset.md
- **Why diagrams**: filter → bitset → 与 delete bitset 求交 → ANN；对比 pre-filter / post-filter 直觉
- **Audience**: 两者 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`vector-index`,`timetravel`

#### S3 · `full-text-bm25` · 全文检索 · BM25 Function
- **Source**: `full-text-search.md`, `bm25-function.md`, `analyzer-overview.md`, `sparse-inverted-index.md`  
  URL: https://milvus.io/docs/full-text-search.md · https://milvus.io/docs/bm25-function.md
- **Why diagrams**: 文本 → analyzer → sparse → BM25 function → 检索；可与 hybrid 串联
- **Audience**: 两者 · **P1** · **Fit**: mechanism demo
- **Overlap**: new（可链到 `hybrid-search-rrf`）

#### S4 · `index-choice-map` · 索引选型地图（HNSW / IVF / DiskANN / GPU…）
- **Source**: `index-explained.md`, `indexes/floating-vector/*`, `gpu-index-overview.md`, `disk_index.md`, `gpu_index.md`  
  URL: https://milvus.io/docs/index-explained.md
- **Why diagrams**: 召回/延迟/内存三角对比；单索引页 API 表不适合逐个 IsoKit
- **Audience**: 两者 · **P1** · **Fit**: knowledge-map-only（单索引细节 → reference card）
- **Overlap**: extend:`vector-index`

#### S5 · `range-grouping-iter` · Range / Grouping / Iterator
- **Source**: `range-search.md`, `grouping-search.md`, `with-iterators.md`  
  URL: https://milvus.io/docs/range-search.md 等
- **Why diagrams**: 与普通 TopK 对照；Iterator 状态机适合轻 demo
- **Audience**: 熟手 · **P2** · **Fit**: knowledge-map-only / 轻 mechanism
- **Overlap**: extend:`query-node`

#### S6 · `analyzer-pipeline` · Analyzer / Tokenizer 流水线
- **Source**: `analyzer-overview.md`, tokenizer/*, filter/*  
  URL: https://milvus.io/docs/analyzer-overview.md
- **Why diagrams**: tokenize → filter 链；中英分词对比；单 filter 文档不适合 IsoKit
- **Audience**: 两者 · **P2** · **Fit**: knowledge-map-only
- **Overlap**: extend:`full-text-bm25`

---

### 3.4 User Guide — Storage optimization / 3.0 特性

#### T1 · `compaction-clustering` · Compaction 与 Clustering Compaction
- **Source**: `clustering-compaction.md`, `force-merge.md`, `data_processing.md`  
  URL: https://milvus.io/docs/clustering-compaction.md · https://milvus.io/docs/force-merge.md
- **Why diagrams**: 小段合并 / 按聚类键重排 → 过滤加速；故障：compaction 中查询一致性/暂时放大
- **Audience**: 熟手 · **P0** · **Fit**: mechanism demo
- **Overlap**: extend:`segment-lifecycle`

#### T2 · `tiered-storage` · Tiered Storage · Warm Up · Eviction
- **Source**: `tiered-storage-overview.md`, `warm-up.md`, `eviction.md`, `mmap.md`  
  URL: https://milvus.io/docs/tiered-storage-overview.md · https://milvus.io/docs/warm-up.md · https://milvus.io/docs/mmap.md
- **Why diagrams**: 元数据先加载 → 按需拉字段/索引 → 驱逐不删远端；故障：冷查询延迟尖刺
- **Audience**: 熟手 · **P1** · **Fit**: mechanism demo
- **Overlap**: extend:`query-node`,`load-release`  
- **Version note**: 文档写 2.6.4+；3.0 文档树仍收录 → 标注「自 2.6.4 引入，3.0 沿用」

#### T3 · `snapshots` · Snapshot 创建 / Pin / Restore
- **Source**: `snapshots.md`, `manage-snapshots.md`, `snapshot-use-cases.md`  
  URL: https://milvus.io/docs/snapshots.md · https://milvus.io/docs/manage-snapshots.md
- **Why diagrams**: flush → snapshot 解剖 → pin → restore 新集合；故障：未提交 Storage V3 段被快照（release notes）
- **Audience**: 两者 · **P1** · **Fit**: mechanism demo
- **Overlap**: new（强 3.0 卖点）

#### T4 · `external-collection` · External Collection / Lake 外表
- **Source**: `create-an-external-collection.md`, `alter-external-collection-schema.md`, `storage-v3.md`  
  URL: https://milvus.io/docs/create-an-external-collection.md
- **Why diagrams**: 湖表 → schema/index → refresh → 可检索；与普通 Collection 对照
- **Audience**: 熟手 · **P1** · **Fit**: mechanism demo
- **Overlap**: extend:`storage-v3`

#### T5 · `load-balance` · Query 负载均衡与 Segment 迁移
- **Source**: `load_balance.md`, `resource_group.md`（部分）  
  URL: https://milvus.io/docs/load_balance.md
- **Why diagrams**: 检查 segment → transfer；故障：均衡过程中服务视图抖动
- **Audience**: 熟手 · **P2** · **Fit**: mechanism demo
- **Overlap**: extend:`replica-failover`,`query-node`

---

### 3.5 Administration

#### D1 · `resource-group` · Resource Group 与多副本放置
- **Source**: `adminGuide/resource_group.md`  
  URL: https://milvus.io/docs/resource_group.md
- **Why diagrams**: RG 边界、扩缩容实践、与 replica 交互；故障：RG 资源不足无法 Load
- **Audience**: 熟手 · **P1** · **Fit**: mechanism demo
- **Overlap**: extend:`replica-failover`

#### D2 · `rbac-flow` · RBAC：用户 · 角色 · 特权组
- **Source**: `rbac.md`, `users_and_roles.md`, `grant_privileges.md`, `privilege_group.md`  
  URL: https://milvus.io/docs/rbac.md
- **Why diagrams**: 鉴权请求路径（Proxy 校验）；对比「特权组」打包；不宜做成纯 API 罗列
- **Audience**: 两者 · **P1** · **Fit**: knowledge-map-only + 短 mechanism
- **Overlap**: new

#### D3 · `scale-hpa` · 集群水平扩展与 HPA
- **Source**: `scaleout.md`, `hpa.md`, `scale-standalone.md`, `scale-dependencies.md`  
  URL: https://milvus.io/docs/scaleout.md · https://milvus.io/docs/hpa.md
- **Why diagrams**: 无状态 Worker 扩容 vs 有状态依赖；与 Streaming/QN 扩容差异
- **Audience**: 熟手 · **P2** · **Fit**: knowledge-map-only
- **Overlap**: extend:`arch-four-layers`

#### D4 · `mq-switch-woodpecker` · 消息队列切换到 Woodpecker
- **Source**: `switch-mq-type.md`, `switch-pulsar-woodpecker.md`, `switch-kafka-woodpecker.md`, `mqtype-overview.md`  
  URL: https://milvus.io/docs/switch-mq-type.md 等
- **Why diagrams**: 切换状态机；故障：切换后 QN 用不兼容位点重连（release notes 真实坑）
- **Audience**: 熟手 · **P2** · **Fit**: mechanism demo
- **Overlap**: extend:`streaming-woodpecker`,`insert-path`

#### D5 · `backup-restore` · Backup / Restore 数据流
- **Source**: `tools/milvus-backup/milvus_backup_overview.md` + common-cases/*  
  URL: https://milvus.io/docs/milvus_backup_overview.md
- **Why diagrams**: 备份对象与元数据一致性；跨 bucket 案例可做对照卡
- **Audience**: 熟手 · **P2** · **Fit**: knowledge-map-only / 轻 mechanism
- **Overlap**: new

#### D6 · `multi-tenancy-strategies` · 多租户四种策略对照
- **Source**: `multi_tenancy.md`, `manage_databases.md`  
  URL: https://milvus.io/docs/multi_tenancy.md
- **Why diagrams**: DB / Collection / Partition / Partition Key 隔离对比表动画化
- **Audience**: 两者 · **P1** · **Fit**: knowledge-map-only
- **Overlap**: extend:`partition-key`,`rbac-flow`

---

### 3.6 Tools / CDC / Get started（精选）

#### C1 · `cdc-replication` · CDC 主备复制与 Failover
- **Source**: `milvus_cdc_overview.md`, `set_up_cdc_replication.md`, `cdc_failover.md`, `cdc_switchover.md`  
  URL: https://milvus.io/docs/milvus_cdc_overview.md · https://milvus.io/docs/cdc_failover.md
- **Why diagrams**: Primary/Standby、lag、planned switchover vs failover；故障：数据丢失窗口
- **Audience**: 熟手 · **P1** · **Fit**: mechanism demo
- **Overlap**: extend:`replica-failover`（集群间 HA vs 集群内副本）

#### C2 · `deploy-modes` · Lite / Standalone / Distributed 选型
- **Source**: `getstarted/install-overview.md`, `main_components.md`, `about/overview.md`  
  URL: https://milvus.io/docs/install-overview.md
- **Why diagrams**: 部署形态对照 + 组件是否拆分；安装 click-ops 本身不做 IsoKit
- **Audience**: 新手 · **P1** · **Fit**: knowledge-map-only
- **Overlap**: extend:`arch-four-layers`

#### C3 · `request-path-ddl-dml-dql` · API 三类请求路径速览
- **Source**: `architecture_overview.md`（Data Flow and API Categories）  
  URL: https://milvus.io/docs/architecture_overview.md
- **Why diagrams**: 一张图讲清 create/insert/search 走哪类节点；极适合新手 5 分钟
- **Audience**: 新手 · **P0** · **Fit**: mechanism demo（可并入 A1，或独立短篇）
- **Overlap**: extend:`arch-four-layers`（若独立则 new 短主题）

---

### 3.7 Integrations / Tutorials / Embeddings（多数降级）

| 提议 | 建议 | 原因 |
| --- | --- | --- |
| `rag-pattern-map` · RAG 在 Milvus 中的位置 | **P2** knowledge-map-only | 教程/集成文过多；抽「ingest→embed→index→retrieve→rerank」一张图即可 |
| 单个 LangChain/LlamaIndex/云厂商 embedding 页 | **reference card** | 纯对接说明，无内部状态机 |
| Tutorials（图像检索、推荐系统等） | **来源链接** | 业务 demo，不是系统机制 |

---

## 4. 不适合 IsoKit 的文档（仅作「来源」外链）

| 类别 | 路径模式 | 原因 |
| --- | --- | --- |
| 纯 API / SDK 安装 | `getstarted/install_SDKs/*`, `using_milvusclient.md`, `aiTools/python_sdk.md` | 安装步骤与 API 表面 |
| 安装 click-ops | `getstarted/run-milvus-*/*`, `offline/*`, `with_gpu/*`, clouds/* 部署长文 | 命令/YAML 点击操作 |
| 系统配置百科 | `reference/sys_config/configure_*.md`（含遗留 RootCoord 等） | 参数表；无过程叙事 |
| 单索引参数页 | `userGuide/indexes/**` 绝大多数单页 | 参数/示例代码；用 `index-choice-map` 吸收 |
| Analyzer 单 filter/tokenizer | `schema/analyzer/filter/*`, `tokenizer/*` | 碎片参考 |
| Embedding/Reranker 供应商页 | `embeddings/*`, `rerankers/*`, `embedding-function/{openai,cohere,…}.md` | 密钥与调用示例 |
| 集成食谱 | `integrations/**`（除总览可做 RAG 地图） | 外部框架教程 |
| CLI 命令清单 | `tools/cli_commands.md`, Birdwatcher 安装指南 | 命令参考 |
| Benchmark / Limitations 罗列 | `benchmark.md`, `limitations.md`, `adopters.md` | 数字与名单 |
| FAQ 排障长列表 | `faq/*` | 可链到机制主题的「故障步」，本身不做图解主文 |
| Release notes | `release_notes.md` | 作 fault 灵感来源，不当主题 |

---

## 5. Phase 2 推荐集（10 题）— 最能缩小「还得翻文档」缺口

目标：新手建立全局地图 + 写读删搜闭环；熟手补齐 3.0 存储/运维机制。建议仍保持「每题 2 场景 × 4 步」。

| # | ID | 中文标题 | Pri | Fit | 主要补齐缺口 | Overlap |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `arch-four-layers` | 四层架构与请求分流 | P0 | knowledge-map + 轻 demo | 新手总地图；串起现有 8 题 | extend 多题 |
| 2 | `streaming-woodpecker` | Streaming · Woodpecker WAL | P0 | mechanism | 打开 insert-path 的 WAL 黑盒 | extend:`insert-path` |
| 3 | `load-release` | Load / Release 与段装载 | P0 | mechanism | 用户侧「为何搜不到」第一课 | extend:`query-node` |
| 4 | `delete-upsert-bitset` | Delete / Upsert · Bitset | P0 | mechanism | 写路径闭环 + 与 timetravel 交叉 | extend:`timetravel` |
| 5 | `hybrid-search-rrf` | 混合检索与 RRF | P0 | mechanism | 最高频检索模式，替代翻 userGuide | extend:`query-node` |
| 6 | `filtered-search` | 过滤检索与 Bitset | P0 | mechanism | 标量+向量联合，文档最长之一 | extend:`vector-index` |
| 7 | `compaction-clustering` | Compaction / Clustering | P0 | mechanism | 段生命周期后半段 | extend:`segment-lifecycle` |
| 8 | `partition-key` | Partition Key 路由 | P0 | mechanism | 多租户与剪枝，熟手刚需 | new |
| 9 | `storage-v3` | Storage V3 与 Manifest | P0 | mechanism | **3.0 差异化**；文档新、易懵 | new |
| 10 | `tiered-storage` | Tiered Storage · 冷热加载 | P1 | mechanism | 熟手性能/内存；可与 mmap 合并讲 | extend:`load-release` |

**Phase 2 候补（挤掉谁就上谁）**：`snapshots`（3.0）、`cdc-replication`、`external-collection`、`resource-group`、`full-text-bm25`、`deploy-modes`。

若 Phase 2 可扩到 **12** 题：在上表后追加 **`snapshots`** + **`cdc-replication`**（分别覆盖 3.0 数据面与跨集群 HA）。

---

## 6. 建议实施顺序（内容生产）

1. **地图先行**：`arch-four-layers`（+ 可选短篇 `request-path-ddl-dml-dql` 并入同页第二场景）  
2. **读写闭环**：`load-release` → `delete-upsert-bitset` → `filtered-search` → `hybrid-search-rrf`  
3. **数据面加深**：`streaming-woodpecker` → `compaction-clustering` → `storage-v3` → `tiered-storage`  
4. **多租户 / 路由**：`partition-key`（再链 `multi-tenancy-strategies` 知识卡）  
5. **Phase 3**：snapshots · external-collection · cdc · resource-group · rbac · full-text-bm25 · mq-switch

每题页脚保留官方「来源」链接（上表 Source/URL）；遇到 2.6 文案在旁注 **「文档版本偏斜 → 本站按 Milvus 3.0 / MixCoord 表述」**。

---

## 7. 计数汇总

| 项 | 数量 |
| --- | --- |
| 已扫描分支 | `v3.0.x` |
| `site/en` Markdown（约） | ~522 |
| MVP 已上线 | **8** |
| 本路线图图解候选（MVP 之外） | **32**（§3 编号主题；不含纯 reference-card 降级项） |
| 其中 P0 | **12**（含可并入 A1 的 C3） |
| 其中 P1 | **11** |
| 其中 P2 | **9** |
| Phase 2 强烈推荐 | **10**（可扩 12） |
| 明确不建议 IsoKit、仅外链 | §4 整表 |

---

## 8. 本地产物

- 文档扫描目录：`/workspace/milvus-docs-scan`（`v3.0.x` shallow clone）  
- 本路线图：`/workspace/milvus_systems_explorer/docs/topic-roadmap-from-milvus-docs.md`  
- **未**推送到 GitHub（按任务要求仅写本地仓库文件）
