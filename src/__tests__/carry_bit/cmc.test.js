import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CMC', () => {
	it('CMC when carry set (should become unset)', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3F,          // Complement Carry
		  0x76          // HALT
		]
		
		  c.cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  assert.equal(c.cpu.Clock, 11);
		
		  c.Reset();
		});
		
	it('CMC when carry unset (should become set)', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x3F,          // Complement Carry
		  0x76          // HALT
		]
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		  assert.equal(c.cpu.Clock, 11);
		
		  c.Reset();
		});
		
});
