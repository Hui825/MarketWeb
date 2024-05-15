import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    // Firebase에서 데이터 불러오기
    useEffect(() => {
        const urls = [
            'https://python-db-practice-96823-default-rtdb.firebaseio.com/지역축제정보데이터.json',
            'https://python-db-practice-96823-default-rtdb.firebaseio.com/전통시장데이터.json'
        ];

        const fetchData = async () => {
            try {
                const promises = urls.map(url => 
                    fetch(url).then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                );
                const results = await Promise.all(promises);
                const combinedData = results.flatMap((result, index) => {
                    return result ? Object.keys(result).map(key => ({
                        id: key,
                        source: index + 1,  // 데이터 소스 구분
                        ...result[key]
                    })) : [];
                });
                setData(combinedData);
            } catch (error) {
                console.error('Failed to fetch data:', error.message);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        console.log(searchKeyword);
        if (searchKeyword) {
            const filteredData = data.filter(item => 
                (item.시장명 && item.시장명.includes(searchKeyword)) ||
                (item.소재지도로명주소 && item.소재지도로명주소.includes(searchKeyword)) ||
                (item.축제명 && item.축제명.includes(searchKeyword))
            );
            navigate(`/search/${searchKeyword}`, { state: { filteredData } });
            setSearchKeyword('');
        }
    }

    return (
        <div id='search'>
            <div className='search__inner'>
                <input 
                    type='search' 
                    name='searchInput' 
                    id='searchInput' 
                    autoComplete='off'
                    className='search__input'
                    placeholder='검색할 정보를 입력해주세요!'
                    onChange={e => setSearchKeyword(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default Search;