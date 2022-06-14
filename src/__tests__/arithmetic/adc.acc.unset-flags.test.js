import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADC Accumulator (Unset All Flags)', () => {
	it('Unset All Flags (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x8F,           // ADC A
		  0x76            // Halt
		]
		
		c.cpu._flag_manager.SetFlag(FlagType.Parity);
		c.cpu._flag_manager.SetFlag(FlagType.AuxillaryCarry);
		c.cpu._flag_manager.SetFlag(FlagType.Zero);
		c.cpu._flag_manager.SetFlag(FlagType.Sign);
		
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		c.inject_program(program);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 2);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		c.reset();
		});
		
	it('Unset All Flags and Set Parity (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x8F,           // ADC A
		  0x76            // Halt
		]
		
		c.cpu._flag_manager.SetFlag(FlagType.Parity);
		c.cpu._flag_manager.SetFlag(FlagType.AuxillaryCarry);
		c.cpu._flag_manager.SetFlag(FlagType.Zero);
		c.cpu._flag_manager.SetFlag(FlagType.Sign);
		
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		c.inject_program(program);
		c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 3);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		c.reset();
		});
		
});
