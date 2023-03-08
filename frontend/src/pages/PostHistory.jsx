import { useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import app from "../api/axios-config";
import Dialog from "../components/Dialog";
import "./History.css";
import { formatDate } from "../../utils/FileFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function PostHistory() {
  const [postedFurBabies, setPostedFurBabies] = useState(useLoaderData());
  const [searchResults, setSearchResults] = useState('')
 
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
      <div className="search-bar">
        <form className="search-form">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input 
        className="search-input"
        type='text'
        placeholder='Search by name, gender, status, type or age'
        onChange={(e) => setSearchResults(e.target.value)} />
      </form>
      </div>
      <div className="reminder">
        <p className="reminder-head">Reminder*** <span className="reminder-txt">Please update the status of your pets if it was already adopted.</span></p>
      </div>
      <div className="cards">
        {postedFurBabies.length > 0 ? 
        ( 
          postedFurBabies.filter((post) => {
            return searchResults.toLowerCase() === '' ? post :
            post.status.toLowerCase().includes(searchResults.toLowerCase()) ||
            post.pet_name.toLowerCase().includes(searchResults.toLowerCase()) ||
            post.gender.toLowerCase().includes(searchResults.toLowerCase()) ||
            post.type.toLowerCase().includes(searchResults.toLowerCase()) ||
            post.age.toLowerCase().includes(searchResults.toLowerCase())
          })
          .map((post) => {
          return (
            <div className="card-item" key={post.animal_id}>
              <img
                src={post.image_url}
                alt="pet animal"
                className="card-image"
              ></img>
              <div className="card-text">
              {post.pet_name}
                <p>Status: <span className={post.status === 'adopted' && 'save'}>{post.status}</span></p>
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
        })
        ) :
          <p className="no-data">No data to display.</p>
          }
           {dialog.isLoading && (
          <Dialog onDialog={sureDelete} message={dialog.message} />
        )}
      </div>
    </div>
  );
}

export default PostHistory;
