import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('SHLD', () => {
	it('Store Accumulator in address found in registers B,C', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		
		const program = [
		  0x26,                   // MOV into H...
		  0xE,                    // ...this data
		  0x2E,                   // MOV into L...
		  0x71,                   // ...this data
		  0x22,                   // SHLD
		  null,                   // Low-byte of address (to be populated)
		  null,                   // High-byte of addres (to be populated)
		  0x76                    // Halt Program
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {  
		  program[5] = mem_addr & 0xFF;
		  program[6] = (mem_addr >> 8) & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.bus.read(mem_addr), 0x71);
		  assert.equal(c.bus.read(mem_addr + 1), 0xE);
		
		  c.reset();
		}
		});
		
});
