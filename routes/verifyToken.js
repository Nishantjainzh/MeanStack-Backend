const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token) return res.send('Access denied "o" ')
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()
    } catch (error) {
        res.send('Invalid token')
    }
}