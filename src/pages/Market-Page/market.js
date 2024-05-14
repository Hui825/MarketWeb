import React from 'react';
import Main from '../../components/page/Main.jsx';
import './marketmore.jsx';
import { Link } from 'react-router-dom';



import './market.css';

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com/';



class Festival extends React.Component {

    constructor() {
        super();
        this.state = {
            words: {}
        };
           
        
    }
    
    

    _get() {
        fetch(`${databaseURL}/전통시장데이터.json`).then(res => {
            if(res.status != 200 ){
                throw new Error(res.statusText);
            }
            return res.json();
        }).then(words => this.setState({words: words}));
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.words != this.state.words;
    }
    componentDidMount() {
        this._get();
    }
    render() {
       return ( 

            <Main>
                <div>
                    {Object.keys(this.state.words).map(id => {
                    const word = this.state.words[id];
                    return ( 
                        <div className="section_fes" key={id}>
                            
                            <Link to={`/market/${id}`} style={{ textDecoration: 'none' }}>
                                <div className="headerText">{word.시장명}</div>
                                <div className="innerText">더보기</div>
                                <div className="InnerText">{word.소재지도로명주소}</div>
                                <div className="section__data">{word.소재지지번주소}</div>
                                <div className="section__data">{word.주차장보유여부}</div>
                                <div className="section__data">{word.공중화장실보유여부}</div>
                                <div className="section__data">{word.사용가능사품권}</div>
                            </Link>
                        </div>
                    ); 
        })}
    
            </div>

            </Main>
        )
    }
}

export default Festival;