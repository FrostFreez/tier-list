import React from 'react';
import "./ImageForm.css";
import {useState} from 'react';
import Button from '../button/Button';

export default function ImageForm({addImage}) {

  const [imageUrl, setImageUrl] = useState("");

  function handleAddImage() {    
    console.log("adding image")
    addImage(imageUrl);
    setImageUrl("") ;
  }

  return (
    <div action="" className="image-form">        
      <div className="inputs">
        <div>
          <label htmlFor="image">Image url: </label>
          <input 
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
            type="text"             
            id="image"
            placeholder="Paste image Url"
            required
          />
          {imageUrl ? 
            (<img id="image" alt="image not found" className="image-preview" src={imageUrl}/>) :
            (<p>set image</p>)
          }  
        </div>        
      </div>      
      <Button type="undefined" onClick={() => handleAddImage()}>
        Add Image
      </Button>         
    </div>
  
  )
}
