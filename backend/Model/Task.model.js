const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  duedate: { type: Date, default: Date.now },
  status: { type: String, enum: ["Pending", "completed"], default: "Pending" },
  priority: { type: String},
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
  TaskModel,
};
