import { Device } from './device.js'

class InputDevicePortOne extends Device {

    constructor() {
        super();
        this._register = 0x01;
    }

    DepositCoin() {
        this._register &= ~1;
    }

    PlayerTwoStartButtonDown() {
        this._register |= 0x2;
    }

    PlayerTwoStartButtonUp() {
        this._register &= ~0x2;
    }

    PlayerOneStartButtonDown() {
        this._register |= 0x4;
    }

    PlayerOneStartButtonUp() {
        this._register &= ~0x4;
    }

    PlayerOneFireButtonDown() {
        this._register |= 0x10;
    }

    PlayerOneFireButtonUp() {
        this._register &= ~0x10;
    }

    PlayerOneJoystickLeftDown() {
        this._register |= 0x20;
    }

    PlayerOneJoystickLeftUp() {
        this._register &= ~0x20;
    }

    PlayerOneJoystickRightDown() {
        this._register |= 0x40;
    }

    PlayerOneJoystickRightUp() {
        this._register &= ~0x40;
    }

    Read() {
        return this._register;
    }
}

export { InputDevicePortOne }