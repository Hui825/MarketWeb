import React, { useState } from 'react';
import Header from '../../components/section/Header-Footer/Header';
import AddressPopup from '../../pages/ETC/AdressPopup';
import './RegistMenu.css';

const RegistMenufes = () => {
    const [roadAddress, setRoadAddress] = useState('');
    const [jibunAddress, setJibunAddress] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleAddressSelect = ({ roadAddress, jibunAddress }) => {
        setRoadAddress(roadAddress);
        setJibunAddress(jibunAddress);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted data:', {
            roadAddress,
            jibunAddress,
            // 여기에 다른 데이터들도 추가
        });
    };

    return (
        <>
            <Header />
            <div className="regist-container">
                <h1 className="regist-title">지역축제 정보 등록하기</h1>
                <form onSubmit={handleSubmit}>
                    <div className="photo-upload">
                        <label htmlFor="photo">사진 첨부</label>
                        <input type="file" id="photo" name="photo" />
                    </div>
                    <div className="festival-name">
                        <label htmlFor="festival-name">축제 이름</label>
                        <input type="text" id="festival-name" name="festival-name" placeholder="시장명을 입력하세요" />
                    </div>
                    <div className="festival-period">
                        <label htmlFor="start-date">축제 시작일</label>
                        <input type="date" id="start-date" name="start-date" />
                        <label htmlFor="end-date">축제 종료일</label>
                        <input type="date" id="end-date" name="end-date" />
                    </div>
                    <div className="address-input">
                        <label htmlFor="roadAddress">도로명 주소</label>
                        <input
                            type="text"
                            id="roadAddress"
                            name="roadAddress"
                            value={roadAddress}
                            readOnly
                            placeholder="도로명 주소를 검색하세요"
                            onClick={() => setIsPopupOpen(true)}
                        />
                        <label htmlFor="jibunAddress">지번 주소</label>
                        <input
                            type="text"
                            id="jibunAddress"
                            name="jibunAddress"
                            value={jibunAddress}
                            readOnly
                            placeholder="지번 주소"
                        />
                    </div>
                    <div className="festival-content">
                        <label htmlFor="content">시장 내용</label>
                        <textarea id="content" name="content" placeholder="시장 내용을 입력하세요"></textarea>
                    </div>
                    <div className="submit-button">
                        <button type="submit">등록</button>
                    </div>
                </form>
                {isPopupOpen && (
                    <AddressPopup
                        onClose={() => setIsPopupOpen(false)}
                        onAddressSelect={handleAddressSelect}
                    />
                )}
            </div>
        </>
    );
};

export default RegistMenufes;
