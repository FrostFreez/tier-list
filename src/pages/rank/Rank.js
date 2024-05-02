import "./Rank.css";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTierList, updateTierList, getTierList } from '../../kv/kvConnections';
import { useNavigate } from 'react-router-dom';
import TierList from "../../components/tierList/TierList";
import TierForm from '../../components/tierForm/TierlistForm';
import ImageForm from '../../components/imageForm/ImageForm';
import RankForm from '../../components/rankForm/RankForm';

export default function Rank() {
  
  // eslint-disable-next-line
  const navigate = useNavigate();  
  const {tierId} = useParams();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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
    {name: 'D', color: '#7fffff', items: ["https://plus.unsplash.com/premium_photo-1675662135639-89ac3d8ee8fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVybHxlbnwwfHwwfHx8MA%3D%3D"]}
  ]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTierList(tierId);
        console.table(data);
        setName(data.name || '');
        setImages(data.images || [])
        setRanks(data.ranks || [])
        setIsLoading(false);
      }catch(error) {
        alert(error);
        setIsLoading(false);
      }
    }
    if(tierId) {
      console.log('loading tier');
      setIsLoading(true);
      fetchData();      
    }else {
      console.log('Creating tier');
      setIsLoading(false)
    }        
  }, [tierId]);
  
  async function handleOnSave() {
    const tierList = {
      name,
      image: "https://cdn.thespike.gg/Eddie%2FBreeze%20callouts_1687435342902.jpg",
      topics: ["VIDEOGAME", "CHARACTER"],
      ranks,
      images
    };
    if (tierId === name) {
      try {
        await updateTierList(tierId, tierList);
        alert("Saved");
      } catch (err) {
        alert(err)
      }
    } else {
      try {
        await createTierList(name, tierList);
        alert("Created");
        navigate("/rank/" + name);
      } catch (err) {
        alert(err)
      }      
    }
  }
  
  function handleAddRank(rank) {
    console.log("rank added")
    setRanks([...ranks, rank]);
  }
  
  function handleAddImage(image) {
    console.log("image added", image)
    images.push(image);
    console.log('imagens', images)
    setImages([...images]);
  }
  
  return (    
    <div className="rank-page">  
    {
      isLoading ? (<div>LOADING</div>) :
      (
        <div>
          <TierForm 
            name={name}
            setName={name => setName(name)}
            onSave={() => handleOnSave()}
          />
          <div>
            <div>
              <RankForm addRank={(rank) => handleAddRank(rank)}/>
            </div>
            <div>
              <ImageForm addImage={(image) => handleAddImage(image)}/>
            </div>        
          </div>
          <TierList 
            ranks={ranks} 
            setRanks={setRanks}
            images={images}
            setImages={setImages}
          />      
        </div>
      )      
    }  
    </div>  
    
  );
}