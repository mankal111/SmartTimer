import React from 'react';
import './TimeDisplay.css';

function Timer({timeText}) {
    
    return (
        <div className="timeDisplayContainer">
            <div className="timeText">{ timeText }</div>
        </div>
    )
}

export default Timer;