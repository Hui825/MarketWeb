import React from 'react'
import './RegistMenu.css';

import Main from '../../components/page/Main';


const RegistMenu = () => {
    return (
        <>
        <Main>

        
        <div className='section_whole'>
           <> <form action="">
                <h1>정보 등록하기</h1>

                <div className="input-box">
                    <input type="text" placeholder='전통시장 제목' required />
                </div>


                    <button id="re" type="reset" value="내용초기화">내용 초기화</button>         


                <div className="input-box2">
                    날짜:
                    <input type="text2" placeholder='날짜' required />
                    정보:
                    <input type="text2-5" placeholder='정보4' required />
                </div>

                <div className="data">
                    <label><input type="checkbox" />주차장 여부 </label>
                    <label><input type="checkbox" />공용화장실 여부</label>
                  
                </div>

                <div className="input-box3">
                    <input type="text3" placeholder='정보3' required />
                    
                </div>

                <div className="input-box4">
                    <input type="text4" placeholder='정보4' required />
                </div>

                

                <button type="submit">등록하기</button>

                

                </form>
  
                </>

        </div>

        </Main>
        </>
    )
}

export default RegistMenu;