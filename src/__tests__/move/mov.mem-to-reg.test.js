import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('MOV Memory to Register', () => {
	it('MOVE B,M', () => {
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
		  0x46,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.B);
		  c.Reset();
		}
		});
		
	it('MOVE C,M', () => {
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
		  0x4e,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.C);
		  c.Reset();
		}
		});
		
	it('MOVE D,M', () => {
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
		  0x56,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.D);
		  c.Reset();
		}
		});
		
	it('MOVE E,M', () => {
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
		  0x5e,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.E);
		  c.Reset();
		}
		});
		
	it('MOVE H,M', () => {
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
		  0x66,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.H);
		  c.Reset();
		}
		});
		
	it('MOVE L,M', () => {
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
		  0x6e,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.L);
		  c.Reset();
		}
		});
		
	it('MOVE A,M', () => {
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
		  0x7e,       // MOV
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Clock, 38);
		
		  assert.equal(c.bus.ReadRAM(mem_addr), c.cpu.Registers.A);
		  c.Reset();
		}
		});
		
});
