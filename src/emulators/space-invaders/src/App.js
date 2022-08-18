import './App.css';
import { useEffect, useState } from 'react';
import TraceWindow from './components/TraceWindow';
import ControlPanel from './components/ControlPanel'
import Header from './components/Header';
import CPUStateTables from './components/CPUStateTables';
import GameCabinet from './components/GameCabinet';
import Footer from './components/Footer';
import PortableDeviceControls from './components/PortableDeviceControls';

function App({ invadersWebWorker }) {
  const [programState, updateProgramState] = useState();
  const [trace, updateTrace] = useState([]);
  const [traceDisabled, toggleTraceDisabled] = useState(false);

  /* POSSIBLE PROGRAM STATES: RUNNING, PAUSED, RESET */
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
  child is the Screen and needs redrawing multiple times a second! */
  let updateVRAMState = null;
  const connectScreenToVRAMState=(f) => {
    updateVRAMState = f;
  }

  return (
    <div id='root-container' >
      <div id='app-container'>
          <Header />
          <div id='body-container'>
            <div id='main-container'>
              <CPUStateTables programState={programState} programStatus={programStatus}/>
              <TraceWindow trace={trace} traceDisabled={traceDisabled} />
              <GameCabinet connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
              <ControlPanel invadersWebWorker={invadersWebWorker} 
                            traceDisabled={traceDisabled}
                            toggleTraceDisabled={toggleTraceDisabled}
                            programStatus={programStatus}
                            updateProgramStatus={updateProgramStatus} />
            </div>
            <div id='portable-control-container'>
            <PortableDeviceControls invadersWebWorker={invadersWebWorker}/>
            </div>
          </div>
          <Footer />
      </div>
    </div>
  );
}

export default App;
