'use strict';

import { i8080 } from './i8080.js';
import { MMU } from './mmu.js';
import { Bus } from './bus.js';

class Computer {
    constructor() {
        this.cpu = new i8080();
        this.mmu = new MMU();
        this.bus = new Bus();

        // Connect the Bus to the CPU and vice versa
        this.cpu.ConnectBus(this.bus);
        this.bus.ConnectCPU(this.cpu);

        // Connect the bus to the MMU and vice versa
        this.mmu.ConnectBus(this.bus);
        this.bus.ConnectMMU(this.mmu);
    }

    Reset() {
        this.cpu.Reset();
        this.mmu.Reset();
    }

    InjectProgram(program, at_addr=0x0) {
        for (let i=0; i<program.length; i++) {
            this.bus.Write(program[i], at_addr + i);
        }
    }

    ExecuteProgram(from_addr=0x0) {
        this.cpu.ProgramCounter = from_addr;
        while(this.cpu.halt === false) {
            this.cpu.execute_next_instruction();
        }
    }
}

export { Computer };

