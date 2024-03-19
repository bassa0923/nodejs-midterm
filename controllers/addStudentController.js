const express = require("express");
const { addStudent } = require("../models/prisma");

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, surname, age } = req.body;
  const parsedAge = parseInt(age);

  let errors = [];

  // Validation for name
  if (
    !name ||
    typeof name !== "string" ||
    name.length < 3 ||
    !/^[a-zA-Z]+$/.test(name)
  ) {
    errors.push("Name is invalid");
  }

  // Validation for surname
  if (
    !surname ||
    typeof surname !== "string" ||
    surname.length < 3 ||
    !/^[a-zA-Z]+$/.test(surname)
  ) {
    errors.push("Surname is invalid");
  }

  // Validation for age
  if (isNaN(parsedAge) || parsedAge <= 0 || parsedAge >= 120) {
    errors.push("Age is invalid");
  }

  if (errors.length > 0) {
    // Render the same page with error messages
    return res.render("addstudent", { errors, name, surname, age });
  }

  try {
    const newStudent = await addStudent(name, surname, parsedAge);
    // Redirect to the home page ("/") after adding the student
    res.redirect("/");
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ success: false, error: "Failed to add student" });
  }
});

module.exports = router;
