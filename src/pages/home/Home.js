import './Home.css';
import { useEffect, useState } from 'react';
import { getTierList, listTiers, createTierList } from '../../kv/kvConnections';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from "react-dom";

function Home() {

  const [tierLists, setTierLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const topics = ["MOVIE", "VIDEOGAME", "ANIME/MANGA", "IDEAL", "FOOD", "CHARACTER", "CELEBRITY",
    "VEHICLE", "MUSIC", "OBJECT", "INSTITUTION", "COUNTRY", "ANIMAL", "BRAND", "SPORTS", "BOOK",
    "BOARDGAME", "UNIVERSE", "SCHOOL", "PROGRAMS"];

  useEffect(() => {
    async function fetchData() {
      const tiers = await listTiers();
      setTierLists(tiers);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function bring() {
    var panel = document.getElementById("newTierPanel");
    panel.classList.add("newTierPanelDown");
  }

  function lift() {
    var panel = document.getElementById("newTierPanel");
    panel.classList.remove("newTierPanelDown");
  }

  function changeImage() {
    document.getElementById("tierImage").src = document.getElementsByClassName("panelOnTop")[1].value;
    document.getElementById("tierImage").alt = document.getElementsByClassName("panelOnTop")[0].value;
    console.log(tierLists);
  }

  function clicked(what) {
    if (document.getElementsByClassName("topic")[what].classList[1] === "clicked") {
      document.getElementsByClassName("topic")[what].classList.remove("clicked");
    } else {
      document.getElementsByClassName("topic")[what].classList.add("clicked");
    }
  }



  async function createNewTierList() {
    let stopics = [];
    for (let x of document.getElementsByClassName("topic")) { if (x.classList[1] === "clicked") { stopics.push(x.textContent) } };
    let newTierlist = {
      name: document.getElementById("tierName").value,
      image: document.getElementById("tierURL").value,
      topics: stopics,
      tiers: [],
      members: []
    }
    if (newTierlist.name === "" || newTierlist.image === "" || newTierlist.topics.length === 0) {
      console.log(newTierlist.name)
      return;
    }
    try {
      await createTierList(newTierlist.name, newTierlist);
      alert("Created");
      navigate("/rank/" + newTierlist.name);
    } catch (err) {
      alert(err)
    }
  }

  //////////////////////////////////////////////////////////////////////
  function changeData() {
    return tierLists.map(tierKey => { return getTierList(tierKey) })
  };

  async function generateResult2(tier, topic) {
    if(tier.topics.includes(topic)){
      return (
      <div className='tierlists' key={tier.name}>
        <img className='tierimg' src={tier.image} alt={tier.name} />
        <a className='tiernames' href={`/rank/${tier.name}`}>{tier.name}</a>
      </div>
    )
    }
  }

  async function generateResult(tier, topic) {
    return await generateResult2(tier, topic);
  }

  async function changeResult(tiers) {
    return topics.map(topic => {
      const result2 = tiers.map(thing => {
        return thing.then(tier => {
          return generateResult(tier, topic)
        })
      })
      return result2.map(that => {
        return that.then(thing => {
          return (
            <div className='listOfTierlists'>
              <h2 className='groupTitle'>{topic}</h2>
              <div className='group'>
                {thing}
              </div>
            </div>
          );
        })
      })
    });
  };

  async function asyncCall() {
    const tiers = changeData();
    let number = -1;
    const x = await changeResult(tiers);
    x.map(that => { that.map(those => those.then(thing => {number++; ReactDOM.render(thing, document.getElementById(`listOfLists:${number}`))} )) })
  };

  (async function () {
    await asyncCall();
  })();

  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="home">
      <div className="header">
        <a href={"/"}>TIERLISTER</a>
        <div onClick={bring} className='newTierlist'>+</div>
      </div>
      {
        isLoading ? (<div>LOADING</div>) :
          (<div>
            <div id='listOfLists:0'></div>
            <div id='listOfLists:1'></div>
            <div id='listOfLists:2'></div>
            <div id='listOfLists:3'></div>
            <div id='listOfLists:4'></div>
            <div id='listOfLists:5'></div>
            <div id='listOfLists:6'></div>
            <div id='listOfLists:7'></div>
            <div id='listOfLists:8'></div>
            <div id='listOfLists:9'></div>
            <div id='listOfLists:10'></div>
            <div id='listOfLists:11'></div>
            <div id='listOfLists:12'></div>
            <div id='listOfLists:13'></div>
            <div id='listOfLists:14'></div>
            <div id='listOfLists:15'></div>
            <div id='listOfLists:16'></div>
            <div id='listOfLists:17'></div>
            <div id='listOfLists:18'></div>
            <div id='listOfLists:19'></div>
            <div className='newTierPanel' id='newTierPanel'>
              <input id="tierName" className="panelOnTop" type="text" />
              <input id="tierURL" className="panelOnTop" type="text" onChange={changeImage} />
              <div id="imgContainer">
                <img alt="yep" id="tierImage" />
              </div>
              <div className="direita test">
                <div id="topics">
                  <div className='topic' onClick={function () { clicked(0) }}><p>MOVIE</p></div>
                  <div className='topic' onClick={function () { clicked(1) }}><p>VIDEOGAME</p></div>
                  <div className='topic' onClick={function () { clicked(2) }}><p>ANIME/MANGA</p></div>
                  <div className='topic' onClick={function () { clicked(3) }}><p>IDEAL</p></div>
                  <div className='topic' onClick={function () { clicked(4) }}><p>FOOD</p></div>
                  <div className='topic' onClick={function () { clicked(5) }}><p>CHARACTER</p></div>
                  <div className='topic' onClick={function () { clicked(6) }}><p>CELEBRITY</p></div>
                  <div className='topic' onClick={function () { clicked(7) }}><p>VEHICLE</p></div>
                  <div className='topic' onClick={function () { clicked(8) }}><p>MUSIC</p></div>
                  <div className='topic' onClick={function () { clicked(9) }}><p>OBJECT</p></div>
                  <div className='topic' onClick={function () { clicked(10) }}><p>INSTITUTION</p></div>
                  <div className='topic' onClick={function () { clicked(11) }}><p>COUNTRY</p></div>
                  <div className='topic' onClick={function () { clicked(12) }}><p>ANIMAL</p></div>
                  <div className='topic' onClick={function () { clicked(13) }}><p>BRAND</p></div>
                  <div className='topic' onClick={function () { clicked(14) }}><p>SPORTS</p></div>
                  <div className='topic' onClick={function () { clicked(15) }}><p>BOOK</p></div>
                  <div className='topic' onClick={function () { clicked(16) }}><p>BOARDGAME</p></div>
                  <div className='topic' onClick={function () { clicked(17) }}><p>UNIVERSE</p></div>
                  <div className='topic' onClick={function () { clicked(18) }}><p>SCHOOL</p></div>
                  <div className='topic' onClick={function () { clicked(19) }}><p>PROGRAMS</p></div>
                </div>
                <div className="cancel" id="cancel" onClick={lift}>CANCEL</div>
                <div className="confirm" id="confirm" onClick={createNewTierList}>CONFIRM</div>
              </div>
            </div>
          </div>)
      }
    </div>
  );
}

export default Home;
