import React from 'react';
import "./RankForm.css";
import { useState} from 'react';
import Button from '../button/Button';

export default function RankForm({addRank}) {

  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  function handleAddRank() {    
    console.log("adding rank", {name, color})
    addRank({name, color, items: []}) 
  }

  return (
    <div action="" className="rank-form">        
      <div className="inputs">
        <div>
          <label htmlFor="task">Name: </label>
          <input 
            value={name}
            onChange={event => setName(event.target.value)}
            type="text"             
            id="task"
            placeholder="Tier list name"
            required
          />
        </div>
        <div>
          <label htmlFor="color">Color: </label>
          <input 
            className="input-color"
            value={color}
            onChange={event => setColor(event.target.value)}
            type="color" 
            name="color"
            id="color"
            placeholder="Tier list description"
            required
          />
        </div>         
      </div>      
      <Button type="undefined" onClick={() => handleAddRank()}>
        Add Rank
      </Button>         
    </div>
  
  )
}
