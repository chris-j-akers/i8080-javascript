import { Device } from './device.js'

class InputDevicePortOne extends Device {

    constructor() {
        super();
        this._register = 0x01;
    }

    DepositCoin() {
        this._register &= ~1;
    }

    PlayerTwoStartButton() {
        this._register |= 0x2;
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
        this._register |= 0x1;
        this._register &= ~0x10;
    }

    PlayerOneJoystickLeft() {
        this._register |= 0x20;
    }

    PlayerOneJoystickRight() {
        this._register |= 0x40;
    }

    Read() {
        console.log(`Returning ${this._register.toString(2).padStart(8, '0')}`);
        return this._register;
    }
}

export { InputDevicePortOne }