import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Main from './Main';
import './SearchResult.css';
const SearchResults = () => {
    const location = useLocation();
    const { filteredData, query } = location.state || {};

    console.log("location.state: ", location.state); // 디버깅을 위해 추가

    return (
        <Main>
            <div className="search-results-container">
                <div className="results-header">
                    <h1>검색 결과</h1>
                    {query && <h2>&quot;{query}&quot;에 대한 검색 결과입니다.</h2>}
                </div>
                <ul className="results-list">
                    {filteredData && filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <li key={item.id} className="result-item">
                                {item.시장명 && (
                                    <div className="result-box">
                                        <p className="item-title">
                                            시장명: 
                                            <Link to={`/market/${item.id}`}>{item.시장명}</Link>
                                        </p>
                                        <p>소재지도로명주소: {item.소재지도로명주소}</p>
                                    </div>
                                )}
                                {item.축제명 && (
                                    <div className="result-box">
                                        <p className="item-title">
                                            축제명: 
                                            <Link to={`/festival/${item.id}`}>{item.축제명}</Link>
                                        </p>
                                        <p>개최장소: {item.개최장소}</p>
                                    </div>
                                )}
                            </li>
                        ))
                    ) : (
                        <p>No results found.</p>
                    )}
                </ul>
            </div>
        </Main>
    );
};

export default SearchResults;
