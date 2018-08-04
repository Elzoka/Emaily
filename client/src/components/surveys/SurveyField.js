import React from 'react';

export default ({input, label, meta: {error, touched}}) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom: '5px'}}/>
            {touched && <div className="red-text" style={{marginBottom: '20px'}}>{error}</div>}
        </div>
    );
};