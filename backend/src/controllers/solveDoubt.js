const Groq = require("groq-sdk");
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const solveDoubt = async (req, res) => {
    try {
        const { messages, title, description, testCases, templateCode } = req.body;

        const groqMessages = [
            {
                role: "system",
                content: `Provide a clear and optimal algorithmic approach for the problem ${title}. Explain the core idea, relevant data structures or techniques, and the reasoning behind the approach. Focus on problem-solving intuition rather than implementation details, and keep the explanation concise and directly related to this problem. Do NOT use headings, bullet points, or markdown formatting.`
            }
        ];

        if (Array.isArray(messages)) {
            messages.forEach((msg) => {
                const role = msg.role === "model" ? "assistant" : msg.role;
                const content = msg.parts && msg.parts[0] ? msg.parts[0].text : "";
                if (content) {
                    groqMessages.push({ role, content });
                }
            });
        }

        const completion = await groq.chat.completions.create({
            model: "meta-llama/llama-4-scout-17b-16e-instruct",
            messages: groqMessages,
            temperature: 1,
            max_completion_tokens: 1024,
            top_p: 1,
        });

        const reply = completion.choices[0].message.content;

        res.status(201).json({
            message: reply
        });
        console.log(reply);
    }
    catch (err) {
        console.error("Error solving doubt:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = solveDoubt;
