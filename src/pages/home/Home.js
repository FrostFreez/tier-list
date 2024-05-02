import './Home.css';
import { useEffect, useState } from 'react';
import { getTierList, listTiers, createTierList } from '../../kv/kvConnections';
import { useNavigate } from 'react-router-dom';
import * as ReactDOM from "react-dom";
import * as React from "react";

function Home() {

  const [tierLists, setTierLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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

  //////////////////////////////////////////////////////////////////////
  function changeData() {
    return tierLists.map(tierKey => { return getTierList(tierKey) })
  };

  async function changeResult(tiers) {
    return topics.map(topic => {
      const result2 = tiers.map(thing => {
        return thing.then(tier => {
          if (tier.topics.includes(topic)) {
            return (
              <div className={`tierlists ${tier.topics}`} key={tier.name}>
                <img className="tierimg"  src={tier.image} alt={tier.name} />
                <a className='tiernames' href={`/rank/${tier.name}`}>{tier.name}</a>
              </div>
            )
          }
        })
      })
      return result2;
    })
  };

  async function listingLists(tiers) {
    return topics.map(topic => {
      function generateDiv(result, topic) {
        const divList = [];
        for (let x of result) {
          divList.push(<div id={'listOfList:' + topic + divList.length}></div>)
        }
        return divList;
      }

      const pushing = (
        <div className='listOfTierlists'>
          <h2 className='groupTitle'>{topic}</h2>
          <div className='group'>
            {generateDiv(tiers, topic)}
          </div>
        </div>
      );
      return pushing;
    })
  }

  async function asyncCall() {
    const tiers = changeData();
    let number = -1;
    const x = await listingLists(tiers);
    x.map(thing => { number++; ReactDOM.render(thing, document.getElementById(`listOfLists:${number}`)) })
    const toTier = await changeResult(tiers);
    toTier.map(that => that.map(sheesh => sheesh.then(thing => topics.map(topic => {
      number = -1;
      if (thing !== undefined) {
        if (thing.props.className.includes(topic)) {
          number++;
          console.log('listOfList:' + topic + number);
          ReactDOM.render(thing, document.getElementById('listOfList:' + topic + number));
        }
      }
    }))))
  };

  function generate19div() {
    const divList = [];
    for (let i = 0; i <= 19; i++) {
      divList.push(<div id={'listOfLists:' + i}></div>)
    }
    return divList;
  }

  useEffect(() => {
    async function fetchData() {
      const tiers = await listTiers();
      setTierLists(tiers);
      setIsLoading(false);
      asyncCall();
    }
    fetchData();
  }, []);

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
            {generate19div()}
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
