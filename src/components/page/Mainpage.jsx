import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from '../section/Header-Footer/Header';
import Footer from '../section/Header-Footer/Footer';
import Search from './Search';
import Slider from '../section/Slider';
import Card from '../section/Card';
import ScrollTo from '../../utils/scrollTo';

/* 메인 홈 화면 구성용 칸 슬라이드 */

const Mainpage = (props) => {
    return (
        <HelmetProvider>
            <ScrollTo />
            <Helmet 
                titleTemplate="%s | 방향키" 
                defaultTitle="전통시장" 
                defer={false}
            >
                {props.title && <title>{props.title}</title>}
                <meta name="description" content={props.description} />
            </Helmet>

            <Header />
            <main id='main' role='main'>
                <Search />
                {props.children}
                <Slider />
                <Card />
            </main>
            
            <Footer />
        </HelmetProvider>

        
            
    
    )
}


export default Mainpage;