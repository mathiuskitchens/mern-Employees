const express = require("express");
const router = express.Router();

//middleware
//catches each use of router and logs time and date
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

//GET all employees
router.get("/", (req, res) => {
  console.log("Request all employees");
  res.json({ message: "Request all employees" });
});

//GET single employee using ":id" param
router.get("/:id", (req, res) => {
  console.log("Request single employee");
  res.json({ message: "Request single employee" });
});

//POST a new employee
router.post("/", (req, res) => {
  console.log("Add new employee");
  res.json({ message: "Add new employee" });
});

//PATCH some info about an existing employee
router.patch("/:id", (req, res) => {
  console.log("Update an employee");
  res.json({ message: "Update an employee" });
});

//DELETE an employee
router.delete("/:id", (req, res) => {
  console.log("Delete an employee");
  res.json({ message: "Delete an employee" });
});

module.exports = router;
