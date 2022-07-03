const registerTableElem = {
    // Register A
    decA: document.getElementById('tdARegDecElem'),
    hexA: document.getElementById('tdARegHexElem'),
    binA: document.getElementById('tdARegBinElem'),
    // Register B
    decB: document.getElementById('tdBRegDecElem'),
    hexB: document.getElementById('tdBRegHexElem'),
    binB: document.getElementById('tdBRegBinElem'),
    // Register C
    decC: document.getElementById('tdCRegDecElem'),
    hexC: document.getElementById('tdCRegHexElem'),
    binC: document.getElementById('tdCRegBinElem'),
    // Register D
    decD: document.getElementById('tdDRegDecElem'),
    hexD: document.getElementById('tdDRegHexElem'),
    binD: document.getElementById('tdDRegBinElem'),
    // Register E
    decE: document.getElementById('tdERegDecElem'),
    hexE: document.getElementById('tdERegHexElem'),
    binE: document.getElementById('tdERegBinElem'),
    // Register H
    decH: document.getElementById('tdHRegDecElem'),
    hexH: document.getElementById('tdHRegHexElem'),
    binH: document.getElementById('tdHRegBinElem'),
    // Register L
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

function resetRegisterFields() {
    // Register A
    registerTableElem.decA.textContent = '000'
    registerTableElem.hexA.textContent  = '0x00'
    registerTableElem.binA.textContent  = '00000000'
    // Register B
    registerTableElem.decB.textContent = '000'
    registerTableElem.hexB.textContent  = '0x00'
    registerTableElem.binB.textContent  = '00000000'
    // Register C
    registerTableElem.decC.textContent = '000'
    registerTableElem.hexC.textContent  = '0x00'
    registerTableElem.binC.textContent  = '00000000'
    // Register D
    registerTableElem.decD.textContent = '000'
    registerTableElem.hexD.textContent  = '0x00'
    registerTableElem.binD.textContent  = '00000000'
    // Register E
    registerTableElem.decE.textContent = '000'
    registerTableElem.hexE.textContent  = '0x00'
    registerTableElem.binE.textContent  = '00000000'
    // Register H
    registerTableElem.decH.textContent = '000'
    registerTableElem.hexH.textContent  = '0x00'
    registerTableElem.binH.textContent  = '00000000'
    // Register L
    registerTableElem.decL.textContent = '000'
    registerTableElem.hexL.textContent  = '0x00'
    registerTableElem.binL.textContent  = '00000000'
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

function resetFlagsFields() {
    flagsTableElem.Carry.textContent = '0x00';
    flagsTableElem.Parity.textContent = '0x00';
    flagsTableElem.AuxCarry.textContent = '0x00';
    flagsTableElem.Zero.textContent = '0x00';
    flagsTableElem.Sign.textContent = '0x00';
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

function resetFields() {
    // Program Counter
    fieldsTableElem.decProgramCounter.textContent = '00000';
    fieldsTableElem.hexProgramCounter.textContent = '0x0000';
    fieldsTableElem.binProgramCounter.textContent = '0000000000000000';
    // Stack Pointer
    fieldsTableElem.decStackPointer.textContent = '00000';
    fieldsTableElem.hexStackPointer.textContent = '0x0000';
    fieldsTableElem.binStackPointer.textContent = '0000000000000000';
    // Clock
    fieldsTableElem.decClock.textContent = '00000';
    fieldsTableElem.hexClock.textContent = '0x0000';
    fieldsTableElem.binClock.textContent = '0000000000000000';
    // Clock Cycles of Last Operation
    fieldsTableElem.decTicks.textContent = '00';
}

const ramTableElem = {
    bytesUsed: document.getElementById('tdBytesUsed'),
    ramTotal: document.getElementById('tdRAMTotal'),
}

function updateRAMFields(bytesUsed, ramTotal) {
    ramTableElem.bytesUsed.textContent = bytesUsed;
    ramTableElem.ramTotal.textContent = ramTotal;
}

function resetRAMFields() {
    ramTableElem.bytesUsed.textContent = '00000';
    ramTableElem.ramTotal.textContent = '00000';
}

function resetAllFields() {
    resetFields();
    resetFlagsFields();
    resetRegisterFields();
    resetRAMFields();
}

function refreshUI(msgData) {
    if (typeof msgData.ConsoleOut != 'undefined') {
        outputElems.divConsolePanel.textContent += `${msgData.ConsoleOut}\n`;
    }
    updateRegisterFields(msgData.CPUState.Registers);
    updateFlagsFields(msgData.CPUState.Flags);
    updateFields(msgData.LastInstructionTicks, msgData.CPUState);
    if (typeof msgData.RAMBytesUsed != 'undefined') {
        updateRAMFields(msgData.RAMBytesUsed, msgData.RAMTotal);
    }
}

const buttonElems = {
    btnExecuteNext: document.getElementById('btnExecuteNext').addEventListener( 'click', () => {
        _invadersWorker.postMessage({Type: 'step-single-instruction'});
    }),
    btnRunAll: document.getElementById('btnRunAll').addEventListener( 'click', () => {
        const clockSpeed = inputElems.txtClockSpeed.value;
        _invadersWorker.postMessage({Type: 'run-all-clocked', ClockSpeed: clockSpeed});
    }),
    btnRunToBreakPoint: document.getElementById('btnRunToBreakPoint').addEventListener('click', () => {
        const breakPointAddr = inputElems.txtBreakpoint.value;
        _invadersWorker.postMessage({Type: 'run-to-breakpoint', BreakpointAddress: breakPointAddr})
    }),
    btnReset: document.getElementById('btnReset').addEventListener( 'click', () => {
        _invadersWorker.terminate();
        _invadersWorker = new Worker('invaders-worker.js', { type: "module" });
        _invadersWorker.onmessage = onMessage;
        _invadersWorker.postMessage({Type: 'reset'});

    }),
    btnRunAllUnclocked: document.getElementById('btnRunAllUnclocked').addEventListener( 'click', () => {
        _invadersWorker.postMessage({Type: 'run-all-unclocked'});
    }),
    btnStop: document.getElementById('btnStop').addEventListener( 'click', () => {
        _invadersWorker.postMessage({Type: 'stop'});
    })
}

const inputElems = {
    txtBreakpoint: document.getElementById('txtBreakpoint'),
    txtClockSpeed: document.getElementById('txtClockSpeed'),
}

const outputElems = {
    divTracePanel: document.getElementById('tracePanel'),
    divConsolePanel: document.getElementById('consolePanel'),
    divRAMPanel: document.getElementById('ramPanel'),
}

outputElems.divConsolePanel.textContent = '';
outputElems.divTracePanel.textContent = '';
outputElems.divRAMPanel.textContent = '';
inputElems.txtClockSpeed.value = 30;

// We use a web-worker to control the emulator because it allows us to
// artifically slow down the clock speed without locking up the browser by using
// the setInterval() call. It also decouples the UI code from the actual
// emulator.
let _invadersWorker = new Worker('invaders-worker.js', { type: "module" });
_invadersWorker.onmessage = onMessage;

/**
 * Event Listener for messages posted by the web worker.
 * 
 * @param {Event} e Data passed from the Web Worker
 */
function onMessage(e) {
    const msgData = e.data;
    switch(msgData.Type) {
        case 'get-ram-dump-complete':
            outputElems.divRAMPanel.textContent = '';
            outputElems.divRAMPanel.textContent += msgData.MemoryMap;
            return;
        case 'reset-complete':
            outputElems.divConsolePanel.textContent = '';
            outputElems.divTracePanel.textContent = '';
            outputElems.divRAMPanel.textContent = '';
            resetAllFields();
            _invadersWorker.postMessage({Type: 'get-ram-dump'});
            return;
        case 'program-load-complete':
            outputElems.divConsolePanel.textContent += msgData.ConsoleOut;
            return;
        case 'run-all-unclocked-complete':
        case 'run-to-breakpoint-complete':
            outputElems.divTracePanel.textContent += msgData.Trace;
            break;
        case 'run-all-clocked-complete':
        case 'step-single-instruction-complete':
            outputElems.divTracePanel.textContent += `0x${msgData.LastInstructionAddress.toString(16).padStart(4,'0')}\t${msgData.LastInstructionDisassembly}\n`;
            outputElems.divTracePanel.scrollTop = outputElems.divTracePanel.scrollHeight;
            break;
        }
        refreshUI(msgData);
}

