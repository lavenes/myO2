import React from 'react';

const Info = (props) => {
    return (
        <div className="view">
            <h1 style={{color: 'rgb(0, 122, 255)', fontSize: 24, marginTop: 32}}>Thông tin dự án:</h1>
            <span><b>Nhà phát triển: </b>Laven Studio</span><br/><br/>
            <span><b>Website: </b><a href="https://lavenes.com" target="_blank">https://lavenes.com</a></span><br/><br/>
            <span><b>Facebook: </b><a href="https://www.facebook.com/nhatsdevil.mc" target="_blank">https://www.facebook.com/nhatsdevil.mc</a></span><br/><br/>
            <span><b>Phiển bản: </b>1.0.0</span><br/><br/>
            {/*
            <h2 style={{color: 'rgb(0, 122, 255)', fontSize: 24}}>Hãy ủng hộ nhà phát triển nhé!</h2>
            <span><b>Ngân hàng: </b>VP Bank ( CN Bến Thành )</span><br/><br/>
            <span><b>Số tài khoản: </b>20782048</span><br/><br/>
            <span><b>Tên người nhận: </b>TRAN QUANG NHAT</span><br/><br/><br/>
            
            <span><b>Hoặc qua Momo: </b>0938225747</span><br/><br/><br/><br/>
            <span><b>Rất cảm ơn và trân quý sự ủng hộ của mọi người cho sản phẩn này!</b></span>
             */}
        </div>
    )
}

export default Info;