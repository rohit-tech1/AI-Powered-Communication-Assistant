// import { analyzeSentiment, detectPriority, generateDraftReply } from "../services/aiService.js";

// const express = require('express');
// const router = express.Router();
// const Email = require('../models/Email');

// // GET /api/emails → list emails (urgent first, then latest first)
// router.get('/', async (req, res) => {
//   try {
//     const emails = await Email.find()
//       .sort({ priorityScore: -1, receivedAt: -1 })
//       .limit(200);
//     res.json(emails);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // GET /api/emails/:id → single email detail
// router.get('/:id', async (req, res) => {
//   try {
//     const email = await Email.findById(req.params.id);
//     if (!email) return res.status(404).json({ error: 'Not found' });
//     res.json(email);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: 'Invalid id' });
//   }
// });

// // POST /api/emails → create new email (useful for testing)
// router.post('/', async (req, res) => {
//   try {
//     const { from, subject, body } = req.body;
//     if (!from || !subject) {
//       return res.status(400).json({ error: 'from & subject required' });
//     }

//     const newEmail = await Email.create({
//       messageId: `msg_${Date.now()}`,
//       from,
//       subject,
//       body,
//       receivedAt: new Date()
//     });

//     res.status(201).json(newEmail);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Create failed' });
//   }
// });

// module.exports = router;


import express from "express";
// const Email = require("../models/Email");
import Email from "../models/Email.js";

// const { analyzeSentiment, detectPriority, generateDraftReply } = require("../services/aiService.js";
import { analyzeSentiment, detectPriority, generateDraftReply } from "../services/aiService.js";

const router = express.Router();

// POST /api/emails → create new email (for testing)
router.post("/", async (req, res) => {
  try {
    const { from, subject, body } = req.body;
    if (!from || !subject) {
      return res.status(400).json({ error: "from & subject required" });
    }

    const newEmail = await Email.create({
      messageId: `msg_${Date.now()}`,
      from,
      subject,
      body,
      receivedAt: new Date(),
    });

    res.status(201).json(newEmail);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Create failed" });
  }
});

// GET /api/emails → list all
router.get("/", async (req, res) => {
  try {
    const emails = await Email.find().sort({ createdAt: -1 });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// GET /api/emails/:id → single email
router.get("/:id", async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ error: "Not found" });
    res.json(email);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

// POST /api/emails/:id/process → analyze + draft reply
router.post("/:id/process", async (req, res) => {
  try {
    console.log("Processing ID:", req.params.id);
    const email = await Email.findById(req.params.id);

    if (!email) {
      console.log("Email not found in DB");
      return res.status(404).json({ error: "Email not found" });
    } 
    // sentiment + priority
    const sentiment = analyzeSentiment(email.body);
    const { level, score } = detectPriority(email.subject + " " + email.body);

    // AI draft reply
    const draft = await generateDraftReply(email);

    // save updates
    email.sentiment = sentiment;
    email.priority = level;
    email.priorityScore = score;
    email.draftReply.text = draft;
    await email.save();

    res.json({ message: "Email processed", email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
});

// module.exports = router;
export default router;

