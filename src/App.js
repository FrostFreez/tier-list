import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [result, setResult] = useState('');

  async function loadKv() {
    fetch(`https://legible-mantis-44817.upstash.io/keys/list:*`, {
      headers: {
        Authorization: `Bearer Aa8RASQgZWQ5NzU4MDUtYjgyYi00MGY0LWE5NTgtNDc3OTUyMzBiNzcyZDg5OGYyMWYyZDY4NGY2MmFkYzYzMmZiN2ZiYmE5MDY=`,
      },
    })
      .then((response) => response.json())
      .then((data) => setResult(data.result))
      .catch((error) => console.error('ERROR: '+ error));    
  }

  useEffect(() => {
    loadKv();
    console.dir(process.env);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.     
        </p>
        <p>
          RESULT: {result}
        </p>
        <p>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
