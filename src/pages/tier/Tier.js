import "./Tier.css";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTierList } from '../../kv/kvConnections'

function Tier() {

  const [result, setResult] = useState({});
  const {tierId} = useParams();


  
  useEffect(() => {
    async function fetchData() {      
      const data = await getTierList(tierId);   
      setResult(data);          
    }
    fetchData();
  }, []);

  return (
    <div className="tier">
      <h1>Tier Page</h1>
      <p>VAlor de params: {JSON.stringify(result)}</p>
      <p>
        <a href="/">VOLTAR</a>
      </p>
    </div>
  );
}

export default Tier;
