import React, { useState, useEffect } from 'react';
import Main from '../../components/page/Main.jsx';
import { Link } from 'react-router-dom';
import './festival.css';

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com/';

const Festival = () => {
    const [festivals, setFestivals] = useState([]);
    const [filter, setFilter] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        fetch(`${databaseURL}/지역축제정보데이터.json`)
            .then(res => res.json())
            .then(data => {
                const festivalArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
                setFestivals(festivalArray);
            });
    }, []);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const filteredFestivals = festivals.filter(festival =>
        (festival.축제명 && festival.축제명.includes(filter)) ||
        (festival.개최장소 && festival.개최장소.includes(filter))
    );

    const categorizedFestivals = category
        ? filteredFestivals.filter(festival => {
            if (category === '1월') {
                return festival.개최기간.includes('01') || festival.개최기간.includes('1월중');
            }
            if (category === '2월') {
                return festival.개최기간.includes('02') || festival.개최기간.includes('2월중');
            }
            if (category === '3월') {
                return festival.개최기간.includes('03') || festival.개최기간.includes('3월중');
            }
            if (category === '4월') {
                return festival.개최기간.includes('04') || festival.개최기간.includes('4월중');
            }
            if (category === '5월') {
                return festival.개최기간.includes('05') || festival.개최기간.includes('5월중');
            }
            if (category === '6월') {
                return festival.개최기간.includes('06') || festival.개최기간.includes('6월중');
            }
            if (category === '7월') {
                return festival.개최기간.includes('07') || festival.개최기간.includes('7월중');
            }
            if (category === '8월') {
                return festival.개최기간.includes('08') || festival.개최기간.includes('8월중');
            }
            if (category === '9월') {
                return festival.개최기간.includes('09') || festival.개최기간.includes('9월중');
            }
            if (category === '10월') {
                return festival.개최기간.includes('10') || festival.개최기간.includes('810월중');
            }
            if (category === '11월') {
                return festival.개최기간.includes('11') || festival.개최기간.includes('11월중');
            }
            if (category === '12월') {
                return festival.개최기간.includes('12') || festival.개최기간.includes('12월중');
            }

            // 다른 카테고리에 대한 조건을 추가할 수 있습니다.
            return true;
        })
        : filteredFestivals;

    return (
        <Main>
            <div>
                <input
                    type="text"
                    placeholder="Search festivals..."
                    value={filter}
                    onChange={handleFilterChange}
                />
                <select value={category} onChange={handleCategoryChange}>
                    <option value="">Select Category</option>
                    <option value="1월">1월</option>
                    <option value="2월">2월</option>
                    <option value="3월">3월</option>
                    <option value="4월">4월</option>
                    <option value="5월">5월</option>
                    <option value="6월">6월</option>
                    <option value="7월">7월</option>
                    <option value="8월">8월</option>
                    <option value="9월">9월</option>
                    <option value="10월">10월</option>
                    <option value="11월">11월</option>
                    <option value="12월">12월</option>

                    {/* 다른 카테고리를 여기에 추가할 수 있습니다. */}
                </select>
                {categorizedFestivals.map(festival => (
                    <div className="section_fes" key={festival.id}>
                        <Link to={`/festival/${festival.id}`} style={{ textDecoration: 'none' }}>
                            <div className="headerText">{festival.축제명}</div>
                            <div className="innerText">더보기</div>
                            <div className="InnerText">{festival.개최기간}</div>
                            <div className="section__data">{festival.축제유형}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </Main>
    );
};

export default Festival;
