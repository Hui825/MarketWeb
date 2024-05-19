import React, { useState, useEffect } from 'react';
import Main from '../../components/page/Main.jsx';
import { Link } from 'react-router-dom';
import './market.css';


import { FaSquareParking } from "react-icons/fa6";
import { FaRestroom } from "react-icons/fa";
import { TbGiftCardFilled } from "react-icons/tb";

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

const Market = () => {
    const [markets, setMarkets] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const marketsPerPage = 12;

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
        setCurrentPage(1);
    };

    const handleRegionChange = (event) => {
        setSelectedRegion(event.target.value);
        setSelectedCity('');
        setCurrentPage(1);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
        setCurrentPage(1);
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

    const indexOfLastMarket = currentPage * marketsPerPage;
    const indexOfFirstMarket = indexOfLastMarket - marketsPerPage;
    const currentMarkets = categorizedMarkets.slice(indexOfFirstMarket, indexOfLastMarket);

    const citiesByRegion = {
        '강원도': ['춘천', '강릉', '원주', '홍천'],
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Main>
            <div className="main-container">
                <div className="content-container">
                    <div className="sidebar">
                        <div className="filters-container">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="전통시장 검색하기"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <select className="select-box" value={selectedRegion} onChange={handleRegionChange}>
                                <option value="All">지역 선택</option>
                                <option value="강원도">강원도</option>
                            </select>
                            {selectedRegion && citiesByRegion[selectedRegion] && (
                                <select className="select-box" value={selectedCity} onChange={handleCityChange}>
                                    <option value="All">Select City</option>
                                    {citiesByRegion[selectedRegion].map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))}
                                </select>
                            )}
                        </div>
                    </div>
                    <div className="market-list-container">
                        <div className="market-list">
                            {currentMarkets.map(market => (
                                <div className="section_mk" key={market.id}>
                                    <Link to={`/market/${market.id}`} style={{ textDecoration: 'none' }}>
                                        <div className="headerText">{market.시장명}</div>
                                        <div className="InnerText">{market.소재지도로명주소}</div>
                                        <div className="section__data">{market.소재지지번주소}</div>
                                        <div className="section__data_icon">
                                            {market.주차장보유여부 === 'Y' && <FaSquareParking />}
                                            {market.공중화장실보유여부 === 'Y' && <FaRestroom /> }                                  
                                            {market.사용가능상품권 === '온누리상품권' && <TbGiftCardFilled title="온누리상품권"/>}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(categorizedMarkets.length / marketsPerPage) }, (_, i) => (
                                <button 
                                    key={i + 1} 
                                    onClick={() => paginate(i + 1)} 
                                    className={currentPage === i + 1 ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    );
};

export default Market;