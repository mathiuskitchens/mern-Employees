const Employee = require('../models/employeeModel.js');
const mongoose = require('mongoose');

// get all employees
const getAllEmployees = async (req, res) => {
  // createdAt -1 sorts in descending order
  const employees = await Employee.find({}).sort({ createdAt: -1 });

  res.status(200).json(employees);
};

// get single employee
const getEmployee = async (req, res) => {
  const { id } = req.params;
  // checks if id is valid type
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' });
  }

  const employee = await Employee.findById(id);

  if (!employee) {
    return res.status(404).json({ error: 'no such employee' });
  }

  res.status(200).json(employee);
};

// post or add new employee
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

  console.log(req.body);

  // check all input fields have been filled out, return error if not
  let emptyFields = [];

  if (!firstName) {
    emptyFields.push('firstName');
  }
  if (!lastName) {
    emptyFields.push('lastName');
  }
  if (!jobTitle) {
    emptyFields.push('jobTitle');
  }
  if (!skills) {
    emptyFields.push('skills');
  }
  if (!technologies) {
    emptyFields.push('technologies');
  }
  if (!tenure) {
    emptyFields.push('tenure');
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill out all required fields', emptyFields });
  }

  // add document to DB
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

// update an employee
const updateEmployee = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'invalid ID' });
  }

  /*   // check all Modal fields have been filled out, return error if not
  let ModalEmptyFields = [];

  if (!firstName) {
    ModalEmptyFields.push('firstName');
  }
  if (!lastName) {
    ModalEmptyFields.push('lastName');
  }
  if (!jobTitle) {
    ModalEmptyFields.push('jobTitle');
  }
  if (!skills) {
    ModalEmptyFields.push('skills');
  }
  if (!technologies) {
    ModalEmptyFields.push('technologies');
  }
  if (!tenure) {
    ModalEmptyFields.push('tenure');
  }
  if (ModalEmptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill out all required fields', ModalEmptyFields });
  }
 */

  const employee = await Employee.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    // returns new updated item instead of original
    { new: true }
  );

  if (!employee) {
    return res.status(400).json({ error: 'no such employee' });
  }

  res.status(200).json(employee);
};

// delete employee
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  // checks if id is valid type
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
