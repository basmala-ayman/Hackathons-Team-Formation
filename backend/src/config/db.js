const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("PostgreSQL connected ✅");
  } catch (error) {
    console.error("Database connection error ❌:", error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };