
const mongoose = require('mongoose');


const databaseConnection = async () => {
   mongoose.connect('mongodb://localhost:27017/employeedetails')
      .then(()=>{
        console.log('Database Connected Sucessfully ')
      }).catch((err) => {
        console.log('Database connection Faied' , err);
      })
    }

    module.exports = databaseConnection;
