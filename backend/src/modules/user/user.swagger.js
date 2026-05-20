/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management and metric setup configurations
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
 *         description: User profile and completion states fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
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
 *
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/esraa
 *
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/esraa
 *
 *               techRole:
 *                 type: string
 *                 example: Backend Developer
 *
 *               hardSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "Prisma", "Express"]
 *
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Communication", "Leadership"]
 *
 *               profilePicture:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile image file
 *
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Upload resume file (PDF/DOCX)
 *
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
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request
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
 *     responses:
 *       200:
 *         description: Success
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
 *         description: Success
 */