'use strict';

import { Computer } from './computer.js';
import { BitShiftDevice } from './bit-shift-device.js';
import { InvadersE } from './code/invaders-e.js';
import { InvadersF } from './code/invaders-f.js';
import { InvadersG } from './code/invaders-g.js';
import { InvadersH } from './code/invaders-h.js';

class InvadersComputer extends Computer {

    constructor() {
        super();
        this._bitShiftDevice = new BitShiftDevice();
        this.Bus.ConnectDevice(0x04, this._bitShiftDevice);
        this.Bus.ConnectDevice(0x02, this._bitShiftDevice);
        this.Bus.ConnectDevice(0x03, this._bitShiftDevice);
    }

    /**
     * Program is loaded in following chunks
     * 
     * $0000-$07ff:    invaders.h         
     * $0800-$0fff:    invaders.g         
     * $1000-$17ff:    invaders.f         
     * $1800-$1fff:    invaders.e
     * 
     * @returns Number of bytes loaded
     */

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