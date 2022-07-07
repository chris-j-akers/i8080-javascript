'use strict'
import { InvadersComputer } from './invaders-computer.js';

// The virtual machine itself
const _computer = new InvadersComputer();

// runWithDelays() used calls to setInterval(). We keep the ID of the Interval,
// here, so we can delete it when a request to stop or pause the program
// arrives.
let _clockedRunIntervalId;

// Set when the user clicks 'Stop' in the browser.
let _stopClicked = false;

/**
 * Switch the computer off and on again, and automatically load the program.
 */
function reset() {
    _computer.Stop()
    _computer.Reset();
    postMessage({Type: 'reset-complete'});
}

/**
 * Load the program into memory and set the program counter to the correct
 * place.
 */
function reload() {
    const bytesLoaded =  _computer.LoadProgram();
    postMessage({Type: 'program-load-complete', ConsoleOut: `LOADED ${bytesLoaded} BYTES`});
}

/**
 * Run just the next instruction and return
 */
function stepSingleInstruction(traceMessagesEnabled) {
    const state = _computer.ExecuteNextInstruction();
    if (traceMessagesEnabled) {
        postMessage({Type: 'step-single-instruction-complete', ...state});
    }
}

/**
 * Run all program instructions, but with an interval between each one. This
 * allows us to slow down the emulator for debugging purposes.
 *
 * @param {number} clockSpeed Number of ms between each program instruction
 */
 function runWithDelays(clockSpeed, traceMessagesEnabled) {
    _clockedRunIntervalId = setInterval( () => {
        const state = _computer.ExecuteNextInstruction();
        if (state.CPUState.Halt == true) {
            clearInterval(_clockedRunIntervalId);
        }
        if (traceMessagesEnabled) {
            postMessage({Type: 'run-all-clocked-complete', ...state });
        }
    }, clockSpeed);
}

/**
 * Runs through program no artificial slow-down ... Well, a teeny bit.
 *
 * We toggle between calling the VBlank interrupt (0x10) and the Half-VBlank
 * interrupt (0x02) because both ISRs update various in-game components. We're
 * not that fussed about timing, here, because we're not using a CRT. We Just
 * call one after the other to make sure all the update code runs in the right
 * order.
 *
 * VBlank interrupt timing is based on the option passed from the main page.
 *
 * We also execute instructions in batches of 30,000. This is to prevent the
 * worker's thread from locking up and being unable to receive any STOP messages
 * or making the browser think it's hanging. Just a 1ms wait using setTimeout()
 * is all that's needed.
 *
 * @param {number} vblankIntervalMS Interval in milliseconds between each call
 * to vertical blank and verticak half-blank interrupts.
 * @param {boolean} traceMessagesEnabled Whether to send trace messages back to
 * the browser.
 * @param {number} breakpointAddr Address of break-point (optional)
 */
 function run(vblankIntervalMS, traceMessagesEnabled, breakpointAddr =-1) {
    let halfBlankToggle = false;
    let cpuState;
    let instructionCount = 0;
    let lastVBlankRunTime = new Date().getTime();

    do {
        if (new Date().getTime() - lastVBlankRunTime > vblankIntervalMS) {

            halfBlankToggle ? _computer.GenerateHalfVBlank() : _computer.GenerateVBlank();
            halfBlankToggle = !halfBlankToggle;

            const VRAM = _computer.GetVideoBuffer();
            postMessage({Type: 'draw-screen-request', VRAM: VRAM });

            lastVBlankRunTime = new Date().getTime();
        }

        cpuState = _computer.ExecuteNextInstruction();
        instructionCount++;
        
        if (traceMessagesEnabled) {
            postMessage({Type: 'step-single-instruction-complete', ...cpuState});
        }
        
    } while (instructionCount < 30000 && cpuState.CPUState.Halt == false && cpuState.CPUState.ProgramCounter != breakpointAddr);
    
    if (!_stopClicked) {
        setTimeout(() => {
            run(vblankIntervalMS, traceMessagesEnabled, breakpointAddr);
        },1);
    }
    _stopClicked = false;
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
            stepSingleInstruction(msg.Trace);
            break;
        case 'run-all-clocked':
            runWithDelays(msg.ClockSpeed, msg.Trace);
            break;
        case 'run-all-unclocked':
            run(msg.VBlank, msg.Trace);
            break;
        case 'run-to-breakpoint':
            run(msg.VBlank, msg.BreakpointAddress, msg.Trace);
            break;
        case 'stop':
            clearInterval(_clockedRunIntervalId);
            _stopClicked = true;
            break;
        case 'get-ram-dump':
            getRAMDump();
            break;
        case 'vblank':
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
