// const cron = require("node-cron");
// const { collectDevpostHackathons } = require("../modules/hackathons/devpost.service");
// const matchingService = require("../modules/matching/matching.service");
// const logger = require("../config/logger");

// const initCronJobs = () => {

//     // ── midnight daily — scrape devpost hackathons ────────
//     cron.schedule("0 0 * * *", async () => {
//         logger.info("Cron: starting devpost hackathon collection");
//         collectDevpostHackathons();
//     });

//     // ── 10pm daily — trigger hackathon matching queue ─────
//     // cron.schedule("0 22 * * *", async () => {
//     cron.schedule("*/10 * * * * *", async () => {//this is just for testing 
//         logger.log("⏰ Cron fired (every 10 seconds)");
//         logger.log("Cron: starting hackathon matching");
//         try {
//             await matchingService.triggerHackathonMatching();
//             logger.log("Cron: hackathon matching completed");
//         } catch (err) {
//             logger.error("Cron: hackathon matching failed", { error: err.message });
//         }
//     });

//     // ── every hour — mark expired invitations + notify founders ──
//     cron.schedule("0 * * * *", async () => {
//         logger.info("Cron: checking expired invitations");
//         try {
//             await matchingService.checkExpiredInvitations();
//             logger.info("Cron: expired invitation check done");
//         } catch (err) {
//             logger.error("Cron: expired invitation check failed", { error: err.message });
//         }
//     });

// };

// module.exports = { initCronJobs };


const cron = require("node-cron");
const { collectDevpostHackathons } = require("../modules/hackathons/devpost.service");
const matchingService = require("../modules/matching/matching.service");
const logger = require("../config/logger");

const initCronJobs = () => {

    // ── midnight daily — scrape devpost hackathons ────────
    cron.schedule("0 0 * * *", async () => {
        logger.info("Cron: starting devpost hackathon collection");
        collectDevpostHackathons();
    });

    // ── every 10 seconds — trigger hackathon matching (testing) ──
    let isRunning = false;

    cron.schedule("*/2 * * * *", async () => {
        if (isRunning) return;

        isRunning = true;
        try {
            await matchingService.triggerHackathonMatching();
        } catch (err) {
            console.error(err);
        } finally {
            isRunning = false;
        }
    });

    // ── every hour — mark expired invitations + notify founders ──
    cron.schedule("0 * * * *", async () => {
        logger.info("Cron: checking expired invitations");
        try {
            await matchingService.checkExpiredInvitations();
            logger.info("Cron: expired invitation check done");
        } catch (err) {
            logger.error("Cron: expired invitation check failed", { error: err.message });
        }
    });

};

module.exports = { initCronJobs };