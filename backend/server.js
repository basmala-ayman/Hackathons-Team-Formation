require("dotenv").config();

const app = require("./app");
const prisma = require("./src/config/prisma");
const config = require("./src/config/env");
const logger=require("./src/config/logger");

const PORT = config.port;

// there is a note related to the prisma that it is lazy connection that means it will connect and ensure that the connection is correct in the first query called 
const startServer = async () => {
  try {
    //connect the database
    await prisma.$connect();
    // console.log("postgreSQL connected via prisma 🔥 ");

    //so rather than using console.log we will just using the logger for monitoring
    logger.info("postgreSQL connected via prisma 🔥");

    //make the server
    app.listen(PORT, () => {
      // console.log(`server running on port ${PORT} 🚀`)

      logger.info("server running on port ${PORT} 🚀");
    });

  } catch (error) {
    // console.log("DB connection falied ", error);

    logger.error("DB connection failes ", error);
    process.exit(1);
  }
}


//and then just call the function to start the things
startServer();