import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RPO', () => {
	it('Parity is set (Even Parity), program counter is not modified', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
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
		
		  0xE0,                   // RPO
		  0x76,                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers['A'], 20)
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu.ProgramCounter, 20);
		  assert.equal(c.cpu.Clock, 85);
		
		});
		
	it('Parity is not set (Odd Parity), program counter is modified', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
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
		  9,                  // ...This immediate value to accumulator
		
		  // And check
		
		  0xE0,                   // RPO
		  0x76,                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers['A'], 19)
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.ProgramCounter, 43691);
		  assert.equal(c.cpu.Clock, 91);
		
		});
		
});
