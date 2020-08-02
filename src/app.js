const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const session = require("express-session");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const passport = require("passport");

const MONGODB_URI =
  "mongodb+srv://Carl:Okami1928@cluster0-hvut0.mongodb.net/notes?retryWrites=true&w=majority";

// Initializations
const indexRoutes = require("./routes/index");
const notesRoutes = require("./routes/notes");
const userRoutes = require("./routes/users");
const app = express();
require("./config/passport");

// Settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

// Routes
app.use(indexRoutes);
app.use("/notes", notesRoutes);
app.use("/users", userRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "public")));

// Server is listenning
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("DB is connected");
  })
  .catch((err) => {
    console.log("DB has problems");
    console.log(err);
  });

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
