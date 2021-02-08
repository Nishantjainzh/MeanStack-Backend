const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/register',async(req, res)=>{
    const existMail = await User.findOne({email:req.body.email})     

    if(existMail) return res.send('EMail is alrady register')
    const salt = await bcrypt.genSalt(10)
    const hashpassword = await bcrypt.hashSync(req.body.password, salt)
    const userInfo = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    })
    try {
        const saveInfo = await userInfo.save()
        res.json(saveInfo)
        
    } catch (error) {
        console.log(error);
    }
})
router.post('/login', async(req, res)=>{
    let user = await User.findOne({email:req.body.email})
    if(!user) return res.json('Email is not found')

    let existPass = await bcrypt.compare(req.body.password,user.password)
    if(!existPass) return res.json('Password is not valid')
    //create and assign token
    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('authentication-token',token).send({tokenVal:token})
})

module.exports=router

