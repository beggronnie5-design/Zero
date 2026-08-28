const express = require("express");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.static("."));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  try {
    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: "You are ZERO, a helpful personal AI assistant.",
      input: req.body.message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      reply: "ZERO's brain couldn't connect."
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("ZERO is running");
});
