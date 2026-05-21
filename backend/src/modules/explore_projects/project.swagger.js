/**
 * @swagger
 * tags:
 *   name: Explore Projects
 *   description: Public explore feeds and active project interest matching handlers
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ExploreProjectItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         creatorId:
 *           type: string
 *           format: uuid
 *         creatorName:
 *           type: string
 *         creatorPicture:
 *           type: string
 *           nullable: true
 *         teamId:
 *           type: string
 *           format: uuid
 *         teamName:
 *           type: string
 *           nullable: true
 *         teamStatus:
 *           type: string
 *           nullable: true
 *         requiredSkillsOrRoles:
 *           type: array
 *           items:
 *             type: string
 *         totalTeamMembersCount:
 *           type: integer
 *         totalInterestsCount:
 *           type: integer
 *         isInterested:
 *           type: boolean
 */

/**
 * @swagger
 * /project/explore:
 *   get:
 *     summary: Get all projects (Public Feed)
 *     tags: [Explore Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Global project arrays fetched successfully.
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
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExploreProjectItem'
 */

/**
 * @swagger
 * /project/interest/{projectId}:
 *   post:
 *     summary: Store project interest directly inside user records
 *     tags: [Explore Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Interest stored inside user array configuration.
 *       400:
 *         description: Bad Request - Creating self-interest cycles is prohibited.
 *       401:
 *         description: Unauthorized - Access validation token missing or expired.
 *       404:
 *         description: Not Found - Project structural records mismatch.
 *       409:
 *         description: Conflict - Row combination already matching inside database indexes.
 */