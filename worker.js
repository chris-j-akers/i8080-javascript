import { CpuDiag } from './src/cpudiag.js';

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
}, 300);



