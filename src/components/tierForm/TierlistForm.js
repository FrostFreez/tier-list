import React from 'react';
import Button from '../button/Button';
import InlineEdit from '../inlineEdit/InlineEdit';
import "./TierListForm.css";
// import { useTask } from '../../contexts/taskContext';

export default function TierListForm({name, setName, description, setDescription, onSave}) {

  function handleAddList(event) {
    event.preventDefault();     
    onSave();
  }

  return (
    <div>
      <form action="" className="form" onSubmit={handleAddList}>
        <div className="inputs">
          <div className="">          
            <InlineEdit 
              placeholder="Tier list Name"
              value={name} 
              setValue={(newValue) => setName(newValue)} 
              required={true}>
                <h2>{name}</h2>
            </InlineEdit>
          </div>
          <div className="">          
            <InlineEdit 
              placeholder="Tier list description" 
              value={description} 
              setValue={(newValue) => setDescription(newValue)} 
              required={true}>
              <h3>{description}</h3>
            </InlineEdit>
          </div>
        </div>
        <div className="actions">
          <Button type="submit">
            Save tier
          </Button>
        </div>
      </form>
    </div>

  )
}
