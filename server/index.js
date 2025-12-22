const express = require('express');
const databaseConnection = require('./database')
const EmployeeRouter = require('./routes/employee.routes')
const cors = require("cors")
// database Connection
databaseConnection();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req , res) => {
    res.send('Hello World')
})

app.use('/Employee', EmployeeRouter)

app.listen(8000, (err) =>{
    console.log('listning on 8000')
})
