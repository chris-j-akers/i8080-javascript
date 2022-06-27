import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('SPHL', () => {
	it('Standard SPHL (taken from 8080 programmers manual)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                   // MVI into Register H...
		  80,           // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  108,           // ...This low-byte
		  0xF9,                   // SPHL
		  0x76,                   // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  // Check we're set-up correctly
		
		  assert.equal(c.CPUState.StackPointer, 80 << 8 | 108);
		  assert.equal(c.CPUState.Clock, 26);
		
		});
		
});
