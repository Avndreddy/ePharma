const bcrypt = require("bcrypt");

const salt = 10;
// Meathod to create HashPassword
async function createHashPassowrd(Password) {
  try{
    return Password ? await bcrypt.hash(Password, salt) : null;
}catch(error){
    console.log(error);
    return error;
}
}
// Meathod to compare passwords
async function comparePassword(Password, hashPassword) {
    try{
        return await bcrypt.compare(Password, hashPassword)
    }catch(error){
        console.log(error);
        return error
    }
}


module.exports = {comparePassword,createHashPassowrd};