/**
 * @swagger
 * tags:
 *   name: Explore Projects
 *   description: Public explore feed and anonymous interaction counter systems
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
 *           example: "e2c07921-b118-48fe-a9d7-9c16344b5a2f"
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
 *         creatorId:
 *           type: string
 *           format: uuid
 *           example: "d3b07384-d113-49cd-a5d6-8c16344b5a2e"
 *         creatorName:
 *           type: string
 *           example: "Esraa Developer"
 *         creatorPicture:
 *           type: string
 *           nullable: true
 *           example: "/uploads/profile-pictures/pic.png"
 *         teamId:
 *           type: string
 *           format: uuid
 *           nullable: true
 *           example: "c7b07921-c118-48fe-b9d7-9c16344b5a2a"
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
 */

/**
 * @swagger
 * /project/explore:
 *   get:
 *     summary: Get all projects created by users (Publicly Accessible)
 *     description: Fetches a complete global feed containing all user projects mapped with creator details, raw team setups, and total recorded developer interests.
 *     tags: [Explore Projects]
 *     security: []
 *     responses:
 *       200:
 *         description: An array containing all platform projects fetched successfully.
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
 *                   example: "All user projects fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ExploreProjectItem'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /project/interest/{projectId}:
 *   post:
 *     summary: Increment interest count metric for a project via URL path
 *     description: Anonymously increments the total interest count metric for a specific project directly in the database record.
 *     tags: [Explore Projects]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The unique UUIDv4 identifier of the target project
 *         example: "e2c07921-b118-48fe-a9d7-9c16344b5a2f"
 *     responses:
 *       200:
 *         description: Counter incremented successfully. Returns updated metrics payload.
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
 *                   example: "Project interest count incremented successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     projectId:
 *                       type: string
 *                       format: uuid
 *                       example: "e2c07921-b118-48fe-a9d7-9c16344b5a2f"
 *                     totalInterestsCount:
 *                       type: integer
 *                       example: 15
 *       400:
 *         description: Bad Request - Invalid UUID structure sent inside the URL param path.
 *       404:
 *         description: Project execution terminated — Target project ID not found in database records.
 *       500:
 *         description: Internal server error.
 */