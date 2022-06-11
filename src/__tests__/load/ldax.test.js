import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
'B': {MVI: 0x06, LDAX: 0x0A},
'C': {MVI: 0x0E, NOP: 0x00},
'D': {MVI: 0x16, LDAX: 0x1A},
'E': {MVI: 0x1E, NOP: 0x00},
};

describe('LDAX', () => {
	it('LDAX data from Memory (B,C)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		const data = 0xFF;
		
		let program = [
		
		  // Prep - Load data into memory location, first
		  
		  0x26,         // MVI into H register...
		  null,         // Mem addr high-byte
		  0x2E,         // MVI into L register...
		  null,         // Mem addr low-byte
		  0x36,         // MVI into memory location...
		  data,         // ...the data.
		  
		  // Now the test
		
		  null,         // MVI into High-Byte Register...
		  null,         // Mem addr high-byte
		  null,         // MVI into Low-Byte Register...
		  null,         // Mem addr low-byte
		  null,         // LDAX
		  0x76,         // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		  program[6] = opcode_lookup['B'].MVI;
		  program[7] = (mem_addr >> 8) & 0xFF;
		  program[8] = opcode_lookup['C'].MVI;
		  program[9] = mem_addr & 0xFF;
		  program[10] = opcode_lookup['B'].LDAX;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers['A']);
		  assert.equal(c.cpu.clock, 52)
		  c.reset();
		}
		});
		
	it('LDAX data from Memory (D,E)', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		const data = 0xFF;
		
		let program = [
		
		  // Prep - Load data into memory location, first
		  
		  0x26,         // MVI into H register...
		  null,         // Mem addr high-byte
		  0x2E,         // MVI into L register...
		  null,         // Mem addr low-byte
		  0x36,         // MVI into memory location...
		  data,         // ...the data.
		  
		  // Now the test
		
		  null,         // MVI into High-Byte Register...
		  null,         // Mem addr high-byte
		  null,         // MVI into Low-Byte Register...
		  null,         // Mem addr low-byte
		  null,         // LDAX
		  0x76,         // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xFF;
		  program[3] = mem_addr & 0xFF;
		  program[6] = opcode_lookup['D'].MVI;
		  program[7] = (mem_addr >> 8) & 0xFF;
		  program[8] = opcode_lookup['E'].MVI;
		  program[9] = mem_addr & 0xFF;
		  program[10] = opcode_lookup['D'].LDAX;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers['A']);
		  assert.equal(c.cpu.clock, 52)
		  c.reset();
		}
		});
		
});
