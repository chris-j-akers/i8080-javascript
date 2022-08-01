import { useEffect } from "react";
import { Button, ButtonGroup, Callout } from "@blueprintjs/core";
import { AiFillPauseCircle } from 'react-icons/ai'
import { GiAlienBug } from 'react-icons/gi'
import { GrPowerReset } from 'react-icons/gr'
import { FocusStyleManager } from "@blueprintjs/core";

function CabinetControlPanel({ invadersWebWorker, programStatus, updateProgramStatus, running, updateRunning}) {
    
  useEffect( () => {
    FocusStyleManager.onlyShowFocusOnTabs();
  },[]);

  return (
    <>
    <div className='diag-running-callout shadow'>
      <Callout title={running ? 'RUNNING' : 'STOPPED'} intent={running ? 'Success' : 'Danger'}></Callout>
    </div>
    <div className='control-panel-container shadow'>
      <div className='control-panel-game-controls'>
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
    </div>
    </>
  )
}

export default CabinetControlPanel
