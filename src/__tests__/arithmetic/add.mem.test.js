import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Memory', () => {
	it('No Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  0,          // ..this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,1);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity and Zero Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 0;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  0,          // ..this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,0);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Parity Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 84;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  1,          // ..this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,85);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 15;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  1,          // ..this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,16);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry and Sign Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 127;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  1,          // ..this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,128);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
	it('Carry and Aux Carry Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  20,          // ..this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A,19);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.Clock, 45);
		  
		  c.Reset();
		  }
		});
		
});
