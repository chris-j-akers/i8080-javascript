import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CMC', () => {
	it('CMC when carry set (should become unset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3F,          // Complement Carry
		  0x76          // HALT
		]
		
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
		  assert.equal(c.cpu.clock, 11);
		
		  c.reset();
		});
		
	it('CMC when carry unset (should become set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x3F,          // Complement Carry
		  0x76          // HALT
		]
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		  assert.equal(c.cpu.clock, 11);
		
		  c.reset();
		});
		
});
