import { Button } from "@blueprintjs/core";
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BsCoin } from 'react-icons/bs';
import { GiBolterGun } from 'react-icons/gi';
import { FaRunning } from 'react-icons/fa';

function PortableDeviceControls( {invadersWebWorker} ) {
  return (
    <div id='portable-device-controls' className='shadow'>
        <div id='direction-controls' className='shadow'>
            <Button className='button-controls' icon={<AiFillCaretLeft />} onClick={() => {
                invadersWebWorker.postMessage({Type: 'P1-LEFT-DOWN'});
                setTimeout(() => invadersWebWorker.postMessage({Type: 'P1-LEFT-UP'}), 100);
            }}>
            </Button>
            <Button className='button-controls' icon={<AiFillCaretRight className='icons' />} onClick={() => {
                invadersWebWorker.postMessage({Type: 'P1-RIGHT-DOWN'});
                setTimeout(() => invadersWebWorker.postMessage({Type: 'P1-RIGHT-UP'}), 100);
            }}>
            </Button>
        </div>
        <div id='fire-start-controls' className='shadow'>
            <Button className='button-controls' icon={<BsCoin />} onClick={() => {
                invadersWebWorker.postMessage({Type: 'COIN'});
            }}>
            </Button>
            <Button icon={<FaRunning />} className='button-controls' onClick={() => {
                invadersWebWorker.postMessage({Type: 'P1-START-DOWN'});
                setTimeout(() => invadersWebWorker.postMessage({Type: 'P1-START-UP'}), 100);
            }}>
            </Button>
            <Button className='button-controls' icon={<GiBolterGun />} onClick={() => {
                invadersWebWorker.postMessage({Type: 'P1-FIRE-DOWN'});
                setTimeout(() => invadersWebWorker.postMessage({Type: 'P1-FIRE-UP'}), 100);
            }}>
            </Button>
        </div>
    </div>
  )
}

export default PortableDeviceControls
