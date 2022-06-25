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

describe('MOV Register to Register', () => {
	it('MOVE B,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x40,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE B,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x41,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE B,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x42,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE B,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x43,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE B,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x44,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE B,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x45,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE B,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x47,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.B, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x48,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x49,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x4a,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x4b,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x4c,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x4d,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE C,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x4f,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.C, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x50,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x51,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x52,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x53,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x54,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x55,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE D,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x57,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.D, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x58,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x59,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x5a,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x5b,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x5c,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x5d,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE E,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x5f,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.E, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x60,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x61,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x62,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x63,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x64,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x65,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.H, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE H,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x67,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x68,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.L, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x69,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.L, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x6a,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.L, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x6b,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.L, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x6c,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.L, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x6d,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.L, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE L,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x6f,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,B', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.B,     // MVI into source register... 
		  null,                               // ...this value
		  0x78,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,C', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.C,     // MVI into source register... 
		  null,                               // ...this value
		  0x79,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,D', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.D,     // MVI into source register... 
		  null,                               // ...this value
		  0x7a,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,E', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.E,     // MVI into source register... 
		  null,                               // ...this value
		  0x7b,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,H', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.H,     // MVI into source register... 
		  null,                               // ...this value
		  0x7c,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,L', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.L,     // MVI into source register... 
		  null,                               // ...this value
		  0x7d,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
	it('MOVE A,A', () => {
		const c = new Computer();
		
		let program = [
		  mvi_opcode_lookup.A,     // MVI into source register... 
		  null,                               // ...this value
		  0x7f,                           // MOV
		  0x76                                // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, byte);
		
		  assert.equal(c._cpu.Clock, 19);
		
		  c.Reset();
		}
		});
		
});
