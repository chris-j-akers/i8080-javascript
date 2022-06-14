'use strict'

class MMU {
    constructor() {
        this.ram = new Array(2**16);
        this.bus = null;
    }

    ConnectBus(bus) {
        this.bus = bus;
    }

    Reset() {
        this.ram = new Array(2**16);
    }

    Write(val, addr) {
        this.ram[addr] = val;
    }

    Read(addr) {
        return this.ram[addr];
    }
}

export { MMU };
