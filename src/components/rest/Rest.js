import React from 'react';
import "./Rest.css";

export default function Rest({rests, onDrag, onDrop, onWaste}) {

  return (
    <div className="rest" >     
      <div className="rest-images"
        onDrop={(event) => onDrop(event)}
        onDragOver={(event) => event.preventDefault()}
      >
        {
          rests.map(imageUrl => {
            return (
              <img src={imageUrl}
                draggable
                alt="not found!"
                onDragStart={(e) => onDrag(e, imageUrl)}             
              />
            )
          })
        }
      </div>           
      <div className="rest-waste"
        onDrop={(event) => onWaste(event)}
        onDragOver={(event) => event.preventDefault()}
      >
        <div>waste</div>
      </div>      
    </div>
  )
}