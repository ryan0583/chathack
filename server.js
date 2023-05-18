const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const {Configuration, OpenAIApi} = require("openai");

const config = new Configuration({
    apiKey: "YOUR API KEY HERE"
})

const openai = new OpenAIApi(config);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async(req, res) => {
    const {prompt} = req.body;

    // const completion = await openai.createCompletion({
    //     model: "text-davinci-003",
    //     max_tokens: 512,
    //     temperature: 0,
    //     prompt: prompt
    // });

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `### Postgres SQL tables, with their properties:\n#\n# Event(id, event_type, player_id)\n#\n### ${prompt}`,
        temperature: 0,
        max_tokens: 150,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
      });
    res.send(completion.data.choices[0].text);
});

const PORT = 8020;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

