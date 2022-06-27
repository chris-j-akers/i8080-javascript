import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('INX', () => {
	it('Increment Stack pointer 4 times from 65533', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  0x31,       // LXI to set stack-pointer to...
		  0xFD,       // ...this 16-bit number (low-byte)
		  0xFF,       // ...this 16-bit number (high-byte)
		  0x33,       // ...increment stack
		  0x76,       // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal(c.CPUState.StackPointer, 65534);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.CPUState.StackPointer, 65535);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.CPUState.StackPointer, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x03);
		assert.equal(c.CPUState.StackPointer, 1);
		
		assert.equal(c.CPUState.Clock, 58);
		
		});
		
});
