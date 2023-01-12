const Contact = require("../models/Contact");
const nodemailer = require("nodemailer");
exports.sendMessage = async (req, res) => {
  try {
    var newData = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      message: req.body.message,
    };
    await Contact.create(newData);
    await sendMail(req.body.email,`Message from ${req.body.name}(${req.body.email})`,`Contact Info:${req.body.phone}\n ${req.body.message}`)
    res.status(200).json({successMsg: "Your request received."});
  } catch (error) {
    res.status(500).json({errorMsg: "Internal Server Error"});
  }
};

const sendMail= async (email, subject, message) => {
  try {
    //create gmail transport based on my auth username and password
    var transport = nodemailer.createTransport({
      service: process.env.SERVICE,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    //create a compose mail content
    var composeMail = {
      from: email, //my user name
      to: process.env.USER, //email send to
      subject: subject, //subject of the mail
      text:message , //content of the mail
    };

    //sendMail function
    await transport.sendMail(composeMail, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    res.status(500).json({ errorMsg: "Internal Server Error" });
  }
};
