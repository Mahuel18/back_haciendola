const bcrypt = require('bcryptjs')

async function encryptPassword(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

module.exports = {
    encryptPassword
};