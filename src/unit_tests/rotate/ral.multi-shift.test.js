import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

describe('RAL (Multishift)', () => {
	it('Accumulator shifts left from 170 3 times', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x17,           // RAL
		  0x76,           // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Registers['A'], 84)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  c._cpu._halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.CPUState.Registers['A'], 169)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  c._cpu._halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Registers['A'], 82)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 40);
		
		  c.Reset();
		
		});
		
});
