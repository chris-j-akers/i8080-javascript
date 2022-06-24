import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SUI', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  32,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A,31);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.Clock, 21);
		
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  1,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A,0);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.Clock, 21);
		
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  32,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  2,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A,30);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.Clock, 21);
		
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  127,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  3,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A,124);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.Clock, 21);
		
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  255,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  1,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A,254);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.cpu.Clock, 21);
		
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,               // Move into accumulator....
		  5,      // ...this immediate value
		  0xD6,               // SUI from the accumulator...
		  10,             // ...this immediate value
		  0x76                // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A,251);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.cpu.Clock, 21);
		
		});
		
});
