import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ANI', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  4, // ...this value
		  0xE6,          // ANI with ...
		  100,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
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
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  0, // ...this value
		  0xE6,          // ANI with ...
		  255,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  128, // ...this value
		  0xE6,          // ANI with ...
		  255,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 128);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  5, // ...this value
		  0xE6,          // ANI with ...
		  255,        // ...this value
		  0x76           // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 5);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
});
