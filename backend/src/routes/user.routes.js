const express = require("express");
const router = express.Router();

// GET users
router.get("/", (req, res) => {
  res.send("Users route working ✅");
});

module.exports = router;