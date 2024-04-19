import './Home.css';
import { useEffect, useState } from 'react';
import { getTierList, listTiers } from '../../kv/kvConnections';
import { pointer } from '@testing-library/user-event/dist/cjs/pointer/index.js';

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
    <div className='tierlists' key={tierKey}>
      <img className='tierimg' src={getTierList(tierKey).img} alt={tierKey} />
      <a className='tiernames' href={`/tiers/${tierKey}`}>{tierKey}</a>
    </div>
  );

  function bring(){
    var panel = document.getElementById("newTierPanel");
    panel.classList.add("newTierPanelDown");
  }

  function lift(){
    var panel = document.getElementById("newTierPanel");
    panel.classList.remove("newTierPanelDown");
  }

  function changeImage(){
    document.getElementById("tierImage").src = document.getElementsByClassName("panelTop")[1].value;
    document.getElementById("tierImage").alt = document.getElementsByClassName("panelTop")[0].value;
  }
  return (
    <div className="home">
      <div className="header">
            <a href={"/"}>TIERLISTER</a>
            <div onClick={bring} className='newTierlist'>+</div>
        </div>
        <div className='listOfTierlists'>
          <h2 className='groupTitle'>Games</h2>
          <div className='group'>
            {result}
          </div>
        </div>
        <div className='listOfTierlists'>
          <h2 className='groupTitle'>Games</h2>
          <div className='group'>
            {result}
          </div>
        </div>
        <div className='listOfTierlists'>
          <h2 className='groupTitle'>Games</h2>
          <div className='group'>
            {result}
          </div>
        </div>
        <div className='newTierPanel' id='newTierPanel'>
            <input id="tierName" class="panelOnTop" type="text"/>
            <input id="tierURL" class="panelOnTop" type="text" onChange={changeImage}/>
            <div id="imgContainer">
                <img alt="yep" id="tierImage"/>
            </div>
            <div className="direita test">
                <textarea id="tierDescription"></textarea>
                <div className="cancel" id="cancel" onClick={lift}>CANCEL</div>
                <div className="confirm" id="confirm">CONFIRM</div>
            </div>
        </div>
    </div>
  );
}

export default Home;
