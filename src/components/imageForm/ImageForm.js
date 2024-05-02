import React from 'react';
import "./ImageForm.css";
import {useState} from 'react';
import Button from '../button/Button';

export default function ImageForm({addImage}) {

  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");

  function handleAddImage() {    
    console.log("adding image")
    addImage(imageUrl, imageName);
    setImageUrl("");
    setImageName("");
  }

  return (
    <div action="" className="image-form">
      <div className="inputs">
        <div>
        <label htmlFor="Name">Member name: </label>
          <input
            value={imageName}
            onChange={event => setImageName(event.target.value)}
            type="text"
            id="Name"
            placeholder="Write the name down"
            required
          />
          <label htmlFor="image"> Member image (URL): </label>
          <input 
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
            type="text"
            id="image"
            placeholder="Paste image Url"
            required
          />
          {(imageUrl) ?
            (<img id="image" alt={imageName} className="image-preview" src={imageUrl}/>) :
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
