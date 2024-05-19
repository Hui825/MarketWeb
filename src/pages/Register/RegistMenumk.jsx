import React, { useState } from 'react';
import Header from '../../components/section/Header-Footer/Header'; // 헤더 컴포넌트 임포트
import DaumPostcode from 'react-daum-postcode';
import './RegistMenu.css';

const RegistMenu = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [roadAddress, setRoadAddress] = useState('');
    const [jibunAddress, setJibunAddress] = useState('');

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    const handleAddressSelect = (data) => {
        setRoadAddress(data.roadAddress);
        setJibunAddress(data.jibunAddress || data.autoJibunAddress);
        setIsPopupOpen(false);
    };

    return (
        <>
            <Header />
            <div className="regist-container">
                <h1 className="regist-title">전통시장 정보 등록하기</h1>
                <div className="photo-upload">
                    <label htmlFor="photo">사진 첨부</label>
                    <input type="file" id="photo" name="photo" />
                </div>
                <div className="festival-name">
                    <label htmlFor="festival-name">시장 이름</label>
                    <input type="text" id="festival-name" name="festival-name" placeholder="시장명을 입력하세요" />
                </div>
                <div className="address-section">
                    <label htmlFor="road-address">도로명 주소</label>
                    <input 
                        type="text" 
                        id="road-address" 
                        name="road-address" 
                        value={roadAddress} 
                        onClick={handleOpenPopup} 
                        readOnly 
                        placeholder="도로명 주소를 검색하세요" 
                    />
                    <label htmlFor="jibun-address">지번 주소</label>
                    <input 
                        type="text" 
                        id="jibun-address" 
                        name="jibun-address" 
                        value={jibunAddress} 
                        readOnly 
                    />
                </div>
                <div className="festival-content">
                    <label htmlFor="content">시장 내용</label>
                    <textarea id="content" name="content" placeholder="시장 내용을 입력하세요"></textarea>
                </div>
                <div className="submit-button">
                    <button type="submit">등록</button>
                </div>
            </div>
            {isPopupOpen && (
                <div className="address-popup">
                    <button className="close-button" onClick={handleClosePopup}>닫기</button>
                    <DaumPostcode onComplete={handleAddressSelect} />
                </div>
            )}
        </>
    );
};

export default RegistMenu;
