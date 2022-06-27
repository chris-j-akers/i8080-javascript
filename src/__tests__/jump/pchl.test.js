import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('PCHL', () => {
	it('Standard PCHL (taken from 8080 programmers manual)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                   // MVI into Register H...
		  65,           // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  62,           // ...This low-byte
		  0x36,                   // MVI into Mem Location
		  0x76,                   // HALT command (so when PCHL is called, the program stops)
		  0xE9,                   // PCHL
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  // Check we're set-up correctly
		
		  // + 1 on Program Counter because the HALT command would have been executed
		  assert.equal(c.CPUState.ProgramCounter, 65 << 8 | 62 + 1);
		  assert.equal(c.CPUState.Clock, 36);
		
		});
		
});
