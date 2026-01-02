const express = require("express");
const router = express.Router();
// const owner = require("../model/owner.model");
const ownerModel = require("../model/owner.model");





router.get("/", function(req, res){
   res.send("hey it work ownber")

});

console.log(process.env.NODE_ENV);



if(process.env.NODE_ENV === "development"){
   router.post("/create", async function(req,res){
      let owner = await ownerModel.find();
      if(owner.length > 0){
         return res
            .status(500)
            .send("you don't have permission to create ");
      }

      let {fullname, email, password}=req.body;


      let createOwner = await ownerModel.create({
            fullname,
            email,
            password,
      });
      res.status(201).send(createOwner);
   });
}
router.get("/admin", function(req,res){
   let success = req.flash("success");
    res.render("createproducts", { success });
      // success: req.flash("success");

})



module.exports = router;