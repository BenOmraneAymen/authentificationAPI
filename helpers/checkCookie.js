const jwt =  require('jsonwebtoken');

const checkCookie = (req,res,next) =>{
    const token = req.cookie.token
    console.log(token)
    try{
        const user = jwt.verify(token, process.env.SECRET_KEY)
        console.log(user);
        req.user = user
        next();
    
    }catch(err){
        res.clearCookie('token')
        return redirect('/')
    }
}

exports.checkCookie = checkCookie;