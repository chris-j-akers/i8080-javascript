import { InvadersComputer } from '../back-end/invaders-computer';

// The virtual machine itself
const _computer = new InvadersComputer();
_computer.LoadProgram();

// Web Worker State
const State = {
    halfBlankToggle: true,
    runTimeoutID: null,
    stopClicked: false,
    lastScreenDrawRequestTime: new Date().getTime(),
    lastVBlankInterruptTime: new Date().getTime(),
    trace: [],
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
 * We also execute instructions in batches of 30,000. This is to prevent the
 * worker thread from locking up and being unable to receive any STOP messages
 * or making the browser think it's hanging. Just a 1ms wait using setTimeout()
 * is all that's needed.
 *
 * @param {number} drawScreenInterval Interval in milliseconds between each call
 * to vertical blank and verticak half-blank interrupts.
 * @param {boolean} traceMessagesEnabled Whether to send trace messages back to
 * the browser.
 * @param {number} breakpointAddr Address of break-point (optional)
 */
 function run(drawScreenInterval, vblankInterval) {
    let cpuState;
    let instructionCount = 0;
    let currentTime;

    do {
        currentTime = new Date().getTime();

        if (currentTime - State.lastScreenDrawRequestTime > drawScreenInterval) {
            const VRAM = _computer.GetVideoBuffer();
            postMessage({Type: 'DRAW-SCREEN', VRAM: VRAM });
            State.lastScreenDrawRequestTime = new Date().getTime();
        }

        if (currentTime - State.lastVBlankInterruptTime > vblankInterval) {
            State.halfBlankToggle ? _computer.GenerateHalfVBlank() : _computer.GenerateVBlank();
            State.halfBlankToggle = !State.halfBlankToggle;
            State.lastVBlankInterruptTime = new Date().getTime();
        }

        cpuState = _computer.ExecuteNextInstruction();
        
        /* Send trace back every 1000 messages */
        State.trace.push(`0x${cpuState.LastInstructionAddress.toString(16).padStart(4,'0')}\t${cpuState.LastInstructionDisassembly}\n`);
        if (State.trace.length > 1000) {
            postMessage({Type: 'TRACE', Trace: State.trace});
            State.trace = [];
        }
         /* Send state back */
        instructionCount++;

        if (cpuState.CPUState.Halt || State.stopClicked) {
            clearTimeout(State.runTimeoutID);
            postMessage({Type: 'CPU-STATE-UPDATE', CPUState: cpuState});
            return;
        }
        
    } while (instructionCount < 30000);
    
    State.runTimeoutID = setTimeout(() => {
        run(drawScreenInterval, vblankInterval);
    },1);
}

/**
 * The main page posts worker requests as events.
 * 
 * @param {Event} e The event passed in by the postMessage() from the browser.
 */
function onMessage(e) {
    const msg = e.data;
    switch(msg.Type) {
        case 'RUN':
            State.stopClicked = false;
            run(14,7, false);
            break;
        case 'STOP':
            State.stopClicked = true;
            break;
        case 'RESET':
            State.stopClicked = true;
            _computer.Reset();
            _computer.LoadProgram();
            State.stopClicked = false;
            State.trace = [];
            break;
        case 'GET-TRACE-DUMP':
            postMessage({Type: 'TRACE-DUMP', Trace: State.trace});
            break;
        case 'PING!':
            postMessage({Type: 'PONG!'});
            break;
        default:
            console.log('Invalid message received by Web Worker');
    }
}

addEventListener('message', onMessage, false); /* eslint-disable-line no-restricted-globals */

