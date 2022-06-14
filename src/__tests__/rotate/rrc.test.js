import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RRC', () => {
	it('Bit 0 set, so should be copied to Carry Flag, then out to MSB', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  15,         // ...this byte
		  0x0F,           // RRC
		  0x76,           // HALT
		]
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 135)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 7 not set, so Carry flag and MSB should remain cleared', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  242,         // ...this byte
		  0x0F,           // RRC
		  0x76,           // HALT
		]
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 121)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
});
