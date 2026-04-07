# ADR-004: Redis for Caching and Queue Management

## Status
Accepted

## Context
Team Catalyst requires a system to manage frequently accessed data efficiently and to handle background job queues for AI team matching. Without caching, requests to the database for hackathon listings or AI results would become slower and increase load. Additionally, background job management is essential to process AI tasks asynchronously without blocking the backend.

## Decision
Use **Redis** for both caching and BullMQ queue backend instead of introducing separate caching or queue solutions.

## Alternatives Considered
1. **Memcached for caching + RabbitMQ for job queue**
   - Pros: Mature and widely used tools
   - Cons: Requires running and maintaining two separate services, more operational overhead
2. **Using PostgreSQL only**
   - Pros: Simpler architecture
   - Cons: Database load increases, slower retrieval of frequently requested data, no native background job support
3. **Redis for caching only, separate queue system**
   - Pros: Separation of concerns
   - Cons: Increases complexity, two systems to manage

## Decision Drivers
- Reduce operational complexity
- High performance for frequently accessed data
- Reliable background job processing
- Minimal infrastructure overhead

## Pros
- Single service handles both caching and queueing
- Redis is fast and supports high read/write throughput
- Supported by BullMQ as a reliable backend for queues
- Reduces infrastructure and monitoring complexity

## Cons
- Redis is an in-memory store, so data is volatile unless persisted
- Limited persistence for historical job data
- Single point of failure if not clustered

## Consequences
- Background jobs and caching are tightly coupled to Redis
- Redis must be monitored for memory usage and availability
- Simplified deployment with fewer services to manage