import React from 'react';
import Rest from '../rest/Rest';
import "./TierList.css";

export default function TierList({ranks, setRanks, images, setImages}) {

  function handleOnDrag(event, imageUrl) {    
    event.dataTransfer.setData("imageUrl", imageUrl);
  }

  function handleOnDrop(event, rank) {  
    const imageUrl = event.dataTransfer.getData("imageUrl");
    removeImageFromOldList(imageUrl);    
    rank.items.push(imageUrl);
    setRanks([... ranks]);
  }

  function handleOnDropRest(event) {
    const imageUrl = event.dataTransfer.getData("imageUrl");
    removeImageFromOldList(imageUrl);
    images.push(imageUrl);
    setImages([... images]);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function removeImageFromOldList(imageUrl) {
    ranks.forEach(rank => {
      rank.items = rank.items.filter(curr => imageUrl != curr);
      return rank;
    });
    images = images.filter(image => imageUrl != image);
    setImages([...images]);
    setRanks([... ranks]);
  }
  
  function handleOnWaste(event) {
    const imageUrl = event.dataTransfer.getData("imageUrl");
    removeImageFromOldList(imageUrl);
  }

  function handleRemoveRank(removedRank) {
    console.log("removing rank");
    let newMockRanks = ranks.filter(rank => rank.name != removedRank.name);
    setRanks(newMockRanks);
  }

  function handleMoveUp(movedRank, index) {    
    if (index > 0) {      
      const newMockRanks = ranks;
      const previousRank = ranks[index-1];
      newMockRanks[index-1] = movedRank;
      newMockRanks[index] = previousRank;
      setRanks([...newMockRanks]);
    }
  }

  function handleMoveDown(movedRank, index) {
    console.log("moving Down", movedRank, index);
    if (index < ranks.length -1) {
      const newMockRanks = ranks;
      const nextRank = ranks[index+1];
      newMockRanks[index+1] = movedRank;
      newMockRanks[index] = nextRank;
      setRanks([...newMockRanks]);
    }
  }

  function renderItem(rank, index) {
    return (
      <div key={index} className="rank">
        <div className="rank-title" style={{backgroundColor: rank.color}}>
          <span>{rank.name}</span>
        </div>
        <div className="rank-items" 
          onDrop={(event) => handleOnDrop(event, rank)}
          onDragOver={handleDragOver}
        >
          {rank.items.map((image, index) => (
            <div key={index} className="rank-item">
              <img src={image} 
                alt="Image not found." 
                draggable
                onDragStart={(e) => handleOnDrag(e, image)}
              />
            </div>
          ))}
        </div>
        <div className="actions">
          <div className="action" onClick={() => handleMoveUp(rank, index)}>
            ^
          </div>
          <div className="remove-action" onClick={() => handleRemoveRank(rank)}>
            X
          </div>
          <div className="action" onClick={() => handleMoveDown(rank, index)}>
            v
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="ranks">
      <h3>Ranks</h3>
      <div className="ranks-list">
        {ranks.map((rank, index) => renderItem(rank, index))}
      </div>
      <Rest rests={images} 
        onDrag={(event, imageUrl) => handleOnDrag(event, imageUrl)}
        onDrop={(event) => handleOnDropRest(event)}
        onWaste={(event) => handleOnWaste(event)}
        />
    </div>
  )
}