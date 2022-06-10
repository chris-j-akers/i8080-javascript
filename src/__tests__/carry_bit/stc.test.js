import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('STC', () => {
	it('STC when Carry unset', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x37,          // Complement Carry
		  0x76           // HALT
		]
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		  assert.equal(c.cpu.clock, 11);
		
		  c.reset();
		});
		
	it('STC when Carry set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  0x37,          // Complement Carry
		  0x76           // HALT
		]
		
		  c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		  assert.equal(c.cpu.clock, 11);
		
		  c.reset();
		});
		
});
