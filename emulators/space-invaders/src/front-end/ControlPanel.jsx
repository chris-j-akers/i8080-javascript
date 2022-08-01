import { useEffect, useState } from "react";
import { Button, ButtonGroup, Callout, Checkbox, FocusStyleManager  } from "@blueprintjs/core";
import { AiFillPauseCircle } from 'react-icons/ai'
import { GiAlienBug } from 'react-icons/gi'
import { GrPowerReset } from 'react-icons/gr'
import { AiFillStepForward } from 'react-icons/ai'
import { BsSquareHalf } from 'react-icons/bs'
import { FaSquareFull } from 'react-icons/fa'

function ControlPanel({ invadersWebWorker, traceDisabled, toggleTraceDisabled, programStatus, updateProgramStatus}) {

    const [running, updateRunning] = useState(false);
        
    useEffect( () => {
        FocusStyleManager.onlyShowFocusOnTabs();
    },[]);

    return (
        <>
        <div id='control-panel-status-callout' className='shadow'>
            <Callout title={running ? 'RUNNING' : 'STOPPED'} intent={running ? 'Success' : 'Danger'}></Callout>
        </div>

        <div id='control-panel-disable-trace-checkbox' className='shadow'>
            <Checkbox onChange={() => toggleTraceDisabled(!traceDisabled)} defaultChecked={false} label='Disable Trace' large={false}/>
        </div>

        <div className='shadow'>
            <ButtonGroup vertical={true} alignText='left' fill={true}>
                
                <Button disabled={running} type ='button' icon={<GiAlienBug/>} onClick={() => {
                    invadersWebWorker.postMessage({Type: 'RUN'});
                    updateProgramStatus('RUNNING');
                    updateRunning(true);
                    }}>
                Play Space Invaders
                </Button>

                <Button type ='button' icon={<AiFillPauseCircle />} onClick={() => {
                    invadersWebWorker.postMessage({Type: 'STOP'});
                    updateProgramStatus('PAUSED');
                    updateRunning(false);
                }}>
                Pause Game
                </Button>
                
                <Button type ='button' disabled={programStatus==='RUNNING'} icon={<GrPowerReset />} onClick={() => {
                    invadersWebWorker.postMessage({Type: 'RESET'});
                    updateProgramStatus('RESET');
                    }}>
                Reset Computer
                </Button>
            </ButtonGroup>
        </div>

        <div className='shadow'>
            <ButtonGroup vertical={true} alignText='left' fill={true}>

                <Button icon={<AiFillStepForward/>} onClick={() => {
                        invadersWebWorker.postMessage({Type: 'STEP-NEXT'});
                        }}>
                    Step Next Instruction
                </Button>

                <Button icon={<FaSquareFull/>} onClick={() => {
                invadersWebWorker.postMessage({Type: 'VBLANK'});
                }}>
                    VBlank Interrupt
                </Button>

                <Button icon={<BsSquareHalf/>} onClick={ () => {
                invadersWebWorker.postMessage({Type: 'HALF-VBLANK'});
                }}>
                    Half-VBlank Interrupt
                </Button>
                
            </ButtonGroup>
        </div>
        </>
    )
}

export default ControlPanel
