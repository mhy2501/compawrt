import MyNavBar from "../components/MyNavBar";
import { useState, useRef } from "react";
import { Link, useLoaderData } from "react-router-dom";
import app from "../api/axios-config";
import "./babies.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function OurBabies() {
  const settings = {
    dots: true,
    infinite: true,
    // speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
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

  const [postedFurBabies] = useState(useLoaderData());

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
        </div>

        <Slider {...settings}>
          {postedFurBabies?.map((post) => {
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
