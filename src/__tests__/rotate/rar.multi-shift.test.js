import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAR (Multishift)', () => {
	it('Accumulator shifts right from 170 3 times', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.Registers['A'], 85)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  c.cpu.Halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.Registers['A'], 42)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  c.cpu.Halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.Registers['A'], 149)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 40);
		
		  c.Reset();
		
		});
		
});
