const express = require("express");
const router = express.Router();

const noteController = require("../controllers/notes");

const { isAuthenticated } = require("../helpers/auth");

router.get("/", isAuthenticated, noteController.getNotes);

router.get("/add", isAuthenticated, noteController.getAddNotes);

router.post("/add", isAuthenticated, noteController.postAddNotes);

router.get("/edit/:id", isAuthenticated, noteController.getEditNotes);

router.put("/edit/:id", isAuthenticated, noteController.putEditNotes);

router.delete("/delete/:id", isAuthenticated, noteController.deleteEditNotes);

module.exports = router;
