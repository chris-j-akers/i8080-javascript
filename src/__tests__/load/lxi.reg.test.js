import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LXI Register', () => {
	it('LXI B,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x1,      // LXI into B/C...
		  null,          // ...low-byte of 16-bit data (inserted, below)
		  null,          // ...high-byte of 16-bit data (inserted, below)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, (word >> 8) & 0xFF);
		  assert.equal(c._cpu.Registers.C, word & 0xFF);
		  assert.equal(word, (c._cpu.Registers.B << 8) | c._cpu.Registers.C);
		  
		  assert.equal(c._cpu.Clock, 17);
		  c.Reset();
		
		}
		});
		
	it('LXI D,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x11,      // LXI into D/E...
		  null,          // ...low-byte of 16-bit data (inserted, below)
		  null,          // ...high-byte of 16-bit data (inserted, below)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, (word >> 8) & 0xFF);
		  assert.equal(c._cpu.Registers.E, word & 0xFF);
		  assert.equal(word, (c._cpu.Registers.D << 8) | c._cpu.Registers.E);
		  
		  assert.equal(c._cpu.Clock, 17);
		  c.Reset();
		
		}
		});
		
	it('LXI H,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x21,      // LXI into H/L...
		  null,          // ...low-byte of 16-bit data (inserted, below)
		  null,          // ...high-byte of 16-bit data (inserted, below)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, (word >> 8) & 0xFF);
		  assert.equal(c._cpu.Registers.L, word & 0xFF);
		  assert.equal(word, (c._cpu.Registers.H << 8) | c._cpu.Registers.L);
		  
		  assert.equal(c._cpu.Clock, 17);
		  c.Reset();
		
		}
		});
		
});
