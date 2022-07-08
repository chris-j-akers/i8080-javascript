import { Device } from './device.js';


/**
 * The SpaceInvaders arcade machine included a specific bit of hardware - a
 * bit-shifter - that enabled it to shift more than one bit at a time (all
 * sprites were positioned using this). The 8080 itself only had the ability to
 * shift one bit at a time which would have been too cumbersome. The BitShifter
 * was just a device accessed by the IN and OUT instructions.
 */
class BitShiftDevice extends Device {

    constructor() {
        super();
        this._register = 0x0000;
        this._bitShift = 0;
    }

    _dbgGetRegisterStr() {
        return `BitShiftRegister: ${this._register}, 0x${this._register.toString(16).padStart(2,'0')}, ${this._register.toString(2).padStart(8,'0')}`;
    }

    Write(port ,val) {
        switch(port) {
            case 0x04:
                this._register = ((val << 8) | (this._register >> 8 & 0xFF)) & 0xFFFF;
                break;
            case 0x02:
                this._bitShift = val;
                break;
        }
    }

    Read(port) {
        switch(port) {
            case 0x03:
                return ((this._register << this._bitShift) >> 8) & 0xFF;
        }
    }
}

export { BitShiftDevice }