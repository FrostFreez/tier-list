import React from 'react';
import "./Rest.css";

export default function Rest({rests}) {

  return (
    <div className="rest">
      {
        rests.map(imageUrl => (<img src={imageUrl[0]} alt={imageUrl[1]}></img>))
      }
    </div>
  )
}