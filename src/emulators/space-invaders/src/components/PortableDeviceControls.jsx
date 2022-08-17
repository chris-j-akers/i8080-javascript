import { Button } from "@blueprintjs/core";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BsCoin } from 'react-icons/bs';
import { GiBolterGun } from 'react-icons/gi';
import { FaRunning } from 'react-icons/fa';

function PortableDeviceControls( {invadersWebWorker} ) {
  return (
    <div id='portable-device-controls'>
        <div id='direction-controls'>
            <Button className='button-controls' icon={<AiFillCaretLeft />} 
                onTouchStart={() => {
                    invadersWebWorker.postMessage({Type: 'P1-LEFT-DOWN'});
                }}
                onTouchEnd={() => {
                    invadersWebWorker.postMessage({Type: 'P1-LEFT-UP'})
                }}>
            </Button>
            <Button className='button-controls' icon={<AiFillCaretRight className='icons' />} 
                onTouchStart={() => {
                    invadersWebWorker.postMessage({Type: 'P1-RIGHT-DOWN'});
                }}
                onTouchEnd={() => {
                    invadersWebWorker.postMessage({Type: 'P1-RIGHT-UP'});
                }}>
            </Button>
        </div>
        <div id='fire-start-controls'>
            <Button className='button-controls' icon={<BsCoin />} onClick={() => {
                invadersWebWorker.postMessage({Type: 'COIN'});
            }}>
            </Button>
            <Button className='button-controls' 
                onTouchStart={() => {
                    invadersWebWorker.postMessage({Type: 'P1-START-DOWN'});
                }}
                onTouchEnd={ () => {
                    invadersWebWorker.postMessage({Type: 'P1-START-UP'});
                }}>START
            </Button>
            <Button className='button-controls' 
                onTouchStart={() => {
                invadersWebWorker.postMessage({Type: 'P1-FIRE-DOWN'});
                }} 
                onTouchEnd={() => {
                    invadersWebWorker.postMessage({Type: 'P1-FIRE-UP'});
                }}>FIRE
            </Button>
        </div>
    </div>
  )
}

export default PortableDeviceControls
