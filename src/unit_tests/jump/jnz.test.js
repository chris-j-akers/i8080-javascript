import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

describe('JNZ', () => {
	it('Return is 0, program counter is not modified', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x3E,                   // MVI into accumulator
		  10,          // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		  0xDE,                   // Subtract...
		  10,             // ...This immediate value from accumulator
		  0xC2,                   // JNZ
		  0xFE,                   // ...low-byte of address
		  0xFF,                   // ...high-byte of address
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers['A'], 0)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c.CPUState.ProgramCounter, 14);
		  assert.equal(c.CPUState.Clock, 48);
		
		  c.Reset();
		
		});
		
	it('Return is not 0, program counter is modified', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x3E,                   // MVI into accumulator
		  10,          // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		  0xDE,                   // Subtract...
		  5,             // ...This immediate value from accumulator
		  0xC2,                   // JNZ
		  0xFE,                   // ...low-byte of address
		  0xFF,                   // ...high-byte of address
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers['A'], 5)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.CPUState.ProgramCounter, 65535);
		  assert.equal(c.CPUState.Clock, 55);
		
		  c.Reset();
		
		});
		
});
