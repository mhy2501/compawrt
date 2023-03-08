import MyNavBar from "../components/MyNavBar";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import "./OurBabies.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/Footer";

function OurBabies() {
  const [postedFurBabies] = useState(useLoaderData());
  const [searchResults, setSearchResults] = useState("");

  return (
    <div className="container">
      <MyNavBar />
      <div className="card">
        <div className="card-title">
          <h1>These are the pets ready for adoption</h1>
        </div>
        <h3>Ready to Adopt A Rescue?</h3>
        <div className="card-txt">
          They are looking for their forever homes. One of them (or two) might
          be the perfect addition to your family.
          <div className="search--bar">
            <form className="search-form">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
              <input
                className="search-input"
                type="text"
                placeholder="Search..."
                onChange={(e) => setSearchResults(e.target.value)}
              />
            </form>
          </div>
        </div>
        <div className="card-container">
          {postedFurBabies
            ?.filter((post) => {
              return searchResults.toLowerCase() === ""
                ? post
                : post.status
                    .toLowerCase()
                    .includes(searchResults.toLowerCase()) ||
                    post.pet_name
                      .toLowerCase()
                      .includes(searchResults.toLowerCase()) ||
                    post.gender
                      .toLowerCase()
                      .includes(searchResults.toLowerCase()) ||
                    post.type
                      .toLowerCase()
                      .includes(searchResults.toLowerCase());
            })
            .map((post) => {
              return (
                <div className="baby-cards" key={post.animal_id}>
                  <Link to={`view/${post.animal_id}`}>
                    <img
                      src={post.image_url}
                      alt="pet animal"
                      className="card-images"
                    ></img>
                  </Link>
                  <div className="card-name">{post.pet_name}</div>
                </div>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OurBabies;
