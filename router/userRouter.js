const express = require("express");

const router = express.Router();
const { registerUser , loginUser , logout } = require("../controller/authController");


router.get("/", function(req, res){
   res.send("hey it work users ")

});
   



router.post("/register", registerUser);

router.post("/login", loginUser);
 
router.get("/logout",logout);

// router.get("/cart",cart);  



module.exports = router;