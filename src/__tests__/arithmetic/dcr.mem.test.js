import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('DCR Memory', () => {
	it('No Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const data = 32;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x35,                   // DCR data in Memory Location
		  0x76                    // Halt Program
		]
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		  assert.equal(c.Bus.ReadRAM(mem_addr),31);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c._cpu.Clock, 41);
		  
		  c.Reset();
		  }
		});
		
	it('Parity, Aux Carry and Zero Flags Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x35,                   // DCR data in Memory Location
		  0x76                    // Halt Program
		]
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		  assert.equal(c.Bus.ReadRAM(mem_addr),0);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c._cpu.Clock, 41);
		  
		  c.Reset();
		  }
		});
		
	it('Parity and Auxillary Carry Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const data = 66;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x35,                   // DCR data in Memory Location
		  0x76                    // Halt Program
		]
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		  assert.equal(c.Bus.ReadRAM(mem_addr),65);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c._cpu.Clock, 41);
		  
		  c.Reset();
		  }
		});
		
	it('Aux Carry Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const data = 125;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x35,                   // DCR data in Memory Location
		  0x76                    // Halt Program
		]
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		  assert.equal(c.Bus.ReadRAM(mem_addr),124);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		  
		  assert.equal(c._cpu.Clock, 41);
		  
		  c.Reset();
		  }
		});
		
	it('Sign Flag Set', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const data = 255;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x35,                   // DCR data in Memory Location
		  0x76                    // Halt Program
		]
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		  assert.equal(c.Bus.ReadRAM(mem_addr),254);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		  
		  assert.equal(c._cpu.Clock, 41);
		  
		  c.Reset();
		  }
		});
		
});
