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
		  null,           // ...addr high-byte (inserted, below)
		  null,           // MVI into C...
		  null,           // ... addr low-byte (inserted, below)
		  2,       // STAX
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[2] = mvi_opcode_lookup.B
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[4] = mvi_opcode_lookup.C
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.ReadRAM(mem_addr), 0xFF);
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		
		}
		});
		
	it('Store Accumulator in address found in registers D,E', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		
		let program = [
		  0x3E,           // MVI into accumulator
		  0xFF,           // ...this byte
		  null,           // MVI into D...
		  null,           // ...addr high-byte (inserted, below)
		  null,           // MVI into E...
		  null,           // ... addr low-byte (inserted, below)
		  18,       // STAX
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[2] = mvi_opcode_lookup.D
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[4] = mvi_opcode_lookup.E
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.ReadRAM(mem_addr), 0xFF);
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		
		}
		});
		
});
