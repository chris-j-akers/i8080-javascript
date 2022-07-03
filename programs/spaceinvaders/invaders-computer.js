'use strict';

import { Computer } from './computer.js'
import { InvadersE } from './code/invaders-e.js';
import { InvadersF } from './code/invaders-f.js';
import { InvadersG } from './code/invaders-g.js';
import { InvadersH } from './code/invaders-h.js';


class InvadersComputer extends Computer {

    constructor() {
        super();
        this._shiftRegister = 0x0;
        this.displayInterrupt = null;
    }

    get ShiftRegister() {
        return this._shiftRegister;
    }

    set ShiftRegister(val) {
        this._shiftRegister = val;
    }

    _startDisplayInterrupts() {
        setInterval( () => {

        }, 60);
    }

    LoadProgram() {
        let bytesLoaded = super.LoadProgram(InvadersH, 0x0);
        bytesLoaded += super.LoadProgram(InvadersG, 0x0800);
        bytesLoaded += super.LoadProgram(InvadersF, 0x1000);
        bytesLoaded += super.LoadProgram(InvadersE, 0x1800);
        this._cpu.ProgramCounter = 0x0000;
        return bytesLoaded;
    }

    ExecuteNextInstruction() {
        return super.ExecuteNextInstruction();
    }
}
export { InvadersComputer }