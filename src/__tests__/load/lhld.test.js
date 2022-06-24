import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LHLD', () => {
	it('Move 0x0E into H and 0x71 into L, load into memory using SHLD, clear H/L, then re-load into H/L using LHLD.', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		const program = [
		
		  // PREP
		
		  0x26,                   // MVI into H...
		  0xE,                    // ...this data
		  0x2E,                   // MVI into L...
		  0x71,                   // ...this data
		  0x22,                   // SHLD...
		  null,                   // ...addr low-byte (added, below)
		  null,                   // ...addr high-byte (added, below)
		  0x26,                   // MVI into H...
		  0x00,                   // ...0
		  0x2E,                   // MVI into L....
		  0x00,                   // ...0
		  0x76,                   // HALT
		
		  // TEST
		
		  0x2A,                   // LHLD...
		  null,                   // ...addr low-byte
		  null,                   // ...addr high-byte
		  0x76                    // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {  
		  program[5] = mem_addr & 0xFF;
		  program[6] = (mem_addr >> 8) & 0xFF;
		
		  program[13] = mem_addr & 0xFF;
		  program[14] = (mem_addr >> 8) & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Program pauses at this point so we can check we zero'd H & L
		  assert.equal(c.cpu.Registers['H'], 0);
		  assert.equal(c.cpu.Registers['L'], 0);
		
		  // Continue program from byte 12 (the LHLD test)
		  c.cpu.Halt = false; 
		  c.ExecuteProgram(12);
		
		  assert.equal(c.cpu.Registers['H'], 0xE);
		  assert.equal(c.cpu.Registers['L'], 0x71);
		
		  assert.equal(c.cpu.Clock, 74);
		
		  c.Reset();
		}
		});
		
});
