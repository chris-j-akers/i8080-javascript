import { Device } from './device.js'

class InputDevicePortTwo extends Device {

    constructor() {
        super();
        this._register = 0x00;
    }

    SetNumberOfLivesDipSwitch(number = 3) {
        switch(number) {
            case 3:
                this._register &= ~0x1;
                return;
            case 4:
                this._register |= 0x1;
                return;
            case 5:
                this._register |= 0x2;
                return;
            case 6:
                this._register |= 0x4;
                return;
            default:
                return;
        }
    }

    TiltAlarm() {
        this._register |= 0x4;
    }

    BonusLife(number) {
        switch(number) {
            case 1000:
                this._register |= 0x8;
                return;
            case 1500:
                this._register &= ~0x8;
                return;
            default:
                return;
        }    
    }

    PlayerTwoFire() {
        this._register |= 0x10;
    }

    PlayerTwoJoystickLeft() {
        this._register |= 0x20;
    }

    PlayerTwoJoystickRight() {
        this._register |= 0x40;
    }

    CoinInfo(info = true) {
        info ? this._register |= 0x80 : this._register &= ~0x80;
    }

    Read() {
        return this._register;
    }
}

export { InputDevicePortTwo }