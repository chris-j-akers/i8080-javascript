import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('INR Memory', () => {
	it('Set no flags', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 0;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x34,                   // INR data in Memory Location
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c.cpu.flag_set(FlagType.Carry);
		
		  c.inject_program(program);
		  c.execute_program();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c.cpu.flag_set(FlagType.Carry), carry_set);
		
		  assert.equal(c.bus.read(mem_addr),1);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 41);
		  
		  c.reset();
		  }
		});
		
	it('Rollover from 255 (Set Parity, AC and Zero flags)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 255;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x34,                   // INR data in Memory Location
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c.cpu.flag_set(FlagType.Carry);
		
		  c.inject_program(program);
		  c.execute_program();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c.cpu.flag_set(FlagType.Carry), carry_set);
		
		  assert.equal(c.bus.read(mem_addr),0);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 41);
		  
		  c.reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 84;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x34,                   // INR data in Memory Location
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c.cpu.flag_set(FlagType.Carry);
		
		  c.inject_program(program);
		  c.execute_program();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c.cpu.flag_set(FlagType.Carry), carry_set);
		
		  assert.equal(c.bus.read(mem_addr),85);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  
		  assert.equal(c.cpu.clock, 41);
		  
		  c.reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const data = 175;
		
		const program = [
		  0x26,                   // MVI into H...
		  null,                   // ...the high-byte of the memory address (ro be inserted)
		  0x2E,                   // MVI into L...
		  null,                   // ... the low-byte of the memory address (to be inserted)
		  0x36,                   // MVI into the memory address...
		  data,                   // ...the data value
		  0x34,                   // INR data in Memory Location
		  0x76                    // Halt Program
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		let carry_set;
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		
		  carry_set = c.cpu.flag_set(FlagType.Carry);
		
		  c.inject_program(program);
		  c.execute_program();
		
		  // Here, we're just checking the carry flag hasn't been touched.
		  assert.equal(c.cpu.flag_set(FlagType.Carry), carry_set);
		
		  assert.equal(c.bus.read(mem_addr),176);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		  
		  assert.equal(c.cpu.clock, 41);
		  
		  c.reset();
		  }
		});
		
});
