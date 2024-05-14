import React from 'react';
import Main from '../../components/page/Main.jsx';
import './festivalmore.jsx';
import { Link } from 'react-router-dom';
import MapComponent from '../../assets/map/MapComponent.jsx';



import './festival.css';

const databaseURL = 'https://python-db-practice-96823-default-rtdb.firebaseio.com/';



class Festival extends React.Component {

    constructor() {
        super();
        this.state = {
            words: {}
        };
           
        
    }
    
    

    _get() {
        fetch(`${databaseURL}/지역축제정보데이터.json`).then(res => {
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
                            
                            <Link to={`/festival/${id}`} style={{ textDecoration: 'none' }}>
                                <div className="headerText">{word.축제명}</div>
                                <div className="innerText">더보기</div>
                                <div className="InnerText">{word.개최기간}</div>
                                <div className="section__data">{word.축제유형}</div>
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