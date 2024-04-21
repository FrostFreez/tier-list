import "./Rank.css";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTierList } from '../../kv/kvConnections';
import TierList from "../../components/tierList/TierList";
import TierForm from '../../components/tierForm/TierlistForm';
import ImageForm from '../../components/imageForm/ImageForm';
import RankForm from '../../components/rankForm/RankForm';
import Rest from '../../components/rest/Rest';

export default function Rank() {
  
  // eslint-disable-next-line
  const [result, setResult] = useState({});
  const {tierId} = useParams();
  const [images, setImages] = useState([]);
  const [ranks, setRanks] = useState([
    {
      name: 'S', 
      color: '#ff807f', 
      items: [
        {memberName: "VideoGame",
         memberImage:"https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww"},
         {memberName: "VideoGame",
         memberImage: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww"},
         {memberName: "VideoGame",
         memberImage: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww"}
      ]
    },
    {name: 'A', color: '#fdc081', items: [{memberName: "VideoGame",
    memberImage: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww"}]},
    {name: 'B', color: '#ffdf82', items: []},
    {name: 'C', color: '#beff81', items: []},
    {name: 'D', color: '#7fffff', items: [{memberName: "VideoGame",
    memberImage: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww"}]}
  ]);
  
  
  function handleAddRank(rank) {
    console.log("rank added")
    setRanks([...ranks, rank]);
  }

  function handleAddImage(image, name) {
    console.log("image added", [image, name])
    images.push([image, name]);
    console.log('imagens', images)
    setImages([...images]);
  }
  
  useEffect(() => {
    async function fetchData() {
      const data = await getTierList(tierId);
      console.table(data);
      setResult(data);
    }
    fetchData();
  });

  return (
    <div className="rank-page">
      <TierForm/>
      <div>
        <div>
          <RankForm addRank={(rank) => handleAddRank(rank)}/>
        </div>
        <div>
          <ImageForm addImage={(image, name) => handleAddImage(image, name)}/>
        </div>
      </div>
      <TierList ranks={ranks} setRanks={setRanks}/>
      <Rest rests={images}/>
    </div>
  );
}