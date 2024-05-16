import React from 'react';
import Header from '../../components/section/Header-Footer/Header'; // 헤더 컴포넌트 임포트
import './RegistMenu.css';

const RegistMenu = () => {
    return (
        <>
            <Header />
            <div className="regist-container">
                <h1 className="regist-title">지역축제 정보 등록하기</h1>
                <div className="photo-upload">
                    <label htmlFor="photo">사진 첨부</label>
                    <input type="file" id="photo" name="photo" />
                </div>
                <div className="festival-name">
                    <label htmlFor="festival-name">축제 이름</label>
                    <input type="text" id="festival-name" name="festival-name" placeholder="축제명을 입력하세요" />
                </div>
                <div className="festival-period">
                    <label htmlFor="start-date">축제 시작일</label>
                    <input type="date" id="start-date" name="start-date" />
                    <label htmlFor="end-date">축제 종료일</label>
                    <input type="date" id="end-date" name="end-date" />
                </div>
                <div className="festival-content">
                    <label htmlFor="content">축제 내용</label>
                    <textarea id="content" name="content" placeholder="축제 내용을 입력하세요"></textarea>
                </div>
                <div className="submit-button">
                    <button type="submit">등록</button>
                </div>
            </div>
        </>
    );
};

export default RegistMenu;
