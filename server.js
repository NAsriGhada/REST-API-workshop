const express = require("express");
const connectDB = require("./config/connectDB");
const user = require("./models/userModel");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

connectDB();

// ! POST
app.post("/api/adduser", async (req, res) => {
  try {
    console.log("what req looks like", req);
    console.log("what req.body looks like", req.body);
    const { name, lastName, age } = req.body; // extract values from request body
    const newUser = await user.create({ name, lastName, age }); // create new user object with extracted values
    console.log(newUser);
    res.status(200).json({ message: "user added successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ! GET ALL
app.get("/api/getAllUsers", async (req, res) => {
  console.log("Received GET request for all users");
  try {
    const userslist = await user.find();
    res.status(200).json(userslist);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// ! UPDATE
app.put("/api/updateuser/:id", async (req, res) => {
  try {
    // const update = await user.findByIdAndUpdate(req.params.id, {
    //   $set: { ...req.body },
    // });
    const update = await user.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body },
      },
      { new: true }
    );
    console.log("update:", update);
    res
      .status(200)
      .json({ message: "user updated successfully", data: update });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// ! DELETE
app.delete("/api/delete/:id", async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    console.log(req.params);
    res.status(400).json({ message: "user is deleted" });
  } catch (err) {
    res.status(400).json({ err });
  }
});

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log(`app listening on port ${PORT}`)
);
