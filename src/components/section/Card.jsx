import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/scss/section/_setphoto.scss'

import menu1 from "../../assets/images/_menu01.png";
import menu2 from "../../assets/images/_menu02.png";
import menu3 from "../../assets/images/_menu03.png";



const Card = props => {
  return (
    <div id="card" className={props.attr}>
      <div className="card__inner">
        <div className="card__box">
          <div className="cardItem">
            <Link to="/Festival">
              <figure>
                <img src= {menu1} className = "main-img" />
              </figure>
            </Link>
          </div>
          <div className="cardItem">
            <Link to="/">
              <figure>
                <img src= {menu2} className = "main-img" />
              </figure>
            </Link>
          </div>
          <div className="cardItem">
            <Link to="/Market">
              <figure>
                <img src= {menu3} className = "main-img" />
              </figure>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;