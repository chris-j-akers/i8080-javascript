import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('DCX', () => {
	it('Decrement Stack pointer 5 times from 4 and ensure it rolls to 65535 when decremented at 0.', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		const program = [
		  0x31,       // LXI to set stack-pointer to...
		  0x04,       // ...this 16-bit number (low-byte)
		  0x00,       // ...this 16-bit number (high-byte)
		  0x3B,       // ...decrement stack
		  0x76,       // HALT
		]
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		assert.equal(c._cpu.StackPointer, 3);
		
		c._cpu.Halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c._cpu.StackPointer, 2);
		
		c._cpu.Halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c._cpu.StackPointer, 1);
		
		c._cpu.Halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c._cpu.StackPointer, 0);
		
		c._cpu.Halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c._cpu.StackPointer, 65535);
		
		assert.equal(c._cpu.Clock, 70);
		
		});
		
});
