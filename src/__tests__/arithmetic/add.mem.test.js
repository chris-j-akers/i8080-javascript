import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Memory', () => {
	it('No Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 1;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  0,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,1);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 45);
		  
		  c.reset();
		  }
		});
		
	it('Parity and Zero Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 0;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  0,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,0);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 45);
		  
		  c.reset();
		  }
		});
		
	it('Parity Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 84;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  1,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,85);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 45);
		  
		  c.reset();
		  }
		});
		
	it('Aux Carry Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 15;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  1,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,16);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 45);
		  
		  c.reset();
		  }
		});
		
	it('Aux Carry and Sign Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 127;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  1,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,128);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.clock, 45);
		  
		  c.reset();
		  }
		});
		
	it('Carry and Aux Carry Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  20,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,19);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 45);
		  
		  c.reset();
		  }
		});
		
});
