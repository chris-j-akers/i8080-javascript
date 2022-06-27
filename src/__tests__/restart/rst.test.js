import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('RST', () => {
	it('RST 0', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  0 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  0 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  199                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 1);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 1', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  8 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  8 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  207                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 9);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 2', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  16 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  16 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  215                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 17);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 3', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  24 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  24 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  223                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 25);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 4', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  32 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  32 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  231                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 33);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 5', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  40 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  40 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  239                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 41);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 6', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  48 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  48 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  247                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 49);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
	it('RST 7', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		  0x26,                               // MVI into Register H...
		  56 << 8 & 0xFF,       // ...This high-byte
		  0x2E,                               // MVI into Register L...
		  56 & 0xFF,            // ...This low-byte
		  0x36,                               // MVI into memory location (stored in registers H/L)
		  0x76,                               // ...OpCode 0x76 (So the program HALTS when the program counter changes on JMP)
		  255                            // Call relevant reset
		]
		
		  c.LoadProgram(program, 0x100);
		  c.ExecuteProgram(0x100);
		
		  assert.equal(c.CPUState.ProgramCounter, 57);
		  assert.equal(c.CPUState.Clock, 42);
		
		});
		
});
