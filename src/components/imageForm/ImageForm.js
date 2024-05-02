import React from 'react';
import "./ImageForm.css";
import { useState } from 'react';
import Button from '../button/Button';

export default function ImageForm({ addImage }) {

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
      <div className="inputes">
        <div>
          <label htmlFor="Name">Name: </label>
          <input
            value={imageName}
            onChange={event => setImageName(event.target.value)}
            type="text"
            id="Name"
            placeholder="Write the name down"
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image (URL): </label>
          <input
            value={imageUrl}
            onChange={event => setImageUrl(event.target.value)}
            type="text"
            id="image"
            placeholder="Paste image Url"
            required
          />
        </div>
      </div>
      <div id='change'>
        {(imageUrl) ?
          (<img id="image-preview" alt={imageName} className="image-preview" src={imageUrl} />) :
          (<div id='image-preview'><p>set image</p></div>)
        }
      </div>
      <Button type="undefined" onClick={() => handleAddImage()}>
        Add Image
      </Button>
    </div>
  )
}
