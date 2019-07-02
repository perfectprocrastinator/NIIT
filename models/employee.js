var mongoose=require('mongoose');
//mongooose.connect("mongodb://localhost/NIIT");
var employeeSchema=mongoose.Schema({
    date:String,
    name:String,
    role:String
})
module.exports=mongoose.model("Employee",employeeSchema);