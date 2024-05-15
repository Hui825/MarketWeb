import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./marketmore.css";
import Main from "../../components/page/Main";
import img1 from "../../assets/images/_menu01.png";
import YangyangMarketMap from "../../components/YangyangMarketMap.jsx"; // 새로 추가한 컴포넌트 import

const MarketMore = () => {
  const { index } = useParams();
  const [market, setMarket] = useState(null);
  const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

  useEffect(() => {
    fetch(`${databaseURL}/전통시장데이터/${index}.json`) // `index`를 사용해 특정 데이터만 조회
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        if (data) {
          setMarket(data);
        } else {
          console.log('No data available for this index');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [index]); // `index`가 변경될 때마다 이펙트를 재실행

  return (
    <Main>
      <div className="main-container">
        <div className="main-content">
          <h1>시장 상세 페이지</h1>
          {market ? (
            <div>
              <div className='fesheader__text'>{market.시장명}</div>
              <p>Market ID: {index}</p>
              <div className='fesphoto__inner'>
                <img src={img1} alt="Market" />
                <div className='texts'>
                  <div className='text1'>소재지 도로명 주소: {market.소재지도로명주소}</div>
                  <div className='text2'>소재지 지번 주소: {market.소재지지번주소}</div>
                  <div className='text3'>사용 가능 상품권: {market.사용가능상품권}</div>
                  <div className='text3'>주차장: {market.주차장보유여부}</div>
                  <div className='text3'>공중화장실: {market.공중화장실보유여부}</div>
                </div>
              </div>
              {market.시장명 === '양양전통시장' && <YangyangMarketMap />} {/* 양양전통시장일 경우 지도를 포함 */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Main>
  );
};

export default MarketMore;
