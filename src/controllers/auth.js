import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const userRegister = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(15);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hashPassword,
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
      return res.json({status:false,message:"You are not yet registed."})
    }
    else{
    const validated = await bcrypt.compare(req.body.password, user.password);
    if(!validated){ 
    return res.json({status:false, message: "Wrong credentials !!!" });
    }
    else{

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.SECRET_KEY,
      { expiresIn: "10d" }
    );
    const { password, ...newUser } = user._doc;
    res.status(200).json({status:true, newUser, accessToken });
    }
  } 
}
catch (err) {
    res.status(500).json({ message: err.message });
  }
};
