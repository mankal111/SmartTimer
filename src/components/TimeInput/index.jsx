import React, {useState, useEffect} from 'react';
import './TimeInput.css';

function TimeInput({initialSeconds, setTime}) {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    
    const minutesChange = e => setMinutes(parseInt(e.target.value));
    const secondsChange = e => setSeconds(parseInt(e.target.value));
    const minutesNegative = minutes < 0;
    const secondsNegative = seconds < 0;
    const secondsOver59 = seconds > 59;
    const clickHandler = () => {
        if (minutesNegative) {
            alert("You cannot use a negative number in the field of minutes.");
        } else if (secondsNegative) {
            alert("You cannot use a negative number in the field of seconds.");
        } else if (secondsOver59) {
            alert("The number of seconds cannot be over 59.")
        } else {
            setTime(minutes * 60 + seconds);
        }
    }
    
    useEffect(() => {
        setMinutes(Math.floor(initialSeconds / 60));
        setSeconds(initialSeconds % 60);
    }, [initialSeconds]);

    return (
        <div className="timeInputContainer">
            <input
                type="number"
                className={`minutesField ${minutesNegative ? 'fieldError' : ''}`}
                value={minutes}
                onChange={minutesChange}
            />
            m
            <input
                type="number"
                className={`secondsField ${secondsNegative || secondsOver59 ? 'fieldError' : ''}`}
                value={seconds}
                onChange={secondsChange}
            />
            s
            <button onClick={clickHandler} className="setCustomTimeButton">Set</button>
        </div>
    )
}

export default TimeInput;