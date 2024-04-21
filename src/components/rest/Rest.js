import React from 'react';
import "./Rest.css";
import { resetClipboardStubOnView } from '@testing-library/user-event/dist/cjs/utils/index.js';

export default function Rest({rests}) {

  return (
    <div className="rest">                
      {
        rests.map(imageUrl => (<img src={imageUrl} alt="not found!"></img>))
      }
    </div>
  
  )
}
