const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {Configuration, OpenAIApi} = require("openai");
//Not included in repo - to run create an apiKey.js file with an exported API_KEY variable.
const { API_KEY } = require("./apiKey");

const config = new Configuration({
    apiKey: API_KEY
})

const openai = new OpenAIApi(config);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async(req, res) => {
    const {prompt} = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        max_tokens: 512,
        temperature: 0,
        prompt: prompt
    });
    res.send(completion.data.choices[0].text);
});

const PORT = 8020;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

