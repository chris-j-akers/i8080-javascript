import { useEffect } from "react";
import { Button, ButtonGroup } from "@blueprintjs/core";
import { AiFillPauseCircle } from 'react-icons/ai'
import { GiAlienBug } from 'react-icons/gi'
import { GrPowerReset } from 'react-icons/gr'
import { FocusStyleManager } from "@blueprintjs/core";

function ControlPanel({ invadersWebWorker, programStatus, updateProgramStatus}) {
    
  useEffect( () => {
    FocusStyleManager.onlyShowFocusOnTabs();
  },[]);

  return (
    <div className='control-panel-container'>
      <div className='control-panel-game-controls'>
          <ButtonGroup vertical={true} alignText='left' fill={true}>
              
              <Button type ='button' icon={<GiAlienBug/>} onClick={() => {
                invadersWebWorker.postMessage({Type: 'RUN'});
                updateProgramStatus('RUNNING');
                }}>
              Play Space Invaders
              </Button>

              <Button type ='button' icon={<AiFillPauseCircle />} onClick={() => {
                invadersWebWorker.postMessage({Type: 'STOP'});
                updateProgramStatus('PAUSED');
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
    </div>
  )
}

export default ControlPanel
