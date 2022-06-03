import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADI', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  0,  // ...this immediate value
		  0xC6,          // ADI to the accumulator...
		  1,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,1);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Set Parity and Zero Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  0,  // ...this immediate value
		  0xC6,          // ADI to the accumulator...
		  0,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xC6,          // ADI to the accumulator...
		  84,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,85);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Set Parity and Aux Carry Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  15,  // ...this immediate value
		  0xC6,          // ADI to the accumulator...
		  15,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,30);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  112,  // ...this immediate value
		  0xC6,          // ADI to the accumulator...
		  64,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,176);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		});
		
	it('Set Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  66,  // ...this immediate value
		  0xC6,          // ADI to the accumulator...
		  192,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,2);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		});
		
});
