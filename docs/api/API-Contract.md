# Team Catalyst : API Contract

## Base URL


/api/v1

## Authentication
JWT Bearer Token authentication.
Add to headers:
Authorization: Bearer <accessToken>

## Standard Response Format

### Success
```json
{
  "success": true,
  "message": "string",
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "string",
  "errors": []
}
```

## HTTP Status Codes Used
| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request / Validation Error |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |

---

# AUTH ENDPOINTS

## POST /auth/register
Register a new user account.

**Auth Required:** No

**Request Body:**
```json
{
  "name": "string, required, min 3 chars",
  "email": "string, required, valid email",
  "password": "string, required, min 8 chars"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Registration successful. Please verify your email.",
  "data": {
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "role": "PARTICIPANT",
      "isVerified": false,
      "createdAt": "datetime"
    }
  }
}
```

**Errors:**
- 400 → Validation error
- 409 → Email already registered

---

## POST /auth/login
Login with email and password.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "string, required",
  "password": "string, required"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "string",
    "refreshToken": "string",
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "role": "PARTICIPANT",
      "isVerified": true,
      "profilePicture": "url or null"
    }
  }
}
```

**Errors:**
- 400 → Validation error
- 401 → Invalid credentials
- 403 → Email not verified

---

## POST /auth/refresh
Get new access token using refresh token.

**Auth Required:** No

**Request Body:**
```json
{
  "refreshToken": "string, required"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

**Errors:**
- 401 → Invalid or expired refresh token

---

## POST /auth/logout
Logout and invalidate refresh token.

**Auth Required:** Yes

**Request Body:**
```json
{
  "refreshToken": "string, required"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Logged out successfully",
  "data": null
}
```

---

## POST /auth/forgot-password
Request password reset email.

**Auth Required:** No

**Request Body:**
```json
{
  "email": "string, required"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "If this email exists you will receive a reset link",
  "data": null
}
```

---

## POST /auth/reset-password
Reset password using token from email.

**Auth Required:** No

**Request Body:**
```json
{
  "token": "string, required",
  "newPassword": "string, required, min 8 chars"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Password reset successful",
  "data": null
}
```

**Errors:**
- 400 → Invalid or expired token

---

## GET /auth/verify-email/:token
Verify email address using token sent to email.

**Auth Required:** No

**Response 200:**
```json
{
  "success": true,
  "message": "Email verified successfully",
  "data": null
}
```

**Errors:**
- 400 → Invalid or expired verification token

---

# USER ENDPOINTS

## GET /users/profile
Get current logged in user profile.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Profile fetched successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "string",
      "email": "string",
      "bio": "string or null",
      "role": "PARTICIPANT",
      "isVerified": true,
      "profilePicture": "url or null",
      "resumeUrl": "url or null",
      "skills": [
        {
          "id": "uuid",
          "name": "string"
        }
      ],
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  }
}
```

---

## PUT /users/profile
Update current user profile.

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "string, optional, min 3 chars",
  "bio": "string, optional, max 500 chars"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "user": {
      "id": "uuid",
      "name": "string",
      "bio": "string",
      "updatedAt": "datetime"
    }
  }
}
```

---

## POST /users/skills
Add a skill to current user profile.

**Auth Required:** Yes

**Request Body:**
```json
{
  "name": "string, required"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Skill added successfully",
  "data": {
    "skill": {
      "id": "uuid",
      "name": "string"
    }
  }
}
```

**Errors:**
- 409 → Skill already added to your profile

---

## DELETE /users/skills/:skillId
Remove a skill from current user profile.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Skill removed successfully",
  "data": null
}
```

**Errors:**
- 404 → Skill not found in your profile

---

## POST /users/upload-image
Upload profile picture.

**Auth Required:** Yes
**Content-Type:** multipart/form-data

**Request:** form-data field name: `image`
Accepted formats: jpg, jpeg, png
Max size: 5MB

**Response 200:**
```json
{
  "success": true,
  "message": "Profile picture uploaded successfully",
  "data": {
    "profilePicture": "url"
  }
}
```

**Errors:**
- 400 → Invalid file type or size exceeded

---

## POST /users/upload-cv
Upload resume/CV file.

**Auth Required:** Yes
**Content-Type:** multipart/form-data

**Request:** form-data field name: `resume`
Accepted formats: pdf
Max size: 10MB

**Response 200:**
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "resumeUrl": "url"
  }
}
```

