import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const invadersWebWorker = new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url))

/* Controls for the game */
window.addEventListener('keydown', (e) => {
  switch(e.key) {
      case 'Shift':
          invadersWebWorker.postMessage({Type: 'COIN' });
          break;
      case 'Control':
          invadersWebWorker.postMessage({Type: 'P1-FIRE-DOWN'});
          break;
      case 'ArrowLeft':
          invadersWebWorker.postMessage({Type: 'P1-LEFT-DOWN'});
          break;
      case 'ArrowRight':
          invadersWebWorker.postMessage({Type: 'P1-RIGHT-DOWN'});
          break;
      case '1':
          invadersWebWorker.postMessage({Type: 'P1-START-DOWN'});
          break;
      case '2':
          invadersWebWorker.postMessage({Type: 'P2-START-DOWN'});
  }
});

window.addEventListener('keyup', (e) => {
  switch(e.key) {
      case 'Control':
          invadersWebWorker.postMessage({Type: 'P1-FIRE-UP'});
          break;
      case 'ArrowLeft':
         invadersWebWorker.postMessage({Type: 'P1-LEFT-UP'});
          break;
      case 'ArrowRight':
          invadersWebWorker.postMessage({Type: 'P1-RIGHT-UP'});
          break;
      case '1':
          invadersWebWorker.postMessage({Type: 'P1-START-UP'});
          break; 
      case '2':
          invadersWebWorker.postMessage({Type: 'P2-START-UP'});
          break;
  }
});

root.render(
  <React.StrictMode>
    <App invadersWebWorker={invadersWebWorker}/>
  </React.StrictMode>

);

