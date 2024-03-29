import { Computer } from './computer.js';
import { BitShiftDevice } from './bitshift-device.js';
import { InputDevicePortOne } from './input-device-1.js';
import { InputDevicePortTwo } from './input-device-2.js';
import { SoundDevice } from './sound-device.js';
import { InvadersE } from './rom/invaders-e.js';
import { InvadersF } from './rom/invaders-f.js';
import { InvadersG } from './rom/invaders-g.js';
import { InvadersH } from './rom/invaders-h.js';
import { WatchDogDevice } from './watchdog-device.js';

class InvadersComputer extends Computer {

    constructor() {
        super();
        this._bitShiftDevice = new BitShiftDevice();
        this.Bus.ConnectDeviceToWritePort(0x04, this._bitShiftDevice);
        this.Bus.ConnectDeviceToWritePort(0x02, this._bitShiftDevice);
        this.Bus.ConnectDeviceToReadPort(0x03, this._bitShiftDevice);

        this._inputDevicePortOne = new InputDevicePortOne();
        this._inputDevicePortTwo = new InputDevicePortTwo();
        this.Bus.ConnectDeviceToReadPort(0x01, this._inputDevicePortOne);
        this.Bus.ConnectDeviceToReadPort(0x02, this._inputDevicePortTwo);

        this._soundDevice = new SoundDevice();
        this.Bus.ConnectDeviceToWritePort(0x03, this._soundDevice);
        this.Bus.ConnectDeviceToWritePort(0x05, this._soundDevice);

        this._watchDogDevice = new WatchDogDevice();
        this.Bus.ConnectDeviceToWritePort(0x06, this._watchDogDevice);

        this._videoRamStart = 0x2400;
        this._videoRamEnd = 0x3FFF;
    }

    get InputDevicePortOne() {
        return this._inputDevicePortOne;
    }

    get InputDevicePortTwo() {
        return this._inputDevicePortTwo;
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

    GetVideoBuffer() {
        return this.Bus.GetRAMSlice(this._videoRamStart, this._videoRamEnd);
    }

    GenerateVBlank() {
        this._cpu.GenerateInterrupt('RST', [0x10]);
    }

    GenerateHalfVBlank() {
        this._cpu.GenerateInterrupt('RST', [0x08]);
    }
}
export { InvadersComputer }