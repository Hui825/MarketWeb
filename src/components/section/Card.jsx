import React from 'react';
import './card.css';
import { FcFinePrint } from "react-icons/fc";
import { FcAddDatabase } from "react-icons/fc";
import { FcSearch } from "react-icons/fc";
import { FcVoicePresentation } from "react-icons/fc";

const Card = () => {
    return (
        <div className="card">
            <div className="large-image-container">
                <FcSearch className="speech-bubble-icon-left" />
                <div className="speech-bubble-left">
                    <p className="welcome-text"> 다양한 축제와 장터를 찾아 즐겨보세요!</p>
                    <FcFinePrint className="large-icon-left" />
                </div>
            </div>
            <div className="large-image-container">
                <div className="speech-bubble-right">
                    <p className="welcome-text"> 로그인 기능을 통해서 정보를 등록할 수 있습니다.</p>
                    <FcAddDatabase className="large-icon-right" />
                </div>
                <FcVoicePresentation className="speech-bubble-icon-right" />
            </div>
        </div>
    );
};

export default Card;
