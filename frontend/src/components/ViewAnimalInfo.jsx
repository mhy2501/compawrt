import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import MyNavBar from "./MyNavBar";
import "./ViewAnimalInfo.css";

function ViewAnimalInfo() {
  const [viewAnimalInfo] = useState(useLoaderData());

  return (
    <div>
      <MyNavBar />
      <div className="animal-card">
        {viewAnimalInfo?.map((animalInfo) => {
          return (
            <div className="animal-card-item">
              <div className="animal-card-img">
                <img src={animalInfo.image_url} alt="pet dog/cat"></img>
              </div>
              <div className="animal-card-txt">
                <div className="animal-card-name">
                  <p>{animalInfo.pet_name}</p>
                </div>
                <div className="animal-card-detail">
                  <p>
                    Age: <span className="span">{animalInfo.age}</span>
                  </p>
                  <p>
                    Gender: <span className="span">{animalInfo.gender}</span>
                  </p>
                  <p>
                    Desription:{" "}
                    <span className="span">{animalInfo.description}</span>
                  </p>
                  <p>
                    Type: <span className="span">{animalInfo.type}</span>
                  </p>
                  <div className="animal-card-btn">
                    <Link to=''>
                      <button>Adopt Inquiry</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewAnimalInfo;
