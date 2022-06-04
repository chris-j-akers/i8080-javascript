import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SUI', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,               // Move into accumulator....
		  32,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,31);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,               // Move into accumulator....
		  1,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,               // Move into accumulator....
		  32,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  2,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,30);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,               // Move into accumulator....
		  127,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  3,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,124);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,               // Move into accumulator....
		  255,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,254);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,               // Move into accumulator....
		  5,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  10,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,251);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		});
		
});
