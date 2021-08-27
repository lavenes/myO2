import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import {Controller} from './controller';
import {Redirect, Link} from 'react-router-dom';

import "./styles.scss";

const Signup = (props) => {
    const {handleLogin, setEmail, handleRegisterNotificationPerm, setPassword, loading, success} = new Controller(props);

    if(success) return <Redirect to="/management"/>

    return(
        <div className="center-form">
            <h1>Đăng nhập</h1>
            <div className="form">
                <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" type="email"/>
                <TextField onChange={(e) => setPassword(e.target.value)} label="Mật khẩu" variant="outlined" type="password"/>
                <Button color="primary" onClick={handleRegisterNotificationPerm}>Cho phép gửi thông báo</Button>
                <Button style={{marginTop: 12}} disabled={loading} onClick={handleLogin} variant="contained" color="primary">Đăng nhập</Button>
            </div>
            <span className="action-label">Bạn chưa có tài khoản ? <Link to="/signup">Đăng ký</Link></span>
        </div>
    )
}

export default Signup;