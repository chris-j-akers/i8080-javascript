import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SUB Memory (Unset All Flags)', () => {
	it('Unset All Flags', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
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
		  0x96, // SUB M
		  0x76  // HALT
		]
		
		/**
		  * Our little test program already takes up some memory,
		  * so we start tests after the code.
		  */
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.cpu.set_flag(FlagType.Carry);
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A,31);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		  c.reset();
		  }
		});
		
});
