import React from 'react';
import { Link } from 'react-router-dom';

export default function Unauthorized () {
    return (
        <div>
            <h1>Error 401
            <br />You are not authorized to see this content</h1>
            <Link to="/user/login">Click here to log in</Link>
        </div>
    )
}