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
     * Get the current Bus
     */
    get Bus() {
        return this.bus;
    }

    /**
     * Reset the computer's components
     */
    Reset() {
        this.cpu.Reset();
        this.mmu.Reset();
    }

    //  Now we expose some internal CPU structures and Operations that may need
    //  to be available to ROM emulators and for diagnostics.

    /**
     * Get the CPU's internal program counter.
     *
     * If a particular ROM requires some OS syscalls, we need a way of checking
     * the Program Counter so we can see whether it is currently at the address
     * of an expected syscall. If so, then we can emulate it in the ROM code.
     */
    get CPUProgramCounter() {
        return this.cpu.ProgramCounter;
    }

    /**
     * Set the CPU's internal program counter to a specific address.
     *
     * ROM code does not necessarily start at 0x0. We need a way of making sure
     * the ProgramCoutner is set at the correct start address before running
     * code.
     *
     * @param {number} addr Address to load into program counter
     */
    set CPUProgramCounter(val) {
        this.cpu.ProgramCounter = val;
    }

    /**
     * Get the Halt status of the CPU
     */
    get CPUHalt() {
        return this.cpu.Halt;
    }

    /**
     * Set the Halt status of the CPU
     */
    set CPUHalt(val) {
        this.cpu.Halt = val;
    }

    /**
     * Get the current set of registers from the CPU and their values.
     * 
     * This is used for diagnostic purposes.
     */
    get CPURegisters() {
        return this.cpu._registers;
    }

    /**
     * Expose the CPU's FlagManager
     *
     * This is used for diagnostic purposes. Exposing the whole Flag Manager
     * might be a bit overkill. It might be wiser to provide another accessor
     * method to call the IsSet() function only.
     */
    get CPUFlagManager() {
        return this.cpu.FlagManager;
    }

    get CPUStackPointer() {
        return this.cpu.StackPointer;
    }

    get CPUClock() {
        return this.cpu.Clock;
    }

    /**
     * Call the CPU's RET function (POP address off the stack, then set program
     * counter to that address). This is used when emulating syscalls and to
     * make sure we can return to the correct place in the code once the syscall
     * has completed.
     */
    CPURET() {
        this.cpu.RET();
    }

    /**
     * Instruct the CPU to execute the next instruction at the current program
     * counter.
     *
     * @returns Disassemble of line that was executed (with corresponding mem
     * addr)
     */
    ExecuteNextInstruction() {
        if (this.cpu._halt == false) {
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
        while(this.cpu._halt === false) {
            this.cpu.ExecuteNextInstruction();
        }
    }
}

export { Computer };

