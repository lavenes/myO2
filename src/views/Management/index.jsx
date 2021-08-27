import React from 'react';
import {CollapList} from '../../components/CollapList';
import {Link} from 'react-router-dom';
import {Controller} from './controller';
import {HiPencil} from 'react-icons/hi';
import {Redirect} from 'react-router-dom';
import {Card} from '../../components/Card';
import { LoadingScreen } from '../../components/LoadingScreen';
import "./styles.scss";

const Management = (props) => {
    const {districts, o2, setRedirectAddNew, redirectAddNew}  = new Controller(props);
    
    if(redirectAddNew) return <Redirect to={`/add/${redirectAddNew}`}/>
    if(!o2) return <LoadingScreen/>

    return (
        <div  className="view">
            <h1 style={{fontSize: 24,color: `rgb(0, 122, 255)`,marginTop: 32}}>Quản lý khu vực cung cấp Oxy</h1>
            {districts.map((data, i) => {
                return (
                    <CollapList title={data.title} key={`col-list-${i}`} onAddNew={() => setRedirectAddNew(i + 1)}>
                        <div className="card-container">
                            {o2[i]?.map((item, a) => {
                                if(item.uid === localStorage.getItem('uid')) { 
                                    return (
                                        <Card data={item} key={`o2-item-${a}`} edit/>
                                    )
                                }
                            })}
                        </div>

                        {o2[i]?.length ? '' : <span style={{width: '100%', display: 'flex', justifyContent: 'center'}}>Chưa có nhà cung cấp tại quận này</span>} 
                    </CollapList>
                )
            })}
        </div>
    )
}

export default Management;