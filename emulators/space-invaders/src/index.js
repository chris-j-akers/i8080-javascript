import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
const invadersWebWorker = new Worker(new URL('./web-workers/invaders-web-worker.js', import.meta.url))
root.render(
  <React.StrictMode>
    <App invadersWebWorker={invadersWebWorker}/>
  </React.StrictMode>

);