---

# HACKATHON ENDPOINTS

## GET /hackathons
Get all hackathons with pagination.

**Auth Required:** No

**Query Parameters:**
page     → number, default 1
limit    → number, default 10, max 50
status   → UPCOMING | ONGOING | ENDED (optional)

**Response 200:**
```json
{
  "success": true,
  "message": "Hackathons fetched successfully",
  "data": {
    "hackathons": [
      {
        "id": "uuid",
        "title": "string",
        "description": "string",
        "slug": "string or null",
        "location": "string",
        "organization": "string or null",
        "applyLink": "url",
        "remainingTime": "string or null",
        "submissionPeriod": "string or null",
        "prizeAmount": 0,
        "prizesCounts": 0,
        "registrationsCount": 0,
        "startDate": "datetime or null",
        "endDate": "datetime or null",
        "status": "UPCOMING",
        "source": "devpost",
        "tags": ["string"],
        "createdAt": "datetime",
        "updatedAt": "datetime"
      }
    ],
    "pagination": {
      "total": 100,
      "page": 1,
      "limit": 10,
      "totalPages": 10
    }
  }
}
```

---

## GET /hackathons/:id
Get single hackathon details.

**Auth Required:** No

**Response 200:**
```json
{
  "success": true,
  "message": "Hackathon fetched successfully",
  "data": {
    "hackathon": {
      "id": "uuid",
      "title": "string",
      "description": "string",
      "slug": "string or null",
      "location": "string",
      "organization": "string or null",
      "applyLink": "url",
      "remainingTime": "string or null",
      "submissionPeriod": "string or null",
      "prizeAmount": 0,
      "prizesCounts": 0,
      "registrationsCount": 0,
      "startDate": "datetime or null",
      "endDate": "datetime or null",
      "status": "UPCOMING",
      "source": "devpost",
      "tags": ["string"],
      "createdAt": "datetime",
      "updatedAt": "datetime"
    }
  }
}
```

**Errors:**
- 404 → Hackathon not found

---

## GET /hackathons/search
Search and filter hackathons.

**Auth Required:** No

**Query Parameters:**
this can be changed it is based on the filter the front end made on its side 

q                → string
status           → UPCOMING | ONGOING | ENDED
tag              → string
location         → string
organization     → string
minPrize         → number
maxPrize         → number
page             → number
limit            → number

**Response 200:**
```json
{
  "success": true,
  "message": "Search results fetched successfully",
  "data": {
    "hackathons": [],
    "pagination": {
      "total": 0,
      "page": 1,
      "limit": 10,
      "totalPages": 0
    }
  }
}
```

---

# TEAM ENDPOINTS

## POST /teams
Create a new team for a hackathon.

**Auth Required:** Yes (PARTICIPANT only)

**Request Body:**
```json
{
  "name": "string, required, min 3 chars",
  "hackathonId": "uuid, required"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Team created successfully",
  "data": {
    "team": {
      "id": "uuid",
      "name": "string",
      "status": "FORMING",
      "hackathonId": "uuid",
      "ownerId": "uuid",
      "members": [
        {
          "id": "uuid",
          "name": "string",
          "profilePicture": "url or null"
        }
      ],
      "createdAt": "datetime"
    }
  }
}
```

**Errors:**
- 404 → Hackathon not found

---

