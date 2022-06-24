import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Accumulator (Unset All Flags)', () => {
	it('Unset All Flags', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3E,           // MVI into accumulator ...
		  1,  // ...this immediate value
		  0x87,           // ADD A
		  0x76            // Halt
		]
		
		c.cpu.FlagManager.SetFlag(FlagType.Carry);
		c.cpu.FlagManager.SetFlag(FlagType.Parity);
		c.cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		c.cpu.FlagManager.SetFlag(FlagType.Zero);
		c.cpu.FlagManager.SetFlag(FlagType.Sign);
		
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.cpu.Registers.A, 2);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c.cpu.Clock, 18);
		
		
		c.Reset();
		});
		
});
