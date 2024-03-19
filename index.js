const express = require("express");
const studentsController = require("./controllers/stundetsController");
const addStudentController = require("./controllers/addStudentController");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

app.get("/addstudent", (req, res) => {
  res.render("addstudent", { errors: [], name: "", surname: "", age: "" }); // Rendering addstudents.ejs template
});

//  route for students
app.use("/", studentsController);
app.use("/addstudent", addStudentController);

// Starting server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
