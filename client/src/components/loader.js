import React from 'react';
import { Spinner } from 'react-activity';
import 'react-activity/dist/react-activity.css';

export default function Loader() {
    return (
        <div style={loaderStyles}>
            <Spinner size={40} />
        </div>
    )
}

const loaderStyles = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}