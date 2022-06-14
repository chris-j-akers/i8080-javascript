import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SBB Memory', () => {
	it('No Flags Set (Carry Bit Reset)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  32, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,31);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('No Flags Set (Carry Bit Set)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  33, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,31);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Reset)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  1, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,0);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Set)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 2;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  3, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,0);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity Flag Set (Carry Bit Reset)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 2;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  32, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,30);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity Flag Set (Carry Bit Set)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  32, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,30);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry Set (Carry Bit Reset)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 3;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  127, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,124);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry Set (Carry Bit Set)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 4;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  127, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,122);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  255, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,254);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Set)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 3;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  253, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,249);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 10;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  5, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,251);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Carry and Sign Flag Set (Carry Bit Set)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 9;
		
		const program = [
		  0x3E, // MVI into Accumulator...
		  5, // ...this immediate value
		  0x26, // MOV into H...
		  null, // ...the high-byte of the memory address of data (to be filled, below)
		  0x2E, // MOV into L...
		  null, // ... the low-byte of the memory address of data (to be filled, below)
		  0x36, // MOV into the memory address...
		  data, // ...the data
		  0x9E, // SBB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,251);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
});
