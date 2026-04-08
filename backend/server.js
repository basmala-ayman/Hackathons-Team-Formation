require("dotenv").config();

const app = require("./app");
const { connectDB } = require("./src/config/db");

const PORT = process.env.PORT || 3000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});
const { sequelize } = require("./src/config/db");

connectDB().then(() => {
  sequelize.sync(); // creates tables
});