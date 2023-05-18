import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sqlLoading, setSqlLoading] = useState(false);
  const [sqlResult, setSqlResult] = useState(null);
  const [sqlError, setSqlError] = useState('');

  const handleError = (e) => {
    console.log(error);
    setError('Something went wrong :(');
  };

  const getQuery = (e) => {
    e.preventDefault();
    setError('');
    setSqlError('');
    setResponse('');
    setSqlLoading(false);
    setSqlResult(null);
    setLoading(true);

    axios
      .post('http://localhost:8020/chat', { prompt })
      .then((res) => setResponse(`SELECT ${res.data}`))
      .catch(e => {
        console.log(e);
        setError('Something went wrong :(');
      })
      .finally(() => setLoading(false));
  };

  const runSql = (e) => {
    e.preventDefault();
    setSqlLoading(true);
    setSqlResult(null);
    setSqlError('');

    axios
      .post('http://localhost:8020/sql', {
        sql: response,
      })
      .then((res) => setSqlResult(res.data))
      .catch((e) => {
        console.log(e);
        setSqlError('Something went wrong :(');
      })
      .finally(() => setSqlLoading(false));
  };

  const handlePrompt = (e) => setPrompt(e.target.value);

  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <h1>Event Query Generator</h1>
      <textarea
        style={{ width: '100%', height: '100px' }}
        type="text"
        value={prompt}
        onChange={handlePrompt}
      />
      <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
        <button onClick={getQuery}>GO!</button>
      </div>
      {loading && 'Loading...'}
      {response}
      {error}
      <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
        <button onClick={runSql}>Run SQL</button>
      </div>
      {sqlLoading && 'Loading...'}
      {sqlResult && (
        <table>
          <thead>
            <tr>
              {Object.keys(sqlResult[0]).map((val, i) => (
                <td key={i}>{val}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {sqlResult.map((result, i) => (
              <tr key={i}>
                {Object.values(result).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {sqlError}
    </div>
  );
}

export default App;
