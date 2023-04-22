const express = require("express");
const employeeRoutes = require("./routes/employees");
require("dotenv").config();
const port = process.env.PORT || 3000;

//express app
const app = express();

//middleware
//checks for body of request
app.use(express.json());

//catches any requests and logs path and method used
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//ROUTE handlers
//respond to any request at /api/employees, using employeeRoutes
app.use("/api/employees", employeeRoutes);

//listening for requests on port
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
