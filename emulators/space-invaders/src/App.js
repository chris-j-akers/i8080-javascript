import './App.css';
import { useEffect, useState } from 'react';
import Cabinet from './front-end/CabinetWindow'
import DiagnosticsWindow from './front-end/DiagnosticsWindow';

// V8 javascript OOM: (MemoryChunk allocation failed during deserialization.).

function App({ invadersWebWorker }) {
  // const [invadersWebWorker] = useState(new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url)));
  const [programState, updateProgramState] = useState();
  const [trace, updateTrace] = useState([]);

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
        updateTrace('');
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
      case 'PROGRAM-STATE-UPDATE':
        updateProgramState(msg.data.ProgramState);
        break;
      case 'TRACE':
        updateTrace(msg.data.Trace);
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
        <DiagnosticsWindow invadersWebWorker={invadersWebWorker} programState={programState} programStatus={programStatus} trace={trace}/>
        <Cabinet connectScreenToVRAMState={connectScreenToVRAMState} invadersWebWorker={invadersWebWorker} programState={programState} programStatus={programStatus} updateProgramStatus={updateProgramStatus} updateTrace={updateTrace}/>
      </div>
  );
}

export default App;
