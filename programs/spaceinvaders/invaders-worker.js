'use strict'

import { InvadersComputer } from './invaders-computer.js';

// Global Variables
const _computer = new InvadersComputer();

// When the 'Run Clocked' buttons is clicked, the emulation uses calls to
// setInterval() so we can slow down and more closely emulate the speed of a
// computer running 8080. We need to keep the ID of the Interval, though, so we
// can delete it when the program ends. If not, then it just keeps trying to run
// code that doesn't exist. The id needs to be global, to keep it in scope for
// subsequent calls.
let _clockedRunIntervalId;

/**
 * Switch the computer off and on again, and automatically load the program.
 */
function reset() {
    _computer.Stop()
    _computer.Reset();
    postMessage({Type: 'reset-complete'});
}

function reload() {
    const bytesLoaded =  _computer.LoadProgram();
    postMessage({Type: 'program-load-complete', ConsoleOut: `LOADED ${bytesLoaded} BYTES`});
}

/**
 * Run the next instruction and return
 */
function stepSingleInstruction() {
    const state = _computer.ExecuteNextInstruction();
    postMessage({Type: 'step-single-instruction-complete', ...state});
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
        const state = _computer.ExecuteNextInstruction();
        if (state.CPUState.Halt == true) {
            clearInterval(_clockedRunIntervalId);
        }
        postMessage({Type: 'run-all-clocked-complete', ...state });
    }, clockSpeed);
}

/**
 * Blasts through program no artificial slow-down.
 * 
 * @param {number} breakpointAddr Address of break-point (optional)
 */
 function runAllUnClocked(breakpointAddr =-1) {
    let traceOutputStr = '';
    let consoleOutputStr = '';
    let state;
    do {
        state = _computer.ExecuteNextInstruction();
        consoleOutputStr += state.ConsoleOut ?? '';
        traceOutputStr += `0x${state.LastInstructionAddress.toString(16).padStart(4,'0')}\t${state.LastInstructionDisassembly}\n`;
        console.log(state.CPUState.ProgramCounter);
    } while (state.CPUState.Halt == false && state.CPUState.ProgramCounter != breakpointAddr);
    postMessage({Type: 'run-all-unclocked-complete', Trace: traceOutputStr, ...state, ConsoleOut: consoleOutputStr });

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
            reload();
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
        case 'vblank':
            console.log('Vblank Called');
            _computer.GenerateVBlank();
            postMessage({Type: 'vblank-complete'})
            break;
        case 'request-vram':
            const VRAM = _computer.GetVideoBuffer();
            postMessage({Type: 'request-vram-complete', VRAM: VRAM });
            break;
        default:
            console.log('Invalid message sent to Worker.');
    }
}

self.addEventListener('message', onMessage, false);
reset();
reload();
