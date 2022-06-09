import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

const mvi_opcode_lookup = {
  B: 0x06,
  C: 0x0E,
  D: 0x16,
  E: 0x1E,
}

describe('STAX', () => {
	it('Store Accumulator in address found in registers B,C', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		let program = [
		  0x3E,           // MVI into accumulator
		  0xFF,           // ...this byte
		  null,           // MVI into B...
		  null,           // ...the high-byte of the memory address (ro be inserted)
		  null,           // MVI into C...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  2,       // Store Accumulator into address held in above register pair
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[2] = mvi_opcode_lookup.B
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[4] = mvi_opcode_lookup.C
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.bus.read(mem_addr), 0xFF);
		  assert.equal(c.cpu.clock, 35);
		
		  c.reset();
		
		}
		});
		
	it('Store Accumulator in address found in registers D,E', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		let program = [
		  0x3E,           // MVI into accumulator
		  0xFF,           // ...this byte
		  null,           // MVI into D...
		  null,           // ...the high-byte of the memory address (ro be inserted)
		  null,           // MVI into E...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  18,       // Store Accumulator into address held in above register pair
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[2] = mvi_opcode_lookup.D
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[4] = mvi_opcode_lookup.E
		  program[5] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.bus.read(mem_addr), 0xFF);
		  assert.equal(c.cpu.clock, 35);
		
		  c.reset();
		
		}
		});
		
});
