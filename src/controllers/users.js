const User = require("../models/user");
const passport = require("passport");

exports.getSignIn = (req, res, next) => {
  res.render("users/signin");
};

exports.postSingIn = passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

exports.getSignUp = (req, res, next) => {
  res.render("users/signup");
};

exports.postSignUp = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = [];

  if (
    (name.length <= 0 && email.length <= 0 && password.length <= 0,
    confirmPassword.length <= 0)
  ) {
    errors.push({ text: "Complete los campos" });
  }
  if (password !== confirmPassword) {
    errors.push({ text: "Contraseñas no coinciden" });
  }
  if (password.length <= 4) {
    errors.push({ text: "Contraseña de al menos cuatro caracteres" });
  }
  if (errors.length > 0) {
    res.render("users/signup", { errors, name, email });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("errors", "Usuario ya registrado");
      res.redirect("/users/signup");
    } else {
      const user = new User({ name, email, password });
      user.password = await user.encryptPassword(password);
      await user.save();
      req.flash("success", "Bienvenido nuevo usuario");
      res.redirect("/users/signin");
    }
  }
};

exports.getLogout = (req, res, next) => {
  req.logOut();
  res.redirect("/");
};
