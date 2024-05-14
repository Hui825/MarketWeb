import React from 'react';
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import '../././../assets/scss/style.scss';
import './LoginForm.css';

const LoginForm = () => {
    return (
        <div className='wrapper'>
           <> <form action="">
                <h1>로그인</h1>

                <div>
                    <Link to="/">
                    <AiFillHome className="icon" />
                    <a> 홈으로 돌아가기 </a>
                    </Link>
                </div>

                <div className="input-box">
                    <input type="text" placeholder='Username' required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder='Password' required />
                    <FaLock className="icon" />
                </div>

                <div className="remember-forgot">
                    <label><input type="checkbox" />기억하기</label>
                    <a href="#"> 비밀번호를 잊어버리셨나요?</a>
                </div>

                <button type="submit">로그인하기</button>

                          

                </form>
               

                <div className="register-link">
                    <p>회원이 아닌가요? <a href="#">회원등록</a></p>
                </div>  
                </>

        </div>
    )
}

export default LoginForm;