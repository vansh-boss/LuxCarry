const jwt = require("jsonwebtoken");
const userModel = require("../model/user.model");

module.exports = async function (req, res, next) {
    // 1️⃣ token check
    if (!req.cookies.token) {
        req.flash("err", "Please login first");
        return res.redirect("/");
    }

    try {
        // 2️⃣ token verify
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        // 3️⃣ user find
        const user = await userModel
            .findOne({ email: decoded.email })
            .select("-password");
        
        // 4️⃣ req.user attach
        req.user = user;

        // 5️⃣ allow request
        next();
    } catch (err) {
        req.flash("err", "Invalid token");
        return res.redirect("/");
    }
};
