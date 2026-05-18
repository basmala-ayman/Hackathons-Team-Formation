/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management
 */

/**
 * @swagger
 * /user/profile:
 *   get:
 *     summary: Get full user profile
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Profile fetched successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: dc389282-5fb8-478b-9b0c-126ea747e084
 *
 *                     email:
 *                       type: string
 *                       example: test@user.com
 *
 *                     name:
 *                       type: string
 *                       example: Test User
 *
 *                     bio:
 *                       type: string
 *                       example: I love building hackathon projects!
 *
 *                     role:
 *                       type: string
 *                       example: PARTICIPANT
 *
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *
 *                     profilePicture:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/profile.png
 *
 *                     resumeUrl:
 *                       type: string
 *                       nullable: true
 *                       example: https://example.com/resume.pdf
 *
 *                     githubUrl:
 *                       type: string
 *                       nullable: true
 *                       example: https://github.com/my-test-user
 *
 *                     linkedinUrl:
 *                       type: string
 *                       nullable: true
 *                       example: https://linkedin.com/in/my-test-user
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *
 *                     skills:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           skill:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: Backend
 *
 *                     teams:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           team:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: Alpha Team
 *                               status:
 *                                 type: string
 *                                 example: FORMING
 *                               hackathon:
 *                                 type: object
 *                                 properties:
 *                                   id:
 *                                     type: string
 *                                   title:
 *                                     type: string
 *                                     example: AI Hackathon
 *                                   status:
 *                                     type: string
 *                                     example: UPCOMING
 *
 *                     hackathonHistory:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           title:
 *                             type: string
 *                             example: AI Hackathon
 *                           status:
 *                             type: string
 *                             example: ONGOING
 *                           location:
 *                             type: string
 *                             example: Online
 *
 *                     invitations:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           status:
 *                             type: string
 *                             example: PENDING
 *                           deadline:
 *                             type: string
 *                             format: date-time
 *                           team:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: Team Vision
 *                           sender:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                                 example: Ahmed Ali
 */

/**
 * @swagger
 * /user/profile:
 *   put:
 *     summary: Update user profile
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
 *
 *               bio:
 *                 type: string
 *                 example: I love building hackathon projects!
 *
 *               profilePicture:
 *                 type: string
 *                 example: https://example.com/profile.png
 *
 *               resumeUrl:
 *                 type: string
 *                 example: https://example.com/resume.pdf
 *
 *               githubUrl:
 *                 type: string
 *                 example: https://github.com/my-test-user
 *
 *               linkedinUrl:
 *                 type: string
 *                 example: https://linkedin.com/in/my-test-user
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
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Profile updated successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *
 *                     email:
 *                       type: string
 *
 *                     name:
 *                       type: string
 *
 *                     bio:
 *                       type: string
 *
 *                     role:
 *                       type: string
 *
 *                     isVerified:
 *                       type: boolean
 *
 *                     profilePicture:
 *                       type: string
 *                       nullable: true
 *
 *                     resumeUrl:
 *                       type: string
 *                       nullable: true
 *
 *                     githubUrl:
 *                       type: string
 *                       nullable: true
 *
 *                     linkedinUrl:
 *                       type: string
 *                       nullable: true
 *
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 */