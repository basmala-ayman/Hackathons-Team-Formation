# API Overview

## Base URL
/api/v1

## Authentication
JWT-based authentication using access and refresh tokens.

---

## Auth APIs
- POST /auth/register → Register new user
- POST /auth/login → Login user
- POST /auth/refresh → Refresh access token
- POST /auth/logout → Logout user
- POST /auth/forgot-password → Request password reset
- POST /auth/reset-password → Reset password

---

## User APIs
- GET /users/profile → Get current user profile
- PUT /users/profile → Update profile
- POST /users/upload-cv → Upload resume
- POST /users/upload-image → Upload profile picture

---

## Hackathon APIs
- GET /hackathons → Get all hackathons
- GET /hackathons/:id → Get hackathon details
- GET /hackathons/search?q=keyword → Search hackathons by name/keyword
- GET /hackathons/filter → Filter hackathons (date, status, category)

---

## Team APIs
- POST /teams → Create a new team
- GET /teams/:id → Get team details
- GET /teams/:id/members → View team members
- POST /teams/:id/invite → Invite user to team
- POST /teams/:id/accept → Accept team invitation
- POST /teams/:id/reject → Reject team invitation
- POST /teams/:id/join-request → Request to join team

---

## AI (Team Matching) APIs
- POST /ai/match → Request AI team matching
- GET /ai/match/:id → Get matching result
- GET /ai/recommendations → Get all recommended teams
- POST /ai/recommendations/:id/accept → Accept recommended team
- POST /ai/recommendations/:id/reject → Reject recommendation

---

## Notification APIs
- GET /notifications → Get user notifications
- PATCH /notifications/:id/read → Mark notification as read