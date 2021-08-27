import React, {useState} from 'react';

export function Controller(props) {
    const [visible, setVisible] = useState(props.opened ? true : false);

    //Thay đổi trạng thái hiển thị list
    const handleChangeVisible = () => setVisible(!visible);

    return {
        visible,
        handleChangeVisible
    }
}