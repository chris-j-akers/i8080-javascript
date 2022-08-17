import { useEffect, useState } from "react";
import { Button, ButtonGroup, Checkbox, FocusStyleManager  } from "@blueprintjs/core";
import { AiFillPauseCircle } from 'react-icons/ai'
import { GiAlienBug } from 'react-icons/gi'
import { GrPowerReset } from 'react-icons/gr'
import { AiFillStepForward } from 'react-icons/ai'
import { BsSquareHalf } from 'react-icons/bs'
import { FaSquareFull } from 'react-icons/fa'
import InstructionsTable from "./state-tables-components/InstructionsTable";
import StatusCard from "./StatusCard";

function ControlPanel({ invadersWebWorker, traceDisabled, toggleTraceDisabled, programStatus, updateProgramStatus}) {

    const [running, updateRunning] = useState(false);
        
    useEffect( () => {
        FocusStyleManager.onlyShowFocusOnTabs();
    },[]);

    return (
        <div id='control-panel-container'>
            <StatusCard running={running}></StatusCard>

            <div id='control-panel-disable-trace-checkbox'>
                <Checkbox onChange={() => toggleTraceDisabled(!traceDisabled)} defaultChecked={false} label='Disable Trace Output' large={false}/>
            </div>

            <div>
                <ButtonGroup vertical={true} alignText='left' fill={true}>
                    
                    <button className='control-panel-button' disabled={running} type ='button' icon={<GiAlienBug/>} onClick={() => {
                        invadersWebWorker.postMessage({Type: 'RUN'});
                        updateProgramStatus('RUNNING');
                        updateRunning(true);
                        }}>
                    Play Space Invaders
                    </button>

                    <button className='control-panel-button' disabled={!running} type ='button' icon={<AiFillPauseCircle />} onClick={() => {
                        invadersWebWorker.postMessage({Type: 'STOP'});
                        updateProgramStatus('PAUSED');
                        updateRunning(false);
                    }}>
                    Pause Game
                    </button>
                    
                    <button className='control-panel-button' type ='button' disabled={programStatus==='RUNNING'} icon={<GrPowerReset />} onClick={() => {
                        invadersWebWorker.postMessage({Type: 'RESET'});
                        updateProgramStatus('RESET');
                        }}>
                    Reset Computer
                    </button>
                </ButtonGroup>
            </div>

            <div>
                <ButtonGroup vertical={true} alignText='left' fill={true}>

                    <button className='control-panel-button' icon={<AiFillStepForward/>} onClick={() => {
                            invadersWebWorker.postMessage({Type: 'STEP-NEXT'});
                            }}>
                        Step Next Instruction
                    </button>

                    <button className='control-panel-button' icon={<FaSquareFull/>} onClick={() => {
                    invadersWebWorker.postMessage({Type: 'VBLANK'});
                    }}>
                        VBlank Interrupt
                    </button>

                    <button className='control-panel-button' icon={<BsSquareHalf/>} onClick={ () => {
                    invadersWebWorker.postMessage({Type: 'HALF-VBLANK'});
                    }}>
                        Half-VBlank Interrupt
                    </button>
                    
                </ButtonGroup>
            </div>
        </div>
    )
}

export default ControlPanel
