import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('XRI', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  20, // ...this value
		  0xEE,          // XRI with ...
		  16,        // ...this value
		  0x76           // HALT
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 4);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 18);
		
		c.Reset();
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  255, // ...this value
		  0xEE,          // XRI with ...
		  255,        // ...this value
		  0x76           // HALT
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 0);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 18);
		
		c.Reset();
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  127, // ...this value
		  0xEE,          // XRI with ...
		  255,        // ...this value
		  0x76           // HALT
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 128);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 18);
		
		c.Reset();
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,          // MVI into Accumulator....
		  85, // ...this value
		  0xEE,          // XRI with ...
		  80,        // ...this value
		  0x76           // HALT
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 5);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 18);
		
		c.Reset();
		});
		
});
