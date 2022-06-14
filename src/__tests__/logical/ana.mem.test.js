import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ANA Memory', () => {
	it('Reset Carry Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 100;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  4,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // Halt Program
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 4);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 45);
		
		  c.reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  0,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // Halt Program
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 0);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 45);
		
		  c.reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  128,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // Halt Program
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 128);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c.cpu.clock, 45);
		
		  c.reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  5,          // Immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // Halt Program
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 5);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 45);
		
		  c.reset();
		  }
		});
		
});
