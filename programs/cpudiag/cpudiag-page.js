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
    // Register A
    registerTableElem.decA.textContent = `${registers.A.toString().padStart(3,'0')}`
    registerTableElem.hexA.textContent  = `0x${registers.A.toString(16).padStart(2,'0')}`
    registerTableElem.binA.textContent  = `${registers.A.toString(2).padStart(8,'0')}`
    // Register B
    registerTableElem.decB.textContent  = `${registers.B.toString().padStart(3,'0')}`
    registerTableElem.hexB.textContent  = `0x${registers.B.toString(16).padStart(2,'0')}`
    registerTableElem.binB.textContent  = `${registers.B.toString(2).padStart(8,'0')}`
    // Register C
    registerTableElem.decC.textContent  = `${registers.C.toString().padStart(3,'0')}`
    registerTableElem.hexC.textContent  = `0x${registers.C.toString(16).padStart(2,'0')}`
    registerTableElem.binC.textContent  = `${registers.C.toString(2).padStart(8,'0')}`
    // Register D
    registerTableElem.decD.textContent  = `${registers.D.toString().padStart(3,'0')}`
    registerTableElem.hexD.textContent  = `0x${registers.D.toString(16).padStart(2,'0')}`
    registerTableElem.binD.textContent  = `${registers.D.toString(2).padStart(8,'0')}`
    // Register E
    registerTableElem.decE.textContent  = `${registers.E.toString().padStart(3,'0')}`
    registerTableElem.hexE.textContent  = `0x${registers.E.toString(16).padStart(2,'0')}`
    registerTableElem.binE.textContent  = `${registers.E.toString(2).padStart(8,'0')}`
    // Register H
    registerTableElem.decH.textContent  = `${registers.H.toString().padStart(3,'0')}`
    registerTableElem.hexH.textContent  = `0x${registers.H.toString(16).padStart(2,'0')}`
    registerTableElem.binH.textContent  = `${registers.H.toString(2).padStart(8,'0')}`
    // Register L
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
    // Program Counter
    fieldsTableElem.decProgramCounter.textContent = `${cpuState.ProgramCounter.toString().padStart(5, '0')}`;
    fieldsTableElem.hexProgramCounter.textContent = `0x${cpuState.ProgramCounter.toString(16).padStart(4, '0')}`;
    fieldsTableElem.binProgramCounter.textContent = `${cpuState.ProgramCounter.toString(2).padStart(16, '0')}`;
    // Stack Pointer
    fieldsTableElem.decStackPointer.textContent = `${cpuState.StackPointer.toString().padStart(5, '0')}`;
    fieldsTableElem.hexStackPointer.textContent = `0x${cpuState.StackPointer.toString(16).padStart(4, '0')}`;
    fieldsTableElem.binStackPointer.textContent = `${cpuState.StackPointer.toString(2).padStart(16, '0')}`;
    // Clock
    fieldsTableElem.decClock.textContent = `${cpuState.Clock.toString().padStart(5, '0')}`;
    fieldsTableElem.hexClock.textContent = `0x${cpuState.Clock.toString(16).padStart(4, '0')}`;
    fieldsTableElem.binClock.textContent = `${cpuState.Clock.toString(2).padStart(16, '0')}`;
    // Clock Cycles of Last Operation
    fieldsTableElem.decTicks.textContent = `${lastOperationTicks.toString().padStart(2,'0')}`;
}

const buttons = {
    btnExecuteNext: document.getElementById('btnExecuteNext').addEventListener( 'click', () => {
        _cpuDiagWebWorker.postMessage({Type: 'EXECUTE_NEXT'});
    }),
    btnRunAll: document.getElementById('btnRunAll').addEventListener( 'click', () => {
        const clockSpeed = inputs.txtClockSpeed.value;
        _cpuDiagWebWorker.postMessage({Type: 'EXECUTE_ALL_CLOCKED', ClockSpeed: clockSpeed});
    }),
    btnRunToBreakPoint: document.getElementById('btnRunToBreakPoint').addEventListener('click', () => {
        const breakPointAddr = inputs.txtBreakpoint.value;
        _cpuDiagWebWorker.postMessage({Type: 'RUN_TO_BREAKPOINT', BreakpointAddress: breakPointAddr})
    }),
    btnReset: document.getElementById('btnReset').addEventListener( 'click', () => {
        _cpuDiagWebWorker.postMessage({Type: 'RESET'});
    }),
    btnRunAllUnclocked: document.getElementById('btnRunAllUnclocked').addEventListener( 'click', () => {
        _cpuDiagWebWorker.postMessage({Type: 'EXECUTE_ALL_UNCLOCKED'});
    })
}

const inputs = {
    txtBreakpoint: document.getElementById('txtBreakpoint'),
    txtClockSpeed: document.getElementById('txtClockSpeed'),
}

const outputs = {
    divTracePanel: document.getElementById('tracePanel'),
    divConsolePanel: document.getElementById('consolePanel'),
}

outputs.divConsolePanel.textContent = '';
outputs.divTracePanel.textContent = '';
inputs.txtClockSpeed.value = 30;

// We use a web-worker to control the computer we're emulating because it allows
// us to artifically slow down the clock speed without locking up the browser by
// using the setInterval() call. It also keeps the UI separate from the actual
// emulator.

const _cpuDiagWebWorker = new Worker('cpudiag-worker.js', { type: "module" });
_cpuDiagWebWorker.onmessage = onMessage;

function onMessage(e) {
    const msg = e.data;
    switch(msg.Type) {
        case 'RESET_ACK':
            outputs.divConsolePanel.textContent = '';
            outputs.divTracePanel.textContent = '';
            outputs.divConsolePanel.textContent += msg.ConsoleOut;
            break;
        case 'EXECUTE_ALL_UNCLOCKED_ACK':
        case 'EXECUTE_ALL_CLOCKED_ACK':
        case 'EXECUTE_NEXT_ACK':
            outputs.divTracePanel.textContent += `0x${msg.LastInstructionAddress.toString(16)}\t${msg.LastInstructionDisassembly}\n`;
            if (typeof msg.ConsoleOut != 'undefined') {
                outputs.divConsolePanel.textContent += `${msg.ConsoleOut}\n`;
            }
            updateRegisterFields(msg.CPUState.Registers);
            updateFlagsFields(msg.CPUState.Flags);
            updateFields(msg.LastInstructionTicks, msg.CPUState);
            break;
        }

    }

