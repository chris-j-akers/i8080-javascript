import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CP', () => {
	it('Sign is set, call is not made', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		
		  // This program should:
		  //
		  // 1) Initialise the Stack at location 0xFFFF
		  // 2) Load INR OpCode (0x3C) into Memory Address 0xAAAA
		  // 3) Load RET OpCode (0xC9) into Memory Address 0xAAAB
		  // 4) Load an immediate value into accumulator
		  // 5) Perform subtract immediate operation on accumulator
		  // 6) Call code at memory address 0xAAAA if zero flag was *not* set
		  // 7) Increment the Accumulator
		  // 8) Return back to previous location
		  // 9) HALT
		
		  // Initialise Stack
		
		  0x31,                         // Initialise stack at... (LXI)
		  65535 & 0xFF,       // ..This low-byte and...
		  65535 >> 8 & 0xFF,  // This high-byte
		  
		  // Load commands to increment accumulator into 0xAAAA and RTN into 0xAAAB
		
		  0x26,                   // MVI into Register H...
		  0xAA,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xAA,                   // ...This low-byte
		  0x36,                   // MVI into above memory address
		  0x3C,                   // INR A OpCode
		  0x2E,                   // MVI into Register L...
		  0xAB,                   // ...This low-byte
		  0x36,                   // MVI into above memory address
		  0xC9,                   // RET 
		
		  // Now perform calculation to trigger/or not trigger flag
		
		  0x3E,                   // MVI into accumulator
		  100,          // ...this byte
		  0xC6,                   // ADI...
		  87,                  // ...This immediate value from accumulator
		  0xF4,                   // CP
		  0xAA,                   // ...low-byte of address
		  0xAA,                   // ...high-byte of address
		  0x76,                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers['A'], 187);
		  assert.equal(c._cpu.StackPointer, 65535);
		  
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		  assert.equal(c._cpu.Clock, 83);
		
		  });
		
	it('Sign bit is set, call is made', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		
		  // This program should:
		  //
		  // 1) Initialise the Stack at location 0xFFFF
		  // 2) Load INR OpCode (0x3C) into Memory Address 0xAAAA
		  // 3) Load RET OpCode (0xC9) into Memory Address 0xAAAB
		  // 4) Load an immediate value into accumulator
		  // 5) Perform subtract immediate operation on accumulator
		  // 6) Call code at memory address 0xAAAA if zero flag was *not* set
		  // 7) Increment the Accumulator
		  // 8) Return back to previous location
		  // 9) HALT
		
		  // Initialise Stack
		
		  0x31,                         // Initialise stack at... (LXI)
		  65535 & 0xFF,       // ..This low-byte and...
		  65535 >> 8 & 0xFF,  // This high-byte
		  
		  // Load commands to increment accumulator into 0xAAAA and RTN into 0xAAAB
		
		  0x26,                   // MVI into Register H...
		  0xAA,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  0xAA,                   // ...This low-byte
		  0x36,                   // MVI into above memory address
		  0x3C,                   // INR A OpCode
		  0x2E,                   // MVI into Register L...
		  0xAB,                   // ...This low-byte
		  0x36,                   // MVI into above memory address
		  0xC9,                   // RET 
		
		  // Now perform calculation to trigger/or not trigger flag
		
		  0x3E,                   // MVI into accumulator
		  10,          // ...this byte
		  0xC6,                   // ADI...
		  10,                  // ...This immediate value from accumulator
		  0xF4,                   // CP
		  0xAA,                   // ...low-byte of address
		  0xAA,                   // ...high-byte of address
		  0x76,                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers['A'], 21);
		  assert.equal(c._cpu.StackPointer, 65535);
		  
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		  assert.equal(c._cpu.Clock, 104);
		
		  });
		
});
