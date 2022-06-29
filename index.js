import { CpuDiag } from './src/cpudiag.js';


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
    btnLoadROM: document.getElementById('btnLoadRomElem').addEventListener( 'click', () => {
        const bytesLoaded = cpuDiagCabinet.Initialise();
        outputs.divConsolePanel.textContent += `LOADED ${bytesLoaded} BYTES STARTING AT ADDRESS 0x${cpuDiagCabinet._startAddr.toString(16)}`; 

    }),
    btnExecuteNext: document.getElementById('btnExecuteNext').addEventListener( 'click', () => {
        const addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
        const state = cpuDiagCabinet.ExecuteNextInstruction();
        outputs.divTracePanel.textContent += `0x${addr.toString(16)}\t${state.LastInstructionDisassembly}`;
        outputs.divTracePanel.textContent += '\n';
        //RefreshControls();
    }),
    btnRunAll: document.getElementById('btnRunAll').addEventListener( 'click', () => {
        const worker = new Worker('worker.js', {type: 'module'});
        worker.onmessage = onInstructionComplete;
    }),
    btnRunToBreakPoint: document.getElementById('btnRunToBreakPoint').addEventListener('click', () => {
        while(cpuDiagCabinet.Computer.CPUState.Halt == false & cpuDiagCabinet.Computer.CPUState.ProgramCounter != inputs.txtBreakpoint.value) {
            const state = cpuDiagCabinet.ExecuteNextInstruction();
            outputs.divTracePanel.textContent += state.LastInstructionDisassembly;
            outputs.divTracePanel.textContent += '\n';

            if (typeof state.ConsoleOut != 'undefined') {
                outputs.divConsolePanel.textContent += state.ConsoleOut;
            }
        }
    }),

    btnReset: document.getElementById('btnReset').addEventListener( 'click', () => {
        cpuDiagCabinet.ResetComputer();
        outputs.divConsolePanel.textContent = '';
        outputs.divTracePanel.textContent = '';
    }),

    btnClocked: document.getElementById('btnClocked').addEventListener('click', () => {
        const addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
        const state = cpuDiagCabinet.clocked();
    })
}

const inputs = {
    txtBreakpoint: document.getElementById('txtBreakpoint'),
}

const outputs = {
    divTracePanel: document.getElementById('tracePanel'),
    divConsolePanel: document.getElementById('consolePanel'),
}

const cpuDiagCabinet = new CpuDiag(0x100); 
cpuDiagCabinet.Initialise();
outputs.divTracePanel.textContent = '';
outputs.divConsolePanel.textContent = '';

window.addEventListener('instructionCompleteEvent', (e) => {
    outputs.divTracePanel.textContent += e.detail.LastInstructionDisassembly;
    outputs.divTracePanel.textContent += '\n';
    updateRegisterFields();
    updateFlagsFields();
    updateFields(e.detail.LastInstructionTicks);
});

function onInstructionComplete(e) {
    outputs.divTracePanel.textContent += `0x${e.data.LastInstructionAddress.toString(16)}\t${e.data.LastInstructionDisassembly}`;
    outputs.divTracePanel.textContent += '\n';

    if (typeof e.data.ConsoleOut != 'undefined') {
        outputs.divConsolePanel.textContent += `${e.data.ConsoleOut}\n`;
    }

    updateRegisterFields(e.data.CPUState.Registers);
    updateFlagsFields(e.data.CPUState.Flags);
    updateFields(e.data.LastInstructionTicks, e.data.CPUState);
}
// const tracePanelElem = document.getElementById('tracePanel');


// const btnNext = document.getElementById('next');
// const btnMadness = document.getElementById('madness');
// const btnInit = document.getElementById('init');
// const dis = document.getElementById('disassemble');
// dis.textContent = ''

// const output = document.getElementById('output');
// output.textContent = '';
// const ramOutput = document.getElementById('ramOutput');
// ramOutput.textContent = '';

