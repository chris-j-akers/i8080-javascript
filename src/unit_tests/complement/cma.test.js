import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

describe('CMA', () => {
	it('0xFF becomes 0x00', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    255,        // ... this immediate value
		    0x2F,                 // CMA
		    0x76                  // HALT
		  ]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers['A'], 0);
		assert.equal(c.CPUState.Clock, 18);
		
		});
		
	it('0x00 becomes 0xFF', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    0,        // ... this immediate value
		    0x2F,                 // CMA
		    0x76                  // HALT
		  ]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		
		assert.equal(c.CPUState.Registers['A'], 255);
		assert.equal(c.CPUState.Clock, 18);
		
		});
		
});
