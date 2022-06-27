import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAR', () => {
	it('Bit 1 set, Carry not set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  1,         // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Registers['A'], 0)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		
		});
		
	it('Bit 1 not set, Carry not set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  2,         // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.CPUState.Registers['A'], 1)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		
		});
		
	it('Bit 1 set, carry set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  1,         // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Registers['A'], 128)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		
		});
		
	it('Bit 1 not set, Carry set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  2,         // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.CPUState.Registers['A'], 129)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		
		});
		
});
