import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('MVI Memory', () => {
	it('MVI M', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...addr high-byte (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... addr low-byte (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x76,           // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.Bus.ReadRAM(mem_addr), data);
		
		  assert.equal(c._cpu.Clock, 31);
		  c.Reset();
		}
		});
		
});
