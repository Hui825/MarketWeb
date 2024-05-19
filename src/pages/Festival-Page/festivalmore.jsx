import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./festivalmore.css";
import Main from "../../components/page/Main";
import img1 from "../../assets/images/imagetest/img_data01.png";
import { IoBalloon } from "react-icons/io5";
import { GiThreeLeaves } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { RiQuestionFill } from "react-icons/ri";
import { FaBowlFood } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";

const FestivalMore = () => {
  const { index } = useParams();
  const [festival, setFestival] = useState(null);
  const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

  useEffect(() => {
    fetch(`${databaseURL}/지역축제정보데이터/${index}.json`)
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
  }, [index]);

  const getCategoryIcon = (type) => {
    switch (type) {
      case '문화예술':
        return <IoBalloon className="icon" />;
      case '자연':
      case '생태자연':
        return <GiThreeLeaves className="icon" />;
      case '전통역사':
        return <FaBook className="icon" />;
      case '주민화합':
        return <FaPeopleGroup className="icon" />;
      case '특산물':
      case '지역특산물':
        return <FaBowlFood className="icon" />;
      case '기타':
      default:
        return <RiQuestionFill className="icon" />;
    }
  };

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
                <img src={img1} alt="Festival" className="festival-image" />
                <div className="map-placeholder">Map Placeholder</div>
              </div>
              <div className="texts">
                <div className="text1">기간: {festival.개최기간}</div>
                <div className={`text2 section__data ${festival.축제유형}`}>
                  축제 유형: {getCategoryIcon(festival.축제유형)} {festival.축제유형}
                </div>
                <div className="text2">개최 방식: {festival.개최방식}</div>
                <div className="text3">장소: {festival.개최장소}</div>
                <div className="text4">담당자명: {festival.담당자} 연락처: {festival.연락처}</div>
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
