import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADI', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,             // MVI into accumulator....
		  0,    // ...this immediate value
		  0xC6,             // ADI to the accumulator...
		  1,           // ...this immediate value
		  0x76              // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,1);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Set Parity and Zero Flags', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,             // MVI into accumulator....
		  0,    // ...this immediate value
		  0xC6,             // ADI to the accumulator...
		  0,           // ...this immediate value
		  0x76              // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,0);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,             // MVI into accumulator....
		  1,    // ...this immediate value
		  0xC6,             // ADI to the accumulator...
		  84,           // ...this immediate value
		  0x76              // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,85);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Set Parity and Aux Carry Flags', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,             // MVI into accumulator....
		  15,    // ...this immediate value
		  0xC6,             // ADI to the accumulator...
		  15,           // ...this immediate value
		  0x76              // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,30);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,             // MVI into accumulator....
		  112,    // ...this immediate value
		  0xC6,             // ADI to the accumulator...
		  64,           // ...this immediate value
		  0x76              // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,176);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
	it('Set Carry Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,             // MVI into accumulator....
		  66,    // ...this immediate value
		  0xC6,             // ADI to the accumulator...
		  192,           // ...this immediate value
		  0x76              // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A,2);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 21);
		
		});
		
});
