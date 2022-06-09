import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RAR', () => {
	it('Bit 1 set, Carry not set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		  0x3E,           // MVI into accumulator
		  1,         // ...this byte
		  0x1F,           // RAL
		  0x76,           // HALT
		]
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 0)
		
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 1 not set, Carry not set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		  0x3E,           // MVI into accumulator
		  2,         // ...this byte
		  0x1F,           // RAL
		  0x76,           // HALT
		]
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 1)
		
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 1 set, carry set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		  0x3E,           // MVI into accumulator
		  1,         // ...this byte
		  0x1F,           // RAL
		  0x76,           // HALT
		]
		
		  c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		  assert.equal(c.cpu.registers['A'], 128)
		
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
	it('Bit 1 not set, Carry set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		  0x3E,           // MVI into accumulator
		  2,         // ...this byte
		  0x1F,           // RAL
		  0x76,           // HALT
		]
		
		  c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.registers['A'], 129)
		
		  assert.equal(c.cpu.flag_set(FlagType.Parity), false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  assert.equal(c.cpu.clock, 18);
		
		  c.reset();
		
		});
		
});
