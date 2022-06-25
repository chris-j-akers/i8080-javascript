import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('XRA Accumulator', () => {
	it('Zero Accumulator', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    4,        // ... this immediate value
		    0xAF,                 // XRA value in register with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		
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
		  }
		});
		
	it('Zero Accumulator and Reset Carry', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    4,        // ... this immediate value
		    0xAF,                 // XRA value in register with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		
		  c.InjectProgram(program);
		  c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 0);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 18);
		
		  c.Reset();
		  }
		});
		
});
