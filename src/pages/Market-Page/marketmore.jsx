import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./marketmore.css";
import Main from "../../components/page/Main";
import ChuncheonMarketMap from "./ChuncheonMarketMap";

const MarketMore = () => {
  const { index } = useParams();
  const [market, setMarket] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageError, setImageError] = useState(false);
  const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

  useEffect(() => {
    fetch(`${databaseURL}/전통시장데이터/${index}.json`)
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
          const imageName = encodeURIComponent(data.시장명);
          const possibleExtensions = ['jpg', 'jpeg', 'png'];

          let foundImage = false;
          possibleExtensions.forEach(ext => {
            if (!foundImage) {
              const url = `https://storage.googleapis.com/python-db-practice-96823.appspot.com/${imageName}.${ext}`;
              fetch(url)
                .then(res => {
                  if (res.ok) {
                    setImageUrl(url);
                    setImageError(false);
                    foundImage = true;
                  } else {
                    setImageError(true);
                  }
                })
                .catch(() => setImageError(true));
            }
          });
        } else {
          console.log('No data available for this index');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [index]);

  return (
    <Main>
      <div className="main-container">
        <div className="main-content">
          <h1>시장 상세 페이지</h1>
          {market ? (
            <div>
              <div className='mkheader__text'>{market.시장명}</div>
              <p>Market ID: {index}</p>
              <div className='mkphoto__inner'>
                {imageUrl && !imageError ? (
                  <img src={imageUrl} alt={market.시장명} />
                ) : (
                  <p>이미지를 불러올 수 없습니다.</p>
                )}
                <div className='texts'>
                  <div className='text1'>소재지 도로명 주소: {market.소재지도로명주소}</div>
                  <div className='text2'>소재지 지번 주소: {market.소재지지번주소}</div>
                  <div className='text3'>사용 가능 상품권: {market.사용가능상품권}</div>
                  <div className='text3'>주차장: {market.주차장보유여부}</div>
                  <div className='text3'>공중화장실: {market.공중화장실보유여부}</div>
                </div>
              </div>
              {market.시장명 === '춘천중앙시장' && <ChuncheonMarketMap />}
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
