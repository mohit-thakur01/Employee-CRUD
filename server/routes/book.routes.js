const express = require("express");
const {
  handleEmployeeDataController,
  getAllEmployees,
  handleEmployeeDeleteController, handleemployeeListEditController
} = require("../controller/employee.controller");

const router = express.Router();

//http://localhost:8000/employee
router.post("/adddata", handleEmployeeDataController);
router.get("/", getAllEmployees);
router.post("/deletedata", handleEmployeeDeleteController);
router.put("/updatedetail", handleemployeeListEditController);


module.exports = router;
