# Backend Setup Guide

## Prerequisites
Make sure you have the following installed:
- Node.js v22+
- npm
- Git

## Steps to Run the Project

### 1. Clone the repository
```bash
git clone https://github.com/basmala-ayman/Hackathons-Team-Formation.git
cd Hackathons-Team-Formation/backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file inside the `backend/` folder:
```env
DATABASE_URL="your_neon_connection_string_here"
PORT=3000
```

> Ask the team for the actual DATABASE_URL value.
> Never commit the `.env` file to GitHub.

### 4. Generate Prisma Client
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

### 7. Verify it works
You should see: