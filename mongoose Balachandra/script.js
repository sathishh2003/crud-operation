const mongoose = require('mongoose');

const User = require('./schemas/userSchema');

main().catch((er)=>{
    console.log(er);
})

async function main(){
    await mongoose.connect('mongodb://localhost/testdb');
    
    const user = await User.findOne({name:'sathish'});
    user.sayHello()
    console.log(user);
}