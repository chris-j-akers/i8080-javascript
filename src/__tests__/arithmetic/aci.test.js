import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ACI', () => {
	it('No Flags Set (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  0,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  1,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,1);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('No Flags Set (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  0,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  1,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,2);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Parity and Zero Flags (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  0,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  0,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Parity Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  84,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,85);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Parity Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  83,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,85);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Aux Carry Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  15,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,16);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Aux Carry Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  14,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,16);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Aux Carry and Sign Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  127,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,128);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Sign Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  126,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,128);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Carry and Aux Carry Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  20,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  255,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,19);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
	it('Set Carry and Parity Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // Move into accumulator....
		  1,  // ...this immediate value
		  0xCE,          // ACI to the accumulator...
		  254,          // ...this immediate value
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A,0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		assert.equal(c.cpu.flag_set(FlagType.Parity), true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 21);
		
		});
		
});
