import { useEffect } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { FocusStyleManager } from "@blueprintjs/core";
import { AiFillStepForward, AiTwotoneCheckSquare } from 'react-icons/ai'
import { CgInsertBefore } from 'react-icons/cg'
import { BsPaintBucket } from 'react-icons/bs'
import { RiCheckboxBlankFill } from 'react-icons/ri'
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
        <Button icon={<BsPaintBucket />}>
          Paint Screen Request
        </Button>
        <Button icon={<FaSquareFull/>}>
            VBlank Interrupt
        </Button>
        <Button icon={<BsSquareHalf/>}>
            Half-VBlank Interrupt
        </Button>
      </ButtonGroup>
    </div>
  )
}

export default DiagnosticControlPanel
