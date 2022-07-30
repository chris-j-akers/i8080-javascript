import './App.css';
import { useEffect, useState } from 'react';
import Cabinet from './front-end/Cabinet'
import ControlPanel from './front-end/ControlPanel';
import RegisterTable from './front-end/RegisterTable';

function App() {
  const [invadersWebWorker] = useState(new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url)));
  const [cpuState, updateCpuState] = useState({});

  /*
    POSSIBLE PROGRAM STATES:
      RUNNING
      PAUSED
      RESET
  */
  const [programState, updateProgramState] = useState('STOPPED');

  useEffect( () => {
    switch(programState) {
      case 'RESET':
        updateCpuState({});
        break;
      default:
        break;
    }
  },[programState]);

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
        updateCpuState(msg.data.CPUState);
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
      <Cabinet connectScreenToVRAMState={connectScreenToVRAMState} programState={programState}/>
      <ControlPanel invadersWebWorker={invadersWebWorker} programState={programState} updateProgramState={updateProgramState}/>
      <RegisterTable registers={cpuState.CPUState?.Registers} programState={programState} />
    </div>
  );
}

export default App;
