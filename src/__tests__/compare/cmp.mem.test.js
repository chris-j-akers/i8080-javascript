import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CMP Memory', () => {
	it('No Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E,             // MVI into Accumulator...
		  32,    // ...this immediate value
		  0x26,             // MOV into H...
		  null,             // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E,             // MOV into L...
		  null,             // ... the low-byte of the memory address of data (to be filled, below)
		  0x36,             // MOV into the memory address...
		  data,             // ...the data
		  0xBE,             // CMP M
		  0x76              // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A,32);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity, Aux Carry and Zero Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E,             // MVI into Accumulator...
		  1,    // ...this immediate value
		  0x26,             // MOV into H...
		  null,             // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E,             // MOV into L...
		  null,             // ... the low-byte of the memory address of data (to be filled, below)
		  0x36,             // MOV into the memory address...
		  data,             // ...the data
		  0xBE,             // CMP M
		  0x76              // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A,1);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 2;
		
		const program = [
		  0x3E,             // MVI into Accumulator...
		  32,    // ...this immediate value
		  0x26,             // MOV into H...
		  null,             // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E,             // MOV into L...
		  null,             // ... the low-byte of the memory address of data (to be filled, below)
		  0x36,             // MOV into the memory address...
		  data,             // ...the data
		  0xBE,             // CMP M
		  0x76              // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A,32);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 3;
		
		const program = [
		  0x3E,             // MVI into Accumulator...
		  127,    // ...this immediate value
		  0x26,             // MOV into H...
		  null,             // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E,             // MOV into L...
		  null,             // ... the low-byte of the memory address of data (to be filled, below)
		  0x36,             // MOV into the memory address...
		  data,             // ...the data
		  0xBE,             // CMP M
		  0x76              // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A,127);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Sign Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E,             // MVI into Accumulator...
		  255,    // ...this immediate value
		  0x26,             // MOV into H...
		  null,             // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E,             // MOV into L...
		  null,             // ... the low-byte of the memory address of data (to be filled, below)
		  0x36,             // MOV into the memory address...
		  data,             // ...the data
		  0xBE,             // CMP M
		  0x76              // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A,255);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Carry Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 10;
		
		const program = [
		  0x3E,             // MVI into Accumulator...
		  5,    // ...this immediate value
		  0x26,             // MOV into H...
		  null,             // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E,             // MOV into L...
		  null,             // ... the low-byte of the memory address of data (to be filled, below)
		  0x36,             // MOV into the memory address...
		  data,             // ...the data
		  0xBE,             // CMP M
		  0x76              // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A,5);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
});
