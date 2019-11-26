import React from 'react';
import { Bounce } from 'react-activity';
import 'react-activity/dist/react-activity.css';

export default function Bouncer() {
    return (
        <div style={BouncerStyles}>
            <Bounce size={80} color={BouncerStyles.color} />
        </div>
    )
}

const BouncerStyles = {
    color: 'green',
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
}