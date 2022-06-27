import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CMP Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0xBF,           // CMP A
		  0x76            // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A, 1);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 18);
		
		
		c.Reset();
		});
		
	it('Carry, Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  255,  // ...this immediate value
		  0xBF,           // CMP A
		  0x76            // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A, 255);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 18);
		
		
		c.Reset();
		});
		
});
