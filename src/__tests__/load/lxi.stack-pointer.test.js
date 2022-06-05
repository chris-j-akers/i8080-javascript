import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LXI Stack Pointer', () => {
	it('LXI SP,d16', () => {
		const max_value_to_test = 4095;
		const c = new Computer();
		
		let program = [
		  0x31,      // LXI into stack pointer...
		  null,          // ...Lower-byte of 16-bit data (to be populated)
		  null,          // ...Higher-byte of 16-bit data (to be populated)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(word, c.cpu.StackPointer);
		
		  c.reset();
		
		}
		});
		
});
