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
 *                         description: Internal UUID (user-created) or Devpost ID (scraped source identifier)
 *                         example: "6c27fba2-92e1-4c12-87ba-df0f398110b4"
 *                       devpostId:
 *                         type: string
 *                         nullable: true
 *                         description: Original Devpost ID (only for scraped hackathons)
 *                         example: "1234567"
 *                       title:
 *                         type: string
 *                         description: Hackathon title (NOT unique)
 *                         example: "Global AI Innovation Hackathon"
 *                       slug:
 *                         type: string
 *                         nullable: true
 *                       location:
 *                         type: string
 *                         example: "Online"
 *                       applyLink:
 *                         type: string
 *                         nullable: true
 *                       thumbnailUrl:
 *                         type: string
 *                         nullable: true
 *                       remainingTime:
 *                         type: string
 *                         nullable: true
 *                       submissionPeriod:
 *                         type: string
 *                         nullable: true
 *                       prizeAmount:
 *                         type: number
 *                         example: 5000
 *                       prizesCounts:
 *                         type: integer
 *                       registrationsCount:
 *                         type: integer
 *                       organization:
 *                         type: string
 *                         nullable: true
 *                       status:
 *                         type: string
 *                         enum: [UPCOMING, ONGOING, ENDED]
 *                       source:
 *                         type: string
 *                         enum: [SCRAPED, USER_CREATED]
 *                       interestCount:
 *                         type: integer
 *                       createdBy:
 *                         type: string
 *                         nullable: true
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
 *         description: Internal UUID or Devpost ID
 *         example: "1234567"
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
 *                     devpostId:
 *                       type: string
 *                       nullable: true
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
 *                 description: Hackathon title (NOT unique)
 *                 example: "Internal Web3 Sprint"
 *               location:
 *                 type: string
 *               applyLink:
 *                 type: string
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
 *         description: Internal UUID or Devpost ID
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
 *         description: Internal UUID or Devpost ID
 *     responses:
 *       204:
 *         description: Deleted successfully
 */