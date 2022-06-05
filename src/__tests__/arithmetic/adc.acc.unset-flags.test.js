import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADC Accumulator (Unset All Flags)', () => {
	it('Unset All Flags (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x8F,           // ADC A
		  0x76            // Halt
		]
		
		c.cpu.set_flag(FlagType.Parity);
		c.cpu.set_flag(FlagType.AuxillaryCarry);
		c.cpu.set_flag(FlagType.Zero);
		c.cpu.set_flag(FlagType.Sign);
		
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 2);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		c.reset();
		});
		
	it('Unset All Flags and Set Parity (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x8F,           // ADC A
		  0x76            // Halt
		]
		
		c.cpu.set_flag(FlagType.Parity);
		c.cpu.set_flag(FlagType.AuxillaryCarry);
		c.cpu.set_flag(FlagType.Zero);
		c.cpu.set_flag(FlagType.Sign);
		
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 3);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		c.reset();
		});
		
});
