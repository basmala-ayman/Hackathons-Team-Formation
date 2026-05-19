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
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Profile data fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: dc389282-5fb8-478b-9b0c-126ea747e084
 *                     profileCompletionPercentage:
 *                       type: integer
 *                       example: 50
 *                     targetModalPopupStep:
 *                       type: integer
 *                       nullable: true
 *                       example: 3
 *                     isProfileComplete:
 *                       type: boolean
 *                       example: false
 *                     profile:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Test User
 *                         email:
 *                           type: string
 *                           example: test@user.com
 *                         bio:
 *                           type: string
 *                           example: I love building hackathon projects!
 *                         role:
 *                           type: string
 *                           example: PARTICIPANT
 *                         isVerified:
 *                           type: boolean
 *                           example: true
 *                         profilePicture:
 *                           type: string
 *                           nullable: true
 *                           example: https://example.com/profile.png
 *                         resumeUrl:
 *                           type: string
 *                           nullable: true
 *                           example: https://example.com/resume.pdf
 *                         githubUrl:
 *                           type: string
 *                           nullable: true
 *                           example: https://github.com/my-test-user
 *                         linkedinUrl:
 *                           type: string
 *                           nullable: true
 *                           example: https://linkedin.com/in/my-test-user
 *                         techRole:
 *                           type: string
 *                           nullable: true
 *                           example: Backend Developer
 *                     skills:
 *                       type: object
 *                       properties:
 *                         hardSkills:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Node.js", "PostgreSQL", "Prisma"]
 *                         softSkills:
 *                           type: array
 *                           items:
 *                             type: string
 *                           example: ["Teamwork", "Problem Solving"]
 *                     interestedHackathons:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           thumbnailUrl:
 *                             type: string
 *                           location:
 *                             type: string
 *                           status:
 *                             type: string
 *                       example: []
 *                     featuredProjects:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           description:
 *                             type: string
 *                           interestsCount:
 *                             type: integer
 *                       example: []
 *                     hackathonHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           title:
 *                             type: string
 *                           role:
 *                             type: string
 *                           status:
 *                             type: string
 *                       example: []
 *       401:
 *         description: Unauthorized - Bearer token missing or invalid
 *       404:
 *         description: User not found or inactive
 */

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile textual details and skills categories
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test User
 *               bio:
 *                 type: string
 *                 example: I love building hackathon projects!
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/profile.png
 *               resumeUrl:
 *                 type: string
 *                 example: https://example.com/resume.pdf
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/my-test-user
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/my-test-user
 *               techRole:
 *                 type: string
 *                 example: Backend Developer
 *               hardSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Node.js", "PostgreSQL"]
 *               softSkills:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Teamwork"]
 *     responses:
 *       200:
 *         description: Profile updated successfully; returns refreshed context and percentage states
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
 *                   example: Profile updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     profileCompletionPercentage:
 *                       type: integer
 *                     targetModalPopupStep:
 *                       type: integer
 *                       nullable: true
 *                     isProfileComplete:
 *                       type: boolean
 *                     profile:
 *                       type: object
 *                     skills:
 *                       type: object
 *       400:
 *         description: Bad Request - Validation checking error
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/search:
 *   get:
 *     summary: Search for registered users by partial name or email strings
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search phrase matching against names or email addresses
 *         example: test
 *     responses:
 *       200:
 *         description: Array of matched users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       profilePicture:
 *                         type: string
 *                         nullable: true
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /user/list/basic:
 *   get:
 *     summary: Get lightweight list of verified users (names and emails)
 *     description: >
 *       Returns a simplified list of users where isVerified = true.
 *       The currently authenticated user is excluded from the results.
 *       This endpoint is intended for dropdowns, invitations, and autocomplete UI components.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Verified users list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "dc389282-5fb8-478b-9b0c-126ea747e084"
 *                       name:
 *                         type: string
 *                         example: "Habiba Adel"
 *                       email:
 *                         type: string
 *                         example: "habiba@gmail.com"
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal server error
 */