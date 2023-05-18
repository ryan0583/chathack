const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiKey = require('./apiKey');
const {
  eventSchema,
  playerSchema,
  eventTypeSchema,
  competitionSchema,
  seasonSchema,
  teamSchema,
  countrySchema,
  matchSchema,
} = require('./schema');
const { Client } = require('pg');
const dbCreds = require('./dbCreds');

const { Configuration, OpenAIApi } = require('openai');

const config = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(config);

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `### postgres table schema:
        ${eventSchema}\n#
        ${eventTypeSchema}\n#
        ${competitionSchema}\n#
        ${countrySchema}\n#
        ${seasonSchema}\n#
        ${playerSchema}\n#
        ${teamSchema}\n#
        ${matchSchema}\n#
        \n### ${prompt}\n
        SELECT`,
    temperature: 0,
    max_tokens: 1000,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    stop: ['#', ';'],
  });
  res.send(completion.data.choices[0].text);
});

const client = new Client({
  user: 'iquser',
  host: 'iq-testing-cluster.cluster-cv04zb8jr41a.eu-west-2.rds.amazonaws.com',
  database: 'iqdb',
  password: dbCreds,
  port: 5432,
});

client.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

app.post('/sql', async (req, res) => {
  const { sql } = req.body;
  const sqlRes = await client.query(sql);
  return res.send(sqlRes.rows);
});

const PORT = 8020;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
