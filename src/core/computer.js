'use strict';

import { i8080 } from './i8080.js';
import { MMU } from './mmu.js';
import { Bus } from './bus.js';

/**
 * Top level object for any emulator.
 *
 * @param {cpuType} String describing the CPU to use (currently only 'i8080'
 * available)
 *
 */
class Computer {
    constructor(cpuType='i8080') {
        
        switch(cpuType) {
            case 'i8080':
                this._cpu = new i8080();
                break;
            default:
                console.log('ERROR: Invalid CPU Type specified');
                break;
        }

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
    Stop() {
        this._cpu.Stop();
    }

    /**
     * Forwards the CPU State object.
     */
    get CPUState() {
        return this._cpu.State;
    }
    
    /**
     * Call an internal CPU OpCode directly.
     *
     * Useful for some emulation tasks - for instance OS syscalls will need a
     * RET() call when they're complete.
     * 
     */
    DirectExecOpCode(f, params = []) {
        return this._cpu[f](...params);
    }
    /**
     * Instruct the CPU to execute the next instruction at the current program
     * counter.
     *
     * @returns Enriches CPU return object with memory-related stats.
     */
    ExecuteNextInstruction() {
        if (this.CPUState.Halt == false) {
            const newState = this._cpu.ExecuteNextInstruction();
            return { ...newState, RAMTotal: this._mmu.Total, RAMBytesUsed: this._mmu.BytesUsed};
        }
    }

    _dbgGetMemMap() {
        let str = '';
        for (let i=0; i<(2**16); i++) {
            str += `${i.toString(16).padStart(4,'0')}\t${this._bus.ReadRAM(i).toString(16).padStart(2,'0')}\n`
        }
        return str;
    }

    /**
     * Inject a program (an array of OpCodes & data) into memory ready for
     * execution. 
     *
     * @param {Array} program Array of Number (bytes that make up the program)
     * @param {number} atAddr Memory address at which to insert (default is
     * 0x0)
     * 
     * @returns {number} Number of bytes loaded.
     **/
    LoadProgram(program, atAddr=0x0) {
        for (let i=0; i<program.length; i++) {
            this._bus.WriteRAM(program[i], atAddr + i);
        }
        this._cpu.ProgramCounter = atAddr;
        return this._mmu.BytesUsed;
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
        this._cpu.ProgramCounter = from_addr;
        while(this.CPUState.Halt == false) {
            this._cpu.ExecuteNextInstruction();
        }
    }
}

export { Computer };

