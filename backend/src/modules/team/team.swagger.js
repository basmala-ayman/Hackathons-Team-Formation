/**
 * @swagger
 * tags:
 *   name: Teams
 *   description: Team creation, invitations, collaboration, and hackathon team management
 */

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new hackathon team
 *     description: |
 *       Creates a new team for a selected hackathon, optionally creates a new user-created hackathon,
 *       stores required skills and roles, creates invitations for selected members,
 *       and optionally creates a linked project idea.
 *     tags: [Teams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teamName
 *               - hackathonName
 *               - teamSize
 *             properties:
 *               teamName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 100
 *                 example: "AI Vision Builders"
 *
 *               hackathonName:
 *                 type: string
 *                 example: "Global AI Innovation Hackathon"
 *
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 nullable: true
 *                 example: "Building an AI-powered accessibility platform."
 *
 *               teamSize:
 *                 type: integer
 *                 minimum: 2
 *                 maximum: 6
 *                 example: 4
 *
 *               members:
 *                 type: array
 *                 description: Array of invited user IDs
 *                 items:
 *                   type: string
 *                   format: uuid
 *                 example:
 *                   - "dc389282-5fb8-478b-9b0c-126ea747e084"
 *                   - "f6c4e8e1-7f8b-4d8a-bbf2-11bc72c4f112"
 *
 *               skills:
 *                 type: array
 *                 description: Required technical or soft skills for the team
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Node.js"
 *                   - "Machine Learning"
 *                   - "UI/UX"
 *
 *               roles:
 *                 type: array
 *                 description: Needed team roles
 *                 items:
 *                   type: string
 *                 example:
 *                   - "Backend Developer"
 *                   - "AI Engineer"
 *                   - "Designer"
 *
 *               projectTitle:
 *                 type: string
 *                 nullable: true
 *                 example: "AI Accessibility Assistant"
 *
 *               projectDescription:
 *                 type: string
 *                 nullable: true
 *                 example: "A smart assistant helping visually impaired users navigate digital platforms."
 *
 *               userCreated:
 *                 type: boolean
 *                 description: |
 *                   If true, a new hackathon record will be created automatically.
 *                   If false, the hackathon must already exist.
 *                 example: false
 *
 *     responses:
 *       201:
 *         description: Team created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Team created successfully
 *
 *                 data:
 *                   type: object
 *                   properties:
 *                     teamId:
 *                       type: string
 *                       format: uuid
 *                       example: "b729e1db-f2a0-4fd0-b1db-d7db19f2c712"
 *
 *       400:
 *         description: Validation error or invalid business logic
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized - Missing or invalid bearer token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Hackathon not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       409:
 *         description: Hackathon already exists when attempting to create a duplicate user-created hackathon
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */