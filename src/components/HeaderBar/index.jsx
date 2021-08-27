import React from 'react';
import "./styles.scss";
import {Link} from 'react-router-dom';
import {Controller} from './controller';
import {IoHomeOutline, IoList, IoNotificationsOutline, IoInformation,IoChevronBack} from 'react-icons/io5';

export const ChildHeaderBar = (props) => {
    return (
        <div className="child-header-container">
            <div className="child-header">
                <div className="copyright">
                    <a href="https://lavenstudio.cf" target="_blank">
                        <span>DESIGNED BY LAVEN STUDIO IN HO CHI MINH CITY</span>
                    </a>
                </div>
                <div className="information">
                    <span>HOTLINE: +84 0938415997</span>
                </div>
            </div>
        </div>
    )
}

export const HeaderBar = (props) => {
    const {location, setLocation} = new Controller(props);
    const halfAuthed = localStorage.getItem('district') && localStorage.getItem('city') && localStorage.getItem('phone') ? true : false;
    const fullAuthed = localStorage.getItem('uid');

    if(!halfAuthed) return <div></div>

    return (
        <>
            <ChildHeaderBar/>
            <div className="header-container">
                <header>
                    <div className="logo">
                        <Link to="/">
                            <h2>myO2</h2>
                        </Link>
                    </div>
                    <ul>
                        <li onClick={() => setLocation('/')} className={`${location === '/' ? 'active' : ''}`}><IoHomeOutline className="icon"/><Link to="/">Trang chủ</Link></li>
                        {fullAuthed ? <li onClick={() => setLocation('/management')} className={`${location === '/management' ? 'active' : ''}`}><IoList className="icon"/><Link to="/management">Quản lý nơi cung cấp Oxy</Link></li> : null}
                        {fullAuthed ? <li onClick={() => setLocation('/request')} className={`${location === '/request' ? 'active' : ''}`}><IoNotificationsOutline className="icon"/><Link to="/request">Yêu cầu hỗ trợ Oxy</Link></li> : null}
                        <li onClick={() => setLocation('/information')} className={`${location === '/information' ? 'active' : ''}`}><IoInformation className="icon"/><Link to="/information">Thông tin</Link></li>
                    </ul>
                </header>
            </div>
        </>
    )
}

export const TopHeaderBar = (props) => {
    return (
        <div className="top-header-container">
            <Link to={props.goBack} className="go-back-btn">
                <IoChevronBack/>
            </Link>
            <h5>{props.title}</h5>
        </div>
    )
}