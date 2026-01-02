const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");
const { generateToken } = require("../utils/generateToken");




module.exports.registerUser = async function(req, res){
   try{
         let{email, password, fullname} = req.body;

         let user = await userModel.findOne({email: email});
         if(user) return res.status(401).send("you have alerdy  a account.. pleasuse login")


         bcrypt.genSalt(10, function (err, salt){
            bcrypt.hash(password, salt, async function(err, hash){
               if(err) return res.send(err.message);
               else {
                  let user = await userModel.create({
                     email,
                     password: hash, 
                     fullname,
                  });
                  let token = generateToken(user);
                  res.cookie("token",token);
                  res.send("user create succesfully");
               }

            });

         });
      }catch(err){
         res.send(err.message);
      }

};

module.exports.loginUser = async function (req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (!result) {
            return res.redirect("/");
        }

        // ✅ LOGIN SUCCESS
        const token = generateToken(user);
        res.cookie("token", token);

        return res.redirect("/shop"); // 👈 yahin jana hai
    });
};


module.exports.logout = function(req, res){
    res.cookie("token", "");
    res.redirect("/");
}
