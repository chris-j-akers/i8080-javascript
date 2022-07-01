'use strict'

import { Computer } from './computer.js';
import { Code } from './cpudiag-code.js';

// Global Variables
const _computer = new Computer();
const _startAddr = 0x100;

// When the 'Run Clocked' buttons is clicked, the emulation uses calls to
// setInterval() so we can slow down and more closely emulate the speed of a
// computer running 8080. We need to keep the ID of the Interval, though, so we
// can delete it when the program ends. If not, then it just keeps trying to run
// code that doesn't exist.
let _clockedRunIntervalId;

/**
 * Switch the computer off and on again!
 */
function reset() {
    _computer.Stop();
    _computer.Reset();
    const bytesLoaded = _computer.LoadProgram(Code, _startAddr);
    postMessage({Type: 'RESET_ACK', ConsoleOut: `LOADED ${bytesLoaded} BYTES STARTING AT ADDRESS 0x${_startAddr.toString(16)}`});
}

/**
 * Helper function to emulate the C_WRITESTR CP/M syscall which simply
 * writes text to screen.
 *
 * @returns $ terminated string located at 16-bit addr stored in Registers D
 * and E
 */
 function _getMemString() {
    let straddr = _computer.CPUState.Registers.D << 8 | _computer.CPUState.Registers.E;
    let ret_str = ''
    let next_char = String.fromCharCode(_computer.Bus.ReadRAM(straddr));
    while(next_char != '$') {
        ret_str += next_char;
        straddr++;
        next_char = String.fromCharCode(_computer.Bus.ReadRAM(straddr))
    }
    return ret_str;
}

/**
 * A wrapper around the Computer.ExecuteNextInstruction(). The CPUDIAG program
 * uses a couple of CP/M syscalls to write to the screen. These have to be
 * emulated, here.
 *
 * If syscalls are not being used the call is passed directly to
 * Computer.ExecuteNextInstruction().
 *
 * @returns Literal object with data about the instruction just executed.
 */
function executeNextInstruction() {
    switch(_computer.CPUState.ProgramCounter) {
        case 5:
            switch(_computer.CPUState.Registers.C) {
                case 0:
                    return { Disassemble: 'HALT', 
                                Ticks: _computer.DirectExecOpCode('HALT') };
                case 9: 
                    const outputStr = _getMemString();
                    return { LastInstructionDisassembly: '0005\tC_WRITESTR (CP/M SYSCALL)\n    \tRET', 
                                LastInstructionTicks: _computer.DirectExecOpCode('RET'), 
                                ConsoleOut: outputStr };
                case 2:
                    return { LastInstructionDisassembly: '0005\tC_WRITE (CP/M SYSCALL)\n    \tRET', 
                                LastInstructionTicks: _computer.DirectExecOpCode('RET'), 
                                ConsoleOut: String.fromCharCode(_computer.CPUState.Registers.E) };
            }
            return;
        case 0:
            return { LastInstructionDisassembly: 'HALT', 
                        LastInstructionTicks: _computer.DirectExecOpCode('HALT') };
        default:
            return _computer.ExecuteNextInstruction();
    }
}

/**
 * Listener for the postMessage() event posted from the main page (browser).
 * 
 * @param {Event} e The event passed in by the postMessage() from the browser.
 */
function onMessage(e) {
    const msg = e.data;
    let addr = 0x0;
    switch(msg.Type) {
        case 'RESET':
            reset();
            break;
        case 'EXECUTE_NEXT':
            const addr = _computer.CPUState.ProgramCounter;
            const newState = executeNextInstruction();
            postMessage({Type: 'EXECUTE_NEXT_ACK', ...newState, LastInstructionAddress: addr, CPUState: _computer.CPUState });
            break;
        case 'EXECUTE_ALL_CLOCKED':
                _clockedRunIntervalId = setInterval( () => {
                    if (_computer.CPUState.Halt == false) {
                        const addr = _computer.CPUState.ProgramCounter;
                        const newState = executeNextInstruction();
                        postMessage({Type: 'EXECUTE_ALL_CLOCKED_ACK', ...newState, LastInstructionAddress: addr, CPUState: _computer.CPUState });
                    }
                    else {
                        clearInterval(_clockedRunIntervalId)
                    }
                }, msg.ClockSpeed);
            break;
        case 'EXECUTE_ALL_UNCLOCKED':
            while(_computer.CPUState.Halt == false) {
                const addr = _computer.CPUState.ProgramCounter;
                const newState = executeNextInstruction();
                postMessage({Type: 'EXECUTE_ALL_UNCLOCKED_ACK', ...newState, LastInstructionAddress: addr, CPUState: _computer.CPUState });
            }
            break;
        case 'RUN_TO_BREAKPOINT':
            while(_computer.CPUState.Halt == false && _computer.CPUState.ProgramCounter != msg.BreakpointAddress) {
                const addr = _computer.CPUState.ProgramCounter;
                const newState = executeNextInstruction();
                postMessage({Type: 'EXECUTE_ALL_UNCLOCKED_ACK', ...newState, LastInstructionAddress: addr, CPUState: _computer.CPUState });
            }
            break;
        case 'STOP':
            clearInterval(_clockedRunIntervalId);
            break;
        case 'GET_MEMORY_MAP':
            let str = '';
            for (let i = 0; i<65536; i++) {
                str += `0x${i.toString(16).padStart(4,'0')}\t0x${_computer.Bus.ReadRAM(i).toString(16).padStart(2,'0')}\n`;
            }
            postMessage({Type: 'GET_MEMORY_MAP_ACK', MemoryMap: str });
            break;
        default:
            console.log('Invalid message sent to Worker.');
    }
}

self.addEventListener('message', onMessage, false);
reset();
