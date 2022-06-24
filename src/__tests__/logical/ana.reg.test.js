import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
    'B': {MVI: 0x06, ANA: 0xA0},
    'C': {MVI: 0x0E, ANA: 0xA1},
    'D': {MVI: 0x16, ANA: 0xA2},
    'E': {MVI: 0x1E, ANA: 0xA3},
    'H': {MVI: 0x26, ANA: 0xA4},
    'L': {MVI: 0x2E, ANA: 0xA5}
};

describe('ANA Register', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    4,        // ... this immediate value
		    null,                 // MVI into register ...
		    100,               // ...this immediate value
		    null,                 // ANA value in register  with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ANA;
		
		  c.InjectProgram(program);
		  c.cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A, 4);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    0,        // ... this immediate value
		    null,                 // MVI into register ...
		    255,               // ...this immediate value
		    null,                 // ANA value in register  with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ANA;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A, 0);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    128,        // ... this immediate value
		    null,                 // MVI into register ...
		    255,               // ...this immediate value
		    null,                 // ANA value in register  with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ANA;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A, 128);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c.cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    5,        // ... this immediate value
		    null,                 // MVI into register ...
		    255,               // ...this immediate value
		    null,                 // ANA value in register  with Accumulator
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ANA;
		
		  c.InjectProgram(program);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A, 5);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
});
