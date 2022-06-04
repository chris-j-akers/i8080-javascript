import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SBB Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set with Carry Reset', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.inject_program(program);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		c.reset();
		});
		
	it('Carry, AuxCarry, Sign Flags Set with Carry Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.inject_program(program);
		c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 255);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		c.reset();
		});
		
});
