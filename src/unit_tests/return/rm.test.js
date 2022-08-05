import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

describe('RM', () => {
	it('Sign is set, program counter is modified', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		
		  // Store configurable value into the Accumulator
		
		  0x3E,                   // MVI into accumulator
		  100,          // ...this byte
		
		  // Set stack pointer at address 0xFFFE
		
		  0x31,                   // Load stack pointer with...
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		
		  //  Move 0xAA into Register B and 0xAA into Register C,
		  //  then push onto the Stack. (0xAAAA is the return address we will RET to)
		
		  0x06,                   // MVI into register B...
		  0xAA,                   // ...This high addr byte
		  0x0E,                   // MVI into register C...
		  0xAA,                   // ...This low addr byte
		  0xC5,                   // PUSH B
		
		  //  Move OpCode 0x76 (HALT) into memory location 0xAAAA (so the test will HALT when it RETS)
		
		  0x26,                   // MVI into Register H...
		  0xAA,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xAA,                   // ...This high-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		
		  // Now perform ADD
		
		  0xC6,                   // Add...
		  87,                  // ...This immediate value to accumulator
		
		  // And check
		
		  0xF8,                   // RM
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers['A'], 187)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		  assert.equal(c.CPUState.ProgramCounter, 43691);
		  assert.equal(c.CPUState.Clock, 91);
		
		});
		
	it('Sign bit is set, program counter is not modified', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		
		  // Store configurable value into the Accumulator
		
		  0x3E,                   // MVI into accumulator
		  10,          // ...this byte
		
		  // Set stack pointer at address 0xFFFE
		
		  0x31,                   // Load stack pointer with...
		  0xFE,                   // ..This low-byte
		  0xFF,                   // ...and this high-byte
		
		  //  Move 0xAA into Register B and 0xAA into Register C,
		  //  then push onto the Stack. (0xAAAA is the return address we will RET to)
		
		  0x06,                   // MVI into register B...
		  0xAA,                   // ...This high addr byte
		  0x0E,                   // MVI into register C...
		  0xAA,                   // ...This low addr byte
		  0xC5,                   // PUSH B
		
		  //  Move OpCode 0x76 (HALT) into memory location 0xAAAA (so the test will HALT when it RETS)
		
		  0x26,                   // MVI into Register H...
		  0xAA,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xAA,                   // ...This high-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  0x76,                   // ...OpCode 0x76 (So the program HALTS when the program counter changes on JNZ)
		
		  // Now perform ADD
		
		  0xC6,                   // Add...
		  10,                  // ...This immediate value to accumulator
		
		  // And check
		
		  0xF8,                   // RM
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers['A'], 20)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		  assert.equal(c.CPUState.ProgramCounter, 20);
		  assert.equal(c.CPUState.Clock, 85);
		
		});
		
});
