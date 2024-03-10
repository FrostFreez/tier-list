import './Home.css';
import logo from './logo.svg';
import { useEffect, useState } from 'react';
import { listTiers } from '../../kv/kvConnections';

function Home() {

  const [tierLists, setTierLists] = useState([]);

  useEffect(() => {
    async function fetchData() {      
      const tiers = await listTiers();   
      setTierLists(tiers);          
    }
    fetchData();
  }, []);

  const result = tierLists.map(tierKey => 
    <li key={tierKey}>
      <a href={`/tiers/${tierKey}`}>{tierKey}</a>{}
    </li>
  );

  return (
    <div className="home">
      <header className="home-header">
        <img src={logo} className="home-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.     
        </p>
        <a
          className="home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>        
      </header>
      <div>
        <h1>TIER LISTS</h1>
        <p>Available lists</p>        
        <ul>
          {result}
        </ul>
      </div>
      
    </div>
  );
}

export default Home;
