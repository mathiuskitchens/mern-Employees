const express = require("express");
//pulls in Workout model for use
const Employee = require("../models/employeeModel.js");
const {
  createEmployee,
  getAllEmployees,
  getEmployee,
  deleteEmployee,
  updateEmployee,
} = require("../controllers/employeeController.js");
const router = express.Router();

//middleware
//catches each use of router and logs time and date
router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

//GET all employees
router.get("/", getAllEmployees);

//GET single employee using ":id" param
router.get("/:id", getEmployee);

//POST a new employee
router.post("/", createEmployee);

//PATCH some info about an existing employee
router.patch("/:id", updateEmployee);

//DELETE an employee
router.delete("/:id", deleteEmployee);

module.exports = router;
