import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../../assets/scss/layout/_header.scss';

const Header = (props) => {
  const [isSnbActive, setIsSnbActive] = useState(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  const handleSnbToggle = () => {
    setIsSnbActive(!isSnbActive);
  };

  const handleScroll = () => {
    const scrollTop = window.pageYOffset;
    setIsHeaderFixed(scrollTop > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      id="header__wrap"
      className={`${props.attr} ${isHeaderFixed ? 'fixed' : ''}`}
      role="heading"
      aria-level="1"
    >
      <div className="header__inner">
        <div className="header__top container">
          <h1 className="header__logo">
            <Link to="/">
              <img src={require('../../../assets/images/Mainlogo2.png')} alt="로고" />
            </Link>
          </h1>
          <div className="header__member">
            <Link to="/Loginform">로그인</Link>
            <Link to="/Loginform">회원가입</Link>
            <Link to="/" className="lang">
              <div className="select1 language">
                <select className="select-type">
                  <option value="/main?locale=ko">한국어</option>
                  <option value="/main?locale=en">영어</option>
                </select>
              </div>
            </Link>
          </div>
        </div>

        <nav className="header__menu">
          <ul>
            <li>
              <Link to="/">메인화면</Link>
            </li>
            <li>
              <Link to="/market">전통시장</Link>
            </li>
            <li>
              <Link to="/festival">지역축제</Link>
            </li>
          </ul>

          <div
            className={`snb-more ${isSnbActive ? 'active' : ''}`}
            onClick={handleSnbToggle}
          >
            등록용 메뉴
          </div>
        </nav>

        <div className={`snb-wrap ${isSnbActive ? 'active' : ''}`}>
          <div className="inner-box">
            <div className="mnu-wrap">
              <div className="mnu-box">
                <Link to="#">정보 등록</Link>
                <ul>
                  <li>
                    <Link to="/RegistMenumk">전통시장</Link>
                  </li>
                  <li>
                    <Link to="/RegistMenufes">지역축제</Link>
                  </li>
                  <li>
                    <Link to="#">기타문의</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mnu-box">
              <Link to="#">페이지</Link>
              <ul>
                <li>
                  <Link to="#">마이페이지</Link>
                </li>
                <li>
                  <Link to="#">인증페이지</Link>
                </li>
                <li>
                  <Link to="#">로그인 및 회원등록</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  attr: PropTypes.string,
};

export default Header;
