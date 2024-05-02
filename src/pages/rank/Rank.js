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
  const { tierId } = useParams();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState("");
  const [topics, setTopics] = useState([]);
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTierList(tierId);
        setName(data.name || '');
        setImage(data.image || '');
        setImages(data.images || [])
        setRanks(data.ranks || [])
        setTopics(data.topics || [])
        setIsLoading(false);
      } catch (error) {
        alert(error);
        setIsLoading(false);
      }
    }
    if (tierId) {
      console.log('loading tier');
      setIsLoading(true);
      fetchData();
    } else {
      console.log('Creating tier');
      setIsLoading(false)
    }
  }, [tierId]);

  async function handleOnSave() {
    const tierList = {
      name,
      image,
      topics,
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
      <div className="headerR">
        <a href={"/"}>TIERLISTER</a>
      </div>
      {
        isLoading ? (<div>LOADING</div>) :
          (
            <div>
              <TierForm
                name={name}
                setName={name => setName(name)}
                onSave={() => handleOnSave()}
              />
              <div className="inputs">
                <div>
                  <RankForm addRank={(rank) => handleAddRank(rank)} />
                </div>
                <div>
                  <ImageForm addImage={(image) => handleAddImage(image)} />
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