import './App.css';
import { useEffect, useState } from 'react';
import Screen from './front-end/Screen'

function App() {
  const [invadersWebWorker] = useState(new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url)));

  useEffect( () => {
    invadersWebWorker.onmessage = onMessage;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invadersWebWorker]);

  /* This is a bit of a hack, but allows us to update a child's state without
  updating our own and, therefore, re-drawining everything */
  let updateChildVRAMState = null;
  const connectStateToParent = (f) => {
    updateChildVRAMState = f;
  }

  const onMessage = (msg) => {
    switch(msg.data.Type) {
      case 'DRAW-SCREEN':
        updateChildVRAMState(msg.data.VRAM);
        break;
      case 'PONG!':
        console.log('Ping working!');
        break;
      default:
        return;
    }
  }
  
  return (
    <div className="App">
      <Screen connectStateToParent={connectStateToParent}/>
      <div>
        <button type ='button' onClick={() => invadersWebWorker.postMessage({Type: 'RUN'})}>GO</button>
        <button type ='button' onClick={() => invadersWebWorker.postMessage({Type: 'STOP'})}>STOP</button>
      </div>
    </div>
  );
}

export default App;
