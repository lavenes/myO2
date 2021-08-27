import React, {useState} from 'react';
import {Firebase, Database, snapToArray, messaging} from '../../Global/Variables';

export function Controller(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if(!email || !password) {
            alert("Bạn chưa điền đầy đủ thông tin đăng nhập!")
        }else{
            setLoading(true);

            Firebase.auth().signInWithEmailAndPassword(email, password).then(e => {
                //Update pushToken
                Database.ref(`users/${e.user.uid}`).update({pushToken: localStorage.getItem('pushToken')}).then(() => {
                    //Lấy thông tin user từ csdl
                    Database.ref(`users/${e.user.uid}`).once('value', result => {
                        localStorage.setItem('uid', result.val().uid);
                        localStorage.setItem('email', result.val().email);
                        localStorage.setItem('phone', result.val().phone);
                        localStorage.setItem('city', result.val().city);
                        localStorage.setItem('district', result.val().district);
    
                        setLoading(false);
                        setSuccess(true);
                    });
                }).catch(e => alert(e));
            }).catch(e => {
                alert('Password hoặc email không chính xác!'); 
                setLoading(false); 
            });
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
        handleLogin,
        setEmail,
        setPassword,
        success,
        loading,
        handleRegisterNotificationPerm
    }
}