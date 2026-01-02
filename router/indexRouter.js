const express = require("express");
const router  = express.Router();


const isLoggedin = require("../middlewares/isLoggedin");
const productModel = require("../model/product.model");
const userModel = require("../model/user.model");


router.get("/", function (req,res){
    let error = req.flash("error");
    res.render("index", {error ,loggedin: false });

});




router.get("/cart", isLoggedin, async (req, res) => {
  const user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  let productsToShow = [];
  let bill = 0;

  if (user.cart.length > 0) {
    productsToShow = user.cart;

    bill = productsToShow.reduce((total, p) => {
      return total + (Number(p.price) - Number(p.discount || 0));
    }, 0);
  } else {
    const latestProduct = await productModel.findOne().sort({ _id: -1 });
    productsToShow = [latestProduct];
    bill = Number(latestProduct.price) - Number(latestProduct.discount || 0);
  }

  res.render("cart", {
    products: productsToShow,
    bill
  });
});


router.get("/shop", isLoggedin, async function(req,res){
     let products = await productModel.find();
     let success = req.flash("success");
     res.render("shop",{ products ,  success });

    
});



router.get("/addtocart/:productid", isLoggedin, async function (req, res){
  
    let user = await userModel.findOne({ email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "added tok cart");
    res.redirect("/cart");
})

router.get("/admin", isLoggedin, async function (req, res) {
    let products = await productModel.find();
    res.render("admin", { products });
});



module.exports = router;    