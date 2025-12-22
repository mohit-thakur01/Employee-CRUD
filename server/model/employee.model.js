
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    EmployeeName:{
        type:String,
        required:true
    },
    JobTitle :{
        type:String,
        require:true
    },
    Sallary :{
        type:String,
        require:true
    },
    Address :{
        type:String,
        require:true
    },
    JoiningDate :{
        type:String,
        require:true
    },
    ContactNo :{
        type:String,
        require:true
    }
}, 
 { timestamps: true })

 const Employee = mongoose.model('employees', employeeSchema)

 module.exports = {Employee}
