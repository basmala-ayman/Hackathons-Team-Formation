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
 *                 message:
 *                   type: string
 *                   example: Hackathons fetched successfully
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

/**
 * @swagger
 * components:
 *   schemas:
 *     Hackathon:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         applyLink:
 *           type: string
 *         prizeAmount:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
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
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/Hackathon'
 *
 *     UpdateHackathon:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         location:
 *           type: string
 *         applyLink:
 *           type: string
 *         prizeAmount:
 *           type: number
 *         startDate:
 *           type: string
 *           format: date-time
 *         endDate:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             type: string
 */