import React from "react";
import "./Slide.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
const Slide = ({ children, slidesToShow = 4, className }) => {
  return (
    <div className={className}>
      <div className="container">
        <button className="button-next">
          <FaArrowRightLong size={"18px"} />
        </button>
        <button className="button-prev">
          <FaArrowLeftLong size={"18px"} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".button-prev",
            nextEl: ".button-next",
          }}
          slidesPerView={slidesToShow}
          spaceBetween={10}
          loop={true}
        >
          {React.Children.map(children, (child, index) => (
            <SwiperSlide key={index}>{child}</SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slide;
