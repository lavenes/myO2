import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import {Controller} from './controller';
import {Redirect, Link} from 'react-router-dom';

import "./styles.scss";

const Signup = (props) => {
    const {handleSignup, setEmail, handleRegisterNotificationPerm, setPhone, setPassword, loading, cities, districts, setCity, setDistrict, success} = new Controller(props);

    if(success) return <Redirect to="/management"/>

    return(
        <div className="center-form">
            <h1>Đăng ký tài khoản</h1>
            <div className="form">
                <TextField onChange={(e) => setEmail(e.target.value)} label="Email" variant="outlined" type="email"/>
                <TextField onChange={(e) => setPhone(e.target.value)} label="Số điện thoại liên hệ" variant="outlined" type="phone"/>
                <Autocomplete
                  id="combo-box-demo"
                  options={cities}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label="Thành phố hiện tại" variant="outlined" 
                  onSelect={(e) => setCity(e.target.value)} />}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={districts}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label="Quận / huyện quan tâm" variant="outlined" 
                  onSelect={(e) => setDistrict(e.target.value)}/>}
                />
                <TextField onChange={(e) => setPassword(e.target.value)} label="Mật khẩu" variant="outlined" type="password"/>
                <Button color="primary" onClick={handleRegisterNotificationPerm}>Cho phép gửi thông báo</Button>
                <Button style={{marginTop: 12}} disabled={loading} onClick={handleSignup} variant="contained" color="primary">Đăng ký</Button>
            </div>
            <span className="action-label">Bạn đã có tài khoản ? <Link to="/login">Đăng nhập</Link></span>
        </div>
    )
}

export default Signup;