import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LDA', () => {
	it('LDA data from Memory', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		const data = 0xFF;
		
		let program = [
		
		  // Prep - Load data into memory location, first
		  
		  0x26,         // MVI into H register...
		  null,         // Mem addr high-byte
		  0x2E,         // MVI into L register...
		  null,         // Mem addr low-byte
		  0x36,         // MVI into memory location...
		  data,         // ...the data.
		  
		  // Now the test
		
		  0x3A,         // LDA...
		  null,         // Low-byte of address
		  null,         // High-byte of address
		  0x76,         // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		  program[7] = mem_addr & 0xFF;
		  program[8] = (mem_addr >> 8) & 0xFF;
		 
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers['A']);
		  assert.equal(c.cpu.Clock, 44)
		  c.Reset();
		}
		});
		
});