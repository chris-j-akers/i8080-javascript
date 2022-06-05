import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('STA', () => {
	it('Store Accumulator in address provided as param', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		
		let program = [
		  0x3E,          // Load into Accumulator...
		  0xFF,          // ... this value
		  0x32,          // STA into..
		  null,          // ...Lower-byte of 16-bit data (to be populated)
		  null,          // ...Higher-byte of 16-bit data (to be populated)
		  0x76           // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = mem_addr & 0xFF;
		  program[4] = (mem_addr >> 8) & 0xff;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.bus.read(mem_addr), 0xFF);
		
		  assert.equal(c.cpu.clock, 27);
		  c.reset();
		
		}
		});
		
});
