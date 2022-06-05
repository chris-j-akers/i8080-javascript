import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SUB Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x97,           // SUB A
		  0x76            // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		
		c.reset();
		});
		
	it('Carry, Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  255,  // ...this immediate value
		  0x97,           // SUB A
		  0x76            // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers.A, 0);
		assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		assert.equal(c.cpu.clock, 18);
		
		
		c.reset();
		});
		
});
