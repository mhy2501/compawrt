import { useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import app from "../api/axios-config";
import Dialog from "../components/Dialog";
import "./History.css";

function PostedFurBabies() {
  const [postedFurBabies, setPostedFurBabies] = useState(useLoaderData());
 
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const postRef = useRef();

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = (id) => {
    handleDialog("Are you sure you want to delete this report?", true);
    postRef.current = id;
  };

  const sureDelete = async (choose) => {
    if (choose) {
      const res = await app.delete(`animalInfo/${postRef.current}`);
      const updatedPost = postedFurBabies.filter(
        (post) => post.animal_id !== postRef.current
      );
      setPostedFurBabies(updatedPost);
      handleDialog("", false);
    } else {
      handleDialog("", false);
    }
  };

  return (
    <div className="history-dashboard">
      <h1>Post History</h1>
      <div className="cards">
        {postedFurBabies?.map((post) => {
          return (
            <div className="card-item" key={post.animal_id}>
              <img
                src={post.image_url}
                alt="pet animal"
                className="card-image"
              ></img>
              <div className="card-text">
               

                 {post.pet_name}
                
                
             </div>
              <div className="btn">
                <div>
                  <Link to={`editPost/${post.animal_id}`}>
                    <button className="edit-btn">View/Edit</button>
                  </Link>
                </div>
                <div>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      handleDelete(post.animal_id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {dialog.isLoading && (
          <Dialog onDialog={sureDelete} message={dialog.message} />
        )}
      </div>
    </div>
  );
}

export default PostedFurBabies;
