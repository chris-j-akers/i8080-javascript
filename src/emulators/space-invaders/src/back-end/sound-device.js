import { Device } from './device.js'

class SoundDevice extends Device {

    constructor() {
        super();
    }

    Write(port, val) {
        switch(port) {
            case 0x03:
                // NOP for now
                break;
            case 0x05:
                // NOP for now
                break;
        }
    }
}


export { SoundDevice }