import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import Header from '../section/Header-Footer/Header';
import Footer from '../section/Header-Footer/Footer';
import Search from './Search';
import ScrollTo from '../../utils/scrollTo';

/* 메인 홈 화면 구성용 칸 슬라이드 */

const Main = ({ title, description, children }) => {
    return (
        <HelmetProvider>
            <ScrollTo />
            <Helmet 
                titleTemplate="%s | 방향키" 
                defaultTitle="전통시장" 
                defer={false}
            >
                {title && <title>{title}</title>}
                <meta name="description" content={description} />
            </Helmet>

            <Header />
            <main id='main' role='main'>
                <Search />
                {children}
            </main>
            
            <Footer />
        </HelmetProvider>
    );
};

// prop-types를 사용하여 props의 타입을 정의합니다.
Main.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node
};

export default Main;