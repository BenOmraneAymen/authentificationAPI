const bcrypt = require('bcrypt')
const saltRounds = 10

const hashPassword = (password) => {
    return bcrypt.hash(password, saltRounds)
}

const checkPassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}

module.exports = { hashPassword, checkPassword }