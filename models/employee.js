var mongoose = require('mongoose');
//mongooose.connect("mongodb://localhost/NIIT");
var employeeSchema=mongoose.Schema({
    Date:String,
    Fname:String,
    Lname:String,
    Attendance:String,
    Sex:String,
    Phone:String,
    Role:String,
    EmploymentType:String,
    CurrProject:String,


})
module.exports=mongoose.model("Employee",employeeSchema);