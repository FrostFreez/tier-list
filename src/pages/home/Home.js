import './Home.css';
import { useEffect, useState } from 'react';
import { listTiers, createTierList, listTiersContent } from '../../kv/kvConnections';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
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

  const topics = ["ANIME/MANGA", "MOVIE", "BRAND", "VIDEOGAME",
   "BOARDGAME", "MUSIC", "VEHICLE", "CELEBRITY", 
   "CHARACTER", "BOOK", "ANIMAL", "OBJECT",
   "INSTITUTION", "FOOD", "SPORTS", "COUNTRY",
    "PROGRAMS", "IDEAL", "SCHOOL", "UNIVERSE"];

  function bring() {
    var panel = document.getElementById("newTierPanel");
    panel.classList.add("newTierPanelDown");
  }

  function lift() {
    var panel = document.getElementById("newTierPanel");
    panel.classList.remove("newTierPanelDown");
  }

  function changeImage() {
    document.getElementById("newTierImage").src = document.getElementById("tierURL").value;
    document.getElementById("newTierName").innerHTML = document.getElementById("tierName").value;
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

  function scrolling(topic, direction) {
    let elem = document.getElementById("group" + topic);
    elem.scrollTop = elem.scrollTop + $(window).height() * 25 / 100 * direction + 1 * direction;
  }

  function hidden(topic) {
    let elem = document.getElementById("group" + topic);
    if (elem.scrollTop === 0) {
      document.getElementById("agroup" + topic).children[0].classList.add("hiddenButton")
    } else {
      document.getElementById("agroup" + topic).children[0].classList.remove("hiddenButton")
    }
    if (elem.scrollHeight <= elem.scrollTop + elem.offsetHeight) {
      document.getElementById("agroup" + topic).children[2].classList.add("hiddenButton")
    } else {
      document.getElementById("agroup" + topic).children[2].classList.remove("hiddenButton")
    }
  }

  function generate19div() {
    return topics.map((topic, index) => {
      return (
        <div key={index} id={'topic-' + topic}>
          <div className='listOfTierlists'>
            <h2 className='groupTitle'>{topic}</h2>
            <div className='agroup' id={'agroup' + topic}>
              <button className='hiddenButton' onClick={() => scrolling(topic, -1)}>{"<"}</button>
              <div onScroll={() => hidden(topic)} className='group' id={'group' + topic}>
                {tierListsContent
                  .filter(content => content.topics.includes(topic))
                  .map((content) => (
                    <a className="tierlists" key={content.name} href={`/rank/${content.name}`}>
                      <img className="tierimg" src={content.image} alt={content.name} />
                      <p className='tiernames'>{content.name}</p>
                    </a>
                  ))
                }
              </div>
              <button onClick={() => scrolling(topic, 1)}>{">"}</button>
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
              <div className='panelOnTop'>
                <input id="tierName" type="text" onChange={changeImage} />
                <input id="tierURL" type="text" onChange={changeImage} />
              </div>
              <div className='panelOnBottom'>
                <div id="imgContainer">
                  <div id='exempleOfTier' className="tierlists">
                    <img id='newTierImage' className="tierimg" alt="example" />
                    <p id='newTierName' className='tiernames'>example</p>
                  </div>
                </div>
                <div className="direita test">
                  <div id="topics">
                    {topics.map((name, index) =>
                      <div key={index} className='topic' onClick={() => clicked(index)}><p>{name}</p></div>
                    )}
                  </div>
                  <div className='buttons'>
                    <div className="cancel" id="cancel" onClick={lift}>CANCEL</div>
                    <div className="confirm" id="confirm" onClick={createNewTierList}>CONFIRM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>)
      }
    </div>
  );
}

export default Home;
