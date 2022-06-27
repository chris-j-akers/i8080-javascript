import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAR (Multishift)', () => {
	it('Accumulator shifts right from 170 3 times', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.CPUState.Registers['A'], 85)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  c._cpu._halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Registers['A'], 42)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  c._cpu._halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.CPUState.Registers['A'], 149)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 40);
		
		  c.Reset();
		
		});
		
});
