/**
 * @swagger
 * tags:
 *   - name: Recommendations
 *     description: AI team recommendations — founder view, member view, accept/reject
 *   - name: Matching
 *     description: AI matching triggers and status
 */

/**
 * @swagger
 * /api/v1/recommendations:
 *   get:
 *     summary: Get recommendations page data
 *     description: |
 *       Returns data for all 3 tabs. Use `tab` query param to fetch only what you need.
 *
 *       - `my-teams` — teams the user owns + AI recommendations for each
 *       - `join` — invitations the user received
 *       - `all` — both combined (default)
 *
 *       IMPORTANT FLOW:
 *       - When founder accepts a recommendation, the system creates TeamInvitation records
 *       - Each recommended member receives an invitation
 *       - `invitationId` is required for responding to invitation
 *       - Use: `/api/v1/recommendations/invitations/{invitationId}/respond`
 *
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: tab
 *         schema:
 *           type: string
 *           enum: [my-teams, join, all]
 *           default: all
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             examples:
 *               my-teams:
 *                 summary: tab=my-teams response
 *                 value:
 *                   success: true
 *                   data:
 *                     - teamId: "uuid"
 *                       teamName: "EcoHackers"
 *                       hackathonName: "AI for Climate Action"
 *                       description: "Building sustainable solutions"
 *                       status: "FORMING"
 *                       maxMembers: 4
 *                       ownerId: "uuid"
 *                       requiredSkills: ["Python", "ML", "React"]
 *                       currentMembers:
 *                         - userId: "uuid"
 *                           name: "Sarah Chen"
 *                           profilePicture: null
 *                           role: "Team Leader"
 *                       matchingRound: 1
 *                       matchingStatus: "COMPLETED"
 *                       recommendations:
 *                         - id: "uuid"
 *                           matchLevel: "High"
 *                           status: "PENDING"
 *                           expiresAt: null
 *                           members:
 *                             - userId: "uuid"
 *                               name: "Mike Johnson"
 *                               profilePicture: null
 *                               role: "Frontend Developer"
 *                               tags: ["React", "Frontend"]
 *                               invitationStatus: "PENDING"
 *                               invitationId: "uuid"   # 👈 IMPORTANT
 *                           progress:
 *                             total: 3
 *                             accepted: 0
 *                             rejected: 0
 *                             pending: 3
 *                             acceptedPercent: 0
 *
 *               join:
 *                 summary: tab=join response
 *                 value:
 *                   success: true
 *                   data:
 *                     - invitationId: "uuid"   # 👈 THIS is TeamInvitation.id
 *                       status: "PENDING"
 *                       deadline: "2026-05-21T10:00:00.000Z"
 *                       team:
 *                         id: "uuid"
 *                         teamName: "Neural Green Team"
 *                         hackathonName: "AI for Climate Action"
 *                         description: "Developing neural networks"
 *                         maxMembers: 4
 *                         ownerId: "uuid"
 *                         requiredSkills: ["Python", "ML"]
 *                         currentMembers:
 *                           - userId: "uuid"
 *                             name: "Zeina"
 *                             role: "Backend Developer"
 */

/**
 * @swagger
 * /api/v1/recommendations/{id}/accept:
 *   patch:
 *     summary: Founder accepts a recommended team
 *     description: |
 *       - Marks this recommendation ACCEPTED
 *       - Auto-rejects other recommendations
 *       - Creates TeamInvitation records for all recommended members
 *       - Each member receives an invitationId
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: AIRecommendation ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Recommendation accepted. Invitations sent to all recommended members."
 *       400:
 *         description: Already responded to
 *       403:
 *         description: Not the team owner
 *       404:
 *         description: Recommendation not found
 */

/**
 * @swagger
 * /api/v1/recommendations/{id}/reject:
 *   patch:
 *     summary: Founder rejects a recommended team
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Recommendation rejected."
 */

/**
 * @swagger
 * /api/v1/recommendations/invitations/{invitationId}/respond:
 *   patch:
 *     summary: Member accepts or rejects an invitation
 *     description: |
 *       - invitationId = TeamInvitation.id
 *       - Used after recommendation is accepted by founder
 *       - Adds user to team if ACCEPTED
 *       - Updates team progress and notifies owner
 *
 *       IMPORTANT:
 *       You get invitationId from:
 *       - `/api/v1/recommendations?tab=join`
 *
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: invitationId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [action]
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [ACCEPT, REJECT]
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             examples:
 *               accepted:
 *                 value:
 *                   success: true
 *                   message: "You have joined the team."
 *                   data:
 *                     teamComplete: false
 *               rejected:
 *                 value:
 *                   success: true
 *                   message: "Invitation declined."
 *       400:
 *         description: Already responded / expired / already accepted another team
 *       403:
 *         description: Not the invitation recipient
 */

/**
 * @swagger
 * /api/v1/matching/round2/{teamId}:
 *   post:
 *     summary: Founder requests Round 2 AI recommendations
 *     description: |
 *       Called when team still needs members after first round.
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teamId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Round 2 is being processed."
 */

/**
 * @swagger
 * /api/v1/matching/ai-status:
 *   get:
 *     summary: Check AI model memory status
 *     tags: [Matching]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 memory_wiped: false
 *                 total_members: 30
 *                 total_projects: 5
 */


/**
 * @swagger
 * /api/v1/recommendations/{id}:
 *   get:
 *     summary: Get recommendation details
 *     description: |
 *       Returns detailed information about a recommendation when the user clicks
 *       "View Team" from the recommendations page.
 *
 *       Includes:
 *       - Target team information
 *       - Hackathon information
 *       - Required skills
 *       - Recommended members
 *       - Member bios, roles, skills and profile pictures
 *
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: AIRecommendation ID
 *         schema:
 *           type: string
 *           format: uuid
 *
 *     responses:
 *       200:
 *         description: Recommendation details
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 recommendationId: "uuid"
 *                 status: "PENDING"
 *                 expiresAt: null
 *
 *                 targetTeam:
 *                   id: "uuid"
 *                   teamName: "Eco Hackers"
 *                   description: "Building AI solutions for climate change"
 *                   maxMembers: 4
 *
 *                   requiredSkills:
 *                     - "Node.js"
 *                     - "React"
 *                     - "Python"
 *
 *                   hackathon:
 *                     id: "uuid"
 *                     title: "AI For Climate Action"
 *
 *                 recommendedMembers:
 *                   - userId: "uuid"
 *                     name: "Ahmed Hassan"
 *                     profilePicture: null
 *                     bio: "Backend developer passionate about scalable systems."
 *                     role: "Backend Developer"
 *                     skills:
 *                       - "Node.js"
 *                       - "PostgreSQL"
 *                       - "Docker"
 *                     invitationStatus: "PENDING"
 *
 *                   - userId: "uuid"
 *                     name: "Sara Mohamed"
 *                     profilePicture: null
 *                     bio: "Frontend engineer focused on React."
 *                     role: "Frontend Developer"
 *                     skills:
 *                       - "React"
 *                       - "TypeScript"
 *                       - "Next.js"
 *                     invitationStatus: "PENDING"
 *
 *       404:
 *         description: Recommendation not found
 */
