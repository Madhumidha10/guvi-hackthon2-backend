const { check, oneOf, validationResult } = require("express-validator");

exports.signupValidator = [
  check("username").not().isEmpty().trim().withMessage("All fields required"),
  check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
  check("password").isLength({min:6}).withMessage("Password must be atleast 6 character long")
];

exports.signinValidator = [
    check("email").isEmail().normalizeEmail().withMessage("Invalid email"),
    check("password").isLength({min:6}).withMessage("Password must be atleast 6 character long")
  ];




exports.validatorResult=(req,res,next)=>{
    const result=validationResult(req)
    const hasError=!result.isEmpty()
    if(hasError)
    {
        const err=result.array()[0].msg
        return res.status(400).json({errMessage:err})
    }
    else
    {
        next()
    }
}
