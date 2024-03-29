/**
  * For these tests, just testing an increment isn't enough, we want to be
  * able to make sure the values rolls back to zero (as per the docs) if the
  * register pair is incremented but are already at 0xFFFF.
  *
  * In the main test `program`, each test starts at 65533, then calls INX
  * once to increment. This leaves us to check we got 65534. To further
  * increment this value we cheat a bit. The `HALT` flag on the CPU is
  * manually switched to false and the call to `ExecuteProgram()` is made
  * again, but this time, with a `from_addr` of 0x04 (the INX OpCode). This
  * way we get to check the first increment worked but then run 4 more of
  * them.
  * 
  * It's hacky, but saves time.
  */

import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

const mvi_opcode_lookup = {
  B: 0x06,
  C: 0x0E,
  D: 0x16,
  E: 0x1E,
  H: 0x26,
  L: 0x2E,
  A: 0x3E
}

describe('INX', () => {
	it('Increment 5 times from 65533 and confirm B/C register rolls over to 0 once 8-bit max limit reached', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  mvi_opcode_lookup.B,     // Move into B....
		  0xFF,                                       // ...this immediate value
		  mvi_opcode_lookup.C,      // Move into C....
		  0xFD,                                       // ...this immediate value
		  0x3,                                   // INX Register
		  0x76                                        // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal((c.CPUState.Registers.B << 8) | c.CPUState.Registers.C, 65534);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 65535);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 1);
		
		assert.equal(c.CPUState.Clock, 62);
		
		});
		
	it('Increment 5 times from 65533 and confirm D/E register rolls over to 0 once 8-bit max limit reached', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  mvi_opcode_lookup.D,     // Move into D....
		  0xFF,                                       // ...this immediate value
		  mvi_opcode_lookup.E,      // Move into E....
		  0xFD,                                       // ...this immediate value
		  0x13,                                   // INX Register
		  0x76                                        // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal((c.CPUState.Registers.D << 8) | c.CPUState.Registers.E, 65534);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 65535);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 1);
		
		assert.equal(c.CPUState.Clock, 62);
		
		});
		
	it('Increment 5 times from 65533 and confirm H/L register rolls over to 0 once 8-bit max limit reached', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  mvi_opcode_lookup.H,     // Move into H....
		  0xFF,                                       // ...this immediate value
		  mvi_opcode_lookup.L,      // Move into L....
		  0xFD,                                       // ...this immediate value
		  0x23,                                   // INX Register
		  0x76                                        // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal((c.CPUState.Registers.H << 8) | c.CPUState.Registers.L, 65534);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 65535);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 1);
		
		assert.equal(c.CPUState.Clock, 62);
		
		});
		
});
