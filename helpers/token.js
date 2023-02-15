const jwt = require('jsonwebtoken')

function checkToken(accessToken,jwtSecretKey){
    try {
        const token = accessToken.replace('Bearer ','')
        const verified = jwt.verify(token, jwtSecretKey);
        console.log(verified)
        if(verified){
           return true
        }else{
            // Access Denied
            console.log('false token ')
            return false
        }
    } catch (error) {
        // Access Denied
        console.log(error)
        return false
    }
}

module.exports = checkToken