import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('STA', () => {
	it('Store Accumulator in address provided as param', () => {
		const max_mem_addr = 4095;
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
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.bus.Read(mem_addr), 0xFF);
		
		  assert.equal(c.cpu.Clock, 27);
		  c.Reset();
		
		}
		});
		
});
