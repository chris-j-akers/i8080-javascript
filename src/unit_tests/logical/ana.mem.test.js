import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

describe('ANA Memory', () => {
	it('Reset Carry Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
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
		
		  c.LoadProgram(program);
		  c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 4);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 45);
		
		  c.Reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
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
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 0);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 45);
		
		  c.Reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
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
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 128);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c.CPUState.Clock, 45);
		
		  c.Reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
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
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 5);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 45);
		
		  c.Reset();
		  }
		});
		
});
