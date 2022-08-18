import React from 'react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BsCoin, BsFillPersonFill } from 'react-icons/bs';
import { IoIosRadioButtonOn } from 'react-icons/io'
import { useEffect } from "react";

function PortableDeviceControls( {invadersWebWorker} ) {

    const buttonLeftRef = React.useRef(null);
    const buttonRightRef = React.useRef(null);
    const buttonFireRef = React.useRef(null);

    /* We have to do this otherwise when users hold the buttons on the
       touchscreen, it defaults to an annoying context menu ('copy - paste -
       translate' etc). There doesn't seem to be a way in React, right now, to
       set passive eventlisteners, so references need to be obtained and
       addEventListener() called manually on each button when the control is
       first rendered.
    */

    useEffect( () => {
        buttonFireRef.current.addEventListener('touchstart', 
        (e) => {
            e.preventDefault();
            invadersWebWorker.postMessage({Type: 'P1-FIRE-DOWN'});
        },{ passive: false });

        buttonFireRef.current.addEventListener('touchend', 
        (e) => {
            e.preventDefault();
            invadersWebWorker.postMessage({Type: 'P1-FIRE-UP'});
        },{ passive: false });
       
        buttonLeftRef.current.addEventListener('touchstart', 
            (e) => {
                e.preventDefault();
                invadersWebWorker.postMessage({Type: 'P1-LEFT-DOWN'});
            },{ passive: false });

        buttonLeftRef.current.addEventListener('touchend', 
            (e) => {
                e.preventDefault();
                invadersWebWorker.postMessage({Type: 'P1-LEFT-UP'});
            },{ passive: false });

        buttonRightRef.current.addEventListener('touchstart', 
            (e) => {
                e.preventDefault();
                invadersWebWorker.postMessage({Type: 'P1-RIGHT-DOWN'});
            },{ passive: false });

        buttonRightRef.current.addEventListener('touchend', 
            (e) => {
                e.preventDefault();
                invadersWebWorker.postMessage({Type: 'P1-RIGHT-UP'});
            },{ passive: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (
        <div id='portable-device-controls'>
            <div id='direction-controls' >
                <button className="portable-device-controller-button" ref={buttonLeftRef}>
                    <AiFillCaretLeft className="portable-device-controller-button-icon"/>
                </button>
                <button className="portable-device-controller-button" ref={buttonRightRef}>
                    <AiFillCaretRight className="portable-device-controller-button-icon" />
                </button>
            </div>

            <div id='fire-start-controls'>
                <button className="portable-device-controller-button" icon={<BsCoin />} onClick={() => {
                    invadersWebWorker.postMessage({Type: 'COIN'});
                }}> <BsCoin className="portable-device-controller-button-icon"/>
                </button>
                <button className="portable-device-controller-button" 
                    onTouchStart={() => {
                        invadersWebWorker.postMessage({Type: 'P1-START-DOWN'});
                    }}
                    onTouchEnd={ () => {
                        invadersWebWorker.postMessage({Type: 'P1-START-UP'});
                    }}> <BsFillPersonFill className="portable-device-controller-button-icon"/>
                </button>
                <button id='portable-device-controller-fire-button' className="portable-device-controller-button" ref={buttonFireRef}>
                    <IoIosRadioButtonOn className="portable-device-controller-button-icon" />
                </button>
            </div>
        </div>
    )
}

export default PortableDeviceControls
