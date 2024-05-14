import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Main from '../../components/page/Main';



const Search = () => {
    const { searchId } = useParams();

    const [ nextPageToken, setNextPageToken] = useState(null);
    const [ loading, setLoading ] = useState(true);


    

    const searchPageClass = loading ? 'isLoading' : 'isLoaded';

    return (
        <Main 
            title = "검색"
            description="검색 결과 페이지입니다.">
            
            <section id='searchPage' className={searchPageClass}>
                <h2>▶ <em>{searchId}</em> 에 대한 검색 결과입니다.</h2>
            
            </section>
        </Main>
    )
}

export default Search;