import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADC Accumulator (Unset All Flags)', () => {
	it('Unset All Flags (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x8F,           // ADC A
		  0x76            // Halt
		]
		
		c._cpu.FlagManager.SetFlag(FlagType.Parity);
		c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		c._cpu.FlagManager.SetFlag(FlagType.Zero);
		c._cpu.FlagManager.SetFlag(FlagType.Sign);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 2);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 18);
		c.Reset();
		});
		
	it('Unset All Flags and Set Parity (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x8F,           // ADC A
		  0x76            // Halt
		]
		
		c._cpu.FlagManager.SetFlag(FlagType.Parity);
		c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		c._cpu.FlagManager.SetFlag(FlagType.Zero);
		c._cpu.FlagManager.SetFlag(FlagType.Sign);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 3);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 18);
		c.Reset();
		});
		
});
