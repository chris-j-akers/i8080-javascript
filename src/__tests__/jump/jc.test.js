import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('JC', () => {
	it('Carry is set, program counter is modified', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		  0x3E,                   // MVI into accumulator
		  255,          // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		  0xC6,                   // ADI...
		  10,                  // ...This immediate value to accumulator
		  0xDA,                   // JC
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		  0x76,                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers['A'], 9)
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c._cpu.ProgramCounter, 65535);
		  assert.equal(c._cpu.Clock, 55);
		
		  c.Reset();
		
		});
		
	it('Carry is not set, program counter is not modified', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		  0x3E,                   // MVI into accumulator
		  10,          // ...this byte
		  0x26,                   // MVI into Register H...
		  0xFF,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xFE,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		  0xC6,                   // ADI...
		  5,                  // ...This immediate value to accumulator
		  0xDA,                   // JC
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		  0x76,                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers['A'], 15)
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.ProgramCounter, 14);
		  assert.equal(c._cpu.Clock, 48);
		
		  c.Reset();
		
		});
		
});
