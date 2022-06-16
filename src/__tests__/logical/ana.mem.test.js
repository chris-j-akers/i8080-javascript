import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ANA Memory', () => {
	it('Reset Carry Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 100;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  4,          // ...this immediate value
		  0x26,                   // MVI into H...
		  null,                   // ...addr high-byte (inserted, below)
		  0x2E,                   // MVI into L...
		  null,                   // ...addr low-byte (inserted, below)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A, 4);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 45);
		
		  c.Reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  0,          // ...this immediate value
		  0x26,                   // MVI into H...
		  null,                   // ...addr high-byte (inserted, below)
		  0x2E,                   // MVI into L...
		  null,                   // ...addr low-byte (inserted, below)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A, 0);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 45);
		
		  c.Reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  128,          // ...this immediate value
		  0x26,                   // MVI into H...
		  null,                   // ...addr high-byte (inserted, below)
		  0x2E,                   // MVI into L...
		  null,                   // ...addr low-byte (inserted, below)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A, 128);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c.cpu.Clock, 45);
		
		  c.Reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  5,          // ...this immediate value
		  0x26,                   // MVI into H...
		  null,                   // ...addr high-byte (inserted, below)
		  0x2E,                   // MVI into L...
		  null,                   // ...addr low-byte (inserted, below)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0xA6,                   // ANA data in Memory Location with Accumulator
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A, 5);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 45);
		
		  c.Reset();
		  }
		});
		
});
