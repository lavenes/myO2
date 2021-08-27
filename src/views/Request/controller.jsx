import { useState, useEffect } from "react";
import { Database, snapToArray} from "../../Global/Variables";

export function Controller(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        Database.ref(`request/${localStorage.getItem('uid')}`).on('value', snapshot => {
            setData(snapToArray(snapshot));
        })
    }, [])

    //Xác nhạn đã giao
    const handleSubmit = (id) => {
        Database.ref(`request/${localStorage.getItem('uid')}/${id}`).update({
            accepted: true
        });
    }

    return {
        data,
        handleSubmit
    }
}