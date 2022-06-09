import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
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
		const FlagType = i8080.FlagType;
		
		const program = [
		  mvi_opcode_lookup.B,     // Move into B....
		  0x00,                                       // ...this immediate value
		  mvi_opcode_lookup.C,      // Move into C....
		  0x04,                                       // ...this immediate value
		  11,
		  0x76                                        // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		assert.equal((c.cpu.registers.B << 8) | c.cpu.registers.C, 3);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.B  << 8) | c.cpu.registers.C, 2);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.B  << 8) | c.cpu.registers.C, 1);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.B  << 8) | c.cpu.registers.C, 0);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.B  << 8) | c.cpu.registers.C, 65535);
		
		assert.equal(c.cpu.clock, 74);
		
		});
		
	it('Decrement 5 times from 65533 and confirm D/E register rolls to 65535 when decremented at 0', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  mvi_opcode_lookup.D,     // Move into D....
		  0x00,                                       // ...this immediate value
		  mvi_opcode_lookup.E,      // Move into E....
		  0x04,                                       // ...this immediate value
		  27,
		  0x76                                        // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		assert.equal((c.cpu.registers.D << 8) | c.cpu.registers.E, 3);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.D  << 8) | c.cpu.registers.E, 2);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.D  << 8) | c.cpu.registers.E, 1);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.D  << 8) | c.cpu.registers.E, 0);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.D  << 8) | c.cpu.registers.E, 65535);
		
		assert.equal(c.cpu.clock, 74);
		
		});
		
	it('Decrement 5 times from 65533 and confirm H/L register rolls to 65535 when decremented at 0', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		const program = [
		  mvi_opcode_lookup.H,     // Move into H....
		  0x00,                                       // ...this immediate value
		  mvi_opcode_lookup.L,      // Move into L....
		  0x04,                                       // ...this immediate value
		  43,
		  0x76                                        // HALT
		]
		
		c.inject_program(program);
		c.execute_program();
		assert.equal((c.cpu.registers.H << 8) | c.cpu.registers.L, 3);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.H  << 8) | c.cpu.registers.L, 2);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.H  << 8) | c.cpu.registers.L, 1);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.H  << 8) | c.cpu.registers.L, 0);
		
		c.cpu.halt = false;
		c.execute_program(0x04);
		assert.equal((c.cpu.registers.H  << 8) | c.cpu.registers.L, 65535);
		
		assert.equal(c.cpu.clock, 74);
		
		});
		
});
