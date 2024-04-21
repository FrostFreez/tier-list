import React from 'react';
import { useState} from 'react';
import Button from '../button/Button';
import RankForm from '../rankForm/RankForm';
import InlineEdit from '../inlineEdit/InlineEdit';
import "./TierListForm.css";
// import { useTask } from '../../contexts/taskContext';

export default function TierListForm() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");  
  const [rank, setRank] = useState();

  // const { addTask, tasks }  = useTask();

  function handleAddList(event) {
    event.preventDefault(); 
    console.log("calling add list")
    // addTask({
    //   name,
    //   time,
    //   selected: false,
    //   completed: false,
    //   id: uuidv4()
    // })    
    // resetState();
  }

  function resetState() {
    setName("");
    setDescription("");
    setImageUrl("");
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
