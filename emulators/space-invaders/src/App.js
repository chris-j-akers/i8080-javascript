import './App.css';
import { useEffect, useState } from 'react';
import Cabinet from './front-end/Cabinet'
import ControlPanel from './front-end/ControlPanel';
import RegisterTable from './front-end/RegisterTable';
import InternalsTable from './front-end/InternalsTable'
import FlagsTable from './front-end/FlagsTable'

function App() {
  const [invadersWebWorker] = useState(new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url)));
  const [programState, updateProgramState] = useState();

  /*
    POSSIBLE PROGRAM STATES:
      RUNNING
      PAUSED
      RESET
  */
  const [programStatus, updateProgramStatus] = useState('STOPPED');

  useEffect( () => {
    switch(programStatus) {
      case 'RESET':
        updateProgramState();
        break;
      default:
        break;
    }
  },[programStatus]);

  useEffect( () => {
    invadersWebWorker.onmessage = onMessage;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invadersWebWorker]);

  const onMessage = (msg) => {
    switch(msg.data.Type) {
      case 'DRAW-SCREEN':
        updateVRAMState(msg.data.VRAM);
        break;
      case 'CPU-STATE-UPDATE':
        updateProgramState(msg.data.CPUState);
        break;
      case 'TRACE':
        break;
      case 'PONG!':
        console.log('Ping working!');
        break;
      default:
        console.log('Invalid message recieved from Worker');
        return;
    }
  }

  /* This is a bit of a hack, but allows us to update a child's state without
  updating our own and, therefore, re-drawining everything */
  let updateVRAMState = null;
  const connectScreenToVRAMState=(f) => {
    updateVRAMState = f;
  }
 
  return (
    <div className="App">
      <Cabinet connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
      <ControlPanel invadersWebWorker={invadersWebWorker} programStatus={programStatus} updateProgramStatus={updateProgramStatus}/>
      <RegisterTable programState={programState} programStatus={programStatus} />
      <InternalsTable programState={programState} programStatus={programStatus}/>
      <FlagsTable programStatus={programStatus} programState={programState} />
    </div>
  );
}

export default App;
