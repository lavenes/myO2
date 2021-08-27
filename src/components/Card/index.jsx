import React from 'react';
import {Link} from 'react-router-dom';
import {HiPencil} from 'react-icons/hi';
import "./styles.scss";
import {Controller} from './controller';

export const Card = (props) => {
    const {districts, cities} = new Controller(props);

    let data = props.data;

    return(
        <Link to={props.edit ? `edit/${data.district}/${data.id}` : `oxy/${data.district}/${data.id}`} className="card">
            {props.edit ? 
            <div className="action-btn">
                <HiPencil className="icon"/>
                <span>Chỉnh sửa</span>
            </div> : null}
            <div className="image" style={{background: `url(${data.image}) no-repeat center center / cover`}}></div>
            <div className="information-container">
                <div className="information">
                        <div className="title">
                        <h5>{data.name}</h5>
                    </div>
                    <p>{data.address},phường {data.ward}, {districts[data.district].title}, {cities[data.city].title}</p>
                </div>
                <div className="status-container">
                    <div className={`status ${data.status ? 'green' : 'red'}`}>
                        <span>{data.status ? 'Còn' : 'Đã hết'} Oxy</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}