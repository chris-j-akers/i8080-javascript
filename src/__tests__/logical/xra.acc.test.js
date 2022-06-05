import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('XRA Accumulator', () => {
	it('Zero Accumulator', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    4,        // ... this immediate value
		    0xAF,                 // XRA value in register with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		
		  c.inject_program(program);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 0);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		  }
		});
		
	it('Zero Accumulator and Reset Carry', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    4,        // ... this immediate value
		    0xAF,                 // XRA value in register with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		
		  c.inject_program(program);
		  c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 0);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		  }
		});
		
});
