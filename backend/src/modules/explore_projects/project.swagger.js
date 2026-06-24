/**
 * @swagger
 * tags:
 *   name: Explore Projects
 *   description: Public explore feed + project interest system
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ExploreProjectItem:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *
 *         title:
 *           type: string
 *
 *         description:
 *           type: string
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         creatorId:
 *           type: string
 *           format: uuid
 *
 *         creatorName:
 *           type: string
 *
 *         creatorRole:
 *           type: string
 *
 *         creatorPicture:
 *           type: string
 *           nullable: true
 *
 *         hackathonTitle:
 *           type: string
 *           nullable: true
 *           description: Derived from project.team.hackathon.title
 *
 *         teamId:
 *           type: string
 *           format: uuid
 *
 *         teamName:
 *           type: string
 *           nullable: true
 *
 *         teamStatus:
 *           type: string
 *           nullable: true
 *
 *         requiredRoles:
 *           type: array
 *           items:
 *             type: string
 *
 *         requiredSkills:
 *           type: array
 *           items:
 *             type: string
 *
 *         totalTeamSize:
 *           type: integer
 *
 *         totalTeamMembersCount:
 *           type: integer
 *
 *         totalInterestsCount:
 *           type: integer
 *
 *         isInterested:
 *           type: boolean
 */

/**
 * @swagger
 * /project/explore:
 *   get:
 *     summary: Get all explore projects (public feed)
 *     description: Returns all projects with team + owner + hackathon metadata (via team relation)
 *     tags: [Explore Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Projects fetched successfully
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

// /**
//  * @swagger
//  * /project/interest/{projectId}:
//  *   post:
//  *     summary: Register interest in a project
//  *     description: Stores user interest and increments project interest counter
//  *     tags: [Explore Projects]
//  *     security:
//  *       - bearerAuth: []
//  *
//  *     parameters:
//  *       - in: path
//  *         name: projectId
//  *         required: true
//  *         schema:
//  *           type: string
//  *           format: uuid
//  *
//  *     responses:
//  *       200:
//  *         description: Interest registered successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 projectId:
//  *                   type: string
//  *                   format: uuid
//  *                 userId:
//  *                   type: string
//  *                   format: uuid
//  *                 totalInterestsCount:
//  *                   type: integer
//  *                 isInterested:
//  *                   type: boolean
//  *
//  *       400:
//  *         description: You cannot express interest in your own project
//  *
//  *       401:
//  *         description: Unauthorized - missing or invalid token
//  *
//  *       404:
//  *         description: Project not found
//  *
//  *       409:
//  *         description: Already registered interest
//  */