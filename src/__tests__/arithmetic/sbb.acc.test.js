import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SBB Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set with Carry Reset', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.InjectProgram(program);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 0);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 18);
		
		c.Reset();
		});
		
	it('Carry, AuxCarry, Sign Flags Set with Carry Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.InjectProgram(program);
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c._cpu.Registers.A, 255);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 18);
		
		c.Reset();
		});
		
});
