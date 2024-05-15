import React from 'react';
import './card.css';

// 이미지 파일 경로를 import 합니다.
import smallImage1 from '../../assets/images/menukey.png';
import smallImage2 from '../../assets/images/menukey.png';
import smallImage3 from '../../assets/images/menukey.png';
import smallImage4 from '../../assets/images/menukey.png';
import largeImage from '../../assets/images/Main_slide01.png';

const Card = () => {
    return (
        <div className="card">
            <div className="small-images-container">
                <img src={smallImage1} alt="small-img-1" className="small-img" />
                <img src={smallImage2} alt="small-img-2" className="small-img" />
                <img src={smallImage3} alt="small-img-3" className="small-img" />
                <img src={smallImage4} alt="small-img-4" className="small-img" />
            </div>
            <div className="large-image-container">
                <img src={largeImage} alt="large-img" className="large-img" />
            </div>
        </div>
    );
};

export default Card;
