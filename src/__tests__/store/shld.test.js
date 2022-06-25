import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('SHLD', () => {
	it('Store H & L values in 16-bit address found by combining B, C', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		const program = [
		  0x26,                   // MVI into H...
		  0xE,                    // ...this data
		  0x2E,                   // MVI into L...
		  0x71,                   // ...this data
		  0x22,                   // SHLD
		  null,                   // addr low-byte (inserted, below)
		  null,                   // addr high-byte (inserted, below)
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {  
		  program[5] = mem_addr & 0xFF;
		  program[6] = (mem_addr >> 8) & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.Bus.ReadRAM(mem_addr), 0x71);
		  assert.equal(c.Bus.ReadRAM(mem_addr + 1), 0xE);
		
		  assert.equal(c._cpu.Clock, 37);
		
		  c.Reset();
		}
		});
		
});
