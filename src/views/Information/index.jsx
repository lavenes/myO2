import React from 'react';
import "./styles.scss";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {MdPhone} from 'react-icons/md'
import {IoSend} from 'react-icons/io5';
import Fab from '@material-ui/core/Fab';
import {Controller} from './controller';
import {TopHeaderBar} from '../../components/HeaderBar';
import { LoadingScreen } from '../../components/LoadingScreen';

const Information = (props) => {
    const {data, districts, cities, handleSendRequest, loading, setInformation, setName, setAddress, setWard} = new Controller(props);

    //Loading Page
    if(!data) return <LoadingScreen/>

    return (
        <div className="view information-view">
            <TopHeaderBar title={data.name} goBack={'/'}/>
            <div className="image" style={{background: `url(${data.image}) no-repeat center center / cover`}}></div>
            <div className="header">
                <div className="title">
                    <h1>{data.name}</h1>
                    <div className={`status ${data.status ? 'green' : 'red'}`}>
                        <span>{data.status ? 'Còn Oxy' : 'Đã hết Oxy'}</span>
                    </div>
                </div>
                <div className="action-container">
                    <a href={`tel:${data.phone}`}>
                        <Fab
                          variant="extended"
                          size="medium"
                          color="primary"
                          aria-label="add"
                          className="action-btn"
                        >
                          <MdPhone style={{marginRight: 8}}/>
                          Gọi ngay
                        </Fab>
                    </a>
                </div>
            </div>

            <span className="address">{data.address}, phường {data.ward}, {districts[data.district].title}, {cities[data.city].title}</span>
            <hr/>
            <p className="information">{data.information}</p>
            
            <div className="form-container">
                <h2>Gửi yêu cầu Oxy</h2>
                <a href={`tel:${data.phone}`}>
                    <Button variant="contained" color="primary" size="large" startIcon={<MdPhone/>}>Gọi ngay ({data.phone})</Button>
                </a>
                
                <div className="split-line">
                    <span>Hoặc</span>
                </div>

                <div className="form">
                    <TextField id="outlined-basic" onChange={(e) => setName(e.target.value)} required label="Họ & Tên" variant="outlined" />
                    <TextField id="outlined-basic" onChange={(e) => setWard(e.target.value)} required label="Tên phường" variant="outlined" />
                    <TextField id="outlined-basic" onChange={(e) => setAddress(e.target.value)} required label="Tên đường, số nhà" variant="outlined" />
                    <TextField id="outlined-basic" onChange={(e) => setInformation(e.target.value)} label="Tình trạng người bệnh" variant="outlined" />
                    <Button disabled={loading} variant="contained" color="primary" endIcon={<IoSend/>} onClick={handleSendRequest}>Gửi yêu cầu</Button>
                </div>
            </div>
        </div>
    )
}

export default Information;