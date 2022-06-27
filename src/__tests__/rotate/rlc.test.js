import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RLC', () => {
	it('Bit 7 set, so should be copied to Carry Flag, then out to LSB', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  242,         // ...this byte
		  0x07,           // RLC
		  0x76,           // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Registers['A'], 229)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		
		});
		
	it('Bit 7 not set, so Carry flag and LSB should remain cleared', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  15,         // ...this byte
		  0x07,           // RLC
		  0x76,           // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.CPUState.Registers['A'], 30)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		
		});
		
});
