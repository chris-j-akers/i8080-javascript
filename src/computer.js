'use strict';

import { i8080 } from './i8080.js';
import { MMU } from './mmu.js';
import { Bus } from './bus.js';

class Computer {
    constructor() {
        this._cpu = new i8080();
        this._mmu = new MMU();
        this._bus = new Bus();

        // Connect the Bus to the CPU and vice versa
        this._cpu.ConnectBus(this._bus);
        this._bus.ConnectCPU(this._cpu);

        // Connect the bus to the MMU and vice versa
        this._mmu.ConnectBus(this._bus);
        this._bus.ConnectMMU(this._mmu);
    }

    /**
     * Get the current Bus
     */
    get Bus() {
        return this._bus;
    }

    /**
     * Reset the computer's components
     */
    Reset() {
        this._cpu.Reset();
        this._mmu.Reset();
    }
    
    /**
     * Stop the current program from running.
     */
    HaltCPU() {
        this._cpu.Halt = true;
    }

    CPUGoto(addr) {
        this._cpu.ProgramCounter = addr;
    }

    //  Now we expose some internal CPU structures and Operations that may need
    //  to be available to ROM emulators and for diagnostics.

    get CPUState() {
        return this._cpu.State;
    }

    /**
     * Call an internal CPU OpCode directly.
     *
     * Useful for some emulation tasks - for instance OC syscalls will need a
     * RET() call when they're complete.
     */
    OpCodeDirectCall(f) {
        return this._cpu[f]();
    }
    /**
     * Instruct the CPU to execute the next instruction at the current program
     * counter.
     *
     * @returns Disassemble of line that was executed (with corresponding mem
     * addr)
     */
    ExecuteNextInstruction() {
        if (this.CPUHalt == false) {
            const instruction = `${this.CPUProgramCounter.toString(16).padStart(4,'0')}\t${this._cpu.ExecuteNextInstruction()}`;
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
            this._bus.WriteRAM(program[i], at_addr + i);
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
        this.CPUProgramCounter = from_addr;
        while(this.CPUHalt === false) {
            this._cpu.ExecuteNextInstruction();
        }
    }
}

export { Computer };

