import React, {useState, useEffect} from 'react';
import {Firebase, Database, findWithAttr, messaging} from '../../Global/Variables';

export function Controller() {
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [password, setPassword] = useState(null);
    const [loading, setLoading] = useState(false);
    const [city, setCity] = useState(0);
    const [district, setDistrict] = useState(0);
    const [success, setSuccess] = useState(false);

    const cities = [
        {
            title: 'TP. Hồ Chí Minh',
            id: 0
        }
    ]

    const districts = [
        {
            title: 'Quận 1',
            id: 0
        },
        {
            title: 'Quận 2',
            id: 1
        },
        {
            title: 'Quận 3',
            id: 2
        },
        {
            title: 'Quận 4',
            id: 3
        },
        {
            title: 'Quận 5',
            id: 4
        },
        {
            title: 'Quận 6',
            id: 5
        },
        {
            title: 'Quận 7',
            id: 6
        },
        {
            title: 'Quận 8',
            id: 7
        },
        {
            title: 'Quận 9',
            id: 8
        },
        {
            title: 'Quận 10',
            id: 9
        },
        {
            title: 'Quận 11',
            id: 10
        },
        {
            title: 'Quận 12',
            id: 11
        },
        {
            title: 'Q. Bình Tân',
            id: 12
        },
        {
            title: 'Q. Bình Thành',
            id: 13
        },
        {
            title: 'Q. Gò Vấp',
            id: 14
        },
        {
            title: 'Q. Phú Nhuận',
            id: 15
        },
        {
            title: 'Q. Tân Bình',
            id: 16
        },
        {
            title: 'Q. Tân Phú',
            id: 17
        },
        {
            title: 'Q. Thủ Đức',
            id: 18
        },
        {
            title: 'Huyện Bình Chánh',
            id: 19
        },
        {
            title: 'Huyện Cần Giờ',
            id: 20
        },
        {
            title: 'Huyện Củ Chi',
            id: 21
        },
        {
            title: 'Huyện Hóc Môn',
            id: 22
        },
        {
            title: 'Huyện Nhà Bè',
            id: 23
        },
        {
            title: 'Quận Khác',
            id: 24
        }
    ]

    useEffect(() => {
        if(localStorage.getItem('uid')) {
            setLoading(false);
            setSuccess(true);
        }
    }, [])

    //Đăng ký
    const handleSignup = () => {
        if(!email || !phone || !password) {
            alert("Bạn chưa điền đầy đủ thông tin đăng ký!");
        }else{
            setLoading(true);

            Firebase.auth().createUserWithEmailAndPassword(email, password).then((e) => {
                let data = {
                    uid: e.user.uid,
                    email: email,
                    phone: phone,
                    district: findWithAttr(districts, 'title', district),
                    city:  findWithAttr(cities, 'title', city),
                    pushToken: localStorage.getItem('pushToken')
                }
    
                //Lưu thông tin đăng ký về csdl
                Database.ref(`users/${data.uid}`).set(data).then(() => {
                    //Đăng nhập cho user
                    localStorage.setItem('phone', phone);
                    localStorage.setItem('email', email);
                    localStorage.setItem('uid', data.uid);
                    localStorage.setItem('district', data.district);

                    window.location.reload();
    
                    setLoading(false);
                    setSuccess(true);
                }).catch(e => alert(e));
            }).catch(e => alert(e));
        }
    }

    //Đăng ký phân quyền thông báo
    const handleRegisterNotificationPerm = async () => {
        await window.Notification.requestPermission();

        //Get firebase cloud msg token
        messaging.getToken().then(async function() {
          const token = await messaging.getToken();
          localStorage.setItem('pushToken', token);
        }).catch(function(err) {
          //alert("Unable to get permission to notify.", err);
        });
    }

    return {
        handleSignup,
        email,
        setEmail,
        phone,
        setPhone,
        password,
        setPassword,
        loading,
        cities,
        districts,
        setCity,
        setDistrict,
        success,
        handleRegisterNotificationPerm
    }
}