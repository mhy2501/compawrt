import MyNavBar from "../components/MyNavBar";
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import "./babies.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function OurBabies() {
  const [postedFurBabies] = useState(useLoaderData());
  const [searchResults, setSearchResults] = useState("");

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: (
      <div>
        <div className="next-slick-arrow">
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className="prev-slick-arrow">
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
          <div className="search-bar">
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

        <Slider {...settings}>
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
                      .includes(searchResults.toLowerCase()) ||
                    post.age
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
        </Slider>
      </div>
    </div>
  );
}

export default OurBabies;
