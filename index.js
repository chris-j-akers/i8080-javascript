import { CpuDiag } from './src/cpudiag.js';


const registerTableElem = {
    decA: document.getElementById('tdARegDecElem'),
    hexA: document.getElementById('tdARegDecElem'),
    binA: document.getElementById('tdARegDecElem'),
    decB: document.getElementById('tdBRegDecElem'),
    hexB: document.getElementById('tdBRegDecElem'),
    binB: document.getElementById('tdBRegDecElem'),
    decC: document.getElementById('tdCRegDecElem'),
    hexC: document.getElementById('tdCRegDecElem'),
    binC: document.getElementById('tdCRegDecElem'),
    decD: document.getElementById('tdDRegDecElem'),
    hexD: document.getElementById('tdDRegDecElem'),
    binD: document.getElementById('tdDRegDecElem'),
    decE: document.getElementById('tdERegDecElem'),
    hexE: document.getElementById('tdERegDecElem'),
    binE: document.getElementById('tdERegDecElem'),
    decH: document.getElementById('tdHRegDecElem'),
    hexH: document.getElementById('tdHRegDecElem'),
    binH: document.getElementById('tdHRegDecElem'),
    decL: document.getElementById('tdLRegDecElem'),
    hexL: document.getElementById('tdLRegDecElem'),
    binL: document.getElementById('tdLRegDecElem'),
}

const flagsTableElem = {
    Carry: document.getElementById('tdCarryFlagVal'),
    Parity: document.getElementById('tdParityFlagVal'),
    AuxCarry: document.getElementById('tdAuxCarryFlagVal'),
    Zero: document.getElementById('tdZeroFlagVal'),
    Sign: document.getElementById('tdSignFlagVal'),
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
        let addr;
        while(cpuDiagCabinet.Computer.CPUState.Halt == false) {
            addr = cpuDiagCabinet.Computer.CPUState.ProgramCounter;
            const state = cpuDiagCabinet.ExecuteNextInstruction();
            outputs.divTracePanel.textContent += `0x${addr.toString(16)}\t${state.LastInstructionDisassembly}`;
            outputs.divTracePanel.textContent += '\n';

            if (typeof state.ConsoleOut != 'undefined') {
                outputs.divConsolePanel.textContent += state.ConsoleOut;
            }
        }
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
    }),
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



