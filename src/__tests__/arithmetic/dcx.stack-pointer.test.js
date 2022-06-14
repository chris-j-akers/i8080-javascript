import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('DCX', () => {
	it('Decrement Stack pointer 5 times from 4 and ensure it rolls to 65535 when decremented at 0.', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const program = [
		  0x31,       // LXI to set stack-pointer to...
		  0x04,       // ...this 16-bit number (low-byte)
		  0x00,       // ...this 16-bit number (high-byte)
		  0x3B,       // ...decrement stack
		  0x76,       // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		assert.equal(c.cpu.stack_pointer, 3);
		
		c.cpu.halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.cpu.stack_pointer, 2);
		
		c.cpu.halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.cpu.stack_pointer, 1);
		
		c.cpu.halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.cpu.stack_pointer, 0);
		
		c.cpu.halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.cpu.stack_pointer, 65535);
		
		assert.equal(c.cpu.Clock, 70);
		
		});
		
});
