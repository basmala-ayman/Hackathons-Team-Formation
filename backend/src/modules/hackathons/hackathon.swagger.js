/**
 * @swagger
 * tags:
 *   name: Hackathons
 *   description: Hackathon management endpoints
 */

/**
 * =========================
 * TAG SCHEMA
 * =========================
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "bc0b79bb-6b41-4a28-840b-4835daa5283a"
 *         name:
 *           type: string
 *           example: "Machine Learning/AI"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-20T18:17:20.764Z"
 */

/**
 * =========================
 * HACKATHON SCHEMA
 * =========================
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
 *           example: "28263"
 *         title:
 *           type: string
 *           example: "DSH Hacks V1"
 *         slug:
 *           type: string
 *           example: "dsh-hacks-v1"
 *         location:
 *           type: string
 *           example: "Online"
 *         applyLink:
 *           type: string
 *           example: "https://dsh-hacks-v1.devpost.com/"
 *         thumbnailUrl:
 *           type: string
 *           example: "//cloudfront.net/image.png"
 *         remainingTime:
 *           type: string
 *           example: "about 1 month left"
 *         submissionPeriod:
 *           type: string
 *           example: "Mar 02 - Jun 02, 2026"
 *         prizeAmount:
 *           type: number
 *           example: 5096
 *         prizesCounts:
 *           type: integer
 *           example: 4
 *         registrationsCount:
 *           type: integer
 *           example: 411
 *         organization:
 *           type: string
 *           example: "DreamWeave"
 *         status:
 *           type: string
 *           enum: [UPCOMING, ONGOING, ENDED]
 *           example: ONGOING
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-24T12:46:29.786Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2026-04-24T12:58:57.702Z"

 *         tags:
 *           type: array
 *           description: List of hackathon tags
 *           items:
 *             $ref: '#/components/schemas/Tag'
 */

/**
 * =========================
 * RESPONSE SCHEMA
 * =========================
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SingleHackathonResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Hackathon fetched successfully
 *         data:
 *           $ref: '#/components/schemas/Hackathon'
 */

/**
 * =========================
 * ENDPOINTS
 * =========================
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

