import { Device } from './device.js';

// For OUT, writing to port 2 sets the shift amount, and writing port 4 sets the
// data in the shift registers. Reading via IN 3 returns the data shifted by the
// shift amount. An implementation for my machine is something like this:

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