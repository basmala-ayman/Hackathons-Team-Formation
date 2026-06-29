# Team Catalyst: Smart Skill-Based Team Formation Platform for Hackathons

> AI-powered hackathon team formation platform. Smart skill-based matching that connects the right people for the right projects.

---

## Instruction for set-up TeamCatalyst Platform (server-side & client-side)

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js v22+ |
| Framework | Express.js |
| Database | PostgreSQL via [Neon](https://neon.tech) |
| ORM | Prisma v7 |
| Auth | JWT |
| File Storage | Cloudinary |
| AI Model | FastAPI on HuggingFace Spaces |
| Scheduler | node-cron |
| Docs | Swagger / OpenAPI |

---

---

## Prerequisites

- Node.js v22+
- npm
- Git
- A [Neon](https://neon.tech) PostgreSQL database
- A [Cloudinary](https://cloudinary.com) account (free tier)
- Google OAuth Client ID

---

## Backend Setup

### 1. Clone the repository

```bash
git clone https://github.com/basmala-ayman/Hackathons-Team-Formation.git
cd Hackathons-Team-Formation/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Create a `.env` file inside `backend/`:

```env
NODE_ENV=development
PORT=3000

# Neon PostgreSQL
DATABASE_URL="postgresql://neondb_owner:npg_6ONhfLYs7QST@ep-dawn-wildflower-a4ifrp40-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Email (Gmail app password)
EMAIL_USER=team.catalyst26@gmail.com
EMAIL_PASS=kjikpgfcsjnnlsug

# Server URLs
BASE_URL=http://localhost:3000
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=omayIsTheTop_and_AllOtherIsCantalob
JWT_EXPIRES_IN=1d

# Google OAuth
GOOGLE_CLIENT_ID=653043614391-gnmnai9c6bot17euu4kfndj7pn7uegcc.apps.googleusercontent.com

# AI Model (HuggingFace Spaces)
AI_BASE_URL=https://teamcatalyst-ai-team-recommendation.hf.space

# Cloudinary
CLOUDINARY_CLOUD_NAME=doehwqejq
CLOUDINARY_API_KEY=267989441961393
CLOUDINARY_API_SECRET=rcjGwA7oqmd9CICBuE5d8iQUeI0
```
<!-- > Ask the team lead for the actual values. Never commit `.env` to GitHub. -->

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run database migrations

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

You should see:

```
postgreSQL connected via prisma 🔥
Cron jobs initialized successfully! ⏰
server running on port 3000 🚀
Swagger docs available at http://localhost:3000/api-docs 🔮
```

### 7. Open API docs

```
http://localhost:3000/api-docs
```

---

## Frontend Setup

### 1. Navigate to the frontend folder

```bash
cd ../frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create the `.env` file

Create a `.env` file inside `frontend/`:

```env
VITE_GOOGLE_CLIENT_ID=653043614391-gnmnai9c6bot17euu4kfndj7pn7uegcc.apps.googleusercontent.com
VITE_API_BASE_URL=http://localhost:3030/api/v1
```

### 4. Start the development server

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Running Both Together

Open two terminal windows:

```bash
# Terminal 1 — backend
cd backend && npm run dev

# Terminal 2 — frontend
cd frontend && npm run dev
```

---

## Key Features & Architecture

### AI-Powered Team Matching

Two matching flows exist:

**Case 1 : Project-based matching**
When a project's interest pool hits 30 users, matching triggers immediately:
```
User presses "Interested" on project
→ interestsCount hits 30
→ triggerProjectMatching fires
→ AI model called with project tags + candidate pool
→ 3 recommended teams saved
→ Founder notified
```

**Case 2 : Hackathon-based matching**
Runs via cron at 10pm daily (every 2 minutes in dev):
```
Hackathon interestCount >= 30
→ Cron fires triggerHackathonMatching
→ Each FORMING team (without a project) processed
→ AI model called per team
→ Recommendations saved + founder notified
```

### Round 2 Matching

If some invitations are rejected, the founder can request a second round:
- Accepted members are pinned (always included in new recommendations)
- Rejected members are excluded from the candidate pool
- AI called again with full team size

### Recommendation Flow (Founder Side)

```
Founder creates team
→ AI returns 3 recommended groups
→ Founder accepts one group
→ Invitations sent to all members in that group 
→ Members accept/reject individually
→ Team fills up → status: COMPLETE
```

### File Uploads

- **Profile pictures** → uploaded to Cloudinary (public URL stored in DB)
- **Resumes/CVs** → stored locally in `uploads/resumes/`

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `PORT` | Server port (default: 3000) |
| `NODE_ENV` | `development` or `production` |
| `EMAIL_USER` | Gmail address for sending emails |
| `EMAIL_PASS` | Gmail app password (not your account password) |
| `BASE_URL` | Backend base URL |
| `FRONTEND_URL` | Frontend base URL (for CORS and redirects) |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `1d`) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `AI_BASE_URL` | HuggingFace Spaces AI model base URL |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## API Endpoints Overview

| Method | Path | Description |
|---|---|---|
| POST | `/api/v1/auth/register` | Register new user |
| POST | `/api/v1/auth/login` | Login |
| GET | `/api/v1/users/profile` | Get current user profile |
| PUT | `/api/v1/users/profile` | Update profile + upload photo |
| GET | `/api/v1/hackathons` | List all hackathons |
| POST | `/api/v1/teams` | Create a team |
| GET | `/api/v1/teams/my-teams` | Get all owned teams with members |
| PATCH | `/api/v1/teams/:id/finalize` | Finalize team with current members |
| POST | `/api/v1/interests/hackathons/:id` | Mark interest in hackathon |
| GET | `/api/v1/recommendations` | Get recommended teams (all/my-teams/join) |
| PATCH | `/api/v1/recommendations/:id/accept` | Founder accepts a recommendation |
| PATCH | `/api/v1/recommendations/:id/reject` | Founder rejects a recommendation |
| PATCH | `/api/v1/recommendations/invitations/:id/respond` | Member accepts/rejects invitation |
| POST | `/api/v1/matching/round2/:teamId` | Request Round 2 recommendations |
| GET | `/api/v1/notifications` | Get user notifications |

Full interactive docs at `/api-docs` when server is running.

---

## AI Service (FastAPI)

The AI matching service is deployed on HuggingFace Spaces and handles skill-based team recommendations.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/status` | Check AI memory pool status (rehydration trigger) |
| `POST` | `/sync/member` | Sync user data (skills, bio, history) into AI memory |
| `POST` | `/sync/project` | Sync project/hackathon tags into AI memory |
| `POST` | `/recommend` | Generate 3 recommended teams from candidate pool |

**Interactive API Docs:**  
https://teamcatalyst-ai-team-recommendation.hf.space/docs

**Base URL:**  
https://teamcatalyst-ai-team-recommendation.hf.space

---

## Making the System Publicly Accessible (Local Dev)

To expose your local backend for frontend teammates or mobile testing:

```bash
ngrok http 3000
```

Copy the generated HTTPS URL and update `VITE_API_BASE_URL` in the frontend `.env`.

---

## Cron Jobs

| Job | Schedule | Description |
|---|---|---|
| Hackathon matching | 10pm daily (`0 22 * * *`) | Processes all eligible hackathon teams |
| Devpost scraper | Midnight daily (`0 0 * * *`) | Scrapes new hackathons from Devpost |

> In development, hackathon matching runs every 2 minutes (`*/2 * * * *`) for testing.

---

## Common Issues

**`Missing required environment variable`** : check your `.env` file has all variables listed above.

**`Failed To Sync Member With AI`** : the HuggingFace Space may be sleeping. Wait 30 seconds and retry; the rehydration logic will resync automatically.

**Profile picture not showing** : ensure Cloudinary credentials are correct and the `uploads/resumes/` folder exists locally.

---

## Team

Built with 🤍 as a graduation project at Ain Shams University, Faculty of Computer and Information Sciences.
