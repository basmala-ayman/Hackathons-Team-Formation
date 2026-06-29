/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management and metric setup configurations
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     HackathonInterestItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *           example: "Global AI Hackathon 2026"
 *         location:
 *           type: string
 *           example: "Online"
 *         status:
 *           type: string
 *           example: "UPCOMING"
 * 
 *     OwnedProjectItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *           example: "DevMatch Platform"
 *         description:
 *           type: string
 *           example: "A matching platform built for global developer team formations."
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-05-21T02:10:00.000Z"
 *         creatorName:
 *           type: string
 *           example: "Esraa Developer"
 *         creatorPicture: 
 *           type: string
 *           example: "/uploads/profile-pictures/pic.png"
 *         teamId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         teamName:
 *           type: string
 *           nullable: true
 *           example: "Alpha-Centauri-Team"
 *         teamStatus:
 *           type: string
 *           nullable: true
 *           example: "FORMING"
 *         requiredSkillsOrRoles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Backend Developer", "UI Designer"]
 *         totalTeamMembersCount:
 *           type: integer
 *           example: 3
 *         totalInterestsCount:
 *           type: integer
 *           example: 14
 * 
 *     BasicUserListItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *           example: "Esraa Developer"
 *         email:
 *           type: string
 *           format: email
 *           example: "esraa@example.com"
 * 
 *     UserProfileData:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         profileCompletionPercentage:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           example: 75
 *         profile:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Esraa Developer"
 *             email:
 *               type: string
 *               format: email
 *               example: "user@example.com"
 *             bio:
 *               type: string
 *               nullable: true
 *               example: "Full Stack Developer passionate about hackathons"
 *             githubUrl:
 *               type: string
 *               nullable: true
 *               example: "https://github.com/esraa"
 *             linkedinUrl:
 *               type: string
 *               nullable: true
 *               example: "https://linkedin.com/in/esraa"
 *             profilePicture:
 *               type: string
 *               nullable: true
 *               example: "/uploads/profile-pictures/pic.png"
 *             resumeUrl:
 *               type: string
 *               nullable: true
 *               example: "/uploads/resumes/cv.pdf"
 *         techRoles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["BACKEND", "DESIGNER"]
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Node.js", "Prisma", "Express", "Communication"]
 *         hackathonInterests:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HackathonInterestItem'
 *         intrestes:
 *           type: array
 *           items:
 *             type: string
 *           example: ["AI", "Web3"]
 *         ownedProjects:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OwnedProjectItem'
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get full user profile and wizard popup progress metrics
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile, completion states, and tracking arrays fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile data fetched successfully"
 *                 data:
 *                   $ref: '#/components/schemas/UserProfileData'
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       404:
 *         description: User not found or account deactivated
 */

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile (text + file uploads)
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               bio:
 *                 type: string
 *                 example: Full Stack Developer passionate about hackathons
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/esraa
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/esraa
 *               techRoles:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["BACKEND", "DESIGNER"]
 *               skills:
 *                 type: array
 *                 description: Combined array of user hard and soft skills
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "Prisma", "Communication"]
 *               intrestes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["AI", "Web3"]
 *               hackathonInterests:
 *                 type: array
 *                 description: List of targeted hackathon titles to track
 *                 items:
 *                   type: string
 *                 example: ["Global AI Hackathon 2026"]
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile image file
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Upload resume file (PDF/DOCX)
 *     responses:
 *       200:
 *         description: Profile updated successfully. Returns updated profile structure.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Profile updated successfully"
 *                 data:
 *                   $ref: '#/components/schemas/UserProfileData'
 *       400:
 *         description: Bad Request - Invalid fields or file formatting errors
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search users by name or email
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search keyword matching name or email components
 *         example: "esraa"
 *     responses:
 *       200:
 *         description: Matching users list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Users searched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BasicUserListItem'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/list/basic:
 *   get:
 *     summary: Get basic verified users list
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Basic platform users map tracking keys returned from service layer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Basic users list fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/BasicUserListItem'
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/{userId}/basic-info:
 *   get:
 *     summary: Get public basic info of any user (name, email, LinkedIn, GitHub, skills, tech roles)
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: UUID of the user
 *     responses:
 *       200:
 *         description: Basic user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "User basic info fetched successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "john@example.com"
 *                     linkedinUrl:
 *                       type: string
 *                       nullable: true
 *                       example: "https://linkedin.com/in/john"
 *                     githubUrl:
 *                       type: string
 *                       nullable: true
 *                       example: "https://github.com/john"
 *                     techRoles:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["BACKEND", "DEVOPS"]
 *                     skills:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Node.js", "Docker", "PostgreSQL"]
 *       404:
 *         description: User not found
 */