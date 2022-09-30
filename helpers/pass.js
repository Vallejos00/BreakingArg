import bcrypt from "bcrypt"
const saltRounds = 10;

const encrypt = async (pass) => {
    return await bcrypt.hash(pass, saltRounds)
};

const decrypt = async (pass, hashedPass) => {
    return await bcrypt.compare(pass, hashedPass) 
};

const securePass = {encrypt, decrypt}
export default securePass