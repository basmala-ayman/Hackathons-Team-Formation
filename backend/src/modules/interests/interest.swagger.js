/**
 * @swagger
 * tags:
 *   name: Interests
 *   description: User interest management for hackathons and projects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     InterestSuccessResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Interest registered successfully.
 *         data:
 *           type: object
 *           properties:
 *             currentPoolSize:
 *               type: integer
 *               example: 12
 *             thresholdReached:
 *               type: boolean
 *               example: false
 *
 *     RemoveInterestResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: Interest removed successfully.
 *         data:
 *           type: object
 *           nullable: true
 *           example: null
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: Something went wrong
 */

/**
 * @swagger
 * /interests/hackathons/{hackathonId}:
 *   post:
 *     summary: Mark interest in a hackathon
 *     description: |
 *       Allows an authenticated user to express interest in joining a hackathon team pool.
 *       
 *       Rules:
 *       - User cannot already own a team in this hackathon
 *       - User cannot mark interest twice
 *       - When pool reaches threshold, matching may later be triggered
 *     tags: [Interests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hackathonId
 *         required: true
 *         schema:
 *           type: string
 *         description: Target hackathon UUID
 *         example: e2fb7a09-f55a-4bd0-b04f-a60c299963b8
 *     responses:
 *       201:
 *         description: Interest registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestSuccessResponse'
 *       400:
 *         description: Already interested OR already owns a team
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hackathon not found
 */

/**
 * @swagger
 * /interests/hackathons/{hackathonId}:
 *   delete:
 *     summary: Remove interest from a hackathon
 *     description: Removes authenticated user's interest from the target hackathon.
 *     tags: [Interests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hackathonId
 *         required: true
 *         schema:
 *           type: string
 *         example: e2fb7a09-f55a-4bd0-b04f-a60c299963b8
 *     responses:
 *       200:
 *         description: Interest removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveInterestResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User was not interested in this hackathon
 */

/**
 * @swagger
 * /interests/projects/{projectId}:
 *   post:
 *     summary: Mark interest in a project
 *     description: |
 *       Allows an authenticated user to express interest in joining a project.
 *       
 *       Rules:
 *       - User cannot mark interest in their own project
 *       - User cannot mark interest twice
 *       - When pool reaches threshold (30), AI matching is triggered immediately
 *     tags: [Interests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Target project UUID
 *         example: 9d2c1d88-18f9-41b0-9ef4-7a07e8bde111
 *     responses:
 *       201:
 *         description: Interest registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestSuccessResponse'
 *       400:
 *         description: Already interested OR own project
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Project not found
 */

/**
 * @swagger
 * /interests/projects/{projectId}:
 *   delete:
 *     summary: Remove interest from a project
 *     description: Removes authenticated user's project interest.
 *     tags: [Interests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         example: 9d2c1d88-18f9-41b0-9ef4-7a07e8bde111
 *     responses:
 *       200:
 *         description: Interest removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RemoveInterestResponse'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User was not interested in this project
 */