import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RRC (Multi Shift)', () => {
	it('Accumulator shifts right from 170 (10101010) twice and ends up back at 170. Carry is cleared on first shift and set on second.', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x0F,           // RRC
		  0x76,           // HALT
		]
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 85)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  c.cpu.halt = false;
		  c.execute_program(0x02);
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 170)
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 29);
		
		  c.reset();
		
		});
		
});
