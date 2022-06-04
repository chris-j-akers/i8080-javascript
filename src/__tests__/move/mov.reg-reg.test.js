import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
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

describe('MOV Register to Register', () => {
	it('MOVE B,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x40,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE B,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x41,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE B,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x42,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE B,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x43,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE B,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x44,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE B,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x45,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE B,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x47,                     // MOV to register B
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x48,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x49,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x4a,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x4b,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x4c,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x4d,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE C,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x4f,                     // MOV to register C
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x50,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x51,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x52,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x53,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x54,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x55,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE D,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x57,                     // MOV to register D
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x58,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x59,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x5a,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x5b,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x5c,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x5d,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE E,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x5f,                     // MOV to register E
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x60,                     // MOV to register H
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x61,                     // MOV to register H
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x62,                     // MOV to register H
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x63,                     // MOV to register H
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x64,                     // MOV to register H
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x65,                     // MOV to register H
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE H,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x67,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x68,                     // MOV to register L
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x69,                     // MOV to register L
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x6a,                     // MOV to register L
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x6b,                     // MOV to register L
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x6c,                     // MOV to register L
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x6d,                     // MOV to register L
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE L,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x6f,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,    // MVI B 
		  null,                             // ...with this value (populated in loop, below)
		  0x78,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,    // MVI C 
		  null,                             // ...with this value (populated in loop, below)
		  0x79,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,    // MVI D 
		  null,                             // ...with this value (populated in loop, below)
		  0x7a,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,    // MVI E 
		  null,                             // ...with this value (populated in loop, below)
		  0x7b,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,    // MVI H 
		  null,                             // ...with this value (populated in loop, below)
		  0x7c,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,    // MVI L 
		  null,                             // ...with this value (populated in loop, below)
		  0x7d,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
	it('MOVE A,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,    // MVI A 
		  null,                             // ...with this value (populated in loop, below)
		  0x7f,                     // MOV to register A
		  0x76                              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		
		  c.reset();
		}
		});
		
});
