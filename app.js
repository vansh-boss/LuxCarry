require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const flash = require("connect-flash");

const { connectDB } = require("./config/mongoose.connection");

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const ownerRouter = require("./router/ownerRouter");
const indexRouter = require("./router/indexRouter");

// DB connect (safe for Render)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ❌ PRODUCTION me session mat chalao (Render FREE)
if (process.env.NODE_ENV !== "production") {
  const expressSession = require("express-session");
  app.use(
    expressSession({
      resave: false,
      saveUninitialized: true,
      secret: process.env.JWT_KEY || "fallback_secret",
    })
  );
  app.use(flash());
}

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use("/", indexRouter);
app.use("/owner", ownerRouter);
app.use("/owner/product", productRouter);
app.use("/user", userRouter);

// ✅ Render needs this
const PORT = process.env.PORT || 1800;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
