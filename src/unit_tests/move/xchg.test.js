import { Computer } from '../../core/computer.js'
import { strict as assert } from 'assert'

describe('XCHG', () => {
	it('Standard Exchange (taken from 8080 Programmers Manual Example)', () => {
		const c = new Computer();
		
		let program = [
		  0x26,          // MVI into H..
		  0,  // ... this data
		  0x2E,          // MVI into L
		  255,  // ...This data
		  0x16,          // MVI into D
		  51,  // ...this data
		  0x1E,          // MVI into E
		  85,  // ...this data
		  0xEB,          // XCHNG
		  0x76           // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers['D'], 0);
		assert.equal(c.CPUState.Registers['E'], 255);
		assert.equal(c.CPUState.Registers['H'], 51);
		assert.equal(c.CPUState.Registers['L'], 85);
		
		assert.equal(c.CPUState.Clock, 40);
		
		});
		
});
