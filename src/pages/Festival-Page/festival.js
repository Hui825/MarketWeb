import React, { useState, useEffect } from 'react';
import Main from '../../components/page/Main.jsx';
import { Link } from 'react-router-dom';
import './festival.css';
import { IoBalloon } from "react-icons/io5";
import { GiThreeLeaves } from "react-icons/gi";
import { FaBook } from "react-icons/fa6";
import { RiQuestionFill } from "react-icons/ri";
import { FaBowlFood } from "react-icons/fa6";
import { FaPeopleGroup } from "react-icons/fa6";

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com';

const Festival = () => {
    const [festivals, setFestivals] = useState([]);
    const [filter, setFilter] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const festivalsPerPage = 12;

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
        setCurrentPage(1);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1);
    };

    const filteredFestivals = festivals.filter(festival =>
        (festival.축제명 && festival.축제명.includes(filter)) ||
        (festival.개최장소 && festival.개최장소.includes(filter))
    );

    console.log('Filtered festivals:', filteredFestivals); // 디버깅을 위해 추가

    const categorize = (category) => {
        switch (category) {
            case '생태자연':
                return ['생태자연', '생태자연기타'];
            case '기타':
                return ['기타', '기타(주민화합)', '기타(체험행사)', '기타(체육 등)'];
            case '특산물':
                return ['특산물', '지역특산물'];
            default:
                return [category];
        }
    };

    const categorizedFestivals = filteredFestivals.filter(festival => {
        let matchesMonth = true;
        let matchesCategory = true;

        if (selectedMonth) {
            matchesMonth = festival.개최기간.includes(selectedMonth);
        }
        if (selectedCategory) {
            const categoryKeywords = categorize(selectedCategory);
            matchesCategory = categoryKeywords.some(keyword => festival.축제유형.includes(keyword));
        }

        return matchesMonth && matchesCategory;
    });

    console.log('Categorized festivals:', categorizedFestivals); // 디버깅을 위해 추가

    const indexOfLastFestival = currentPage * festivalsPerPage;
    const indexOfFirstFestival = indexOfLastFestival - festivalsPerPage;
    const currentFestivals = categorizedFestivals.slice(indexOfFirstFestival, indexOfLastFestival);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
    const categories = ['문화예술', '생태자연', '자연', '전통역사', '지역특산물', '특산물', '기타', '기타(관광)', '기타(주민화합)', '기타(체험행사)', '기타(체육 등)'];

    return (
        <Main>
            <div className="main-container">
                <div className="content-container">
                    <div className="sidebar">
                        <div className="filters-container">
                            <input
                                className="search-input"
                                type="text"
                                placeholder="지역축제 검색하기"
                                value={filter}
                                onChange={handleFilterChange}
                            />
                            <select className="select-box" value={selectedMonth} onChange={handleMonthChange}>
                                <option value="">기간 선택</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <select className="select-box" value={selectedCategory} onChange={handleCategoryChange}>
                                <option value="">축제유형 선택</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="festival-list-container">
                        <div className="festival-list">
                            {currentFestivals.length > 0 ? (
                                currentFestivals.map(festival => (
                                    <div className="section_fes" key={festival.id}>
                                        <Link to={`/festival/${festival.id}`} style={{ textDecoration: 'none' }}>
                                            <div className="headerText">{festival.축제명}</div>
                                            <div className="InnerText">{festival.개최기간}</div>
                                            <div className={`section__data ${festival.축제유형}`}>
                                                {festival.축제유형.includes('문화예술') && <IoBalloon className="icon" /> }
                                                {festival.축제유형.includes('자연') && <GiThreeLeaves className="icon" />}
                                                {festival.축제유형 === '전통역사' && <FaBook className="icon" />}
                                                {festival.축제유형 === '주민화합' && <FaPeopleGroup className="icon" />}
                                                {festival.축제유형.includes('기타') && <RiQuestionFill className="icon" />}
                                                {festival.축제유형.includes('특산물') && <FaBowlFood className="icon" />}
                                                <div className="InnerText">{festival.축제유형}</div>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            ) : (
                                <p>No festivals found.</p>
                            )}
                        </div>
                        <div className="pagination">
                            {Array.from({ length: Math.ceil(categorizedFestivals.length / festivalsPerPage) }, (_, i) => (
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

export default Festival;
