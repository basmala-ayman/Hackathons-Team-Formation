# ADR-002: Node.js with Express as Backend Framework

## Status
Accepted

## Context
Team Catalyst’s backend needs to handle:

- RESTful API endpoints for users, hackathons, teams, and AI requests  
- Real-time notifications via WebSockets  
- Background job processing with BullMQ  
- Integration with relational database (PostgreSQL) and caching (Redis)  
- Scalability and maintainability for a small team graduation project  

The team needs a backend framework that is lightweight, flexible, and suitable for building RESTful APIs, handling asynchronous tasks, and integrating with real-time and queue systems efficiently.

## Decision
We will use **Node.js** as the runtime environment with **Express.js** as the web framework for Team Catalyst.

## Alternatives Considered
1. **Django (Python)**
   - Pros:
     - Full-featured framework with built-in ORM, admin panel, and authentication  
     - Mature ecosystem and strong security features  
     - Excellent for rapid backend development with Python  
   - Cons:
     - Overhead from a monolithic framework can slow small team development  
     - Less native support for real-time WebSockets compared to Node.js  

2. **Spring Boot (Java)**
   - Pros:
     - Strong typing and large enterprise ecosystem  
     - Mature support for security, dependency injection, and REST APIs  
     - High performance for large-scale applications  
   - Cons:
     - Slower development cycle compared to lightweight frameworks  

3. **Node.js with Express (JavaScript)**
   - Pros:
     - Lightweight and flexible framework suitable for modular monolith architecture  
     - Native support for asynchronous operations, ideal for handling multiple connections and background jobs  
     - Easy integration with real-time technologies (Socket.io) and job queues (BullMQ)  
     - Large ecosystem of NPM packages for rapid development  
     - Minimal overhead, allowing small teams to move quickly  
   - Cons:
     - Single-threaded nature can be limiting for CPU-intensive tasks (mitigated here as AI is handled separately)  
     - Less opinionated than frameworks like Django; requires more decisions about structure and architecture  
     - Requires attention to error handling and security best practices  

## Rationale
- Node.js with Express provides a lightweight, flexible framework that meets all functional requirements (REST APIs, real-time notifications, background jobs).  
- It integrates well with Redis and BullMQ for caching and queue management.  
- CPU-heavy AI computations are offloaded to a separate Python service, avoiding Node.js single-thread limitations.  
- Minimal overhead and simple setup allow the small backend team to develop features quickly within the project timeline.  

## Implications
- Team must follow consistent project structure and coding standards, as Express is unopinionated.  
- Security, error handling, and validation must be implemented carefully, as Node.js/Express does not enforce these by default.  
- API routes and middleware should support modular monolith architecture to allow potential future scaling.  

