import { CpuDiag } from './cpudiag.js';

// The JavaScript Async Model means we can't issue Waits or Sleeps in our
// scripts, so that means we have to fake them. This can be done by calling each
// new instruction using setTimeout(), but the problem is that the browser will
// hang if there are too many calls. Instead, we put the process into a separate
// Web Worker that can run in the background and doesn't interfere with the
// browser's ability to update.

const cpuDiagCabinet = new CpuDiag(0x100); 
cpuDiagCabinet.Initialise();

function ExecuteNextInstruction() {
    const addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
    const state = cpuDiagCabinet.ExecuteNextInstruction();
    
    postMessage({...state, LastInstructionAddress: addr, CPUState: cpuDiagCabinet.Computer.CPUState });
}

setInterval( () => {
    if (cpuDiagCabinet.Computer.CPUState.Halt == true) {
        close();
    }
    ExecuteNextInstruction();
}, 100);
