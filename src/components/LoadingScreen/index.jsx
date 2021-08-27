import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import "./styles.scss";

export const LoadingScreen = (props) => {
    return (
        <div className="loading-screen">
            <ClipLoader color={`rgb(0, 122, 255)`} loading={true} size={50}/>
        </div>
    )
}