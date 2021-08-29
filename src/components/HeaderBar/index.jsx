import React from 'react';
import "./styles.scss";
import {Link} from 'react-router-dom';
import {Controller} from './controller';
import {IoHomeOutline, IoList, IoNotificationsOutline, IoInformation,IoChevronBack} from 'react-icons/io5';
import Logo from "./logo.svg";

export const ChildHeaderBar = (props) => {
    return (
        <div className="child-header-container">
            <div className="child-header">
                <div className="copyright">
                    <a href="https://lavenes.com" target="_blank">
                        <span>DESIGNED BY LAVENES IN HO CHI MINH CITY</span>
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
                            <img src={Logo} height={32}/>
                        </Link>
                    </div>
                    <ul>
                        <Link to="/"><li onClick={() => setLocation('/')} className={`${location === '/' ? 'active' : ''}`}><IoHomeOutline className="icon"/><span>Trang chủ</span></li></Link>
                        {fullAuthed ? <Link to="/management"><li onClick={() => setLocation('/management')} className={`${location === '/management' ? 'active' : ''}`}><IoList className="icon"/><span>Quản lý nơi cung cấp Oxy</span></li></Link> : null}
                        {fullAuthed ? <Link to="/request"><li onClick={() => setLocation('/request')} className={`${location === '/request' ? 'active' : ''}`}><IoNotificationsOutline className="icon"/><span>Yêu cầu hỗ trợ Oxy</span></li></Link> : null}
                        <Link to="/information"><li onClick={() => setLocation('/information')} className={`${location === '/information' ? 'active' : ''}`}><IoInformation className="icon"/><span>Thông tin</span></li></Link>
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