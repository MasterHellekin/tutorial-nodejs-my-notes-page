const Note = require("../models/Note");

exports.getNotes = async (req, res, next) => {
  const notes = await Note.find({ user: req.user.id }).sort({
    created_at: "desc",
  });
  res.render("notes/notes", {
    notes: notes,
    pageTitle: "Mis Notas",
  });
};

exports.getAddNotes = (req, res, next) => {
  res.render("notes/add-note", {
    pageTitle: "Nueva Nota",
  });
};

exports.postAddNotes = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const errors = [];
  if (!title) {
    errors.push({ text: "Por favor escribe un título" });
  }
  if (!description) {
    errors.push({ text: "Por favor escribe una descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/add-note", {
      errors,
      title,
      description,
    });
  } else {
    const note = new Note({
      title,
      description,
    });
    note.user = req.user.id;
    await note.save();
    console.log(note);
    req.flash("success", "Nota añadida exitosamente");
    res.redirect("/notes");
  }
};

exports.getEditNotes = async (req, res, next) => {
  const noteId = req.params.id;
  const note = await Note.findById(noteId);
  res.render("notes/edit-note", {
    note: note,
    pageTitle: "Editar Nota",
  });
};

exports.putEditNotes = async (req, res, next) => {
  const noteId = req.params.id;
  const title = req.body.title;
  const description = req.body.description;
  await Note.findByIdAndUpdate(noteId, {
    title,
    description,
  });
  req.flash("success", "Nota actualizada exitosamente");
  res.redirect("/notes");
};

exports.deleteEditNotes = async (req, res, next) => {
  const noteId = req.params.id;
  await Note.findByIdAndDelete(noteId);
  req.flash("success", "Nota borrada exitosamente");
  res.redirect("/notes");
};
