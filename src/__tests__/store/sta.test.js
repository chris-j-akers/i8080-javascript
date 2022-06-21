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
		  null,          // ...addr low-byte (inserted, below)
		  null,          // ...addr high-byte (inserted, below)
		  0x76           // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = mem_addr & 0xFF;
		  program[4] = (mem_addr >> 8) & 0xff;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.ReadRAM(mem_addr), 0xFF);
		
		  assert.equal(c.cpu.Clock, 27);
		  c.Reset();
		
		}
		});
		
});
