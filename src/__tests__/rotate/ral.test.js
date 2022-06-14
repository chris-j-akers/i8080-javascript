import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAL', () => {
	it('Bit 7 set, Carry not set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  181,         // ...this byte
		  0x17,           // RAL
		  0x76,           // HALT
		]
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 106)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 7 not set, Carry not set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  106,         // ...this byte
		  0x17,           // RAL
		  0x76,           // HALT
		]
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 212)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 7 set, carry set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  181,         // ...this byte
		  0x17,           // RAL
		  0x76,           // HALT
		]
		
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 107)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 7 not set, Carry set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x3E,           // MVI into accumulator
		  106,         // ...this byte
		  0x17,           // RAL
		  0x76,           // HALT
		]
		
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 213)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
});
