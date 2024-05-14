import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Header = (props) => {
  /*const [isMenuActive, setIsMenuActive] = useState(false);*/
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
              <img src={require("../../../assets/images/main02.png")} />
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

          <Link
            
            className={`snb-more ${isSnbActive ? '' : 'active'}`}
            onClick={handleSnbToggle}
          >
            등록용 메뉴
          </Link>
        </nav>

        <div className={`snb-wrap ${isSnbActive ? '' : 'active'}`}>
          <div className="inner-box">
            <div className="mnu-wrap">

                <div className="mnu-box">
                  <Link>정보 등록</Link>
                  <ul>
                      <li>
                        <Link to="/RegistMenu">전통시장</Link>
                      </li>
                      <li>
                        <Link to="/">지역축제</Link>
                      </li>
                      <li>
                        <Link to="/">기타문의</Link>
                      </li>
                  </ul>
                </div>
              </div>

              <div className="mnu-box">
                <Link>페이지</Link>
                  <ul>
                    <li>
                      <Link to="/">마이페이지</Link>
                    </li>
                    <li>
                      <Link to="/">인증페이지</Link>
                    </li>
                    <li>
                      <Link to="/">로그인 및 회원등록</Link>
                    </li>
                  </ul>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;