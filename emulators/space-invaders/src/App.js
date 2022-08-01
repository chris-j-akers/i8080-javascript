import './App.css';
import { useEffect, useState } from 'react';
import RegisterTable from './front-end/diagnostic-components/RegisterTable';
import FlagsTable from './front-end/diagnostic-components/FlagsTable';
import InternalsTable from './front-end/diagnostic-components/InternalsTable';
import TraceWindow from './front-end/TraceWindow';
import Screen from './front-end/cabinet-components/Screen';
import Logo from './front-end/cabinet-components/Logo';
import ControlPanel from './front-end/ControlPanel'
import Header from './front-end/Header';

// V8 javascript OOM: (MemoryChunk allocation failed during deserialization.).

function App({ invadersWebWorker }) {
  // const [invadersWebWorker] = useState(new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url)));
  const [programState, updateProgramState] = useState();
  const [trace, updateTrace] = useState([]);
  const [traceDisabled, toggleTraceDisabled] = useState(false);

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
  updating our own and, therefore, re-drawining everything - required when the
  child is the Screen and will require redrawing multiple times a second!*/
  let updateVRAMState = null;
  const connectScreenToVRAMState=(f) => {
    updateVRAMState = f;
  }
 
  return (
    <div id='root-container'>
      <div id='app-container'>
        <div id='header-container'>
          <Header />
        </div>
        <div id='body-container'>
          <div id='state-table-container'>
            <InternalsTable programStatus={programStatus} programState={programState} />
            <RegisterTable programStatus={programStatus} programState={programState} />
            <FlagsTable programStatus={programStatus} programState={programState} />
          </div>
          <div id='trace-container'>
            <TraceWindow trace={trace} traceDisabled={traceDisabled} />
          </div>
          <div id='game-cabinet-container'>
            <Logo />
            <Screen connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
          </div>
          <div id='control-panel-container'>
            <ControlPanel invadersWebWorker={invadersWebWorker} 
                          traceDisabled={traceDisabled}
                          toggleTraceDisabled={toggleTraceDisabled}
                          programStatus={programStatus}
                          updateProgramStatus={updateProgramStatus} />
          </div>
        </div>
        <div id='footer-container'>
          FOOTER!
        </div>
      </div>
    </div>

    // <>
    // <div />
    //   <div className="App app-container shadow">
    //     <DiagnosticsWindow invadersWebWorker={invadersWebWorker} 
    //                         programState={programState} 
    //                         programStatus={programStatus} 
    //                         traceDisabled={traceDisabled} 
    //                         trace={trace} />
    //     <CabinetWindow connectScreenToVRAMState={connectScreenToVRAMState} 
    //                     invadersWebWorker={invadersWebWorker} 
    //                     programState={programState} 
    //                     programStatus={programStatus} 
    //                     updateProgramStatus={updateProgramStatus} 
    //                     toggleTraceDisabled={toggleTraceDisabled} 
    //                     traceDisabled={traceDisabled} 
    //                     updateTrace={updateTrace}/>
    //   </div>
    // <div />
    // </>
  );
}

export default App;
