const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const scope={};vm.runInNewContext(fs.readFileSync('dist/data.js','utf8')+';this.lessons=LESSONS;this.sources=SOURCES;this.groups=GROUPS;',scope);
const lessons=scope.lessons,ids=new Set(lessons.map(l=>l.id));
assert.equal(lessons.length,20);assert.equal(ids.size,20);
const groupCounts=[0,1,2,3].map(g=>lessons.filter(l=>l.group===g).length);
assert.equal(groupCounts.reduce((a,b)=>a+b,0),20);
assert.equal(scope.groups.length,groupCounts.filter(c=>c>0).length);
assert.deepEqual(groupCounts,[6,6,4,4]);
const kinds=new Set(['request','data','control','check','reject','lost','local','compare']);
let count=0;
for(const l of lessons){
  assert(l.fault&&Array.isArray(l.fault.steps),l.id+' needs a complete independent alternate scenario');
  assert.notEqual(l.steps,l.fault.steps,l.id+' scenarios must not share a mutable steps array');
  for(const [caseName,c] of [['main',l],['alternate',l.fault]]){
    assert.equal(c.nodes.length,4,l.id+' '+caseName+' node count');assert.equal(c.steps.length,4,l.id+' '+caseName+' stage count');assert(Array.isArray(c.code)&&c.code.length>0,l.id+' '+caseName+' pseudocode');
    for(const s of c.steps){count++;assert.equal(s.length,7,l.id+' '+caseName+' frame schema');assert(s[1]>=0&&s[1]<4&&s[2]>=0&&s[2]<4,l.id+' node index');assert(kinds.has(s[6]),l.id+' relation type');assert.equal(s[1]===s[2],s[6]==='local',l.id+' internal operations must not invent a transfer');for(const i of [0,3,4,5])assert(typeof s[i]==='string'&&s[i].trim().length>0,l.id+' nonempty frame text');}
  }
  for(const r of l.related)assert(ids.has(r),l.id+' related '+r);
  for(const id of l.sources){const source=scope.sources[id];assert(source,l.id+' source '+id);assert(/^https:\/\//.test(source.url),l.id+' source HTTPS');}
}
const mvp=['segment-lifecycle','vector-index','query-node','insert-path','timetravel','consistency-levels','mixcoord-meta','replica-failover'];
const phase2=['arch-four-layers','streaming-woodpecker','load-release','delete-upsert-bitset','hybrid-search-rrf','filtered-search','compaction-clustering','partition-key','storage-v3','tiered-storage','snapshots','cdc-replication'];
for (const id of [...mvp,...phase2]) assert(ids.has(id), 'missing topic '+id);
const blob = JSON.stringify(lessons);
assert(/MixCoord/.test(blob), 'must teach MixCoord (Milvus 3.0)');
assert(/StreamingNode|Streaming Node/.test(blob), 'must teach Streaming Node');
assert(/Woodpecker/.test(blob), 'must mention Woodpecker WAL');
assert(!/Proxy → MsgStream\/Pulsar → DataNode/.test(blob), 'do not teach obsolete 2.x insert slogan as current');
const insert=lessons.find(l=>l.id==='insert-path');
assert(/StreamingNode|WAL|Woodpecker/.test(insert.nodes.join(' ')+insert.summary), 'Insert path should center Streaming Node + WAL');
const replica=lessons.find(l=>l.id==='replica-failover');
assert(replica.fault.steps.some(s=>s[6]==='lost'),'Replica failover alternate needs an interrupted delivery stage');
const cdc=lessons.find(l=>l.id==='cdc-replication');
assert(cdc.fault.steps.some(s=>s[6]==='lost'||s[6]==='reject'),'CDC alternate needs lost/reject failure path');
console.log(`Content contracts passed: 20 lessons, 40 independent scenarios, ${count} typed stages, groups ${groupCounts.join('/')}, Milvus 3.0 references. These checks do not prove protocol correctness.`);