// const inpUpto = document.getElementById('inpUpto');
// const btnUpto = document.getElementById('upto');

// btnNext.addEventListener('click', () => {
//     dis.textContent += `\n${cabinet.ExecuteNextLine()}`;
//     refreshControls();
// });

// btnMadness.addEventListener('click', () => {
//     while (cabinet.Stopped == false) {
//         dis.textContent += `\n${cabinet.ExecuteNextLine(output)}`;
//         refreshControls();
//     }
//     return;
// });

// btnInit.addEventListener('click',() => {
//     cabinet.Initialise();
//     let str ='';

// });

// btnUpto.addEventListener('click', () => {
//     const addr =parseInt(inpUpto.value);
//     console.log(addr.toString(16));
//     while (cabinet.Stopped == false && cabinet._computer.CPUProgramCounter != addr) {
//         const state = cabinet.ExecuteNextLine();
//         dis.textContent += state.Disassemble;
//         output.textContent += state.Output;
//         //refreshControls(state);
//     }
// })

// function refreshControls(state) {
//     register_table.A_DEC.textContent = `${cabinet.Computer.CPURegisters['A'].toString().padStart(3,'0')}`
//     register_table.A_HEX.textContent = `0x${cabinet.Computer.CPURegisters['A'].toString(16).padStart(2,'0)')}`;

//     register_table.B_DEC.textContent = `${cabinet.Computer.CPURegisters['B'].toString().padStart(3,'0')}`
//     register_table.B_HEX.textContent = `0x${cabinet.Computer.CPURegisters['B'].toString(16).padStart(2,'0)')}`;

//     register_table.C_DEC.textContent = `${cabinet.Computer.CPURegisters['C'].toString().padStart(3,'0')}`
//     register_table.C_HEX.textContent = `0x${cabinet.Computer.CPURegisters['C'].toString(16).padStart(2,'0)')}`;

//     register_table.D_DEC.textContent = `${cabinet.Computer.CPURegisters['D'].toString().padStart(3,'0')}`
//     register_table.D_HEX.textContent = `0x${cabinet.Computer.CPURegisters['D'].toString(16).padStart(2,'0)')}`;

//     register_table.E_DEC.textContent = `${cabinet.Computer.CPURegisters['E'].toString().padStart(3,'0')}`
//     register_table.E_HEX.textContent = `0x${cabinet.Computer.CPURegisters['E'].toString(16).padStart(2,'0)')}`;

//     register_table.H_DEC.textContent = `${cabinet.Computer.CPURegisters['H'].toString().padStart(3,'0')}`
//     register_table.H_HEX.textContent = `0x${cabinet.Computer.CPURegisters['H'].toString(16).padStart(2,'0)')}`;

//     register_table.L_DEC.textContent = `${cabinet.Computer.CPURegisters['L'].toString().padStart(3,'0')}`
//     register_table.L_HEX.textContent = `0x${cabinet.Computer.CPURegisters['L'].toString(16).padStart(2,'0)')}`;

//     flags_table.C.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Carry) ? '1' : '0'}`;
//     flags_table.P.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Parity) ? '1' : '0'}`;
//     flags_table.A.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.AuxillaryCarry) ? '1' : '0'}`;
//     flags_table.Z.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Zero) ? '1' : '0'}`;
//     flags_table.S.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Sign) ? '1' : '0'}`;

//     misc_table.PC.textContent = `${cabinet.Computer.CPUProgramCounter.toString(16)}`;
//     misc_table.SP.textContent = `${cabinet.Computer.CPUStackPointer.toString(16)}`;
//     misc_table.C.textContent = `${cabinet.Computer.CPUClock.toString(16)}`;
//     misc_table.H.textContent = `${cabinet.Computer.CPUHalt ? '1' : '0'}`;
// }


// const cabinet = new CpuDiag(0x100);



