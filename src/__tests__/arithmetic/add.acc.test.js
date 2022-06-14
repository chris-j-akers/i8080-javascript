import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Accumulator', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  2,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 4);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Parity and Zero Flags', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  0,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 0);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Parity and Zero Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  0,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 0);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Parity and Aux Carry Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  9,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 18);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Parity, Aux Carry and Sign Flags', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  89,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 178);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Carry, Parity and Sign Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  241,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 226);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
});
