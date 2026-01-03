require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");
const { JWT_KEY } = require("./config/keys");
const compression = require("compression");



const { connectDB } = require("./config/mongoose.connection");
connectDB();

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const ownerRouter = require("./router/ownerRouter");
const indexRouter = require("./router/indexRouter");

const { connectDB } = require("./config/mongoose.connection");


require("./config/mongoose.connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  expressSession({
    resave: false,
    saveUninitialized: true,
    secret: JWT_KEY || "fallback_secret",
  })
);

app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));



app.use(compression());
app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/owner/product", productRouter);
app.use("/user", userRouter);

module.exports = app;   // ✅ VERY IMPORTANT
