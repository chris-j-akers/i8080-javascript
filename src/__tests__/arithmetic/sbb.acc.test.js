import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SBB Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set with Carry Reset', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 0);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
	it('Carry, AuxCarry, Sign Flags Set with Carry Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.inject_program(program);
		c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 255);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.cpu.clock, 18);
		
		c.reset();
		});
		
});
