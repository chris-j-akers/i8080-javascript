import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CMA', () => {
	it('0xFF becomes 0x00', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    255,        // ... this immediate value
		    0x2F,                 // CMA
		    0x76                  // HALT
		  ]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers['A'], 0);
		assert.equal(c.cpu.clock, 18);
		
		});
		
	it('0x00 becomes 0xFF', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    0,        // ... this immediate value
		    0x2F,                 // CMA
		    0x76                  // HALT
		  ]
		
		c.inject_program(program);
		c.execute_program();
		
		assert.equal(c.cpu.registers['A'], 255);
		assert.equal(c.cpu.clock, 18);
		
		});
		
});
