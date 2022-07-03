'use strict'

import { Computer } from './computer.js'
import { Code } from './cpudiag-code.js';

class CPUDiagComputer extends Computer {

    constructor() {
        super();
        this._clockedRunIntervalId = null;
    }

    LoadProgram() {
        let bytesLoaded = super.LoadProgram(Code, 0x100);
        return bytesLoaded;
    }

    /**
     * Emulate the C_WRITESTR CP/M syscall which simply writes text to screen.
     *
     * @returns `$` terminated string located at the 16-bit address stored in
     * Registers D and E
     */
    _getMemString() {
        let straddr = this.CPUState.Registers.D << 8 | this.CPUState.Registers.E;
        let ret_str = ''
        let next_char = String.fromCharCode(this.Bus.ReadRAM(straddr));
        while(next_char != '$') {
            ret_str += next_char;
            straddr++;
            next_char = String.fromCharCode(this.Bus.ReadRAM(straddr))
        }
        return ret_str;
    }

    ExecuteNextInstruction() {
        if (this.CPUState.Halt == false ) {
            switch(this.CPUState.ProgramCounter) {
                case 5:
                    switch(this.CPUState.Registers.C) {
                        case 0:
                            return { 
                                LastInstructionDisassembly: 'HALT', 
                                LastInstructionAddress: this.CPUState.ProgramCounter,
                                LastInstructionTicks: this.DirectExecOpCode('HALT'), 
                                CPUState: this.CPUState 
                            };
                        case 9: 
                            const outputStr = this._getMemString();
                            return { 
                                LastInstructionDisassembly: '0005\tC_WRITESTR (CP/M SYSCALL)\n    \tRET', 
                                LastInstructionAddress: this.CPUState.ProgramCounter,
                                LastInstructionTicks: this.DirectExecOpCode('RET'), 
                                CPUState: this.CPUState,
                                ConsoleOut: outputStr
                            };
                                    
                        case 2:
                            return {
                                LastInstructionDisassembly: '0005\tC_WRITE (CP/M SYSCALL)\n    \tRET', 
                                LastInstructionAddress: this.CPUState.ProgramCounter,
                                LastInstructionTicks: this.DirectExecOpCode('RET'), 
                                CPUState: this.CPUState,
                                ConsoleOut: String.fromCharCode(this.CPUState.Registers.E)
                            };
                    }
                    return;
                case 0:
                    return { 
                        LastInstructionDisassembly: 'HALT', 
                        LastInstructionAddress: this.CPUState.ProgramCounter,
                        LastInstructionTicks: this.DirectExecOpCode('HALT'),
                        CPUState: this.CPUState,
                    };
                default:
                    return super.ExecuteNextInstruction();
            }
        }
    }
}

export { CPUDiagComputer }