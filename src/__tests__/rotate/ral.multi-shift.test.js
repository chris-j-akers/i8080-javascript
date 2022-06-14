import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAL (Multishift)', () => {
	it('Accumulator shifts left from 170 3 times', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x17,           // RAL
		  0x76,           // HALT
		]
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 84)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  c.cpu.halt = false;
		  c.execute_program(0x02);
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 169)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  c.cpu.halt = false;
		  c.execute_program(0x02);
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 82)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 40);
		
		  c.reset();
		
		});
		
});
