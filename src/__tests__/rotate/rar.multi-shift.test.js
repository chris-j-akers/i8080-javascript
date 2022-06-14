import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAR (Multishift)', () => {
	it('Accumulator shifts right from 170 3 times', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  170,            // ...this byte
		  0x1F,           // RAR
		  0x76,           // HALT
		]
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 85)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  c.cpu.halt = false;
		  c.execute_program(0x02);
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 42)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  c.cpu.halt = false;
		  c.execute_program(0x02);
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 149)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 40);
		
		  c.reset();
		
		});
		
});
