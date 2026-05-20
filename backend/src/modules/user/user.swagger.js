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
 *     HackathonMinimal:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *           example: "Global AI Hackathon 2026"
 *         thumbnailUrl:
 *           type: string
 *           nullable: true
 *           example: "/uploads/thumbnails/ai-hack.png"
 *         location:
 *           type: string
 *           example: "Online"
 *         status:
 *           type: string
 *           enum: [UPCOMING, ONGOING, COMPLETED]
 *           example: "UPCOMING"
 * 
 *     UserBasicProfile:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         email:
 *           type: string
 *           format: email
 *           example: "user@example.com"
 *         profile:
 *           type: object
 *           nullable: true
 *           properties:
 *             name:
 *               type: string
 *               example: "Test User"
 *             profilePicture:
 *               type: string
 *               nullable: true
 *               example: "/uploads/profile-pictures/pic.png"
 *             techRole:
 *               type: string
 *               nullable: true
 *               example: "Backend Developer"
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
 *         targetModalPopupStep:
 *           type: integer
 *           example: 3
 *         isProfileComplete:
 *           type: boolean
 *           example: false
 *         profile:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: "Test User"
 *             email:
 *               type: string
 *               format: email
 *               example: "user@example.com"
 *             bio:
 *               type: string
 *               nullable: true
 *               example: "Full Stack Developer passionate about hackathons"
 *             profilePicture:
 *               type: string
 *               nullable: true
 *               example: "/uploads/profile-pictures/pic.png"
 *             githubUrl:
 *               type: string
 *               nullable: true
 *               pattern: '^https?:\/\/'
 *               example: "https://github.com/esraa"
 *             linkedinUrl:
 *               type: string
 *               nullable: true
 *               pattern: '^https?:\/\/'
 *               example: "https://linkedin.com/in/esraa"
 *             resumeUrl:
 *               type: string
 *               nullable: true
 *               example: "/uploads/resumes/cv.pdf"
 *             techRole:
 *               type: string
 *               nullable: true
 *               example: "Backend Developer"
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Node.js", "Prisma", "Express", "Communication"]
 *         interestedHackathons:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/HackathonMinimal'
 *         featuredProjects:
 *           type: array
 *           items:
 *             type: object
 *           example: []
 *         hackathonHistory:
 *           type: array
 *           items:
 *             type: object
 *           example: []
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
 *               techRole:
 *                 type: string
 *                 example: Backend Developer
 *               hardSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "Prisma", "Express"]
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Communication", "Leadership"]
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
 *         description: Profile updated successfully
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
 *         description: Bad Request - Invalid parameters or unexpected file fields
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 *                     $ref: '#/components/schemas/UserBasicProfile'
 *       400:
 *         description: Bad Request - Missing query parameter 'q'
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
 *         description: Collection of basic system users fetched successfully
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
 *                     $ref: '#/components/schemas/UserBasicProfile'
 *       401:
 *         description: Unauthorized
 */