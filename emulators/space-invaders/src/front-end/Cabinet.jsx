import React from 'react'
import Logo from './cabinet-components/Logo';
import Screen from './cabinet-components/Screen';

/* This component may seem a bit convolouted. It breaks a number of React's
  rules.

  The problem is that we need to animate the canvas and that means updating it
  many times per second based on data sent from our Worker process which
  is controlled by the top-level App component.*/

function Cabinet({ connectScreenToVRAMState, programStatus  }) {
  
  return (
      <div className='cabinet-container'>
          <Logo />
          <Screen connectScreenToVRAMState={connectScreenToVRAMState} programStatus={programStatus}/>
      </div>
  )}


export default Cabinet;
