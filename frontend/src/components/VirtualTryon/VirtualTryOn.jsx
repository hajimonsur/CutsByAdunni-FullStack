import { useState } from "react";
import axios from "axios";

function VirtualTryOn() {
  const [userImage, setUserImage] = useState("");
  const [clothImage, setClothImage] = useState("");
  const [resultImage, setResultImage] = useState("");

  const handleTryOn = async () => {
    const response = await axios.post("http://localhost:3030/tryon", {
      userImage,
      clothImage,
    });
    setResultImage(response.data.output_image);
  };

  return (
    <div>
      <input type="text" placeholder="User Image URL" onChange={(e) => setUserImage(e.target.value)} />
      <input type="text" placeholder="Cloth Image URL" onChange={(e) => setClothImage(e.target.value)} />
      <button onClick={handleTryOn}>Try On</button>
      {resultImage && <img src={resultImage} alt="Try-On Result" />}
    </div>
  );
}

export default VirtualTryOn;
