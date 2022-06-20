import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('JMP', () => {
	it('Jump, program counter is modified', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  0xC3,                   // JMP
		  0xFE,                   // ..This low-byte
		  0xFF                    // ...and this high-byte
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.program_counter, 65535);
		  assert.equal(c.cpu.Clock, 41);
		
		});
		
});
