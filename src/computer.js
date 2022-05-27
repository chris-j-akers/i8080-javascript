'use strict';

const i8080 = require('./i8080.js')
const MMU = require('./mmu.js')
const Bus = require('./bus.js')

class Computer {
    constructor() {
        this.cpu = new i8080();
        this.mmu = new MMU();
        this.bus = new Bus();

        // Connect the Bus to the CPU and vice versa
        this.cpu.connect_bus(this.bus);
        this.bus.connect_cpu(this.cpu);

        // Connect the bus to the MMU and vice versa
        this.mmu.connect_bus(this.bus);
        this.bus.connect_mmu(this.mmu);
    }

    reset() {
        this.cpu.reset();
        this.mmu.reset();
    }
}

module.exports = Computer;
