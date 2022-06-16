import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LXI Stack Pointer', () => {
	it('LXI SP,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x31,          // LXI into stack pointer...
		  null,          // ...low-byte of 16-bit data (inserted, below)
		  null,          // ...high-byte of 16-bit data (inserted, below)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(word, c.cpu.StackPointer);
		
		  assert.equal(c.cpu.Clock, 17);
		
		  c.Reset();
		
		}
		});
		
});
