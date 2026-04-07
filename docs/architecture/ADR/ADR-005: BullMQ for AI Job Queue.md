# ADR-005: BullMQ for AI Job Queue

## Status
Accepted

## Context
AI team matching is computationally expensive and can take several seconds to compute. Making synchronous API calls directly from the backend would block user requests, potentially causing timeouts and poor user experience. A background job queue is required to process AI requests asynchronously and notify participants when results are ready.

## Decision
Use **BullMQ** as the background job queue system instead of direct synchronous AI calls or other message queue systems like RabbitMQ or Kafka.

## Alternatives Considered
1. **Synchronous API calls to AI service**
   - Pros: Simple to implement
   - Cons: Blocks requests, potential API timeouts, poor user experience
2. **RabbitMQ**
   - Pros: Mature message broker, supports complex routing
   - Cons: Adds operational overhead, requires additional infrastructure
3. **Kafka**
   - Pros: High throughput, scalable
   - Cons: Overkill for this project size, complex setup and maintenance

## Decision Drivers
- Asynchronous processing of AI requests
- Reliable job queue with retry and failure handling
- Minimal infrastructure complexity
- Integration with Redis already planned

## Pros
- BullMQ integrates seamlessly with Redis (already in use)
- Supports job retries, scheduling, and concurrency control
- Lightweight and easy to configure
- Simplifies the AI request flow for backend developers

## Cons
- Relies on Redis; if Redis fails, jobs may be lost
- Limited visibility for complex analytics compared to Kafka
- Less suitable for extremely large-scale distributed systems

## Consequences
- AI team matching is fully asynchronous
- Users receive immediate acknowledgment while processing occurs in the background
- WebSocket notifications are triggered when results are ready
- Simplified architecture and reduced operational overhead