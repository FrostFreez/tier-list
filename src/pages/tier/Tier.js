import "./Tier.css";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTierList } from '../../kv/kvConnections'

function Tier() {

  // eslint-disable-next-line
  const [result, setResult] = useState({});
  const {tierId} = useParams();
  
  useEffect(() => {
    async function fetchData() {
      const data = await getTierList(tierId);
      console.table(data);
      setResult(data);
      loadTiers();
    }
    fetchData();
  });

//-------//
//-Tiers-//
//-------//
class Tiers{
  constructor(name, color, members){
    this.name = name;
    this.color = color;
    this.members = members;
  }
}
let tiers = [];

function loadTiers(){
    result.tiers.push()
}

//-------//
//Members//
//-------//
class Members{
  constructor(name, description, image){
    this.name = name;
    this.description = description;
    this.image = image;
  }
}
let aMembers = [];
let rMembers = [];
//====//
//Grow//
//====//
// eslint-disable-next-line
function grow(){
    if (document.documentElement.scrollTop > 150) {
        document.getElementById("description").style.width = "100%";
      } else {
        document.getElementById("description").style.width = "95%";
      }
}
//===============//
//Create New Tier//
//===============//
function createNewTier(){
  tiers[tiers.length] = new Tiers("", "808080", []);
  tierer();
}
//============//
//Fit Contetnt//
//============//
function fitContent(number){
  tiers[number].name = document.getElementsByClassName("tiername")[number].value;
  let fontsize = 4;
  let adjust = 0.8;
  if(document.getElementsByClassName("tiername")[number].value.length > 4){
    for(let x = 0; x < document.getElementsByClassName("tiername")[number].value.length - 4; x++){
      fontsize = fontsize * adjust;
      adjust = 1 - (1 - adjust) * 0.9;
    }
  }
  document.getElementsByClassName("tiername")[number].style.fontSize = fontsize + "rem";
}
//======//
//Tierer//
//======//
function tierer(){
  let scroll = document.documentElement.scrollTop;
  rMembers = aMembers;
  while(document.getElementsByClassName("tier").length > 0){
    document.getElementsByClassName("tier")[0].remove();
  }
  while(document.getElementsByClassName("member").length > 0){
    document.getElementsByClassName("member")[0].remove();
  }
  for(const x in tiers){
    let t = document.createElement("div");
    t.classList.add("tier")
    let tL = document.createElement("div");
    tL.classList.add("tierlistname");
    let i = document.createElement("input");
    i.classList.add("tiername");
    i.style.order = "1";
    i.style.backgroundColor = "#" + tiers[x].color;
    tL.style.backgroundColor = "#" + tiers[x].color;
    i.value = tiers[x].name;
    tL.appendChild(i);
    let d = document.createElement("div");
    d.classList.add("placeble");
    d.style.backgroundColor = "#" + tiers[x].color;
    d.ondrop = drop;
    d.ondragover = allowDrop;
    let b = document.createElement("div");
    let bC = document.createElement("div");
    let bB = document.createElement("div");
    let cB = document.createElement("input");
    b.classList.add("buttons");
    bC.classList.add("button");
    bC.classList.add("small");
    bC.style.backgroundColor = "#" + tiers[x].color;    
    bC.onclick = function(){changePosition(x, -1)};
    bB.classList.add("button");
    bB.classList.add("small");
    bB.style.backgroundColor = "#" + tiers[x].color;    
    bB.onclick = function(){changePosition(x, 1)};
    cB.classList.add("button");
    cB.classList.add("big");
    cB.style.backgroundColor = "#" + tiers[x].color;
    cB.style.color = "#" + tiers[x].color;
    cB.value = tiers[x].color;
    cB.onchange = function(){colorChange(x)};
    cB.onclick = function(){colorButtonIn(x)};
    cB.onblur = function(){colorButtonOut(x)};
    b.appendChild(bC);
    b.appendChild(cB);
    b.appendChild(bB);
    t.appendChild(b);
    t.appendChild(tL);
    t.appendChild(d);
    i.onchange = function(){fitContent(x)};
    if(hex(x)){
      i.style.color = "black";
    } else{
      i.style.color = "white";
    }

    //=========//
    //Membering//
    //=========//
    for(const y in tiers[x].members){
      let o = document.createElement("img");
      o.src = tiers[x].members[y].image;
      o.classList.add("member");
      o.alt = tiers[x].members[y].name;
      o.id = tiers[x].members[y].name;
      o.onmouseover = function(){showCharacter(this)}
      o.draggable = true;
      o.ondragstart = drag;
      tL.appendChild(o);
      rMembers = rMembers.remove(tiers[x].members[y]);
    }
    document.getElementById("tierlist").appendChild(t);
  }
  let L = document.createElement("div");
  L.classList.add("tier");
  L.innerText = "+";
  L.onclick = function(){createNewTier()};
  //============//
  //More Members//
  //============//
  for(const x in rMembers){
    let o = document.createElement("img");
      o.src = rMembers[x].image;
      o.classList.add("member");
      o.alt = rMembers[x].name;
      o.id = rMembers[x].name;
      o.onmouseover = function(){showCharacter(this)}
      o.draggable = true;
      o.ondragstart = drag;
      document.getElementById("rest").appendChild(o);
  }
  let m = document.createElement("div");
  m.classList.add("member");
  m.innerText = "+";
  m.onclick = function(){bring()}
  document.getElementById("rest").appendChild(m);
  document.getElementById("tierlist").appendChild(L);
  document.documentElement.scrollTop = scroll;
}
//============//
//Color change//
//============//
function colorChange(number) {
  let isColor = false;
  if(document.getElementsByClassName("big")[number].value.length === 6){
    for(let x of document.getElementsByClassName("big")[number].value){
      if(x.toUpperCase() in ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"]){
        isColor = true;
      }
    }
  }
  if(isColor){
    tiers[number].color = document.getElementsByClassName("big")[number].value.toUpperCase();
  }
  tierer();
}
//===================//
//Color Change Button//
//===================//
function colorButtonIn(number) {
  if(hex(number)){
    document.getElementsByClassName("big")[number].style.color = "black";
  } else{
    document.getElementsByClassName("big")[number].style.color = "white";
  }
}
function colorButtonOut(number) {
  document.getElementsByClassName("big")[number].style.color = "#" + tiers[number].color;
}
//===//
//hex//
//===//
function hex(number){
  switch(tiers[number].color[0]){
    case '8': return true;
    case '9': return true;
    case 'A': return true;
    case 'B': return true;
    case 'C': return true;
    case 'D': return true;
    case 'E': return true;
    case 'F': return true;
    default: ;
  }
  switch(tiers[number].color[2]){
    case '8': return true;
    case '9': return true;
    case 'A': return true;
    case 'B': return true;
    case 'C': return true;
    case 'D': return true;
    case 'E': return true;
    case 'F': return true;
    default: ;
  }
  switch(tiers[number].color[4]){
    case '8': return true;
    case '9': return true;
    case 'A': return true;
    case 'B': return true;
    case 'C': return true;
    case 'D': return true;
    case 'E': return true;
    case 'F': return true;
    default: ;
  }
  return false;
}
//===============//
//Change Position//
//===============//
function changePosition(x, opr){
  if(parseInt(x) + parseInt(opr) < 0){
    return;
  }else if(parseInt(x) + parseInt(opr) > tiers.length - 1){
    return;
  }
  let next = parseInt(x) + parseInt(opr);
  let nextTier = tiers[next];
  tiers[next] = tiers[x];
  tiers[x] = nextTier;
  tierer();
}
//========//
//Creation//
//========//
// eslint-disable-next-line
function bring(){
  document.getElementById("creation").classList.add("activeCreation");
}
// eslint-disable-next-line
function lift(){
  document.getElementById("creation").classList.remove("activeCreation");
}
//=============//
//New Character//
//=============//
// eslint-disable-next-line
function newCharacter(){
  aMembers[aMembers.length] = new Members(document.getElementsByClassName("panelTop")[0].value,
  document.getElementById("memberDescription").value,
  document.getElementsByClassName("panelTop")[1].value);
  tierer();
}
//==============//
//Show Character//
//==============//
// eslint-disable-next-line
function showCharacter(m){
  const checkAlt = (x) => x.name === m.alt;
  let a = aMembers[aMembers.findIndex(checkAlt)];
  document.getElementById("tierlistName").innerText = a.name;
  document.getElementById("tierlistName").style.fontSize = "4rem";
  document.getElementById("tierlistImage").src = a.image;
  document.getElementById("tierlistDescription").innerText = a.description;
}
//============//
//Change Image//
//============//
// eslint-disable-next-line
function changeImage(){
  document.getElementById("memberImage").src = document.getElementsByClassName("panelTop")[1].value;
  document.getElementById("memberImage").alt = document.getElementsByClassName("panelTop")[0].value;
}
//=============//
//Drag and Drop//
//=============//
// eslint-disable-next-line
function allowDrop(ev) {
  ev.preventDefault();
}
// eslint-disable-next-line
function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
// eslint-disable-next-line
function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

  return (
    <div onScroll={grow} onLoad={tierer}>
        <div className="header">
            <a href={"/"}>TIERLISTER</a>
        </div>
        <div id="description" className="description">
            <img id="tierlistImage" src="https://imgur.com/dcJucdc.jpeg" alt="tierlist img"/>
            <h2 id="tierlistName">TIERLIST</h2>
            <p id="tierlistDescription"></p>
        </div>
        <div style={{display: 'flex'}}>
        <div id={"tierlist"} className="tierlist">
        </div>
        <div id="rest" className="rest" onDrop={drop} onDragOver = {allowDrop}></div>
        </div>
        <div id="creation" className="inactiveCreation">
            <input id="memberName" className="panelTop" type="text"/>
            <input id="memberURL" className="panelTop" type="text" onChange={changeImage}/>
            <div id="imgContainer">
                <img alt="yep" id="memberImage"/>
            </div>
            <div className="direita test">
                <textarea id="memberDescription"></textarea>
                <div className="cancel" id="cancel" onClick={lift}>CANCEL</div>
                <div className="confirm" id="confirm" onClick={newCharacter}>CONFIRM</div>
            </div>
        </div>
    </div>
  );
}

export default Tier;