const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.signupController = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({ errMessage: "Email already exists" });
    }
    var salt = await bcrypt.genSalt(10);
    var hash = await bcrypt.hash(password, salt);
    const newUser = {
      username: username,
      email: email,
      password: hash,
    };
    await User.create(newUser);
    res.json({ successMsg: "Registration Success.Please Signin" });
  } catch (error) {
    console.log("Signup Controller Error:", error);
    res.status(500).json({ errMessage: "Server Error" });
  }
};

exports.signinController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ errMessage: "Invalid credentials" });
    }
    // console.log(user.password)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errMessage: "Invalid credentials" });
    }
    const payload= {user:{_id: user._id}}
    jwt.sign(payload,process.env.SECRET_KEY,{ expiresIn: "24h" },(err,token)=>{
        if(err)console.log('jwt err :',err)
        const {_id,username,email,role}=user;
        res.json({token,user:{_id,username,email,role}})
        
    })
    
  } catch (error) {
    console.log("Signin Controller Error:", error);
    res.status(500).json({ errMessage: "Server Error" });
  }
};
