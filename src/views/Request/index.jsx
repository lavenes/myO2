import React from 'react';
import "./styles.scss";
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import {MdCall} from 'react-icons/md';
import {Controller} from './controller';
import {districts, cities} from '../../Global/Variables';
import { LoadingScreen } from '../../components/LoadingScreen';

const Request = (props) => {
    const {data, handleSubmit} = new Controller(props);

    if(!data) return <LoadingScreen/>

    return(
        <div className="view request-view">
            <h1>Các yêu cầu hỗ trợ hiện có</h1>
            <div className="request-container">
                {data.map((item, i) => {
                    if(!item.accepted) {
                        return (
                            <div className="request-item" key={`request-item-${i}`}>
                                <div className="information-container">
                                    <span className="title">{item.name} - {item.phone}</span>
                                    <span className="address">{item.address}, phường {item.ward}, {districts[item.district].title}, {cities[item.city].title}</span>
                                    <p className="information">{item.information}</p>
                                </div>
                                <div className="action-container">
                                    <Button variant="contained" color="primary" onClick={() => handleSubmit(item.id)}>Xác nhận đã giao Oxy</Button>
                                    <a href={`tel:0230123`}><Button color="primary" startIcon={<MdCall/>}>Gọi</Button></a>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>

            <h1>Các yêu cầu hỗ trợ đã xử lý</h1>
            <div className="request-container">
                {data.map((item, i) => {
                    if(item.accepted) {
                        return (
                            <div className="request-item accepted" key={`request-item-${i}`}>
                                <div className="information-container">
                                    <span className="title">{item.name} - {item.phone}</span>
                                    <span className="address">{item.address}, phường {item.ward}, {districts[item.district].title}, {cities[item.city].title}</span>
                                    <p className="information">{item.information}</p>
                                </div>
                                <div className="action-container">
                                    <Button variant="contained" disabled color="primary" onClick={() => handleSubmit(item.id)}>Xác nhận đã giao Oxy</Button>
                                    <a href={`tel:0230123`}><Button color="primary" startIcon={<MdCall/>}>Gọi</Button></a>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}

export default Request;