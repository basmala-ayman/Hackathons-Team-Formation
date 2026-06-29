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
 *                     - teamId: "a32679ad-9c2b-4762-b5fc-5ec8ed93febd"
 *                       teamName: "heheheheh"
 *                       hackathonName: "habiba ho ho"
 *                       description: ""
 *                       status: "FORMING"
 *                       maxMembers: 4
 *                       ownerId: "69ff9fb4-9b23-43bc-ab8d-ed5f6ae8272a"
 *                       hackathon:
 *                         id: "7ba7eb74-5a87-4dfb-bad1-563a6929568b"
 *                         title: "habiba ho ho"
 *                         status: "UPCOMING"
 *                       requiredSkills: ["linux", "css", "html", "node.js"]
 *                       currentMembers:
 *                         - userId: "69ff9fb4-9b23-43bc-ab8d-ed5f6ae8272a"
 *                           name: "zeina wady"
 *                           profilePicture: "/uploads/profile-pictures/1782244315439-438691418.jpg"
 *                           role: "CYBERSECURITY_ENGINEER"
 *                           status: "ACCEPTED"
 *                       matchingRound: 1
 *                       matchingStatus: "COMPLETED"
 *                       recommendations:
 *                         - id: "aee9db43-da13-464f-890d-3c6a79d29a22"
 *                           matchLevel: "Medium"
 *                           status: "ACCEPTED"
 *                           expiresAt: "2026-06-24T21:29:45.959Z"
 *                           members:
 *                             - userId: "ba18d4fd-700d-4503-87a9-2b15f49160b3"
 *                               name: "Mostafa Samir"
 *                               profilePicture: null
 *                               role: ["Backend Developer"]
 *                               tags: ["Node.js", "MongoDB", "Docker"]
 *                               invitationStatus: "PENDING"
 *                             - userId: "e9a01d93-671b-449c-9c7a-6b49031885ae"
 *                               name: "Laila Mostafa"
 *                               profilePicture: null
 *                               role: ["Product Manager"]
 *                               tags: ["Product Management", "Figma"]
 *                               invitationStatus: "PENDING"
 *                             - userId: "27c7e068-5cdb-4d4b-bd22-ba36d3dfa7de"
 *                               name: "Mohamed Reda"
 *                               profilePicture: null
 *                               role: ["Cybersecurity Engineer"]
 *                               tags: ["Cybersecurity", "AWS"]
 *                               invitationStatus: "PENDING"
 *                           progress:
 *                             total: 3
 *                             accepted: 0
 *                             rejected: 0
 *                             pending: 3
 *                             acceptedPercent: 0
 *
 *               join:
 *                 summary: tab=join response (when user has pending invitations)
 *                 value:
 *                   success: true
 *                   data:
 *                     - invitationId: "uuid"
 *                       status: "PENDING"
 *                       deadline: "2026-06-24T21:29:45.959Z"
 *                       recommendationId: "uuid"
 *                       team:
 *                         id: "uuid"
 *                         teamName: "heheheheh"
 *                         hackathonName: "habiba ho ho"
 *                         description: ""
 *                         maxMembers: 4
 *                         ownerId: "uuid"
 *                         owner:
 *                           id: "uuid"
 *                           name: "zeina wady"
 *                           profilePicture: "/uploads/profile-pictures/1782244315439-438691418.jpg"
 *                         requiredSkills: ["linux", "css", "html", "node.js"]
 *                         currentMembers:
 *                           - userId: "uuid"
 *                             name: "zeina wady"
 *                             profilePicture: "/uploads/profile-pictures/1782244315439-438691418.jpg"
 *                             role: "CYBERSECURITY_ENGINEER"
 *                             status: "ACCEPTED"
 *
 *               all:
 *                 summary: tab=all response (combined)
 *                 value:
 *                   success: true
 *                   data:
 *                     myTeams:
 *                       - teamId: "a32679ad-9c2b-4762-b5fc-5ec8ed93febd"
 *                         teamName: "heheheheh"
 *                         hackathonName: "habiba ho ho"
 *                         # ... same as my-teams example
 *                     join:
 *                       - invitationId: "uuid"
 *                         # ... same as join example
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
 *               message: "Round 2 is being processed. You will be notified when recommendations are ready."
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
 *       - Team owner information
 *       - Hackathon information
 *       - Required skills
 *       - Recommended members
 *       - Member bios, roles, skills and profile pictures
 *       - Invitation IDs and status
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
 *                 recommendationId: "aee9db43-da13-464f-890d-3c6a79d29a22"
 *                 status: "ACCEPTED"
 *                 expiresAt: "2026-06-24T21:29:45.959Z"
 *
 *                 targetTeam:
 *                   id: "a32679ad-9c2b-4762-b5fc-5ec8ed93febd"
 *                   teamName: "heheheheh"
 *                   description: ""
 *                   maxMembers: 4
 *                   ownerId: "69ff9fb4-9b23-43bc-ab8d-ed5f6ae8272a"
 *
 *                   requiredSkills:
 *                     - "linux"
 *                     - "css"
 *                     - "html"
 *                     - "node.js"
 *
 *                   hackathon:
 *                     id: "7ba7eb74-5a87-4dfb-bad1-563a6929568b"
 *                     title: "habiba ho ho"
 *
 *                 recommendedMembers:
 *                   - userId: "ba18d4fd-700d-4503-87a9-2b15f49160b3"
 *                     name: "Mostafa Samir"
 *                     profilePicture: null
 *                     bio: ""
 *                     role: "Backend Developer"
 *                     skills:
 *                       - "Node.js"
 *                       - "MongoDB"
 *                       - "Docker"
 *                     invitationId: null
 *                     invitationStatus: "PENDING"
 *
 *                   - userId: "e9a01d93-671b-449c-9c7a-6b49031885ae"
 *                     name: "Laila Mostafa"
 *                     profilePicture: null
 *                     bio: ""
 *                     role: "Product Manager"
 *                     skills:
 *                       - "Product Management"
 *                       - "Figma"
 *                     invitationId: null
 *                     invitationStatus: "PENDING"
 *
 *                   - userId: "27c7e068-5cdb-4d4b-bd22-ba36d3dfa7de"
 *                     name: "Mohamed Reda"
 *                     profilePicture: null
 *                     bio: ""
 *                     role: "Cybersecurity Engineer"
 *                     skills:
 *                       - "Cybersecurity"
 *                       - "AWS"
 *                     invitationId: null
 *                     invitationStatus: "PENDING"
 *
 *       404:
 *         description: Recommendation not found
 */