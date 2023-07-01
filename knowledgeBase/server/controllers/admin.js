const Note = require("../models/Notes");
const User = require("../models/User")
const mongoose = require("mongoose");

exports.adminAuth = async (req, res) => {
  let message = "";
  res.render("dashboard/adminAuth", {
    message,
    layout: "../views/layouts/admin",
  });
}

exports.listUsers = async (req, res) => {
  try {
  //   let searchTerm = req.body.searchTerm;
  //   const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

  console.log(req.body);
  let body = req.body;
  if(body.user === "admin", body.pass === "admin"){
    const searchResults = await User.find({
      googleId: { $exists: true }
    })
      console.log(searchResults)
    res.render("dashboard/admin", {
      searchResults,
      layout: "../views/layouts/admin",
    });
  }
  else{
    let message = "                          incorrect username or password"
    res.render("dashboard/adminAuth", {
      message,
      layout: "../views/layouts/admin",
    });
  }
  } catch (error) {
    console.log(error);
  }
};

exports.viewNote = async (req, res) => {

    let perPage = 12;
    let page = req.query.page || 1;
  
    const locals = {
      title: "Dashboard",
      description: "Free NodeJS Notes App.",
    };
  
    console.log("\n\n", req.params.id, "\n\n")
    try {
      // Mongoose "^7.0.0 Update
      const notes = await Note.aggregate([
        { $sort: { updatedAt: -1 } },
        { $match: { user: mongoose.Types.ObjectId(req.params.id) } },
        {
          $project: {
            title: { $substr: ["$title", 0, 30] },
            body: { $substr: ["$body", 0, 100] },
          },
        }
        ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec(); 
  
      const user = await User.findOne({ _id: req.params.id })
      const count = await Note.count();
  
      res.render('dashboard/adminDash', {
        userName: user.firstName,
        locals,
        notes,
        layout: "../views/layouts/admin",
        current: page,
        pages: Math.ceil(count / perPage)
      });
  
    } catch (error) {
      console.log(error);
    }
};

exports.deleteNote = async (req, res) => {
  try {
    console.log("\nDeleting user");
    await User.deleteOne({ _id: req.params.id });
    console.log("User Deleted");
    const searchResults = await User.find({
      googleId: { $exists: true }
    })
      // console.log(searchResults)
    res.render("dashboard/admin", {
      searchResults,
      layout: "../views/layouts/admin",
    });
  }
  catch (error) {
    console.log(error);
  }
}