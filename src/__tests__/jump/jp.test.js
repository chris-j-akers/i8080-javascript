import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('JP', () => {
	it('Sign is set, program counter is not modified', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x3E,                   // MVI into accumulator
		  100,          // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This high-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		  0xC6,                   // Add...
		  87,                  // ...This immediate value to accumulator
		  0xF2,                   // JP
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers['A'], 187)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		  assert.equal(c.CPUState.ProgramCounter, 14);
		  assert.equal(c.CPUState.Clock, 48);
		
		});
		
	it('Sign bit is set, program counter is modified', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x3E,                   // MVI into accumulator
		  10,          // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This high-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		  0xC6,                   // Add...
		  10,                  // ...This immediate value to accumulator
		  0xF2,                   // JP
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers['A'], 20)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		  assert.equal(c.CPUState.ProgramCounter, 65535);
		  assert.equal(c.CPUState.Clock, 55);
		
		});
		
});
