import React from "react";

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, for practicing React, MongoDB, node, express and Heroku</em>
        </div>
    )
}

export default Footer;