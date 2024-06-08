const mongoose = require('mongoose');


const addressSchema = new mongoose.Schema({
    street:String,
    district:String,
    pincode:Number
});

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:100
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    address:addressSchema
});

userSchema.methods.sayHello = function(){
    console.log(`Hi! this is ${this.name} and my age is ${this.age}`);
}


module.exports = mongoose.model("user",userSchema);