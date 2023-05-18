import axios from 'axios';
import './App.css';
import { useState } from 'react';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const HTTP = 'http://localhost:8020/chat';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setResponse('');
    setLoading(true);

    axios
      .post(`${HTTP}`, { prompt })
      .then((res) => setResponse(res.data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const handlePrompt = (e) => setPrompt(e.target.value);

  return (
    <div
      className="App"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
    >
      <h1>Event Query Generator</h1>
      <textarea
        style={{ width: '100%', height: '100px' }}
        type="text"
        value={prompt}
        onChange={handlePrompt}
      />
      <div style={{ width: '100%', display: 'flex', alignItems: 'flex-start' }}>
        <button onClick={handleSubmit}>GO!</button>
      </div>
      {loading && 'Loading...'}
      {response}
      {error}
    </div>
  );
}

export default App;
