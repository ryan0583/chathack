const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiKey = require("./apiKey");
const {eventSchema, playerSchema, eventTypeSchema, competitionSchema, seasonSchema, teamSchema, countrySchema, matchSchema} = require("./schema");

const {Configuration, OpenAIApi} = require("openai");

const config = new Configuration({
    apiKey: apiKey
})

const openai = new OpenAIApi(config);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/chat", async(req, res) => {
    const {prompt} = req.body;

    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `### postgres table schema:
        ${eventSchema}\n#
        ${eventTypeSchema}\n#
        ${competitionSchema}\n#
        ${countrySchema}\n#
        ${seasonSchema}\n#
        ${playerSchema}\n#
        ${teamSchema}\n#
        ${matchSchema}\n#
        \n### ${prompt}. A shot is defined as an event_type of 'goal', 'miss', 'attempt_saved', 'post','attempt_blocked','attempt_saved_to_post','attempt_saved_off_target'.`,
        temperature: 0,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
      });
    res.send(completion.data.choices[0].text);
});

const PORT = 8020;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

