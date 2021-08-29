import React from 'react';
import {CollapList} from '../../components/CollapList';
import {Link} from 'react-router-dom';
import {Controller} from './controller';
import {HiPencil} from 'react-icons/hi';
import {Redirect} from 'react-router-dom';
import {Card} from '../../components/Card';
import { LoadingScreen } from '../../components/LoadingScreen';
import "./styles.scss";

const Home = (props) => {
    const {districts, o2, setRedirectAddNew, redirectAddNew}  = new Controller(props);
    
    if(redirectAddNew) return <Redirect to={`/add/${redirectAddNew}`}/>
    if(!o2) return <LoadingScreen/>

    return (
        <div  className="view home-view">
            <h2 style={{marginTop: 32, fontSize: 24, color: '#007aff'}}>Quận của bạn</h2>
            <CollapList opened title={districts[localStorage.getItem('district')].title} onAddNew={() => setRedirectAddNew(+localStorage.getItem('district') + 1)}>
                <div className="card-container">
                    {o2[+localStorage.getItem('district')]?.map((item, a) => {
                        return (
                            <Card data={item} key={`o2-item-${a}`}/>
                        )
                    })}
                </div>
                {o2[+localStorage.getItem('district')]?.length ? '' : <span style={{width: '100%', display: 'flex', justifyContent: 'center'}}>Chưa có nhà cung cấp tại quận này</span>}
            </CollapList>

            <h2 style={{marginTop: 48, fontSize: 24, color: '#007aff'}}>Các quận khác</h2>
            {districts.map((data, i) => {
                return (
                    <CollapList title={data.title} key={`col-list-${i}`} onAddNew={() => setRedirectAddNew(i + 1)}>
                        <div className="card-container">
                            {o2[i]?.map((item, a) => {
                                return (
                                    <Card data={item} key={`o2-item-${a}`}/>
                                )
                            })}
                        </div>

                        {o2[i]?.length ? '' : <span style={{width: '100%', display: 'flex', justifyContent: 'center'}}>Chưa có nhà cung cấp tại quận này</span>} 
                    </CollapList>
                )
            })}
        </div>
    )
}

export default Home;