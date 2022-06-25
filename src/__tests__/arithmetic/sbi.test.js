import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SBI', () => {
	it('No Flags Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  32,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  1,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,31);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('No Flags Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  33,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  1,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,31);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  1,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  1,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,0);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  3,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  2,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,0);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Parity Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  32,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  2,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,30);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Parity Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  32,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  1,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,30);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Aux Carry Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  127,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  3,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,124);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Aux Carry Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  127,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  4,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,122);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  255,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  1,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,254);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  253,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  3,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,249);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  5,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  10,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,251);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Carry and Sign Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,                   // MVI into accumulator....
		  5,          // ...this immediate value
		  0xDE,                   // SBI from the accumulator...
		  9,                 // ...this immediate value
		  0x76                    // HALT 
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,251);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
});
