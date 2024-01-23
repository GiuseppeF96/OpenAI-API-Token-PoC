const express = require('express')
require("dotenv").config();
const OpenAI = require("openai");


const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

app.post("/generate-bpmn-xml", async (req, res) =>{
    try {
        const {processDescription} = req.body;
        const response = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                {role: "user", content: `Create a BPMN 2.0 XML File using the following business process: ${processDescription}` }
            ],
            model: "gpt-3.5-turbo",
        });

        return res.status(200).json({
            success: true,

            data: response.data.choices[0].text
        });

    } catch (error) {
        return res.status(500).json({
            message: "There was an issue on the server",
            error: error.message,
        });
    }
});

const port = process.env.PORT || 5000;
app.listen(port,() => console.log(`Server listening on port ${port}`))