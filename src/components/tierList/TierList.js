import React from 'react';
import "./TierList.css";

export default function TierList({ranks, setRanks}) {

  function handleRemoveRank(removedRank) {
    console.log("removing rank");
    let newMockRanks = ranks.filter(rank => rank.name !== removedRank.name);
    setRanks(newMockRanks);
  }

  function handleMoveUp(movedRank, index) {
    console.log("moving up");
    if (index > 0) {
      console.log("movving")
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
        <div className="rank-items">
          {rank.items.map((image, index) => (
            <div key={index} className="rank-item">
              <img src={image.memberImage} alt={image.memberName} />
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
    </div>
  )
}