import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/scss/section/_setphoto.scss';

import smallImage1 from '../../assets/images/imagetest/img_data01.png';
import smallImage2 from '../../assets/images/imagetest/img_data02.png';
import smallImage3 from '../../assets/images/imagetest/img_data03.png';
import largeImage1 from '../../assets/images/imagetest/img_data04.png';
import largeImage2 from '../../assets/images/imagetest/img_data05.png';
import largeImage3 from '../../assets/images/imagetest/img_data06.png';

const Card = props => {
  const smallSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  const largeSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true
  };

  return (
    <div id="card" className={props.attr}>
      <div className="card__inner">
        <div className="card__box">
          <Slider {...smallSliderSettings}>
            <div className="cardItem">
              <Link to="/Festival">
                <figure>
                  <img src={smallImage1} className="main-img" style={{ width: '300px', height: '400px' }} />
                </figure>
              </Link>
            </div>
            <div className="cardItem">
              <Link to="/">
                <figure>
                  <img src={smallImage2} className="main-img" style={{ width: '300px', height: '400px' }} />
                </figure>
              </Link>
            </div>
            <div className="cardItem">
              <Link to="/Market">
                <figure>
                  <img src={smallImage3} className="main-img" style={{ width: '300px', height: '400px' }} />
                </figure>
              </Link>
            </div>
          </Slider>
        </div>
      </div>

      <div className="large-slider">
        <Slider {...largeSliderSettings}>
          <div>
            <img src={largeImage1} className="large-img" style={{ width: '100%', height: '1000px' }} />
          </div>
          <div>
            <img src={largeImage2} className="large-img" style={{ width: '100%', height: '1000px' }} />
          </div>
          <div>
            <img src={largeImage3} className="large-img" style={{ width: '100%', height: '1000px' }} />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Card;
