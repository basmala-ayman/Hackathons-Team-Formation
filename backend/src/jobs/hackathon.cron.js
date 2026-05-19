const cron = require("node-cron");
const prisma = require("../config/prisma");

// runs every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    console.log("🔄 Checking expired hackathons...");

    await prisma.hackathon.updateMany({
      where: {
        status: { in: ["UPCOMING", "ONGOING"] },
        endDate: { lt: new Date() }
      },
      data: {
        status: "ENDED"
      }
    });

    console.log("✅ Hackathons updated successfully");
  } catch (error) {
    console.error("❌ Cron error:", error.message);
  }
});