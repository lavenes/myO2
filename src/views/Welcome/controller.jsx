import { useEffect } from 'react';
import {useState} from 'react';

export function Controller(props) {
    const [city, setCity] = useState(null);
    const [district, setDistrict] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [phone, setPhone] = useState(null);

    useEffect(() => {
        if(localStorage.getItem('city') && localStorage.getItem('district') && localStorage.getItem('phone')) setRedirect(true);
    }, [])

    const handleSubmit = () => {
        console.log(city, district);
        
        if(!city || !district) {
            alert("Vui lòng chọn đầy đủ thông tin!");
        }else{
            localStorage.setItem('city', city-1);
            localStorage.setItem('district', district-1);
            localStorage.setItem('phone', phone);

            window.location.reload();
            
            //Redirect to home page
            setRedirect(true);
        }
    }

    return {
        setCity,
        setDistrict,
        handleSubmit,
        redirect,
        setPhone
    }
}