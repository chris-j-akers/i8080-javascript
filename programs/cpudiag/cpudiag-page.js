import { CpuDiag } from './cpudiag.js';

const registerTableElem = {
    decA: document.getElementById('tdARegDecElem'),
    hexA: document.getElementById('tdARegHexElem'),
    binA: document.getElementById('tdARegBinElem'),
    decB: document.getElementById('tdBRegDecElem'),
    hexB: document.getElementById('tdBRegHexElem'),
    binB: document.getElementById('tdBRegBinElem'),
    decC: document.getElementById('tdCRegDecElem'),
    hexC: document.getElementById('tdCRegHexElem'),
    binC: document.getElementById('tdCRegBinElem'),
    decD: document.getElementById('tdDRegDecElem'),
    hexD: document.getElementById('tdDRegHexElem'),
    binD: document.getElementById('tdDRegBinElem'),
    decE: document.getElementById('tdERegDecElem'),
    hexE: document.getElementById('tdERegHexElem'),
    binE: document.getElementById('tdERegBinElem'),
    decH: document.getElementById('tdHRegDecElem'),
    hexH: document.getElementById('tdHRegHexElem'),
    binH: document.getElementById('tdHRegBinElem'),
    decL: document.getElementById('tdLRegDecElem'),
    hexL: document.getElementById('tdLRegHexElem'),
    binL: document.getElementById('tdLRegBinElem'),
}

function updateRegisterFields(registers) {
    registerTableElem.decA.textContent = `${registers.A.toString().padStart(3,'0')}`
    registerTableElem.hexA.textContent  = `0x${registers.A.toString(16).padStart(2,'0')}`
    registerTableElem.binA.textContent  = `${registers.A.toString(2).padStart(8,'0')}`

    registerTableElem.decB.textContent  = `${registers.B.toString().padStart(3,'0')}`
    registerTableElem.hexB.textContent  = `0x${registers.B.toString(16).padStart(2,'0')}`
    registerTableElem.binB.textContent  = `${registers.B.toString(2).padStart(8,'0')}`

    registerTableElem.decC.textContent  = `${registers.C.toString().padStart(3,'0')}`
    registerTableElem.hexC.textContent  = `0x${registers.C.toString(16).padStart(2,'0')}`
    registerTableElem.binC.textContent  = `${registers.C.toString(2).padStart(8,'0')}`

    registerTableElem.decD.textContent  = `${registers.D.toString().padStart(3,'0')}`
    registerTableElem.hexD.textContent  = `0x${registers.D.toString(16).padStart(2,'0')}`
    registerTableElem.binD.textContent  = `${registers.D.toString(2).padStart(8,'0')}`

    registerTableElem.decE.textContent  = `${registers.E.toString().padStart(3,'0')}`
    registerTableElem.hexE.textContent  = `0x${registers.E.toString(16).padStart(2,'0')}`
    registerTableElem.binE.textContent  = `${registers.E.toString(2).padStart(8,'0')}`

    registerTableElem.decH.textContent  = `${registers.H.toString().padStart(3,'0')}`
    registerTableElem.hexH.textContent  = `0x${registers.H.toString(16).padStart(2,'0')}`
    registerTableElem.binH.textContent  = `${registers.H.toString(2).padStart(8,'0')}`

    registerTableElem.decL.textContent  = `${registers.L.toString().padStart(3,'0')}`
    registerTableElem.hexL.textContent  = `0x${registers.L.toString(16).padStart(2,'0')}`
    registerTableElem.binL.textContent  = `${registers.L.toString(2).padStart(8,'0')}`
}

const flagsTableElem = {
    Carry: document.getElementById('tdCarryFlagVal'),
    Parity: document.getElementById('tdParityFlagVal'),
    AuxCarry: document.getElementById('tdAuxCarryFlagVal'),
    Zero: document.getElementById('tdZeroFlagVal'),
    Sign: document.getElementById('tdSignFlagVal'),
}

function updateFlagsFields(flags) {
    flagsTableElem.Carry.textContent = flags.Carry ? '0x01' : '0x00';
    flagsTableElem.Parity.textContent = flags.Parity ? '0x01' : '0x00';
    flagsTableElem.AuxCarry.textContent = flags.AuxillaryCarry ? '0x01' : '0x00';
    flagsTableElem.Zero.textContent = flags.Zero ? '0x01' : '0x00';
    flagsTableElem.Sign.textContent = flags.Sign ? '0x01' : '0x00';
}

const fieldsTableElem = {
    decProgramCounter: document.getElementById('tdProgramCounterDec'),
    hexProgramCounter: document.getElementById('tdProgramCounterHex'),
    binProgramCounter: document.getElementById('tdProgramCounterBin'),
    decStackPointer: document.getElementById('tdStackPointerDec'),
    hexStackPointer: document.getElementById('tdStackPointerHex'),
    binStackPointer: document.getElementById('tdStackPointerBin'),
    decClock: document.getElementById('tdClockDec'),
    hexClock: document.getElementById('tdClockHex'),
    binClock: document.getElementById('tdClockBin'),
    decTicks: document.getElementById('tdTicksDec'),
}

