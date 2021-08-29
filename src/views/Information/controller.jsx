import { useEffect, useState} from "react";
import {Database, snapToArray, randomId} from '../../Global/Variables';
import Axios from 'axios';

export function Controller(props) {
    const [data, setData] = useState(null);
    const [address, setAddress] = useState(null);
    const [ward, setWard] = useState(null);
    const [name, setName] = useState(null);
    const [information, setInformation] = useState(null);
    const [loading, setLoading] = useState(localStorage.getItem("requested")?.indexOf(props.match.params.id) > -1 ? true : false);

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

    //Fetch Data
    useEffect(() => {
        Database.ref(`o2/${props.match.params.district}/${props.match.params.id}`).once('value', snapshot => {
            setData(snapshot.val())
        })
    }, [])

    //Gửi yêu cầu
    const handleSendRequest = () => {
        if(!name || !ward || !address) {
            alert("Vui lòng điền đầy đủ thông tin!");
        }else{
            let requestData = {
                name: name,
                ward: ward,
                address: address,
                information: information,
                district: localStorage.getItem('district'),
                city: 0,
                phone: localStorage.getItem('phone'),
                id: randomId(12),
                uid: data.uid,
                accepted: false
            }

            setLoading(true);

            //Lấy các id đã yêu cầu;
            let requested = localStorage.getItem('requested') ? localStorage.getItem('requested').split(";") : [];

            Database.ref(`request/${data.uid}/${requestData.id}`).set(requestData).then(() => {
                alert("Gửi yêu cầu thành công! Bạn hãy bình tình đợi nhà cung cấp liên hệ sớm nhất nhé!");

                //Gửi thông báo đến nhà cung cấp
                Database.ref(`users/${data.uid}`).once('value', snapshot => {
                    let pushData = {
                        to: snapshot.val().pushToken,
                        data : {
                            body: `${requestData.phone} gửi cần Oxy: ${requestData.information}`,
                            title: `myO2 -  Có yêu cầu Oxy mới`
                        },
                        time_to_live: 600
                    }

                    console.log(pushData);

                    Axios.post('https://fcm.googleapis.com/fcm/send', pushData, {headers: {
                        "Content-Type" : 'application/json',
                        "Authorization" : "key=AAAA2LZykxM:APA91bFUrSHBQCrZalVjmO9eT4cpNJFE-9QB2_-s9NaneojtYe1UE3-k6esZcY0yIk-YAhKvTrbBPzn6naZ3LNKhdLJZxRkUIEI01EqvzDBUL9WmwhU2dw72X5JNqTmGIFvUyTNTZxZw"
                    }}).catch(err => console.log(err))
                })

                //Save về Local Storage
                requested.push(data.uid);
                localStorage.setItem('requested', requested.join(';'));
                setLoading(true);
            }).catch(e => {
                alert(`Có lỗi xảy ra, hãy chọn phương án gọi ngay cho nhà cung cấp!`);
                setLoading(false);
            })
        }
    }

    return {
        data,
        cities,
        districts,
        handleSendRequest,
        setAddress,
        setWard,
        setName,
        setInformation,
        loading
    }
}