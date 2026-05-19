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
 *         description: A complete chronological list of all active platform hackathons
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
 *                         example: "6c27fba2-92e1-4c12-87ba-df0f398110b4"
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
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /hackathons/names/list:
 *   get:
 *     summary: Retrieve all hackathon names only
 *     description: Returns a lightweight array containing only hackathon title strings for dropdowns, search suggestions, and frontend selection components.
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
 *                     - "Web3 Sprint Challenge"
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /hackathons/{id}:
 *   get:
 *     summary: Retrieve full contextual details for a specific hackathon by ID
 *     tags: [Hackathons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique UUID string of the target hackathon
 *         example: "6c27fba2-92e1-4c12-87ba-df0f398110b4"
 *     responses:
 *       200:
 *         description: Targeted hackathon schema data returned successfully
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
 *         description: Hackathon row context could not be matched with provided ID parameters
 */

/**
 * @swagger
 * /hackathons:
 *   post:
 *     summary: Submit a new user-created custom hackathon
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
 *                 description: Explicit unique name representing the hackathon target
 *                 example: "Internal Team Web3 Sprint"
 *               location:
 *                 type: string
 *                 example: "San Francisco, CA"
 *               applyLink:
 *                 type: string
 *                 example: "https://my-hackathon-portal.io"
 *               thumbnailUrl:
 *                 type: string
 *                 example: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
 *               submissionPeriod:
 *                 type: string
 *                 example: "June 10 - June 15"
 *               prizeAmount:
 *                 type: number
 *                 example: 2500
 *     responses:
 *       201:
 *         description: Hackathon initialized successfully; sets default tags source to 'USER_CREATED'
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
 *                     title:
 *                       type: string
 *                     source:
 *                       type: string
 *                       example: "USER_CREATED"
 *                     createdBy:
 *                       type: string
 *                       example: "dc389282-5fb8-478b-9b0c-126ea747e084"
 *       401:
 *         description: Unauthorized - Authentication bearer payload missing or invalid
 */

/**
 * @swagger
 * /hackathons/{id}:
 *   put:
 *     summary: Update an existing hackathon record
 *     description: Restricted modification check. Will validate whether the requesting token user context matches the targeted record's original 'createdBy' id values.
 *     tags: [Hackathons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identity target of the hackathon record to change
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *                 example: "Remote Only"
 *               prizeAmount:
 *                 type: number
 *                 example: 3000
 *               status:
 *                 type: string
 *                 enum: [UPCOMING, ONGOING, ENDED]
 *                 example: "ONGOING"
 *     responses:
 *       200:
 *         description: Hackathon record fields successfully updated
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
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requesting user is not the owner (createdBy doesn't match authenticated ID)
 *       404:
 *         description: Hackathon row target matching identity key was not found
 */

/**
 * @swagger
 * /hackathons/{id}:
 *   delete:
 *     summary: Delete a hackathon instance from the application pool
 *     description: Restricted deletion check. Will validate whether the requesting token user context matches the targeted record's original 'createdBy' id values.
 *     tags: [Hackathons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Empty structural return showing targeted hackathon record was completely severed
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Requesting user context does not retain operational authority over this record
 *       404:
 *         description: Target record entity matching parameters not found
 */