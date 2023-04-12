const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
require("dotenv").config();

const Blogs = (req, res) => {
  const id = req.params.id;
  Blog.find()
    .then((result) => res.status(201).json(result))
    .catch((err) => console.log(err));
};

//extract user ID from token
const getUser = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET);
  var userID = decoded;
};

// get single event

const getSingleEvent = (req, res) => {
  try {
    const id = req.params.id;
    Event.findById(id).then((result) => res.status(201).json(result));
  } catch (err) {
    const error = err.message;
    res.status(400).json({ error: error });
  }
};

// New event controller
const createNew = async (req, res) => {
  try {
    console.log('create new called')
    const blog = new Blog(req.body);
    // await console.log(blog)
    await blog.save();
  } catch (err) {
    const error = err.message;
    console.log(error)
    res.status(400).json({ error: error });
  }
};

// Event edit cotroller
const edit = (req, res) => {
  const id = req.params.id;
  console.log("update called");

  Event.findByIdAndUpdate(
    id,
    {
      $set: {
        start: req.body.start,
        end: req.body.end,
        name: req.body.name,
        location: req.body.location,
        allDay: req.body.allDay,
      },
    },
    { new: true }
  )
    .then((result) => res.json({ result }))
    .catch((err) => console.log(err));
};

// Event delete cotroller
const deleteEvent = (req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((result) => res.json({ result }))
    .catch((err) => console.log(err));
};

module.exports = { Blogs, createNew };
