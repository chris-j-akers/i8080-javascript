'use strict'

class MMU {
    constructor() {
        this.ram = new Array(2**16);
        this.bus = null;
    }

    connect_bus(bus) {
        this.bus = bus;
    }

    reset() {
        this.ram = new Array(2**16);
    }

    write(val, addr) {
        this.ram[addr] = val;
    }

    read(addr) {
        return this.ram[addr];
    }
}

module.exports = MMU;
