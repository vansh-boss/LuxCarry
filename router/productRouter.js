const express = require("express");
const router = express.Router();
const upload = require("../config/multerconfig");
const productModel = require("../model/product.model");

router.post("/create", upload.single("image"), async (req, res) => {
   try{
  let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

  let product = await productModel.create({
    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
  });
   req.flash("success", "Product created succefully");
   res.redirect("/owner/admin");
 
}catch(err){
   res.send(err.message);
}
     

//   res.send(product);
});





module.exports = router;
