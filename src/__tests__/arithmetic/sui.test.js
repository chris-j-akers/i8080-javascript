import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SUI', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  32,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A,31);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 21);
		
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  1,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A,0);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 21);
		
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  32,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  2,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A,30);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 21);
		
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  127,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  3,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A,124);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 21);
		
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  255,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A,254);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.CPUState.Clock, 21);
		
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  5,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  10,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A,251);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.CPUState.Clock, 21);
		
		});
		
});
