import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LHLD', () => {
	it('Move 0x0E into H and 0x71 into L, load into memory using SHLD, clear H/L, then re-load into H/L using LHLD.', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		const program = [
		
		  // Prep
		
		  0x26,                   // MVI into H...
		  0xE,                    // ...this data
		  0x2E,                   // MVI into L...
		  0x71,                   // ...this data
		  0x22,                   // SHLD
		  null,                   // Low-byte of address (to be populated)
		  null,                   // High-byte of addres (to be populated)
		  0x26,                   // MVI into H...
		  0x00,                   // 0
		  0x2E,                   // MVI into L....
		  0x00,                   // 0
		  0x76,                    // HALT (So we can check they're now 0)
		
		  // Test
		
		  0x2A,                   // LHLD - Finally, the actual test!
		  null,                   // Low byte of mem addr
		  null,                   // High byte of mem addr
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {  
		  program[5] = mem_addr & 0xFF;
		  program[6] = (mem_addr >> 8) & 0xFF;
		
		  program[13] = mem_addr & 0xFF;
		  program[14] = (mem_addr >> 8) & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  // Program pauses at this point so we can check we zero'd H & L
		  assert.equal(c.cpu.registers['H'], 0);
		  assert.equal(c.cpu.registers['L'], 0);
		
		  // Continue program from byte 12 (the LHLD test)
		  c.cpu.halt = false; 
		  c.execute_program(12);
		
		  assert.equal(c.cpu.registers['H'], 0xE);
		  assert.equal(c.cpu.registers['L'], 0x71);
		
		  assert.equal(c.cpu.clock, 74);
		
		  c.reset();
		}
		});
		
});
