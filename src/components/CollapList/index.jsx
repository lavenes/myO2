import React from 'react';
import {IoIosArrowDown, IoIosAdd} from 'react-icons/io';
import  {Controller} from './controller';
import "./styles.scss";

export const CollapList = (props) => {
    const {visible, handleChangeVisible} = new Controller(props);

    return (
        <div className="collap-list">
            <div className="collap-header" onClick={handleChangeVisible}>
                <h5 className="title">{props.title}</h5>
                <div className="add-btn" onClick={(e) => {
                    e.stopPropagation();
                    props.onAddNew();
                }}>
                    <IoIosAdd className="icon"/>
                    <span>Thêm</span>
                </div>
                <IoIosArrowDown className={`dropdown ${visible ? 'up' : ''}`}/>
            </div>
            <div className={`container ${visible ? 'show' : ''}`}>
                {props.children}
            </div>
        </div>
    )
}