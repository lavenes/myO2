import {useState} from 'react';

export function Controller(props) {
    const [location, setLocation] = useState(window.location.hash.replace('#', ''));

    return {
        location,
        setLocation
    }
}