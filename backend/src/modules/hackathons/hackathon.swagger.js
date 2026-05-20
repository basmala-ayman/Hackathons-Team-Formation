/**
 * @swagger
 * tags:
 *   name: Hackathons
 *   description: Hackathon listing explore tools, event creations, and admin/owner access management
 */

/**
 * @swagger
 * /hackathons:
 *   get:
 *     summary: Retrieve all platform hackathons (Scraped + User Created)
 *     tags: [Hackathons]
 *     responses:
 *       200:
 *         description: A complete chronological list of all hackathons
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
 *                         description: Devpost hackathon ID or system-generated ID for user-created hackathons
 *                         example: "devpost-1234567"
 *                       title:
 *                         type: string
 *                         example: "Global AI Innovation Hackathon"
 *                       slug:
 *                         type: string
 *                         nullable: true
 *                         example: "global-ai-innovation-hackathon"
 *                       location:
 *                         type: string
 *                         example: "Online"
 *                       applyLink:
 *                         type: string
 *                         nullable: true
 *                         example: "https://devpost.com/software"
 *                       thumbnailUrl:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/banner.png"
 *                       remainingTime:
 *                         type: string
 *                         nullable: true
 *                         example: "12 days left"
 *                       submissionPeriod:
 *                         type: string
 *                         nullable: true
 *                         example: "May 1 - May 25"
 *                       prizeAmount:
 *                         type: number
 *                         example: 5000
 *                       prizesCounts:
 *                         type: integer
 *                         example: 3
 *                       registrationsCount:
 *                         type: integer
 *                         example: 142
 *                       organization:
 *                         type: string
 *                         nullable: true
 *                         example: "AI Lab Global"
 *                       status:
 *                         type: string
 *                         enum: [UPCOMING, ONGOING, ENDED]
 *                         example: "ONGOING"
 *                       source:
 *                         type: string
 *                         enum: [SCRAPED, USER_CREATED]
 *                         example: "SCRAPED"
 *                       interestCount:
 *                         type: integer
 *                         example: 24
 *                       createdBy:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 */

/**
 * @swagger
 * /hackathons/names/list:
 *   get:
 *     summary: Retrieve all hackathon names only
 *     description: Returns only hackathon titles for dropdowns and search suggestions
 *     tags: [Hackathons]
 *     responses:
 *       200:
 *         description: Hackathon names retrieved successfully
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
 *                     type: string
 *                   example:
 *                     - "Global AI Innovation Hackathon"
 *                     - "Hack Cairo 2026"
 */

/**
 * @swagger
 * /hackathons/{id}:
 *   get:
 *     summary: Retrieve hackathon by ID
 *     tags: [Hackathons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Devpost hackathon ID or system-generated ID
 *         example: "devpost-1234567"
 *     responses:
 *       200:
 *         description: Hackathon retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Devpost or system ID
 *                     title:
 *                       type: string
 *                     location:
 *                       type: string
 *                     status:
 *                       type: string
 *                     source:
 *                       type: string
 *                     interestCount:
 *                       type: integer
 *                     createdBy:
 *                       type: string
 *                       nullable: true
 *       404:
 *         description: Hackathon not found
 */

/**
 * @swagger
 * /hackathons:
 *   post:
 *     summary: Create a new hackathon (user-created)
 *     tags: [Hackathons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Internal Web3 Sprint"
 *               location:
 *                 type: string
 *                 example: "San Francisco, CA"
 *               applyLink:
 *                 type: string
 *                 example: "https://example.com"
 *               thumbnailUrl:
 *                 type: string
 *               submissionPeriod:
 *                 type: string
 *               prizeAmount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Hackathon created successfully
 */

/**
 * @swagger
 * /hackathons/{id}:
 *   put:
 *     summary: Update hackathon
 *     tags: [Hackathons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hackathon ID (Devpost or system-generated)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               prizeAmount:
 *                 type: number
 *               status:
 *                 type: string
 *                 enum: [UPCOMING, ONGOING, ENDED]
 *     responses:
 *       200:
 *         description: Updated successfully
 */

/**
 * @swagger
 * /hackathons/{id}:
 *   delete:
 *     summary: Delete hackathon
 *     tags: [Hackathons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Hackathon ID (Devpost or system-generated)
 *     responses:
 *       204:
 *         description: Deleted successfully
 */