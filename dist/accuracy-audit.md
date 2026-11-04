# Accuracy audit (MVP · Milvus 3.0)

本文件诚实记录教学简化边界，**不声称**已对 Milvus 内部协议做形式化验证。

## 基线

- 架构以官方 [Architecture Overview](https://milvus.io/docs/architecture_overview.md) 与 [Streaming Service](https://milvus.io/docs/streaming_service.md) 的 **Milvus 3.0** 描述为准。
- 升级/拓扑旁证：[Upgrade cluster (Operator)](https://milvus.io/docs/upgrade_milvus_cluster-operator.md) 中的 MixCoord、StreamingNode、Woodpecker、etcd、MinIO。

## 已对齐的 3.0 要点

1. MixCoord 为单一活跃协调器；旧 Root/Query/Data Coord 作为逻辑职责理解，不作现行三进程必装拓扑。
2. 写入：Proxy → Streaming Node → WAL（Woodpecker / Pulsar / Kafka）；Growing 由 SN 维护。
3. 查询：SN 查 Growing 并委托 QueryNode 查 Sealed；Proxy/SN 多层归并。
4. DataNode 承担索引构建等离线任务（IndexNode 合并）。
5. 段生命周期：SN 密封 Growing→Sealed，再索引与 handoff。

## 已知简化

- 节点数、延迟、段大小等数字均为示意。
- 未展开 PChannel/VChannel/CChannel、fencing、广播 ACK、CDC 等完整细节。
- 一致性四级讲行为差异，不复述全部实现状态机。
- MixCoord 内部模块边界、主备选举细节从略。
- 部分文档 URL 可能随站点改版重定向；以 milvus.io/docs 当前树为准。

## 检查

`npm run check` 校验 8 主题 / 16 场景 / 64 阶段的数据契约与 IsoKit 渲染，**不证明**协议正确。
