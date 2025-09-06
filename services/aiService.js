// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // --- Simple Sentiment Analysis ---
// export function analyzeSentiment(text) {
//   const lowered = text.toLowerCase();
//   if (lowered.includes("angry") || lowered.includes("bad") || lowered.includes("cannot") || lowered.includes("immediately")) {
//     return "negative";
//   }
//   if (lowered.includes("thank you") || lowered.includes("great") || lowered.includes("happy")) {
//     return "positive";
//   }
//   return "neutral";
// }

// // --- Simple Priority Detection ---
// export function detectPriority(text) {
//   const lowered = text.toLowerCase();
//   if (lowered.includes("immediately") || lowered.includes("urgent") || lowered.includes("cannot access") || lowered.includes("critical")) {
//     return { level: "urgent", score: 10 };
//   }
//   return { level: "normal", score: 1 };
// }

// // --- AI Draft Reply using GPT ---
// export async function generateDraftReply(email) {
//   const prompt = `
//   You are a helpful, professional customer support assistant.
//   The customer wrote:
//   Subject: ${email.subject}
//   Body: ${email.body}

//   Write a polite, empathetic draft reply acknowledging the issue and promising support.
//   `;

//   try {
//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return completion.choices[0].message.content;
//   } catch (err) {
//     console.error("Error generating AI reply:", err.message);
//     return "We received your request and will get back to you shortly.";
//   }
// }

// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // --- Simple Sentiment Analysis ---
// export function analyzeSentiment(text = "") {
//   const lowered = text.toLowerCase();
//   if (
//     lowered.includes("angry") ||
//     lowered.includes("bad") ||
//     lowered.includes("cannot") ||
//     lowered.includes("immediately")
//   ) {
//     return "negative";
//   }
//   if (
//     lowered.includes("thank you") ||
//     lowered.includes("great") ||
//     lowered.includes("happy")
//   ) {
//     return "positive";
//   }
//   return "neutral";
// }

// // --- Simple Priority Detection ---
// export function detectPriority(text = "") {
//   const lowered = text.toLowerCase();
//   if (
//     lowered.includes("immediately") ||
//     lowered.includes("urgent") ||
//     lowered.includes("cannot access") ||
//     lowered.includes("critical")
//   ) {
//     return { level: "urgent", score: 10 };
//   }
//   return { level: "normal", score: 1 };
// }

// // --- AI Draft Reply using GPT ---
// export async function generateDraftReply(email) {
//   const prompt = `
//   You are a helpful, professional customer support assistant.
//   The customer wrote:
//   Subject: ${email.subject}
//   Body: ${email.body}

//   Write a polite, empathetic draft reply acknowledging the issue and promising support.
//   `;

//   try {
//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return completion.choices[0]?.message?.content || "Draft not available.";
//   } catch (err) {
//     console.error("Error generating AI reply:", err.message);
//     return "We received your request and will get back to you shortly.";
//   }
// }


// import OpenAI from "openai";

// const client = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // --- Simple Sentiment Analysis ---
// export function analyzeSentiment(text = "") {
//   const lowered = text.toLowerCase();
//   if (
//     lowered.includes("angry") ||
//     lowered.includes("bad") ||
//     lowered.includes("cannot") ||
//     lowered.includes("immediately")
//   ) {
//     return "negative";
//   }
//   if (
//     lowered.includes("thank you") ||
//     lowered.includes("great") ||
//     lowered.includes("happy")
//   ) {
//     return "positive";
//   }
//   return "neutral";
// }

// // --- Simple Priority Detection ---
// export function detectPriority(text = "") {
//   const lowered = text.toLowerCase();
//   if (
//     lowered.includes("immediately") ||
//     lowered.includes("urgent") ||
//     lowered.includes("cannot access") ||
//     lowered.includes("critical")
//   ) {
//     return { level: "urgent", score: 10 };
//   }
//   return { level: "normal", score: 1 };
// }

// // --- AI Draft Reply using GPT ---
// export async function generateDraftReply(email) {
//   const prompt = `
//   You are a helpful, professional customer support assistant.
//   The customer wrote:
//   Subject: ${email.subject}
//   Body: ${email.body}

//   Write a polite, empathetic draft reply acknowledging the issue and promising support.
//   `;

//   try {
//     const completion = await client.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return completion.choices[0]?.message?.content || "Draft not available.";
//   } catch (err) {
//     console.error("Error generating AI reply:", err.message);
//     return "We received your request and will get back to you shortly.";
//   }
// }


import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

// --- Utility: get OpenAI client only when needed ---
function getClient() {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Missing OPENAI_API_KEY in environment variables.");
    throw new Error("OPENAI_API_KEY not set");
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// --- Simple Sentiment Analysis ---
export function analyzeSentiment(text) {
  const lowered = text.toLowerCase();
  if (
    lowered.includes("angry") ||
    lowered.includes("bad") ||
    lowered.includes("cannot") ||
    lowered.includes("immediately")
  ) {
    return "negative";
  }
  if (lowered.includes("thank you") || lowered.includes("great") || lowered.includes("happy")) {
    return "positive";
  }
  return "neutral";
}

// --- Simple Priority Detection ---
export function detectPriority(text) {
  const lowered = text.toLowerCase();
  if (
    lowered.includes("immediately") ||
    lowered.includes("urgent") ||
    lowered.includes("cannot access") ||
    lowered.includes("critical")
  ) {
    return { level: "urgent", score: 10 };
  }
  return { level: "normal", score: 1 };
}

// --- AI Draft Reply using GPT ---
export async function generateDraftReply(email) {
  const client = getClient(); // ✅ create OpenAI client only here

  const prompt = `
  You are a helpful, professional customer support assistant.
  The customer wrote:
  Subject: ${email.subject}
  Body: ${email.body}

  Write a polite, empathetic draft reply acknowledging the issue and promising support.
  `;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return completion.choices[0].message.content;
  } catch (err) {
    console.error("❌ Error generating AI reply:", err.message);
    return "We received your request and will get back to you shortly.";
  }
}
