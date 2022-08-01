import { useEffect, useState } from "react";
import { Button, ButtonGroup, Checkbox, FocusStyleManager } from "@blueprintjs/core";
import { AiFillStepForward } from 'react-icons/ai'
import { BsSquareHalf } from 'react-icons/bs'
import { FaSquareFull } from 'react-icons/fa'


function DiagnosticControlPanel({ running, invadersWebWorker, toggleTraceDisabled, traceDisabled, cpuHaltStatus}) {
    useEffect( () => {
        FocusStyleManager.onlyShowFocusOnTabs();
      },[]);

  return (
    <>
    <div className='diag-control-panel-container shadow'>
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
    <div className='trace-checkbox-container shadow'>
      <Checkbox onChange={() => toggleTraceDisabled(!traceDisabled)} defaultChecked={false} label='Disable Trace' large={false}/>
    </div>
    </>
  )
}


export default DiagnosticControlPanel
