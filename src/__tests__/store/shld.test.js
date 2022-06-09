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
		
		  assert.equal(c.cpu.clock, 37);
		
		  c.reset();
		}
		});
		
});
