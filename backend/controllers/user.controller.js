const userModel=require('../models/user.model')
const userService=require('../services/user.service')
const {validationResult}=require('express-validator')
const blacklistTokenModel=require('../models/blacklistToken.model')

module.exports.registerUser=async(req,res,next)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    
    const {fullname,email,password}=req.body

    const isUserAlready = await userModel.findOne({email})

    if(isUserAlready){
        return res.status(400).json(
            {message:'User already exsit'}
        )
    }

    const hashedPassword=await userModel.hashPassword(password)

    const user=await userService.createUser({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashedPassword
    })
    const token=user.generateAuthToken()

    res.status(201).json({token,user})
}

module.exports.loginUser=async(req,res,next)=>{
    const errors=validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors:errors.array()})
    }

    const {email,password}=req.body

    const user=await userModel.findOne({email}).select('+password')

    if (!user) {
        return res.status(401).json({message:'Invalid email or password'})
    }

    const isMatch=await user.comparePassword(password)

    if (!isMatch) {
        return res.status(401).json({message:"Invalid email or password"})
    }

    const token=user.generateAuthToken()

    res.cookie('token',token)

    res.status(200).json({token , user})
}

module.exports.getUserprofile=async(req,res,next)=>{
    res.status(200).json(req.user)
}

// Get Edit Profile Page

// controllers/user.controller.js

module.exports.getProfile = async (req, res) => {
  try {
    // req.user is already populated by auth middleware
    const user = req.user;

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error('Get Profile Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports.getEditProfile = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.status(200).json(user);
};




// Update Profile
module.exports.updateUserProfile = async (req, res, next) => {
    try {
       const userId = req.user._id;
       
       const {firstname , lastname , email, profilePic}=req.body // profilePic is extracted here

       const updatedUser=await userModel.findByIdAndUpdate(
        userId,
        {
            'fullname.firstname':firstname,
            'fullname.lastname':lastname || ' ',
            email,
            profilePic, // This is where the profilePic (URL or base64) will be saved
        },
        {new:true}
       )

       res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:'Error updating profile',error:error.message})
    }
  
};

module.exports.logoutUser=async(req,res,next)=>{
    
    const token=req.cookie?.token || req.headers.authorization?.split(' ')[1]

    await blacklistTokenModel.create({token})
    res.clearCookie('token')
    res.status(200).json({
        message:'Logged out'
    })
}