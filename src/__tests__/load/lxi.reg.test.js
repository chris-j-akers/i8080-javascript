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
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.B, (word >> 8) & 0xFF);
		  assert.equal(c.CPUState.Registers.C, word & 0xFF);
		  assert.equal(word, (c.CPUState.Registers.B << 8) | c.CPUState.Registers.C);
		  
		  assert.equal(c.CPUState.Clock, 17);
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
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.D, (word >> 8) & 0xFF);
		  assert.equal(c.CPUState.Registers.E, word & 0xFF);
		  assert.equal(word, (c.CPUState.Registers.D << 8) | c.CPUState.Registers.E);
		  
		  assert.equal(c.CPUState.Clock, 17);
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
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.H, (word >> 8) & 0xFF);
		  assert.equal(c.CPUState.Registers.L, word & 0xFF);
		  assert.equal(word, (c.CPUState.Registers.H << 8) | c.CPUState.Registers.L);
		  
		  assert.equal(c.CPUState.Clock, 17);
		  c.Reset();
		
		}
		});
		
});
