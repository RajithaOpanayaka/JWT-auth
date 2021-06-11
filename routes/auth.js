const express=require('express');
const router=express.Router();
const User=require('../model/User');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post("/register",async (req,res)=>{
    
    //Checking if the user is already in the database
    //by email
    const emailExist=await User.findOne({email:req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    //Hash password
    const hashPassword=await bcrypt.hash(req.body.password,10);

    //Create a new User
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    });
    try{
        const savedUser=await user.save();
        res.send({user:user._id});
    }catch(err){    
        res.status(400).send(err);
    }

})

router.post('/login',async (req,res)=>{
    //Checking if the user is already in the database
    //by email
    const user=await User.findOne({email:req.body.email});
    if (!user) return res.status(400).send('Email is not found');

    //Hash password
    const validPass=await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    ///Create and assign a token

    const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
    res.header('auth-token',token).send(token);

})


module.exports=router;