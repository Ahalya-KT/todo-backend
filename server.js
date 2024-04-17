const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");
require("dotenv").config();
const Todo = require("./models/Todo");

// execute express
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Get request:Get All Task
app.get("/todo", async (req, res) => {
  const toDos = await Todo.find();
  res.json(toDos);
});

// Post Request:Create a new task
app.post("/todo/new", async (req, res) => {
  const newTask = await Todo.create(req.body);
  res.status(201).json({ newTask });
});

// Delete Request:Delete a task
app.delete("/todo/delete/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json(result);
});

const port = 4001;
app.listen(port, () => console.log(`Server is running on port ${port}`));

const connectionString = process.env.MONGO_URI;
mongoose
  .connect(connectionString)
  .then(() => console.log("connected to the database..........."))
  .catch((err) => console.log("connection error", err));

