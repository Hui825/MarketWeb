import React, { useState, useEffect } from 'react';

const SearchView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  // Firebase에서 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://YOUR-FIREBASE-PROJECT.firebaseio.com/data.json');
      if (response.ok) {
        const fetchedData = await response.json();
        const items = fetchedData ? Object.keys(fetchedData).map(key => ({
          id: key,
          ...fetchedData[key]
        })) : [];
        setData(items);
        setFilteredData(items);
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    };
    fetchData();
  }, []);

  // 검색 기능
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredData(data); // 검색어가 비어있을 때 전체 데이터 표시
    } else {
      // 검색어가 있는 경우, description 필드에서 해당 검색어를 포함하는 데이터만 필터링
      setFilteredData(data.filter(item => item.description.toLowerCase().includes(searchTerm.toLowerCase())));
    }
  }, [searchTerm, data]);

  // 검색어 입력 핸들러
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <ul>
        {filteredData.map(item => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchView;
