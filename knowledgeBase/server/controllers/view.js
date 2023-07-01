const Note = require("../models/Notes");
const mongoose = require("mongoose");


exports.viewNote = async (req, res) => {
  const note = await Note.findById({ _id: req.params.id })
    .lean();

    // console.log(note);
    note.id = req.params.id;
  if (note) {
    res.render("dashboard/view", {
      noteID: req.params.id,
      note,
      layout: "../views/layouts/admin",
    });
  } else {
    res.send("Something went wrong.");
  }
};

