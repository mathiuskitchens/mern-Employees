const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 3000;

//express app
const app = express();

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//ROUTE handlers
//respond to GET request
app.get("/", (req, res) => {
  res.json("message: received GET request");
});

//listening for requests on port
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
