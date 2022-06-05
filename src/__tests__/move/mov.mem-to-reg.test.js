import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('MOV Memory to Register', () => {
	it('MOVE B,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x46,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.B);
		  c.reset();
		}
		});
		
	it('MOVE C,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x4e,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.C);
		  c.reset();
		}
		});
		
	it('MOVE D,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x56,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.D);
		  c.reset();
		}
		});
		
	it('MOVE E,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x5e,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.E);
		  c.reset();
		}
		});
		
	it('MOVE H,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x66,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.H);
		  c.reset();
		}
		});
		
	it('MOVE L,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x6e,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.L);
		  c.reset();
		}
		});
		
	it('MOVE A,M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		
		let program = [
		  0x26,           // MOV into H...
		  null,           // ...the high-byte of the memory address (to be inserted)
		  0x2E,           // MOV into L...
		  null,           // ... the low-byte of the memory address (to be inserted)
		  0x36,           // MVI to this address...
		  data,           // ...this immediate value
		  0x7e,       // MOV from this address in H and L to register        
		  0x76            // HALT
		]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[1] = (mem_addr >> 8) & 0xff;
		  program[3] = mem_addr & 0xFF;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.clock, 38);
		
		  assert.equal(c.bus.read(mem_addr), c.cpu.registers.A);
		  c.reset();
		}
		});
		
});
