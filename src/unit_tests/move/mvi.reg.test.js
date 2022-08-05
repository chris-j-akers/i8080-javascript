import { Computer } from '../../core/computer.js'
import { strict as assert } from 'assert'

describe('MVI Register', () => {
	it('MVI B', () => {
		const c = new Computer();
		
		let program = [
		  0x6,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.B, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
	it('MVI C', () => {
		const c = new Computer();
		
		let program = [
		  0xe,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.C, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
	it('MVI D', () => {
		const c = new Computer();
		
		let program = [
		  0x16,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.D, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
	it('MVI E', () => {
		const c = new Computer();
		
		let program = [
		  0x1e,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.E, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
	it('MVI H', () => {
		const c = new Computer();
		
		let program = [
		  0x26,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.H, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
	it('MVI L', () => {
		const c = new Computer();
		
		let program = [
		  0x2e,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.L, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
	it('MVI A', () => {
		const c = new Computer();
		
		let program = [
		  0x3e,         // MVI into Register
		  null,             // ...this data
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, byte);
		  assert.equal(c.CPUState.Clock, 14);
		  c.Reset();
		}
		});
		
});
