import React, { useState, useEffect } from 'react';
import Main from '../../components/page/Main.jsx';
import { Link } from 'react-router-dom';
import './market.css';

import park01 from '../../assets/ico/parkingicon01.png'; 
import park02 from '../../assets/ico/parkingicon02.png'; 
import rest01 from '../../assets/ico/restroomicon01.png'; 
import rest02 from '../../assets/ico/restroomicon02.png'; 
import voucher01 from '../../assets/ico/온누리.png'; 
import voucher02 from '../../assets/ico/상품권없음.png'; 

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

const Market = () => {
    const [markets, setMarkets] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        fetch(`${databaseURL}/전통시장데이터.json`)
            .then(res => res.json())
            .then(data => {
                const marketArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setMarkets(marketArray);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setSelectedCity(''); // 상위 카테고리가 변경될 때 하위 카테고리를 초기화
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    const filteredMarkets = markets.filter(market =>
        (market.시장명 && market.시장명.includes(filter)) ||
        (market.소재지도로명주소 && market.소재지도로명주소.includes(filter))
    );

    const categorizedMarkets = filteredMarkets.filter(market => {
        if (selectedRegion && selectedRegion !== 'All') {
            if (!market.소재지도로명주소.includes(selectedRegion)) {
                return false;
            }
        }
        if (selectedCity && selectedCity !== 'All') {
            if (!market.소재지도로명주소.includes(selectedCity)) {
                return false;
            }
        }
        return true;
    });

    const citiesByRegion = {
        '강원도': ['춘천', '강릉', '원주', '홍천'],
        // 다른 지역에 대해서도 여기에 도시들을 추가할 수 있습니다.
    };

    return (
        <Main>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="전통시장 검색하기"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <select value={selectedRegion} onChange={handleRegionChange}>
                    <option value="All">지역 선택</option>
                    <option value="강원도">강원도</option>
                    {/* 다른 상위 카테고리를 여기에 추가할 수 있습니다. */}
                </select>
                {selectedRegion && citiesByRegion[selectedRegion] && (
                    <select value={selectedCity} onChange={handleCityChange}>
                        <option value="All">Select City</option>
                        {citiesByRegion[selectedRegion].map(city => (
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                )}
            </div>
            <div className="market-list">
                {categorizedMarkets.map(market => (
                    <div className="section_mk" key={market.id}>
                        <Link to={`/market/${market.id}`} style={{ textDecoration: 'none' }}>
                            <div className="headerText">{market.시장명}</div>
                            <div className="innerText">더보기</div>
                            <div className="InnerText">{market.소재지도로명주소}</div>
                            <div className="section__data">{market.소재지지번주소}</div>
                            <div className="section__data">
                                <img src={market.주차장보유여부 === 'Y' ? park01 : park02} alt="Parking Availability" />
                                <img src={market.공중화장실보유여부 === 'Y' ? rest01 : rest02} alt="Toilet Availability" />
                            </div>
                            <div className="section__data">
                                <img src={market.사용가능상품권 === '온누리상품권' ? voucher01 : voucher02} alt="Voucher Availability" />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </Main>
    );
};

export default Market;
