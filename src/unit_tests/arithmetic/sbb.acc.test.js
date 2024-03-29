import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

describe('SBB Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set with Carry Reset', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.LoadProgram(program);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A, 0);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 18);
		
		c.Reset();
		});
		
	it('Carry, AuxCarry, Sign Flags Set with Carry Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x9F,           // SBB A
		  0x76            // HALT
		]
		
		c.LoadProgram(program);
		c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A, 255);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c.CPUState.Clock, 18);
		
		c.Reset();
		});
		
});
