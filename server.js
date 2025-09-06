// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const emailRoutes = require('./routes/emails');

// import dotenv from "dotenv";
// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import emailRoutes from "./routes/emails.js";

// dotenv.config();


// const app = express();
// app.use(cors());
// app.use(express.json());

// // simple root
// app.get('/', (req, res) => res.send('AI Email Assistant backend running'));

// // DB connect and start server
// const PORT = process.env.PORT || 4000;
// mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected');
//     app.use('/api/emails', emailRoutes);
//     app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
//   })
//   .catch(err => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });


// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import emailRoutes from "./routes/emails.js";

// dotenv.config();
// const app = express();

// app.use(express.json());

// // ✅ Use the route
// app.use("/api/emails", emailRoutes);

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(process.env.PORT, () =>
//       console.log(`Server running on http://localhost:${process.env.PORT}`)
//     );
//   })
//   .catch((err) => console.error(err));


import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import emailRoutes from "./routes/emails.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// ✅ Root route (optional, for testing in browser)
app.get("/", (req, res) => {
  res.send("AI-Powered Communication Assistant Backend is Running ✅");
});

// ✅ API routes
app.use("/api/emails", emailRoutes);

// Database + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
