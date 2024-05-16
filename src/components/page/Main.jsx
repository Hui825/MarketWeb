import React from 'react';
import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Header from '../section/Header-Footer/Header';
import Footer from '../section/Header-Footer/Footer';
import Search from './Search';
import ScrollTo from '../../utils/scrollTo';
import Chatbot from '../../pages/ETC/Chatbot'; // 챗봇 컴포넌트 import

const Main = (props) => {
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
            </main>
            <Chatbot /> {Chatbot}
            <Footer />
        </HelmetProvider>
    );
};

// prop-types를 사용하여 props의 유형 정의
Main.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    children: PropTypes.node
};

export default Main;


//21dlf