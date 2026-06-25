require("dotenv").config();

const app = require("./src/app");
const prisma = require("./src/config/prisma");
const config = require("./src/config/env");
const logger = require("./src/config/logger");
// const cronJobs = require("./src/jobs/hackathon.cron");
// for scheduling the cron jobs
const { initCronJobs } = require("./src/utils/cron");
const { collectDevpostHackathons } = require("./src/modules/hackathons/devpost.service");

const PORT = config.port;

const RUN_SCRAPER_IMMEDIATELY = false;

// there is a note related to the prisma that it is lazy connection that means it will connect and ensure that the connection is correct in the first query called 
const startServer = async () => {
  try {
    //connect the database
    await prisma.$connect();
    //so rather than using console.log we will just using the logger for monitoring
    logger.info("postgreSQL connected via prisma 🔥");

    // for scheduling the cron jobs
    initCronJobs();
    logger.info("Cron jobs initialized successfully! ⏰");

    // // Immediate execution for testing
    if (RUN_SCRAPER_IMMEDIATELY) {
      logger.info("Running immediate hackathon collection for testing...");
      // Using .catch() here so the server still starts even if the initial scrape fails
      collectDevpostHackathons().catch((err) => {
        logger.error("Error during immediate collection:", err);
      });
      logger.info("Done devpost hackathon collection for testing! ✅");

    }

    //make the server
    app.listen(PORT, () => {
      logger.info(`server running on port ${PORT} 🚀`);
      logger.info(`Swagger docs available at http://localhost:${PORT}/api-docs 🔮`);
    });

  } catch (error) {
    // console.log("DB connection falied ", error);
    logger.error("DB connection failes ", error);
    process.exit(1);
  }
}

//and then just call the function to start the things
startServer();