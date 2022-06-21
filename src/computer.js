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

    /**
     * Reset the computer's components
     */
    Reset() {
        this.cpu.Reset();
        this.mmu.Reset();
    }

    /**
     * Set the CPU's program counter to a specific address.
     * 
     * @param {number} addr Address to load into program counter
     */
    SetCPUProgramCounter(addr) {
        this.cpu.ProgramCounter = addr;
    }

    /**
     * Instruct the CPU to execute the next instruction at the current program
     * counter.
     *
     * @returns Disassemble of line that was executed (with corresponding mem
     * addr)
     */
    ExecuteNextInstruction() {
        if (this.cpu.halt == false) {
            const instruction = `${this.cpu.ProgramCounter.toString(16).padStart(4,'0')}\t${this.cpu.ExecuteNextInstruction()}`;
            return instruction;
        }
    }

    /**
     * Inject a program (an array of OpCodes & data) into memory ready for
     * execution. 
     *
     * @param {array[number]} program Program to insert
     * @param {number} at_addr Memory address at which to insert (default is
     * 0x0)
     */
    InjectProgram(program, at_addr=0x0) {
        for (let i=0; i<program.length; i++) {
            this.bus.WriteRAM(program[i], at_addr + i);
        }
    }

    /**
     * Execute a batch of instructions at once. This method is mainly used for
     * unit testing. 
     *
     * NOTE: Ensure any program executed, here, has a HALT (0x76) instruction or
     * the loop will never end.      
     *
     * @param {number} from_addr Address of program in memory
     */
    ExecuteProgram(from_addr=0x0) {
        this.cpu.ProgramCounter = from_addr;
        while(this.cpu.halt === false) {
            this.cpu.ExecuteNextInstruction();
        }
    }
}

export { Computer };

