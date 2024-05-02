import './Home.css';
import { useEffect, useState } from 'react';
import { listTiers, createTierList, listTiersContent } from '../../kv/kvConnections';
import { useNavigate } from 'react-router-dom';
import * as React from "react";

function Home() {

  const [tierLists, setTierLists] = useState([]);
  const [tierListsContent, setTierListsContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const tiers = await listTiers();
      const tiersContents = await listTiersContent(tiers);
      setTierLists(tiers);
      setTierListsContent(tiersContents)
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const topics = ["MOVIE", "VIDEOGAME", "ANIME/MANGA", "IDEAL", "FOOD", "CHARACTER", "CELEBRITY",
    "VEHICLE", "MUSIC", "OBJECT", "INSTITUTION", "COUNTRY", "ANIMAL", "BRAND", "SPORTS", "BOOK",
    "BOARDGAME", "UNIVERSE", "SCHOOL", "PROGRAMS"];

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
    for (let x of document.getElementsByClassName("topic")) {
      if (x.classList[1] === "clicked") {
        stopics.push(x.textContent)
      }
    };
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

  function generate19div() {    
    return topics.map((topic, index) => {
      return (
        <div key={index} id={'topic-' + topic}>
          <div className='listOfTierlists'>
            <h2 className='groupTitle'>{topic}</h2>
            <div className='group'>
              {tierListsContent
                .filter(content => content.topics.includes(topic))
                .map((content, index) => (
                  <div key={index} className={`tierlists`} key={content.name}>
                    <img className="tierimg" src={content.image} alt={content.name} />
                    <a className='tiernames' href={`/rank/${content.name}`}>{content.name}</a>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="home">
      <div className="header">
        <a href={"/"}>TIERLISTER</a>
        <div onClick={bring} className='newTierlist'>+</div>
      </div>
      {
        isLoading ? (<div>LOADING</div>) :
          (<div>
            <div id="loaded">{generate19div()}</div>
            <div className='newTierPanel' id='newTierPanel'>
              <input id="tierName" className="panelOnTop" type="text" />
              <input id="tierURL" className="panelOnTop" type="text" onChange={changeImage} />
              <div id="imgContainer">
                <img alt="yep" id="tierImage" />
              </div>
              <div className="direita test">
                <div id="topics">
                  {topics.map((name, index) =>
                    <div key={index} className='topic' onClick={() => clicked(index)}><p>{name}</p></div>
                  )}
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
