/**
 * The deep-dive curriculum. A topic shows as "Planned" on /deep-dives/ until
 * an MDX file in src/content/deep-dives/ sets `topic` to its slug.
 */
export const deepDiveTopics = [
  { slug: 'go-concurrency-patterns', title: 'Go Concurrency Patterns', summary: 'Pipelines, fan-out and fan-in, and choosing between channels and mutexes.' },
  { slug: 'goroutine-lifecycle', title: 'Goroutine Lifecycle Management', summary: 'Ownership, cancellation and making sure every goroutine has a way to stop.' },
  { slug: 'worker-pools', title: 'Worker Pools', summary: 'Bounded concurrency, backpressure and sizing a pool against what is downstream.' },
  { slug: 'postgresql-optimization', title: 'PostgreSQL Optimization', summary: 'Reading query plans, indexing for access patterns, and keeping vacuum healthy.' },
  { slug: 'redis-caching', title: 'Redis Caching Strategies', summary: 'Cache-aside, write-through, invalidation and surviving a cold cache.' },
  { slug: 'distributed-transactions', title: 'Distributed Transactions', summary: 'Sagas, outboxes and idempotency — consistency without a global lock.' },
  { slug: 'connection-pooling', title: 'Database Connection Pooling', summary: 'Pool sizing, timeouts and what happens when the pool is the bottleneck.' },
  { slug: 'docker-kubernetes', title: 'Docker and Kubernetes', summary: 'Images, resource limits, probes and the scheduling behaviour that follows from them.' },
  { slug: 'zero-downtime-deployment', title: 'Zero-downtime Deployment', summary: 'Rolling updates, connection draining and schema changes that do not break running code.' },
  { slug: 'observability', title: 'Observability', summary: 'Logs, metrics and traces designed to answer questions during an incident.' },
  { slug: 'performance-profiling', title: 'Performance Profiling', summary: 'Measuring before optimising: CPU and memory profiles, and benchmarks you can trust.' },
  { slug: 'security-engineering', title: 'Security Engineering', summary: 'Authentication, authorization and secret handling as design concerns.' },
] as const;

export type DeepDiveTopicSlug = (typeof deepDiveTopics)[number]['slug'];

export const deepDiveTopicSlugs = deepDiveTopics.map((t) => t.slug) as [
  DeepDiveTopicSlug,
  ...DeepDiveTopicSlug[],
];

export function getDeepDiveTopic(slug: DeepDiveTopicSlug) {
  const topic = deepDiveTopics.find((t) => t.slug === slug);
  if (!topic) throw new Error(`Unknown deep-dive topic: ${slug}`);
  return topic;
}
