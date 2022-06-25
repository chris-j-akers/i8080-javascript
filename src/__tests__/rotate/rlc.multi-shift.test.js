import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RLC (Multishift)', () => {
	it('Accumulator shifts left from 170 (10101010) twice and ends up back at 170. Carry is set on first shift and cleared on second.', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x07,           // RLC
		  0x76,           // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c._cpu.Registers['A'], 85)
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  c._cpu.Halt = false;
		  c.ExecuteProgram(0x02);
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.Registers['A'], 170)
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 29);
		
		  c.Reset();
		
		});
		
});
