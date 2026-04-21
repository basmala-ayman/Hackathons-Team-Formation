const cron = require("node-cron");
const { collectDevpostHackathons } = require("../modules/hackathons/devpost.service");

const initCronJobs = () => {
    // run every day at midnight
    cron.schedule("0 0 * * *", async () => {
        console.log("Running daily hackathon collection job...");
        collectDevpostHackathons();
    });
};

module.exports = { initCronJobs };