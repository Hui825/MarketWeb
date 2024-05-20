import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./festivalmore.css";
import Main from "../../components/page/Main";
import { IoBalloon } from "react-icons/io5";
import { GiThreeLeaves } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { RiQuestionFill } from "react-icons/ri";
import { FaBowlFood } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import cal from "../../../src/assets/ico/calendericon.png";
import per from "../../../src/assets/ico/personicon.png";
import loc from "../../../src/assets/ico/locationicon.png";
import mor from "../../../src/assets/ico/moreicon.png";

const FestivalMore = () => {
  const { index } = useParams();
  const [festival, setFestival] = useState(null);
  const [nearbyMarkets, setNearbyMarkets] = useState([]);
  const [imageError] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

  useEffect(() => {
    fetch(`${databaseURL}/지역축제정보데이터/${index}.json`)
      .then(response => response.json())
      .then(data => {
        if (data) {
          setFestival(data);
          if (data.개최장소.includes('춘천')) {
            fetchNearbyMarkets('춘천');
          }
        } else {
          console.log('No data available for this index');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, [index]);

  const fetchNearbyMarkets = (regionName) => {
    fetch(`${databaseURL}/전통시장데이터.json`)
      .then(response => response.json())
      .then(data => {
        const nearby = Object.values(data).filter(market => market.소재지지번주소.includes(regionName));
        setNearbyMarkets(nearby);
      })
      .catch(error => console.error('Error fetching nearby markets:', error));
  };

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

  const getImageUrl = (marketName) => {
    if (marketName === '춘천닭갈비막국수축제') {
      return `${process.env.PUBLIC_URL}/images/imagetest/춘천닭갈비막국수축제.png`;
    }
    return `${process.env.PUBLIC_URL}/images/imagetest/${marketName}.jpg`;
  };

  const scrollLeft = () => {
    setScrollPosition(scrollPosition - 1);
  };

  const scrollRight = () => {
    setScrollPosition(scrollPosition + 1);
  };

  return (
    <Main>
      <div className="main-container">
        <div className="main-content">
          {festival ? (
            <div>
              <div className="header-container">
                <div className="fesheader__text">{festival.축제명}</div>
                <div className={`section__data ${festival.축제유형}`}>
                  축제 유형: {getCategoryIcon(festival.축제유형)} {festival.축제유형}
                </div>
              </div>
              <div className="fesphoto__inner">
                {imageError ? (
                  <div>이미지를 불러올 수 없습니다.</div>
                ) : (
                  <img src={getImageUrl(festival.축제명)} alt="Festival" className="festival-image" />
                )}
                <div className="map-placeholder">지도를 불러올 수 없습니다.</div>
              </div>
              <div className="info-and-contact-container">
                <div className="info-container">
                  <div className="contact-title">상세 정보</div>
                  <div className="text-with-icon">
                    <div className="icon-container"><img src={loc} className="icon" alt="Location Icon" /></div>
                    <div className="text1">주소: {festival.개최장소}</div>
                  </div>
                  <div className="text-with-icon">
                    <div className="icon-container"><img src={cal} className="icon" alt="Calendar Icon" /></div>
                    <div className="text1">날짜: {festival.개최기간}</div>
                  </div>
                </div>
                <div className="contact-container">
                  <div className="contact-title">문의 관련</div>
                  <div className="contact-content">
                    <div className="icon-container"><img src={per} className="icon" alt="Person Icon" /></div>
                    <div className="contact-texts">
                      <div className="contact-text">담당자명: {festival.담당자}</div>
                      <div className="contact-text">연락처: {festival.연락처}</div>
                    </div>
                  </div>
                </div>
              </div>
              {nearbyMarkets.length > 0 && (
                <div className='nearby-markets-wrapper'>
                  <div className='nearby-markets-container'>
                    <div className='nearby-markets-title'>
                      <img src={mor} alt="More Icon" className="more-icon" />
                      <h2>가까운 다른 시장도 구경해보세요!</h2>
                    </div>
                    <div className='nearby-markets'>
                      <button onClick={scrollLeft} disabled={scrollPosition === 0}>
                        <IoIosArrowBack size={30} />
                      </button>
                      <div className='nearby-markets-content'>
                        {nearbyMarkets.slice(scrollPosition, scrollPosition + 5).map((nearbyMarket, idx) => (
                          <div key={idx} className='nearby-market-item'>
                            <img src={getImageUrl(nearbyMarket.시장명)} alt={nearbyMarket.시장명} />
                            <div>{nearbyMarket.시장명}</div>
                          </div>
                        ))}
                      </div>
                      <button onClick={scrollRight} disabled={scrollPosition + 5 >= nearbyMarkets.length}>
                        <IoIosArrowForward size={30} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
