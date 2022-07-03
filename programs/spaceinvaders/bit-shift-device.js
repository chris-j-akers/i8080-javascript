import { Device } from './device.js';

// For OUT, writing to port 2 sets the shift amount, and writing port 4 sets the
// data in the shift registers. Reading via IN 3 returns the data shifted by the
// shift amount. An implementation for my machine is something like this:

class BitShiftDevice extends Device {

    constructor() {
        super();
        this._register = 0x0;
        this._bitShift = 0x0;
    }

    Write(port ,val) {
        switch(port) {
            case 0x04:
                this._register = val;
                break;
            case 0x02:
                this._bitShift = val;
                break;
        }
    }

    Read(port) {
        switch(port) {
            case 0x03:
                return this._register << this._bitShift;
        }
    }
}

export { BitShiftDevice }