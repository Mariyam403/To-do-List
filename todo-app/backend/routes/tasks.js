const router = require("express").Router();
const Task = require("../models/Task");

// GET all
router.get("/", async (_req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
});

// CREATE
router.post("/", async (req, res) => {
  try {
    if (!req.body.title?.trim())
      return res.status(400).json({ error: "Title is required" });
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const existing = await Task.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Task not found" });
    if (req.body.completed === true && existing.completed)
      return res.status(400).json({ error: "Task is already completed" });
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json(updated);
  } catch (e) { res.status(400).json({ error: e.message }); }
});

// DELETE
router.delete("/:id", async (req, res) => {
  const deleted = await Task.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Task not found" });
  res.json({ success: true });
});

module.exports = router;
