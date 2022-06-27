import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Accumulator (Unset All Flags)', () => {
	it('Unset All Flags', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c._cpu._flagManager.SetFlag(FlagType.Carry);
		c._cpu._flagManager.SetFlag(FlagType.Parity);
		c._cpu._flagManager.SetFlag(FlagType.AuxillaryCarry);
		c._cpu._flagManager.SetFlag(FlagType.Zero);
		c._cpu._flagManager.SetFlag(FlagType.Sign);
		
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers.A, 2);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.CPUState.Clock, 18);
		
		
		c.Reset();
		});
		
});
