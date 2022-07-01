'use strict'

class MMU {
    constructor() {
        this._ram = new Array(2**16);
        this._bus = null;
        this._bytesUsed = 0;
    }

    get BytesUsed() {
        return this._bytesUsed;
    }

    get RAM() {
        return this._ram;
    }

    ConnectBus(bus) {
        this._bus = bus;
    }

    Reset() {
        this._ram = new Array(2**16);
        this._bytesUsed = 0;
    }

    Write(val, addr) {
        if (typeof this._ram[addr] == 'undefined') {
            this._bytesUsed++;
        }
        this._ram[addr] = val;
    }

    Read(addr) {
        if (typeof this._ram[addr] != 'undefined') {
            return this._ram[addr];
        }
        else {
            return 0x0;
        }
    }
}

export { MMU };
