const { Employee } = require("../model/employee.model");

const handleEmployeeDataController = async (req, res) => {
  try {
    const body = req.body;

    if (
      !body.EmployeeName ||
      !body.JobTitle ||
      !body.Sallary ||
      !body.Address ||
      !body.JoiningDate ||
      !body.ContactNo
    ) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }

    const employeeAdd = await Employee.create(body);

    return res.status(201).json({
      sucess: true,
      message: "Employee created successfully",
      data: employeeAdd,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json({
      sucess: true,
      TotalCount: employees.length,
      data: employees,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: error.message,
    });
  }
};

const handleEmployeeDeleteController = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const handleemployeeListEditController = async (req, res) => {
  try {
    const body = req.body;
    const updating = await Employee.updateOne(
      { _id: body?._id },
      { $set: body }
    );
    console.log(updating);
    if (updating?.acknowledged) {
      return res.json({
        Message: "Employee Detail Updated Sucessfully",
        success: true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  handleEmployeeDataController,
  getAllEmployees,
  handleEmployeeDeleteController,
  handleemployeeListEditController
};
