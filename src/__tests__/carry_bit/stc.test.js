import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('STC', () => {
	it('STC when Carry unset', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x37,          // Complement Carry
		  0x76           // HALT
		]
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Clock, 11);
		
		  c.Reset();
		});
		
	it('STC when Carry set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x37,          // Complement Carry
		  0x76           // HALT
		]
		
		  c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.CPUState.Clock, 11);
		
		  c.Reset();
		});
		
});