## GET /teams/:id
Get team details.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Team fetched successfully",
  "data": {
    "team": {
      "id": "uuid",
      "name": "string",
      "status": "FORMING",
      "hackathon": {
        "id": "uuid",
        "title": "string"
      },
      "owner": {
        "id": "uuid",
        "name": "string"
      },
      "members": [
        {
          "id": "uuid",
          "name": "string",
          "profilePicture": "url or null",
          "skills": ["string"]
        }
      ],
      "createdAt": "datetime"
    }
  }
}
```

**Errors:**
- 404 → Team not found

---

## POST /teams/:id/invite
Send team invitation to a user.

**Auth Required:** Yes (Team owner only)

**Request Body:**
```json
{
  "receiverId": "uuid, required",
  "deadline": "datetime, required"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Invitation sent successfully",
  "data": {
    "invitation": {
      "id": "uuid",
      "teamId": "uuid",
      "receiverId": "uuid",
      "status": "PENDING",
      "deadline": "datetime",
      "createdAt": "datetime"
    }
  }
}
```

**Errors:**
- 403 → Only team owner can invite
- 404 → User not found
- 409 → User already invited or already a member

---

## PATCH /teams/invitations/:id/accept
Accept a team invitation.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Invitation accepted successfully",
  "data": {
    "team": {
      "id": "uuid",
      "name": "string",
      "status": "FORMING"
    }
  }
}
```

**Errors:**
- 403 → Not your invitation
- 404 → Invitation not found
- 410 → Invitation deadline passed

---

## PATCH /teams/invitations/:id/reject
Reject a team invitation.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Invitation rejected successfully",
  "data": null
}
```

**Errors:**
- 403 → Not your invitation
- 404 → Invitation not found

---

## DELETE /teams/:id/members/:userId
Remove a member from team or leave team.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Member removed successfully",
  "data": null
}
```

**Errors:**
- 403 → Only owner can remove others
- 404 → Member not found in team

---

# AI MATCHING ENDPOINTS

## POST /ai/match
Request AI team matching for a hackathon.

**Auth Required:** Yes (PARTICIPANT only)

**Request Body:**
```json
{
  "hackathonId": "uuid, required",
  "teamId": "uuid, required"
}
```

**Response 202:**
```json
{
  "success": true,
  "message": "Matching request received and is being processed",
  "data": {
    "requestId": "uuid",
    "status": "PENDING"
  }
}
```

**Errors:**
- 404 → Hackathon not found
- 409 → Matching request already in progress

---

## GET /ai/match/:requestId
Get AI matching results.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Matching results fetched successfully",
  "data": {
    "request": {
      "id": "uuid",
      "status": "COMPLETED",
      "hackathonId": "uuid",
      "recommendations": [
        {
          "id": "uuid",
          "compatibilityScore": 0.95,
          "status": "PENDING",
          "teamData": {
            "members": [
              {
                "id": "uuid",
                "name": "string",
                "skills": ["string"]
              }
            ]
          }
        }
      ]
    }
  }
}
```

**Errors:**
- 404 → Request not found
- 403 → Not your request

---

## PATCH /ai/recommendations/:id/accept
Accept an AI recommended team.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Recommendation accepted. Invitations sent to recommended members.",
  "data": {
    "recommendationId": "uuid",
    "invitationsSent": 3
  }
}
```

---

## PATCH /ai/recommendations/:id/reject
Reject an AI recommended team.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Recommendation rejected",
  "data": null
}
```

---

# NOTIFICATION ENDPOINTS

## GET /notifications
Get all notifications for current user.

**Auth Required:** Yes

**Query Parameters:**
page     → number, default 1
limit    → number, default 20
isRead   → boolean, optional filter

**Response 200:**
```json
{
  "success": true,
  "message": "Notifications fetched successfully",
  "data": {
    "notifications": [
      {
        "id": "uuid",
        "type": "TEAM_INVITE",
        "title": "string",
        "message": "string",
        "isRead": false,
        "metadata": {},
        "createdAt": "datetime"
      }
    ],
    "pagination": {
      "total": 10,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
}
```

---

## PATCH /notifications/:id/read
Mark a notification as read.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Notification marked as read",
  "data": null
}
```

**Errors:**
- 404 → Notification not found
- 403 → Not your notification

---

## PATCH /notifications/read-all
Mark all notifications as read.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "All notifications marked as read",
  "data": null
}
```

---

## DELETE /notifications/:id
Delete a notification.

**Auth Required:** Yes

**Response 200:**
```json
{
  "success": true,
  "message": "Notification deleted successfully",
  "data": null
}
```

---

# HEALTH CHECK

## GET /health
Check if server is running.

**Auth Required:** No

**Response 200:**
```json
{
  "success": true,
  "message": "Server is running",
  "data": {
    "status": "healthy",
    "timestamp": "datetime"
  }
}