function updateFields(lastOperationTicks, cpuState) {
    fieldsTableElem.decProgramCounter.textContent = `${cpuState.ProgramCounter.toString().padStart(5, '0')}`;
    fieldsTableElem.hexProgramCounter.textContent = `0x${cpuState.ProgramCounter.toString(16).padStart(4, '0')}`;
    fieldsTableElem.binProgramCounter.textContent = `${cpuState.ProgramCounter.toString(2).padStart(16, '0')}`;

    fieldsTableElem.decStackPointer.textContent = `${cpuState.StackPointer.toString().padStart(5, '0')}`;
    fieldsTableElem.hexStackPointer.textContent = `0x${cpuState.StackPointer.toString(16).padStart(4, '0')}`;
    fieldsTableElem.binStackPointer.textContent = `${cpuState.StackPointer.toString(2).padStart(16, '0')}`;

    fieldsTableElem.decClock.textContent = `${cpuState.Clock.toString().padStart(5, '0')}`;
    fieldsTableElem.hexClock.textContent = `0x${cpuState.Clock.toString(16).padStart(4, '0')}`;
    fieldsTableElem.binClock.textContent = `${cpuState.Clock.toString(2).padStart(16, '0')}`;

    fieldsTableElem.decTicks.textContent = `${lastOperationTicks.toString().padStart(2,'0')}`;
}

const buttons = {
    btnExecuteNext: document.getElementById('btnExecuteNext').addEventListener( 'click', () => {
        const addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
        const state = cpuDiagCabinet.ExecuteNextInstruction();

        outputs.divTracePanel.textContent += `0x${addr.toString(16)}\t${state.LastInstructionDisassembly}`;
        outputs.divTracePanel.textContent += '\n';
    
        if (typeof state.ConsoleOut != 'undefined') {
            outputs.divConsolePanel.textContent += `${e.data.ConsoleOut}\n`;
        }
        
        updateRegisterFields(cpuDiagCabinet.Computer.CPUState.Registers);
        updateFlagsFields(cpuDiagCabinet.Computer.CPUState.Flags);
        updateFields(state.LastInstructionTicks, cpuDiagCabinet.Computer.CPUState);

    }),
    btnRunAll: document.getElementById('btnRunAll').addEventListener( 'click', () => {
        outputs.divTracePanel.textContent = '';
        outputs.divConsolePanel.textContent = '';
        const worker = new Worker('cpudiag-worker.js', {type: 'module'});
        worker.onmessage = OnInstructionComplete;
    }),
    btnRunToBreakPoint: document.getElementById('btnRunToBreakPoint').addEventListener('click', () => {
        let addr;
        while(cpuDiagCabinet.Computer.CPUState.Halt == false & cpuDiagCabinet.Computer.CPUState.ProgramCounter != inputs.txtBreakpoint.value) {
            addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
            const state = cpuDiagCabinet.ExecuteNextInstruction();
            outputs.divTracePanel.textContent += `0x${addr.toString(16)}\t${state.LastInstructionDisassembly}`;
            outputs.divTracePanel.textContent += '\n';
        
            if (typeof state.ConsoleOut != 'undefined') {
                outputs.divConsolePanel.textContent += `${state.ConsoleOut}\n`;
            }

            updateRegisterFields(cpuDiagCabinet.Computer.CPUState.Registers);
            updateFlagsFields(cpuDiagCabinet.Computer.CPUState.Flags);
            updateFields(state.LastInstructionTicks, cpuDiagCabinet.Computer.CPUState);
        }
    }),
    btnReset: document.getElementById('btnReset').addEventListener( 'click', () => {
        reset();
    }),
    btnRunAllUnclocked: document.getElementById('btnRunAllUnclocked').addEventListener( 'click', () => {
        let addr;
        while(cpuDiagCabinet.Computer.CPUState.Halt == false) {
            addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
            const state = cpuDiagCabinet.ExecuteNextInstruction();
            outputs.divTracePanel.textContent += `0x${addr.toString(16)}\t${state.LastInstructionDisassembly}`;
            outputs.divTracePanel.textContent += '\n';
        
            if (typeof state.ConsoleOut != 'undefined') {
                outputs.divConsolePanel.textContent += `${state.ConsoleOut}\n`;
            }

            updateRegisterFields(cpuDiagCabinet.Computer.CPUState.Registers);
            updateFlagsFields(cpuDiagCabinet.Computer.CPUState.Flags);
            updateFields(state.LastInstructionTicks, cpuDiagCabinet.Computer.CPUState);
        }
    })
}

const inputs = {
    txtBreakpoint: document.getElementById('txtBreakpoint'),
}

const outputs = {
    divTracePanel: document.getElementById('tracePanel'),
    divConsolePanel: document.getElementById('consolePanel'),
}

function OnInstructionComplete(e) {
    outputs.divTracePanel.textContent += `0x${e.data.LastInstructionAddress.toString(16)}\t${e.data.LastInstructionDisassembly}`;
    outputs.divTracePanel.textContent += '\n';

    if (typeof e.data.ConsoleOut != 'undefined') {
        outputs.divConsolePanel.textContent += `${e.data.ConsoleOut}\n`;
    }

    updateRegisterFields(e.data.CPUState.Registers);
    updateFlagsFields(e.data.CPUState.Flags);
    updateFields(e.data.LastInstructionTicks, e.data.CPUState);
}

function reset() {
    outputs.divTracePanel.textContent = '';
    outputs.divConsolePanel.textContent = '';
    const bytesLoaded = cpuDiagCabinet.Initialise();
    outputs.divConsolePanel.textContent += `LOADED ${bytesLoaded} BYTES STARTING AT ADDRESS 0x${cpuDiagCabinet._startAddr.toString(16)}`; 
}

// We want this available to everyone!
const cpuDiagCabinet = new CpuDiag(0x100); 
reset();
