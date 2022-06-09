import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('LXI Register', () => {
	it('LXI B,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x1,      // LXI into B/C...
		  null,          // ...Lower-byte of 16-bit data (to be populated)
		  null,          // ...Higher-byte of 16-bit data (to be populated)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, (word >> 8) & 0xFF);
		  assert.equal(c.cpu.registers.C, word & 0xFF);
		  assert.equal(word, (c.cpu.registers.B << 8) | c.cpu.registers.C);
		  
		  assert.equal(c.cpu.clock, 17);
		  c.reset();
		
		}
		});
		
	it('LXI D,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x11,      // LXI into D/E...
		  null,          // ...Lower-byte of 16-bit data (to be populated)
		  null,          // ...Higher-byte of 16-bit data (to be populated)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, (word >> 8) & 0xFF);
		  assert.equal(c.cpu.registers.E, word & 0xFF);
		  assert.equal(word, (c.cpu.registers.D << 8) | c.cpu.registers.E);
		  
		  assert.equal(c.cpu.clock, 17);
		  c.reset();
		
		}
		});
		
	it('LXI H,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		
		let program = [
		  0x21,      // LXI into H/L...
		  null,          // ...Lower-byte of 16-bit data (to be populated)
		  null,          // ...Higher-byte of 16-bit data (to be populated)
		  0x76           // HALT
		]
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		  program[1] = word & 0xFF;
		  program[2] = (word >> 8) & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, (word >> 8) & 0xFF);
		  assert.equal(c.cpu.registers.L, word & 0xFF);
		  assert.equal(word, (c.cpu.registers.H << 8) | c.cpu.registers.L);
		  
		  assert.equal(c.cpu.clock, 17);
		  c.reset();
		
		}
		});
		
});
