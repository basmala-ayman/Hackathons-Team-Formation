-- CreateTable
CREATE TABLE "team_skills" (
    "teamId" TEXT NOT NULL,
    "skillId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "team_skills_teamId_skillId_key" ON "team_skills"("teamId", "skillId");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_name_idx" ON "users"("name");

-- AddForeignKey
ALTER TABLE "team_skills" ADD CONSTRAINT "team_skills_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "team_skills" ADD CONSTRAINT "team_skills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "skills"("id") ON DELETE CASCADE ON UPDATE CASCADE;
