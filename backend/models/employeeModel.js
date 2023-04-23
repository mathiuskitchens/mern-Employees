const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    skills: Array,
    technologies: Array,
    tenure: Number,
    address: {
      streetNum: Number,
      streetName: String,
      streetType: String,
      city: String,
      state: String,
      zip: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeeSchema);
