import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('MVI Memory', () => {
	it('MVI M', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x76,           // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.bus.read(mem_addr), data);
		
		  assert.equal(c.cpu.clock, 31);
		  c.reset();
		}
		});
		
});
