import { Computer } from '../../computer.js'
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

describe('MOV to Register to Memory', () => {
	it('MOVE M,B', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.B, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x70,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.B);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
	it('MOVE M,C', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.C, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x71,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.C);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
	it('MOVE M,D', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.D, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x72,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.D);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
	it('MOVE M,E', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.E, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x73,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.E);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
	it('MOVE M,H', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.H, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x74,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.H);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
	it('MOVE M,L', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.L, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x75,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.L);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
	it('MOVE M,A', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  mvi_opcode_lookup.A, // MVI into Register...
		  data,                           // ...this immediate value
		  0x26,                           // MOV into H...
		  null,                           // ...addr high-byte (to be inserted)
		  0x2E,                           // MOV into L...
		  null,                            // ...addr low-byte (to be inserted)
		  0x77,                       // MOV
		  0x76                            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xff;
		  program[5] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.bus.Read(mem_addr), c.cpu.registers.A);
		
		  assert.equal(c.cpu.Clock, 35);
		
		  c.Reset();
		}
		});
		
});
