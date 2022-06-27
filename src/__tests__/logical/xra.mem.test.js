import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('XRA Memory', () => {
	it('Reset Carry Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		const data = 16;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  20,          // ...this value
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xAE,                   // XRA data in Memory Location with Accumulator
		  0x76                    // Halt Program
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
		  255,          // ...this value
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xAE,                   // XRA data in Memory Location with Accumulator
		  0x76                    // Halt Program
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
		  127,          // ...this value
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xAE,                   // XRA data in Memory Location with Accumulator
		  0x76                    // Halt Program
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
		
		const data = 80;
		
		const program = [
		  0x3E,                   // MVI into Accumulator
		  85,          // ...this value
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0xAE,                   // XRA data in Memory Location with Accumulator
		  0x76                    // Halt Program
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
