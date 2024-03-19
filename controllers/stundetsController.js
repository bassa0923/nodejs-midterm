const express = require("express");
const { fetchStudents } = require("../models/prisma");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await fetchStudents();
    res.render("students", { students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
