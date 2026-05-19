/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: User and admin dashboards
 */

/**
 * @swagger
 * /dashboard/user:
 *   get:
 *     summary: Get user dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User dashboard fetched successfully
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
 *                   example: User dashboard fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     welcomeMessage:
 *                       type: string
 *                       example: Welcome back, Esraa Ahmed!
 *                     metrics:
 *                       type: object
 *                       properties:
 *                         activeTeamsCount:
 *                           type: integer
 *                           example: 2
 *                         recommendedTeamsCount:
 *                           type: integer
 *                           example: 4
 *                         pendingInvitationsCount:
 *                           type: integer
 *                           example: 1
 *                     activeTeams:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                             example: Titan Coders
 *                           role:
 *                             type: string
 *                             example: Member
 *                           hackathon:
 *                             type: string
 *                             example: Global AI Hackathon
 *                     recentActivities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           type:
 *                             type: string
 *                             example: TEAM_INVITE
 *                           message:
 *                             type: string
 *                             example: You received a new team invitation from Nexus Team
 *                           date:
 *                             type: string
 *                             format: date-time
 */

/**
 * @swagger
 * /dashboard/admin:
 *   get:
 *     summary: Get admin dashboard
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard fetched successfully
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
 *                   example: Admin dashboard fetched successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     systemOverview:
 *                       type: object
 *                       properties:
 *                         totalUsers:
 *                           type: integer
 *                         totalTeams:
 *                           type: integer
 *                         completeTeams:
 *                           type: integer
 *                     teamFormationStats:
 *                       type: object
 *                       properties:
 *                         autoMatched:
 *                           type: integer
 *                         manual:
 *                           type: integer
 *                         invited:
 *                           type: integer
 *                     participantsGrowth:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           date:
 *                             type: string
 *                           count:
 *                             type: integer
 *                     weeklyActivity:
 *                       type: object
 *                       properties:
 *                         newUsers:
 *                           type: integer
 *                         newTeams:
 *                           type: integer
 *                     recentActivities:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           type:
 *                             type: string
 *                           message:
 *                             type: string
 *                           date:
 *                             type: string
 *                             format: date-time
 */