# ADR-001: PostgreSQL as Primary Database

## Status
Accepted

## Context
Team Catalyst stores information about participants, teams, hackathons, and invitations. The system needs to manage structured data with clear relationships between entities. The dataset includes:

- Users and their profiles (skills, resume, contact info)  
- Hackathons (metadata, projects, dates)  
- Teams (members, invitations, participation status)  
- AI-generated recommendations  

The data will mostly follow fixed attributes per entity. Flexibility for variable document structures is **not required**, and consistency is critical to avoid duplication and errors.

## Decision
We will use **PostgreSQL** as the primary database for Team Catalyst instead of NoSQL options like MongoDB or other relational databases like MySQL.

## Alternatives Considered
1. **MongoDB (NoSQL / document-based)**
   - Pros: Flexible schema, easy to scale horizontally
   - Cons: Less structured relationships, joins require aggregation pipelines, risk of data duplication, consistency harder to enforce  

2. **MySQL (Relational)**
   - Pros: ACID-compliant, widely used, stable
   - Cons: Slightly less advanced JSON/document support than PostgreSQL  

3. **PostgreSQL (Relational)**
   - Pros:
     - ACID-compliant and strong transactional guarantees  
     - Full support for complex queries and joins  
     - Clear relational schema representation for entities and relationships  
     - JSON/JSONB support if minor unstructured data needed  
     - Handles indexing and constraints efficiently  
   - Cons:
     - Slightly heavier than MongoDB for very unstructured data (not relevant for this project)  

## Rationale
- Team Catalyst’s data is **highly relational**, with clear relationships: users → teams → hackathons → invitations.  
- No need for document flexibility; the entities will have **consistent attributes** across records.  
- PostgreSQL minimizes data duplication, ensures referential integrity, and makes relationships explicit.  
- Query complexity is moderate; joins are necessary but manageable and improve data integrity.  
- JSON support is available if minor unstructured storage is needed in the future.  

## Implications
- Schema must be carefully designed upfront to cover all entities and their relationships.  
- Future migrations or schema changes will require standard database migrations (handled via Prisma ORM).  
- Performance tuning and indexing should focus on high-read tables such as hackathon listings and AI recommendations.  

