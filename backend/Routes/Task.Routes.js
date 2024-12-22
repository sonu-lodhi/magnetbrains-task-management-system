const { Router } = require("express");
const { TaskModel } = require("../Model/Task.model");
const jwt = require('jsonwebtoken');

const TaskRouter = Router();

// Middleware for authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Getting All Task Data
TaskRouter.get("/", async (req, res) => {
  try {
    const { page } = req.query;
    const limit = 6;
    const skip = (page - 1) * limit;
    const task = await TaskModel.find().skip(skip).limit(limit);
    res.send({ message: "Getting Task Data", task });
  } catch (err) {
    res.send("Something wrong in getting task data");
  }
});

// Getting Task Data by ID
TaskRouter.get("/:id", async (req, res) => {
  try {
    const taskId = await TaskModel.findById(req.params.id);
    res.send({ message: "Getting Task Data by Id", taskId });
  } catch (err) {
    res.send("Something wrong in getting task data by ID");
  }
});

// Create a Task
TaskRouter.post("/create", async (req, res) => {
  try {
    const task = new TaskModel({ ...req.body });
    await task.save();
    res.send({ msg: "New Task has been added", task: req.body });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Update Task
TaskRouter.put("/update/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (task) {
      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.dueDate = req.body.dueDate || task.dueDate;
      task.priority = req.body.priority || task.priority;

      const updatedTask = await task.save();
      res.send({ message: "Update Successfully", updatedTask });
    } else {
      res.send({ message: "Task not found" });
    }
  } catch (err) {
    res.send({ message: "Something Wrong with Update", err });
  }
});

TaskRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deleteTask = await TaskModel.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      res.send("Something Wrong with Delete");
    } else {
      res.send({ message: "Task Delete Successfully", deleteTask });
    }
  } catch (err) {
    res.send({ message: "Something Wrong with deleting Task", err });
  }
});

TaskRouter.put("/complete/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (task) {
      task.status = "completed";
      const updatedTask = await task.save();
      res.send(updatedTask);
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

module.exports = {
  TaskRouter,
};
