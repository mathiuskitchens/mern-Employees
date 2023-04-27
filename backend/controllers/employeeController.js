const Employee = require('../models/employeeModel.js');
const mongoose = require('mongoose');

//get all employees
const getAllEmployees = async (req, res) => {
  //createdAt -1 sorts in descending order
  const employees = await Employee.find({}).sort({ createdAt: -1 });

  res.status(200).json(employees);
};

//get single employee
const getEmployee = async (req, res) => {
  const { id } = req.params;
  //checks if id is valid type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' });
  }

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).json({ error: 'no such employee' });
  }

  res.status(200).json(employee);
};

//post or add new employee
const createEmployee = async (req, res) => {
  const {
    firstName,
    lastName,
    jobTitle,
    skills,
    technologies,
    tenure,
    address,
  } = req.body;

  //add document to DB
  try {
    const employee = await Employee.create({
      firstName,
      lastName,
      jobTitle,
      skills,
      technologies,
      tenure,
      address,
    });
    res.status(200).json(employee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' });
  }

  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!employee) {
    return res.status(400).json({ error: 'no such employee' });
  }

  res.status(200).json(employee);
};

//delete employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  //checks if id is valid type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' });
  }

  const employee = await Employee.findOneAndDelete({ _id: id });

  if (!employee) {
    return res.status(400).json({ error: 'no such employee' });
  }

  res.status(200).json(employee);
};

module.exports = {
  createEmployee,
  getEmployee,
  getAllEmployees,
  deleteEmployee,
  updateEmployee,
};
