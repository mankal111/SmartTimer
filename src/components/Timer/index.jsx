import React, { useState, useEffect } from 'react';
import PlayToggle from '../PlayToggle';
import TimeDisplay from '../TimeDisplay';
import TimeInput from '../TimeInput';
import './Timer.css';

function Timer() {
    const [remainingSeconds, setRemainingSeconds] = useState(60);
    const [running, setRunning] = useState(false);
    const [finished, setFinished] = useState(false);
    const [intervalCb, setIntervalCb] = useState();
    const [initialSeconds, setInitialSeconds] = useState(60);

    const secondsToText = givenSeconds => {
        const minutes = Math.floor(givenSeconds / 60);
        const seconds = givenSeconds % 60;
        return `${minutes}:${seconds<10 ? "0" : ""}${seconds}`;
    }

    const reduceTime = () => setRemainingSeconds(remainingSeconds => remainingSeconds - 1);

    const startTimer = () => {
        setIntervalCb(setInterval(reduceTime ,1000));
        setRunning(true);
    }

    const stopTimer = () => {
        clearInterval(intervalCb);
        setRunning(false);
    }

    const resetTimer = () => {
        setRemainingSeconds(initialSeconds);
        setFinished(false);
    }

    const saySomething = message => {
        var msg = new SpeechSynthesisUtterance();
        msg.text = message;
        window.speechSynthesis.speak(msg);
    }
    
    const timeText = secondsToText(remainingSeconds);
    const [toggleIcon, toggleBtnCb] = running ?
        ['pause', stopTimer] :
        (
            finished ?
            ['reset', resetTimer] :
            ['play', startTimer]
        );

    useEffect(() => {
        document.title = `SmartTimer - ${timeText}`;
        if (remainingSeconds === 0) {
            stopTimer();
            setFinished(true);
            saySomething('Time is up');
        }
    }, [remainingSeconds, timeText])

    const setTime = seconds => {
        stopTimer();
        setRemainingSeconds(seconds);
        setInitialSeconds(seconds);
        setFinished(false);
    }

    const setTimeButton = minutes => {
        const clickHandler = () => {
            setTime(minutes * 60);
        };
        return (
            <button
                className="setTimeButton"
                onClick={clickHandler}
            >
                {`${minutes}m`}
            </button>
        );
    } 
    return (
        <div className="container">
            <PlayToggle icon={toggleIcon} onClick={toggleBtnCb} />
            <TimeDisplay timeText={timeText} />
            <TimeInput initialSeconds={initialSeconds} setTime={setTime} />
            <div className="setTimeButtonsContainer">
                {setTimeButton(5)}
                {setTimeButton(15)}
                {setTimeButton(30)}
            </div>
        </div>
    )
}

export default Timer;