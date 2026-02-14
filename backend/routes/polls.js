const express = require("express");
const Poll = require("../models/Poll");
const Vote = require("../models/Vote");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({
        error: "Question and at least 2 options are required",
      });
    }

    const poll = new Poll({
      question,
      options: options.map((opt) => ({ text: opt })),
    });

    await poll.save();

    res.status(201).json({ pollId: poll._id });
  } catch (error) {
    console.error("Error creating poll:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);

    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    res.json(poll);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/:id/vote", async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const ip =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ error: "Poll not found" });
    }

    if (
      optionIndex === undefined ||
      optionIndex < 0 ||
      optionIndex >= poll.options.length
    ) {
      return res.status(400).json({ error: "Invalid option" });
    }

    const existingVote = await Vote.findOne({
      pollId: poll._id,
      ip,
    });

    if (existingVote) {
      return res.status(403).json({
        error: "You have already voted from this IP",
      });
    }

    poll.options[optionIndex].votes += 1;
    await poll.save();

    await Vote.create({
      pollId: poll._id,
      ip,
    });

    const io = req.app.get("io");
    io.to(req.params.id).emit("poll-updated", poll);

    res.json(poll);
  } catch (error) {
    console.error("Voting error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
