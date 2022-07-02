'use strict'

import { Computer } from './computer.js';
import { InvadersE } from './code/invaders-e.js';
import { InvadersF } from './code/invaders-f.js';
import { InvadersG } from './code/invaders-g.js';
import { InvadersH } from './code/invaders-h.js';



// Global Variables
const _computer = new Computer();

// CPUDDiag start address
const _startAddr = 0x00;

// When the 'Run Clocked' buttons is clicked, the emulation uses calls to
// setInterval() so we can slow down and more closely emulate the speed of a
// computer running 8080. We need to keep the ID of the Interval, though, so we
// can delete it when the program ends. If not, then it just keeps trying to run
// code that doesn't exist. The id needs to be global, to keep it in scope for
// subsequent calls.
let _clockedRunIntervalId;

/**
 * Switch the computer off and on again, and automatically load the program.
 * 
 * Program is loaded in following chunks
 * 
 *  // $0000-$07ff:    invaders.h         
 *  // $0800-$0fff:    invaders.g         
 *  // $1000-$17ff:    invaders.f         
 *  // $1800-$1fff:    invaders.e
 */
function reset() {
    _computer.Stop();
    _computer.Reset();
    let bytesLoaded = _computer.LoadProgram(InvadersH, 0x0);
    bytesLoaded += _computer.LoadProgram(InvadersG, 0x0800);
    bytesLoaded += _computer.LoadProgram(InvadersF, 0x1000);
    bytesLoaded += _computer.LoadProgram(InvadersE, 0x1800);
    _computer._cpu.ProgramCounter = 0x0;
    postMessage({Type: 'reset-complete', ConsoleOut: `LOADED ${bytesLoaded} BYTES STARTING AT ADDRESS 0x${0x0800.toString(16)}`});
}


/**
 * Emulate the C_WRITESTR CP/M syscall which simply writes text to screen.
 *
 * @returns `$` terminated string located at the 16-bit address stored in
 * Registers D and E
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
 * uses a couple of CP/M syscalls to write to the screen. These are emulated,
 * here. The return objects match the calls to Computer.ExecuteNextInstruction()
 *
 * If syscalls are not being used the call is passed directly to
 * Computer.ExecuteNextInstruction().
 *
 * @returns Literal object with data about the instruction just executed.
 */
function executeNextInstruction() {
    switch(_computer.CPUState.ProgramCounter) {
        default:
            return _computer.ExecuteNextInstruction();
    }
}

/**
 * Run the next instruction and return
 */
function stepSingleInstruction() {
    if (_computer.CPUState.Halt == false) {
        const addr = _computer.CPUState.ProgramCounter;
        const newState = executeNextInstruction();
        postMessage({Type: 'step-single-instruction-complete', ...newState, LastInstructionAddress: addr });
    }
}

/**
 * Run all program instructions, but with an interval between each one. This
 * allows us to slow down the emulator to a more realistic speed for 8080-based
 * computers.
 *
 * @param {number} clockSpeed Number of ms between each program instruction
 */
function runAllClocked(clockSpeed) {
    _clockedRunIntervalId = setInterval( () => {
        if (_computer.CPUState.Halt == false) {
            const addr = _computer.CPUState.ProgramCounter;
            const newState = executeNextInstruction();
            postMessage({Type: 'run-all-clocked-complete', ...newState, LastInstructionAddress: addr });
        }
        else {
            clearInterval(_clockedRunIntervalId)
        }
    }, clockSpeed);
}

/**
 * Runs through program without slowing down.
 * 
 * @param {number} breakpointAddr Address of break-point (optional)
 */
function runAllUnClocked(breakpointAddr =-1) {
    let traceOutputStr = '';
    let consoleOutputStr = '';
    let lastInstructionAddr;
    let newState;
    while(_computer.CPUState.Halt == false && _computer.CPUState.ProgramCounter != breakpointAddr) {
        lastInstructionAddr = _computer.CPUState.ProgramCounter;
        newState = executeNextInstruction();
        if (newState.ConsoleOut != undefined) {
            consoleOutputStr += newState.ConsoleOut;
        }
        traceOutputStr += `0x${lastInstructionAddr.toString(16).padStart(4,'0')}\t${newState.LastInstructionDisassembly}\n`;
    }
    postMessage({Type: 'run-all-unclocked-complete', Trace: traceOutputStr, ...newState, LastInstructionAddress: lastInstructionAddr, ConsoleOut: consoleOutputStr });

}

/**
 * Get a dump of RAM contents
 */
function getRAMDump() {
    let str = '';
    for (let i = 0; i<65536; i++) {
        str += `0x${i.toString(16).padStart(4,'0')}\t0x${_computer.Bus.ReadRAM(i).toString(16).padStart(2,'0')}\n`;
    }
    postMessage({Type: 'get-ram-dump-complete', MemoryMap: str });
}

/**
 * Listener for the postMessage() event posted from the main page.
 * 
 * @param {Event} e The event passed in by the postMessage() from the browser.
 */
function onMessage(e) {
    const msg = e.data;
    switch(msg.Type) {
        case 'reset':
            reset();
            break;
        case 'step-single-instruction':
            stepSingleInstruction();
            break;
        case 'run-all-clocked':
            runAllClocked(msg.ClockSpeed);
            break;
        case 'run-all-unclocked':
            runAllUnClocked();
            break;
        case 'run-to-breakpoint':
            runAllUnClocked(msg.BreakpointAddress);
            break;
        case 'stop':
            clearInterval(_clockedRunIntervalId);
            break;
        case 'get-ram-dump':
            getRAMDump();
            break;
        default:
            console.log('Invalid message sent to Worker.');
    }
}

self.addEventListener('message', onMessage, false);
reset();
