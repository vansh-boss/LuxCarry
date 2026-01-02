require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser  = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");




const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const ownerRouter = require("./router/ownerRouter");
const indexRouter = require("./router/indexRouter");





const db = require("./config/mongoose.connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

app.use(
        expressSession({
            resave: false,
            saveUninitialized: false,
            secret:  process.env.JWT_KEY,
        })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

// app.get("/", (req,res) =>{
//     res.send("hel");
// })




app.use("/",indexRouter);

app.use("/owner",ownerRouter);

app.use("/owner/product",productRouter);

app.use("/user",userRouter);




app.listen(8100, () => {
    console.log("Server running on port 8100");
});
