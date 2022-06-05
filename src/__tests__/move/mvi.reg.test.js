import { Computer } from '../../computer.js'
import { strict as assert } from 'assert'

describe('MVI Register', () => {
	it('MVI B', () => {
		const c = new Computer();
		
		let program = [
		  0x6,         // MVI into Register B...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.B, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
	it('MVI C', () => {
		const c = new Computer();
		
		let program = [
		  0xe,         // MVI into Register C...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.C, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
	it('MVI D', () => {
		const c = new Computer();
		
		let program = [
		  0x16,         // MVI into Register D...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.D, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
	it('MVI E', () => {
		const c = new Computer();
		
		let program = [
		  0x1e,         // MVI into Register E...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.E, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
	it('MVI H', () => {
		const c = new Computer();
		
		let program = [
		  0x26,         // MVI into Register H...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.H, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
	it('MVI L', () => {
		const c = new Computer();
		
		let program = [
		  0x2e,         // MVI into Register L...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.L, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
	it('MVI A', () => {
		const c = new Computer();
		
		let program = [
		  0x3e,         // MVI into Register A...
		  null,             // ...this byte of data (to be populated in loop)
		  0x76              // HALT
		]
		
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  program[1] = byte;
		
		  c.inject_program(program);
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, byte);
		  assert.equal(c.cpu.clock, 14);
		  c.reset();
		}
		});
		
});
