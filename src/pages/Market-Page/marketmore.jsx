import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./marketmore.css";
import Main from "../../components/page/Main";
import ChuncheonMarketMap from "./ChuncheonMarketMap";
import GanseongMarketMap from './GansungMarketMap';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import par from "../../../src/assets/ico/parkingicon.png";
import vou from "../../../src/assets/ico/vouchericon.png";
import res from "../../../src/assets/ico/restroomicon.png";
import mor from "../../../src/assets/ico/moreicon.png";
import loc from "../../../src/assets/ico/locationicon.png";

import vou1 from "../../../src/assets/ico/온누리.png";

const MarketMore = () => {
  const { index } = useParams();
  const [market, setMarket] = useState(null);
  const [nearbyMarkets, setNearbyMarkets] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
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
          fetchNearbyMarkets(data.지역명); // Fetch nearby markets based on the same region
        } else {
          console.log('No data available for this index');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setImageError(true);
      });
  }, [index]);

  const fetchNearbyMarkets = (regionName) => {
    fetch(`${databaseURL}/전통시장데이터.json`)
      .then(response => response.json())
      .then(data => {
        const nearby = Object.values(data).filter(market => market.지역명 === regionName && market.index !== index);
        setNearbyMarkets(nearby);
      })
      .catch(error => console.error('Error fetching nearby markets:', error));
  };

  const getImageUrl = (marketName) => {
    try {
      return require(`../../../public/image/${marketName}.jpg`);
    } catch (error) {
      setImageError(true);
      return null;
    }
  };

  const renderMap = (marketName) => {
    if (marketName === '춘천중앙시장') {
      return <ChuncheonMarketMap />;
    } else if (marketName === '간성시장') {
      return <GanseongMarketMap />;
    } else {
      return <p>연동된 지도 없음.</p>;
    }
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
          {market ? (
            <div>
              <div className='mkheader__text'>{market.시장명}</div>
              <div className='mkphoto__inner'>
                <div className="mkphoto__image">
                  {imageError ? (
                    <p>이미지가 등록되지 않았습니다.</p>
                  ) : (
                    <img src={getImageUrl(market.시장명)} alt={market.시장명} />
                  )}
                </div>
                <div className="mkphoto__map">
                  {renderMap(market.시장명)}
                </div>
              </div>
              <div className='texts'>
                <div className="text1">
                  <div className="icon-container"><img src={loc} alt="Location Icon" /></div>
                  <div className="inner__font3">도로명 주소: {market.소재지도로명주소}</div>
                  <div className="separator"></div>
                  <div className="inner__font3">지번 주소: {market.소재지지번주소}</div>
                </div>
                <div className="info-container">
                  <div className="facility-box">
                    <div className="section__icon">
                      <div className="icon-container"><img src={res} alt="Restroom Icon" /></div>
                      <div className="inner__font">편의시설</div>
                    </div>
                    <div className="facility-icons">
                      {market.주차장보유여부 === 'Y' ? <img src={par} alt="Parking Icon" /> : null}
                      {market.공중화장실보유여부 === 'Y' ? <img src={res} alt="Restroom Icon" /> : null}
                    </div>
                  </div>
                  <div className="giftcard-box">
                    <div className="section__icon">
                      <div className="icon-container"><img src={vou} alt="Voucher Icon" /></div>
                      <div className="inner__font">사용가능 상품권</div>
                    </div>
                    <div>
                      {market.사용가능상품권 ? (
                        <div className="inner__font2">
                          <img src={vou1} title={market.사용가능상품권} alt="Voucher Icon" />
                          {market.사용가능상품권}
                        </div>
                      ) : (
                        <div className="inner__font2">없음</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {nearbyMarkets.length > 0 && (
                <div className='nearby-markets-wrapper'>
                  <div className='nearby-markets-container'>
                    <div className='nearby-markets-title'>
                      <img src={mor} alt="More Icon" className="more-icon" />
                      <div className="inner__font4">가까운 다른 시장도 구경해보세요!</div>
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

export default MarketMore;
