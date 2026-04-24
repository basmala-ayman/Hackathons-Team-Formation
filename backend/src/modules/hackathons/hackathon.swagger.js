/**
 * @swagger
 * tags:
 *   name: Hackathons
 *   description: Hackathon management endpoints
 */

/**
 * @swagger
 * /hackathons:
 *   get:
 *     summary: Get all hackathons
 *     tags: [Hackathons]
 *     responses:
 *       200:
 *         description: Hackathons fetched successfully
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
 *                     $ref: '#/components/schemas/Hackathon'
 */

/**
 * @swagger
 * /hackathons/{id}:
 *   get:
 *     summary: Get hackathon by ID
 *     tags: [Hackathons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hackathon ID
 *     responses:
 *       200:
 *         description: Hackathon fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleHackathonResponse'
 *       404:
 *         description: Hackathon not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Hackathon:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "uuid"
 *         title:
 *           type: string
 *           example: "AI Hackathon 2026"
 *         slug:
 *           type: string
 *           example: "ai-hackathon-2026"
 *         location:
 *           type: string
 *           example: "Online"
 *         applyLink:
 *           type: string
 *           example: "https://devpost.com"
 *         thumbnailUrl:
 *           type: string
 *           example: "https://image.com/hackathon.png"
 *         remainingTime:
 *           type: string
 *           example: "5 days left"
 *         submissionPeriod:
 *           type: string
 *           example: "Jan 1 - Jan 10"
 *         prizeAmount:
 *           type: number
 *           example: 5000
 *         prizesCounts:
 *           type: integer
 *           example: 3
 *         registrationsCount:
 *           type: integer
 *           example: 150
 *         organization:
 *           type: string
 *           example: "Google"
 *         status:
 *           type: string
 *           enum: [UPCOMING, ONGOING, ENDED]
 *           example: "UPCOMING"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               tag:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *
 *     SingleHackathonResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         data:
 *           $ref: '#/components/schemas/Hackathon'
 */

// /**
//  * @swagger
//  * /hackathons:
//  *   post:
//  *     summary: Create a new hackathon
//  *     tags: [Hackathons]
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - title
//  *               - applyLink
//  *             properties:
//  *               title:
//  *                 type: string
//  *                 example: AI Hackathon 2026
//  *               description:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *                 example: Online
//  *               applyLink:
//  *                 type: string
//  *                 example: https://devpost.com
//  *               prizeAmount:
//  *                 type: number
//  *                 example: 5000
//  *               startDate:
//  *                 type: string
//  *                 format: date-time
//  *               endDate:
//  *                 type: string
//  *                 format: date-time
//  *               tags:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 example: ["AI", "Web"]
//  *     responses:
//  *       201:
//  *         description: Hackathon created successfully
//  *       403:
//  *         description: Unauthorized
//  */

// /**
//  * @swagger
//  * /hackathons/{id}:
//  *   put:
//  *     summary: Update hackathon
//  *     tags: [Hackathons]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/UpdateHackathon'
//  *     responses:
//  *       200:
//  *         description: Hackathon updated successfully
//  *       404:
//  *         description: Hackathon not found
//  *       403:
//  *         description: Unauthorized
//  */

// /**
//  * @swagger
//  * /hackathons/{id}:
//  *   delete:
//  *     summary: Delete hackathon
//  *     tags: [Hackathons]
//  *     security:
//  *       - bearerAuth: []
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Hackathon deleted successfully
//  *       404:
//  *         description: Hackathon not found
//  *       403:
//  *         description: Unauthorized
//  */

