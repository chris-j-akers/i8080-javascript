import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ORI', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  5, // ...this value
		  0xF6,          // ORI with ...
		  4,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 5);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  0, // ...this value
		  0xF6,          // ORI with ...
		  0,        // ...this value
		  0x76           // HALT
		]
		
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
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  127, // ...this value
		  0xF6,          // ORI with ...
		  255,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 255);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  68, // ...this value
		  0xF6,          // ORI with ...
		  81,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 85);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
});
