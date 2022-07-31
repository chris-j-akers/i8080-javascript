import React from 'react'
import Logo from './cabinet-components/Logo';
import Screen from './cabinet-components/Screen';
import CabinetControlPanel from './cabinet-components/CabinetControlPanel';
import DiagnosticControlPanel from './cabinet-components/DiagnosticControlPanel';

/* This component may seem a bit convolouted. It breaks a number of React's
  rules.

  The problem is that we need to animate the canvas and that means updating it
  many times per second based on data sent from our Worker process which
  is controlled by the top-level App component.*/

function Cabinet({ connectScreenToVRAMState, invadersWebWorker, programState, programStatus, updateProgramStatus, updateTrace  }) {
  return (
      <div className='cabinet-container'>
        <div className='cabinet-screen-container'>
            <Logo />
            <Screen connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
        </div>
        <div className='cabinet-control-panel-container'>
            <CabinetControlPanel invadersWebWorker={invadersWebWorker} programStatus={programStatus} updateProgramStatus={updateProgramStatus} updateTrace={updateTrace}/>
            <DiagnosticControlPanel invadersWebWorker={invadersWebWorker} programStatus={programStatus} programState={programState}/>
        </div>
        <div>
        </div>
    </div>
)}


export default Cabinet;
