import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./festivalmore.css";
import Main from "../../components/page/Main";
import img1 from "../../assets/images/_menu01.png";

const FestivalMore = () => {
  const { index } = useParams();
  const [festival, setFestival] = useState(null);
  const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

  useEffect(() => {
    fetch(`${databaseURL}/지역축제정보데이터/${index}.json`) // `index`를 사용해 특정 데이터만 조회
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        if (data) {
          setFestival(data);
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
          <h1>축제 상세 페이지</h1>
          {festival ? (
            <div>
              <div className="fesheader__text">{festival.축제명}</div>
              <p>Festival ID: {index}</p>
              <div className="fesphoto__inner">
                <img src={img1} alt="Festival" />
                <div className="texts">
                  <div className="text1">개최 기간: {festival.개최기간}</div>
                  <div className="text2">축제 유형: {festival.축제유형}</div>
                  <div className="text3">오시는 길</div>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </Main>
  );
};

export default FestivalMore;
