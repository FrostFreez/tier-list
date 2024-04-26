import "./Rank.css";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createTierList2, updateTierList2, getTierList2 } from '../../kv/kvConnections';
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
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [ranks, setRanks] = useState([
    {
      name: 'S', 
      color: '#ff807f', 
      items: [
        "https://plus.unsplash.com/premium_photo-1678112180202-cd950dbe5a35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXJsfGVufDB8fDB8fHww",
      ]
    },
    {name: 'A', color: '#fdc081', items: ["https://plus.unsplash.com/premium_photo-1683865776032-07bf70b0add1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHVybHxlbnwwfHwwfHx8MA%3D%3D"]},
    {name: 'B', color: '#ffdf82', items: []},
    {name: 'C', color: '#beff81', items: []},
    {name: 'D', color: '#7fffff', items: ["https://plus.unsplash.com/premium_photo-1675662135639-89ac3d8ee8fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHVybHxlbnwwfHwwfHx8MA%3D%3D"]}
  ]);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTierList2(tierId);
        console.table(data);
        setName(data.name);
        setDescription(data.description);
        setImages(data.images)
        setRanks(data.ranks)
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
      description,
      ranks,
      images
    };
    if (tierId == name) {
      try {
        await updateTierList2(tierId, tierList);
        alert("Saved");
      } catch (err) {
        alert(err)
      }
    } else {
      try {
        await createTierList2(name, tierList);
        alert("Created");
        navigate("/rank/" + name);
      } catch (err) {
        console.log('asdasdasdasd')
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
            description={description}
            setDescription={description => setDescription(description)} 
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