import { InvadersComputer } from '../back-end/invaders-computer';

// The virtual machine itself
const _computer = new InvadersComputer();
_computer.LoadProgram();

// Web Worker State
const WebWorkerState = {
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
    let programState;
    let instructionCount = 0;
    let currentTime;

    do {
        currentTime = new Date().getTime();

        if (currentTime - WebWorkerState.lastScreenDrawRequestTime > drawScreenInterval) {
            const VRAM = _computer.GetVideoBuffer();
            postMessage({Type: 'DRAW-SCREEN', VRAM: VRAM });
            WebWorkerState.lastScreenDrawRequestTime = new Date().getTime();
        }

        if (currentTime - WebWorkerState.lastVBlankInterruptTime > vblankInterval) {
            WebWorkerState.halfBlankToggle ? _computer.GenerateHalfVBlank() : _computer.GenerateVBlank();
            WebWorkerState.halfBlankToggle = !WebWorkerState.halfBlankToggle;
            WebWorkerState.lastVBlankInterruptTime = new Date().getTime();
        }

        programState = _computer.ExecuteNextInstruction();
        
        /* Send trace back in batched of 1000 */
        WebWorkerState.trace.push(`0x${programState.LastInstructionAddress.toString(16).padStart(4,'0')}\t${programState.LastInstructionDisassembly}\n`);
        if (WebWorkerState.trace.length > 1000) {
            postMessage({Type: 'TRACE', Trace: WebWorkerState.trace});
            WebWorkerState.trace = [];
        }
        instructionCount++;

        if (programState.CPUState.Halt || WebWorkerState.stopClicked) {
            clearTimeout(WebWorkerState.runTimeoutID);
            postMessage({Type: 'PROGRAM-STATE-UPDATE', ProgramState: programState});
            return;
        }
        
    } while (instructionCount < 30000);
    
    WebWorkerState.runTimeoutID = setTimeout(() => {
        run(drawScreenInterval, vblankInterval);
    },1);
}

/**
 * Run just the next instruction and return
 */
 function stepNextInstruction() {
    const programState = _computer.ExecuteNextInstruction();
    
    const VRAM = _computer.GetVideoBuffer();
    postMessage({Type: 'DRAW-SCREEN', VRAM: VRAM });
    
    const traceMessage =  `0x${programState.LastInstructionAddress.toString(16).padStart(4,'0')}\t${programState.LastInstructionDisassembly}\n`;

    if (WebWorkerState.trace.length > 1000) {
        WebWorkerState.trace.shift();
    }
    
    WebWorkerState.trace.push(traceMessage);
    postMessage({Type: 'PROGRAM-STATE-UPDATE', ProgramState: programState});
    postMessage({Type: 'TRACE', Trace: WebWorkerState.trace});
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
            WebWorkerState.stopClicked = false;
            /* Stop VBlanks running as soon as it starts */
            WebWorkerState.lastScreenDrawRequestTime = new Date().getTime();
            run(14,7, false);
            break;
        case 'STOP':
            WebWorkerState.stopClicked = true;
            postMessage({Type: 'TRACE', Trace: WebWorkerState.trace});
            break;
        case 'RESET':
            WebWorkerState.stopClicked = true;
            _computer.Reset();
            _computer.LoadProgram();
            WebWorkerState.stopClicked = false;
            WebWorkerState.trace = [];
            break;
        case 'STEP-NEXT':
            stepNextInstruction();
            break;
        case 'VBLANK':
            _computer.GenerateVBlank();
            break;
        case 'HALF-VBLANK':
            _computer.GenerateHalfVBlank();
            break;
        case 'COIN':
            _computer.InputDevicePortOne.DepositCoin();
            break;
        case 'P1-FIRE-DOWN':
            _computer.InputDevicePortOne.PlayerOneFireButtonDown();
            break;
        case 'P1-LEFT-DOWN':
            _computer.InputDevicePortOne.PlayerOneJoystickLeftDown();
            break;
        case 'P1-RIGHT-DOWN':
            _computer.InputDevicePortOne.PlayerOneJoystickRightDown();
            break;
        case 'P1-START-DOWN':
            _computer.InputDevicePortOne.PlayerOneStartButtonDown();
            break;
        case 'P1-FIRE-UP':
            _computer.InputDevicePortOne.PlayerOneFireButtonUp();
            break;
        case 'P1-LEFT-UP':
            _computer.InputDevicePortOne.PlayerOneJoystickLeftUp();
            break;
        case 'P1-RIGHT-UP':
            _computer.InputDevicePortOne.PlayerOneJoystickRightUp();
            break;
        case 'P1-START-UP':
            _computer.InputDevicePortOne.PlayerOneStartButtonUp();
            break;
        case 'PING!':
            postMessage({Type: 'PONG!'});
            break;
        default:
            console.log('Invalid message received by Web Worker');
    }
}

addEventListener('message', onMessage, false); /* eslint-disable-line no-restricted-globals */

