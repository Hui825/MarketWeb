import React, { useState, useEffect } from 'react';
import Main from '../../components/page/Main.jsx';
import { Link } from 'react-router-dom';
import './festival.css';

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

const Festival = () => {
    const [festivals, setFestivals] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedSpecificMonth, setSelectedSpecificMonth] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${databaseURL}/지역축제정보데이터.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const festivalArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setFestivals(festivalArray);
                console.log('Fetched data:', festivalArray); // 디버깅을 위해 추가
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setSelectedSpecificMonth(''); // 상위 카테고리가 변경될 때 하위 카테고리를 초기화
    };

    const handleSpecificMonthChange = (event) => {
        setSelectedSpecificMonth(event.target.value);
    };

    const filteredFestivals = festivals.filter(festival =>
        (festival.축제명 && festival.축제명.includes(filter)) ||
        (festival.개최장소 && festival.개최장소.includes(filter))
    );

    console.log('Filtered festivals:', filteredFestivals); // 디버깅을 위해 추가

    const categorizedFestivals = filteredFestivals.filter(festival => {
        if (selectedSpecificMonth) {
            if (selectedSpecificMonth === '1월') {
                return festival.개최기간.includes('01') || festival.개최기간.includes('1월중');
            }
            if (selectedSpecificMonth === '2월') {
                return festival.개최기간.includes('02') || festival.개최기간.includes('2월중');
            }
            if (selectedSpecificMonth === '3월') {
                return festival.개최기간.includes('03') || festival.개최기간.includes('3월중');
            }
            if (selectedSpecificMonth === '4월') {
                return festival.개최기간.includes('04') || festival.개최기간.includes('4월중');
            }
            if (selectedSpecificMonth === '5월') {
                return festival.개최기간.includes('05') || festival.개최기간.includes('5월중');
            }
            if (selectedSpecificMonth === '6월') {
                return festival.개최기간.includes('06') || festival.개최기간.includes('6월중');
            }
            if (selectedSpecificMonth === '7월') {
                return festival.개최기간.includes('07') || festival.개최기간.includes('7월중');
            }
            if (selectedSpecificMonth === '8월') {
                return festival.개최기간.includes('08') || festival.개최기간.includes('8월중');
            }
            if (selectedSpecificMonth === '9월') {
                return festival.개최기간.includes('09') || festival.개최기간.includes('9월중');
            }
            if (selectedSpecificMonth === '10월') {
                return festival.개최기간.includes('10') || festival.개최기간.includes('10월중');
            }
            if (selectedSpecificMonth === '11월') {
                return festival.개최기간.includes('11') || festival.개최기간.includes('11월중');
            }
            if (selectedSpecificMonth === '12월') {
                return festival.개최기간.includes('12') || festival.개최기간.includes('12월중');
            }
        }
        return true;
    });

    console.log('Categorized festivals:', categorizedFestivals); // 디버깅을 위해 추가

    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

    return (
        <Main>
            <div className="filters-container">
                <input
                    type="text"
                    placeholder="지역축제 검색하기"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">기간 선택하기</option>
                    <option value="MONTH">월</option>
                </select>
                {selectedMonth === 'MONTH' && (
                    <select value={selectedSpecificMonth} onChange={handleSpecificMonthChange}>
                        <option value="">월</option>
                        {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                )}
            </div>
            <div className="festival-list">
                {categorizedFestivals.length > 0 ? (
                    categorizedFestivals.map(festival => (
                        <div className="section_fes" key={festival.id}>
                            <Link to={`/festival/${festival.id}`} style={{ textDecoration: 'none' }}>
                                <div className="headerText">{festival.축제명}</div>
                                <div className="innerText">더보기</div>
                                <div className="InnerText">{festival.개최기간}</div>
                                <div className="section__data">{festival.축제유형}</div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No festivals found.</p>
                )}
            </div>
        </Main>
    );
};

export default Festival;
