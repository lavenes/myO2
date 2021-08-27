import React, {useRef} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {Controller} from './controller';
import Button from '@material-ui/core/Button';
import {Redirect} from 'react-router-dom'
import {findWithAttr} from '../../Global/Variables';
import {TopHeaderBar} from '../../components/HeaderBar';
import { LoadingScreen } from '../../components/LoadingScreen';
import "./styles.scss";

const AddNew = (props) => {
    const {cities, districts, statusOptions, setStatus, status, setCity,success, editData, loading, setDistrict, name, isEdit, district, city, phone, ward,address,information, handleUploadImage, image, setName, setPhone, setAddress, setWard, setInformation, handleSubmit} = new Controller(props);
    const imageRef = useRef(0);

    if(success) return <Redirect to="/management"/>

    if(isEdit && !editData) return <LoadingScreen/>
    
    return (
        <div className="view add-new">
            <TopHeaderBar title={`${isEdit ? 'Chỉnh sửa nơi cung cấp Oxy' : 'Thêm nơi cung cấp Oxy'}`} goBack="/management"/>
            <div className="form">
                <h1>{isEdit ? 'Chỉnh sửa' : 'Thêm'} nơi cung cấp Oxy</h1>
                <label className="image" htmlFor={'image-input'} style={{background: `${image ? `url(${image}) no-repeat  center  center / cover` : `#f1f1f1`}`}}>
                    <div className="add">
                        <span>Thêm ảnh</span>
                    </div>
                </label>
                <input type="file" ref={imageRef} id="image-input" className="file-input" onChange={handleUploadImage}/>

                <TextField id="outlined-basic" required defaultValue={name} label="Tên nhà cung cấp" variant="outlined" onChange={(e) => setName(e.target.value)}/>
                <TextField id="outlined-basic" required defaultValue={phone} label="Số điện thoại" variant="outlined"  onChange={(e) => setPhone(e.target.value)}/>
                <Autocomplete
                  id="combo-box-demo"
                  options={cities}
                  getOptionLabel={(option) => option.title}
                  defaultValue={cities[findWithAttr(cities, 'title', city)]}
                  renderInput={(params) => <TextField {...params} required label="Thành phố" variant="outlined" 
                  onSelect={(e) => setCity(e.target.value)} />}
                />
                <Autocomplete
                  id="combo-box-demo"
                  options={districts}
                  getOptionLabel={(option) => option.title}
                  defaultValue={districts[findWithAttr(districts, 'title', district)]}
                  renderInput={(params) => <TextField {...params} required label="Quận / huyện" variant="outlined" 
                  onSelect={(e) => setDistrict(e.target.value)}/>}
                />
                <TextField id="outlined-basic" required defaultValue={ward} label="Tên phường" variant="outlined"  onChange={(e) => setWard(e.target.value)}/>
                <TextField id="outlined-basic" required defaultValue={address} label="Tên đường, số nhà" variant="outlined"  onChange={(e) => setAddress(e.target.value)}/>
                <Autocomplete
                  id="combo-box-demo"
                  options={statusOptions}
                  getOptionLabel={(option) => option.title}
                  defaultValue={statusOptions[status ? 0 : 1]}
                  renderInput={(params) => <TextField {...params} required label="Trạng thái hỗ trợ" variant="outlined" 
                  onSelect={(e) => setStatus(findWithAttr(statusOptions, 'title', e.target.value) == 0 ? true : false)}/>}
                />
                <TextField id="outlined-basic" defaultValue={information} label="Nội dung thêm khác" variant="outlined"  onChange={(e) => setInformation(e.target.value)}/>
                <Button disabled={loading} variant="contained" color="primary" onClick={handleSubmit}>{props.isEdit ? 'Lưu' : 'Thêm'}</Button>
            </div>
        </div>
    )
}

export default AddNew;