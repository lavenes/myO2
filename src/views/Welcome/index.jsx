import React from 'react';
import { districts, cities, findWithAttr } from '../../Global/Variables';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import {Controller} from './controller';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom';
import "./styles.scss";

const Welcome = (props) => {
    const {setCity, setDistrict, handleSubmit, redirect, setPhone} = new Controller(props);

    if(redirect) return <Redirect to="/"/>

    return (
        <div className="form-welcome">
            <h1>Chào mừng đến với myO2, hãy thêm thông tin của bạn nhé!</h1>
            <TextField id="outlined-basic" required label="Số điện thoại" variant="outlined" onChange={(e) => setPhone(e.target.value)}/>
            <Autocomplete
              id="combo-box-demo"
              options={cities}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} required label="Thành phố" variant="outlined" 
              onSelect={(e) => setCity(findWithAttr(cities, 'title', e.target.value)+1)} />}
            />
            <Autocomplete
              id="combo-box-demo"
              options={districts}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} required label="Quận / huyện" variant="outlined" 
              onSelect={(e) => setDistrict(findWithAttr(districts, 'title', e.target.value)+1)}/>}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>Lưu</Button>
        </div>
    )
}

export default Welcome;