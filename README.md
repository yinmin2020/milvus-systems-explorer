# Milvus Systems Explorer / Milvus 系统设计

面向 **Milvus 3.0 GA** 的中文交互式系统设计探索（MVP）。复用 [kejun/cs-systems-design](https://github.com/kejun/cs-systems-design) 的站点壳层与 IsoKit 机制演示引擎，课程内容为原创的 Milvus 教学整理。

A Chinese interactive Milvus **3.0** systems teaching site (MVP). Shell/engine from Systems Explorer; course content is original Milvus material.

## 在线地址 / Pages

站点：<https://yinmin2020.github.io/milvus-systems-explorer/>

当前通过 **`gh-pages` 分支根目录**（从 `dist/` 发布）部署。Actions 工作流原稿在 `docs/pages.yml.example`；本机 OAuth token 缺 `workflow` 作用域时无法推送 `.github/workflows/*`。若要改用 Actions：给 `gh` 授权 `workflow` 后把示例复制为 `.github/workflows/pages.yml` 并推送，再在 **Settings → Pages → Source** 选 **GitHub Actions**。

## 主题（8）

| 组 | ID | 标题 |
| --- | --- | --- |
| 01 数据面与检索性能 | `segment-lifecycle` | 段生命周期与密封 |
| | `vector-index` | 向量索引检索路径 |
| | `query-node` | 查询归并 · SN + QN |
| 02 写入与一致性 | `insert-path` | 写入路径 · WAL |
| | `timetravel` | 时间戳与可见性 |
| | `consistency-levels` | 四级一致性行为 |
| 03 控制面与高可用 | `mixcoord-meta` | MixCoord 与元数据 |
| | `replica-failover` | 副本与故障切换 |

每个主题含主流程 + 故障/边界共 2 个独立场景、各 4 步（合计 16 场景 / 64 阶段）。

## Milvus 3.0 教学基线

- **MixCoord**：单一活跃协调器（合并原 Root/Query/Data Coord 职责）
- **Streaming Node**：分片级 WAL 追加、Growing 查询、查询委托、密封
- **QueryNode / DataNode**：历史检索；离线 compaction/索引（IndexNode 已合并）
- **WAL**：Woodpecker（零盘/对象存储）或 Pulsar/Kafka
- **etcd / MinIO（S3）**：元数据与对象存储

相对 2.x：不再把「Proxy → 外部 MQ → DataNode 订阅写段、QueryNode 兼任委托」当作现行主路径。

## 构建

```sh
npm ci
npm run build
npm run check
```

静态资源在 `dist/`，相对路径，适合 GitHub Pages 项目站点。

## 致谢 / Credits

- 站点壳层与交互范式： [kejun/cs-systems-design](https://github.com/kejun/cs-systems-design)（MIT）
- 机制立体渲染： [react-isokit](https://github.com/aadilghani1/isokit)（MIT）— 许可证见 `dist/licenses/`
- 架构依据： [Milvus Documentation](https://milvus.io/docs/architecture_overview.md)（3.0）
- 本仓库课程文案与图示步骤为原创教学模型，**不是** Zilliz/Milvus 官方产品，也未逐协议形式化验证

## License

本仓库源码与教学文案：MIT（见 `LICENSE`）。第三方依赖许可证保留在 `dist/licenses/`，请勿剥离上游版权声明。
