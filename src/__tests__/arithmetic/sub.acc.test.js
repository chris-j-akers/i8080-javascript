import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SUB Accumulator Flag', () => {
	it('Zero, AuxCarry, Parity Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x97,           // SUB A
		  0x76            // HALT
		]
		
		c.InjectProgram(program);
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
		
	it('Carry, Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  255,  // ...this immediate value
		  0x97,           // SUB A
		  0x76            // HALT
		]
		
		c.InjectProgram(program);
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
		
});
