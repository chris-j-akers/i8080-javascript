import { useEffect } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { FocusStyleManager } from "@blueprintjs/core";
import { AiFillStepForward } from 'react-icons/ai'
import { BsSquareHalf } from 'react-icons/bs'
import { FaSquareFull } from 'react-icons/fa'

function DiagnosticControlPanel({ invadersWebWorker }) {

    useEffect( () => {
        FocusStyleManager.onlyShowFocusOnTabs();
      },[]);

  return (
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
  )
}

export default DiagnosticControlPanel
