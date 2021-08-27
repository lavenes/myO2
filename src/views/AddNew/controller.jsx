import {useState} from 'react';
import Axios from 'axios';
import {findWithAttr, Firebase, randomId, Database, snapToArray} from '../../Global/Variables';
import { useEffect } from 'react';

export function Controller(props) {
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

    const statusOptions = [{
        title: 'Còn Oxy',
        id: 0
    }, {
        title: 'Đã hết Oxy',
        id: 1
    }]

    const [city, setCity] = useState(0);
    const [district, setDistrict] = useState(0);
    const [image, setImage] = useState(null);
    const [imageURL, setImageURL]  = useState(null);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [ward, setWard] = useState(null);
    const [address, setAddress] = useState(null);
    const [information, setInformation] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isEdit, setIsEdit] = useState(props.isEdit || false);
    const [editData, setEditData] = useState(null);
    const [status, setStatus] = useState(true);
    
    //Load data nếu đang ở chế độ edit
    useEffect(() => {
        if(isEdit) {
            setLoading(true);
            Database.ref(`o2/${props.match.params.district}/${props.match.params.id}`).once('value', snapshot => {
                let data = snapshot.val();
                //Save to  state
                setCity(cities[data.city].title);
                setDistrict(districts[data.district].title);
                setImage(data.image);
                setImageURL(data.image);
                setName(data.name);
                setPhone(data.phone);
                setAddress(data.address);
                setWard(data.ward);
                setInformation(data.information);
                setLoading(false);
                setEditData(data);
                setStatus(data.status);
            })
        }
    }, [])

    //Upload image
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        //Display image  preview
        setImage(URL.createObjectURL(file))
        
        const storageRef = Firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);

        //Save image state
        setImageURL(await fileRef.getDownloadURL());
    }

    //Submit
    const handleSubmit = () => {
        setLoading(true);

        let data = {
            id: randomId(20),
            uid: localStorage.getItem('uid'),
            name: name,
            phone: phone,
            city: findWithAttr(cities, 'title', city),
            district: findWithAttr(districts, 'title', district),
            ward: ward,
            address: address,
            information: information,
            image: imageURL,
            status: status
        }

        if(isEdit) {
            data.id = props.match.params.id;

            //If new district different old district
            if(props.match.params.district !== data.district) {
                //Remove old district
                Database.ref(`o2/${props.match.params.district}/${data.id}`).remove().catch(e => alert(e))
            }

            //Save to database
            Database.ref(`o2/${data.district}/${data.id}`).update(data).then(res => {
                alert("Lưu thành công!");
                setLoading(false);
                setSuccess(true);
            }).catch(e => {
                alert(e);
                setLoading(false);
            });
        }else{
            //Create new
            Database.ref(`o2/${data.district}/${data.id}`).set(data).then(res => {
                alert("Thêm thành công!");
                setLoading(false);
                setSuccess(true);
            }).catch(e => {
                alert(e);
                setLoading(false);
            });
        }
    }

    return {
        cities,
        districts,
        setCity,
        setDistrict,
        handleUploadImage,
        image,
        setName,
        setPhone,
        setWard,
        setAddress,
        setInformation,
        handleSubmit,
        loading,
        success,
        name,
        phone,
        district,
        city,
        ward,
        address,
        information,
        editData,
        isEdit,
        statusOptions,
        status,
        setStatus
    }
}