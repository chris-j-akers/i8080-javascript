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

describe('DCX', () => {
	it('Decrement 5 times from 4 and confirm B/C register rolls to 65535 when decremented at 0', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  mvi_opcode_lookup.B,     // MVI into B....
		  0x00,                                       // ...this immediate value
		  mvi_opcode_lookup.C,      // MVI into C....
		  0x04,                                       // ...this immediate value
		  11,                                   // DCX Register
		  0x76                                        // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal((c.CPUState.Registers.B << 8) | c.CPUState.Registers.C, 3);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 2);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 1);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.B  << 8) | c.CPUState.Registers.C, 65535);
		
		assert.equal(c.CPUState.Clock, 74);
		
		});
		
	it('Decrement 5 times from 65533 and confirm D/E register rolls to 65535 when decremented at 0', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  mvi_opcode_lookup.D,     // MVI into D....
		  0x00,                                       // ...this immediate value
		  mvi_opcode_lookup.E,      // MVI into E....
		  0x04,                                       // ...this immediate value
		  27,                                   // DCX Register
		  0x76                                        // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal((c.CPUState.Registers.D << 8) | c.CPUState.Registers.E, 3);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 2);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 1);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.D  << 8) | c.CPUState.Registers.E, 65535);
		
		assert.equal(c.CPUState.Clock, 74);
		
		});
		
	it('Decrement 5 times from 65533 and confirm H/L register rolls to 65535 when decremented at 0', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		const program = [
		  mvi_opcode_lookup.H,     // MVI into H....
		  0x00,                                       // ...this immediate value
		  mvi_opcode_lookup.L,      // MVI into L....
		  0x04,                                       // ...this immediate value
		  43,                                   // DCX Register
		  0x76                                        // HALT
		]
		
		c.LoadProgram(program);
		c.ExecuteProgram();
		assert.equal((c.CPUState.Registers.H << 8) | c.CPUState.Registers.L, 3);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 2);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 1);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 0);
		
		c._cpu._halt = false;
		c.ExecuteProgram(0x04);
		assert.equal((c.CPUState.Registers.H  << 8) | c.CPUState.Registers.L, 65535);
		
		assert.equal(c.CPUState.Clock, 74);
		
		});
		
});
