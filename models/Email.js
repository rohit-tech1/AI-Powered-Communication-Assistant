// const mongoose = require('mongoose');
import mongoose from "mongoose";
const EmailSchema = new mongoose.Schema({
  messageId: { type: String, index: true },
  from: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, default: '' },
  receivedAt: { type: Date, default: Date.now },

  // extracted info
  contactInfo: {
    phone: String,
    altEmails: [String]
  },

  // AI classification
  sentiment: { type: String, enum: ['positive', 'neutral', 'negative'], default: 'neutral' },
  priority: { type: String, enum: ['urgent', 'normal'], default: 'normal' },
  priorityScore: { type: Number, default: 0 },

  // extra metadata
  extracted: { type: Object, default: {} },
  embedding: { type: [Number], default: undefined },

  // AI draft reply
  draftReply: {
    text: String,
    lastEditedAt: Date,
    sent: { type: Boolean, default: false }
  },

  // workflow status
  status: { type: String, enum: ['pending', 'sent', 'resolved'], default: 'pending' }
}, { timestamps: true });

// module.exports = mongoose.model('Email', EmailSchema);
export default mongoose.model("Email", EmailSchema);
