import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../../assets/scss/layout/_slider.scss';

const Slider = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(true);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex);
  };

  const toggleAutoplay = () => {
    const swiper = swiperRef.current.swiper;
    if (swiper.autoplay.running) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
    setIsAutoplayEnabled(!isAutoplayEnabled);
  };

  return (
    <div id="sliderSection" className={props.attr}>
      <div className="slider__inner">
        <div className="slider__img">
          <Swiper
            ref={swiperRef}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              enabled: isAutoplayEnabled,
            }}
            slidesPerView={4}
            slidesPerGroup={1}
            spaceBetween={20}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Autoplay, Navigation, Pagination]}
            onSlideChange={handleSlideChange}
          >
            <SwiperSlide>
              <img src={require("../../assets/images/Main_slide01.png")} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../../assets/images/Main_slide02.png")} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../../assets/images/Main_slide03.png")} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../../assets/images/Main_slide04.png")} alt="" />
            </SwiperSlide>
            <SwiperSlide>
              <img src={require("../../assets/images/Main_slide05.png")} alt="" />
            </SwiperSlide>
            </Swiper>
        </div>
        <div className="slide-count-wrap">
          <span className="slide-count">{currentSlide + 1} / 5</span>
          <div
            className={`btn-play ${isAutoplayEnabled ? '' : 'on'}`}
            onClick={toggleAutoplay}
          >
            {isAutoplayEnabled ? 'Pause' : 'Play'}
          </div>
        </div>
      </div>
    </div>
  );
};

Slider.propTypes = {
  attr: PropTypes.string,
};

export default Slider;
