import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
    'B': {MVI: 0x06, XRA: 0xA8},
    'C': {MVI: 0x0E, XRA: 0xA9},
    'D': {MVI: 0x16, XRA: 0xAA},
    'E': {MVI: 0x1E, XRA: 0xAB},
    'H': {MVI: 0x26, XRA: 0xAC},
    'L': {MVI: 0x2E, XRA: 0xAD}
};

describe('XRA Register', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    20,        // ... this immediate value
		    null,                 // MVI into register ...
		    16,               // ...this immediate value
		    null,                 // XRA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].XRA;
		
		  c.InjectProgram(program);
		  c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 4);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    255,        // ... this immediate value
		    null,                 // MVI into register ...
		    255,               // ...this immediate value
		    null,                 // XRA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].XRA;
		
		  c.InjectProgram(program);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 0);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    127,        // ... this immediate value
		    null,                 // MVI into register ...
		    255,               // ...this immediate value
		    null,                 // XRA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].XRA;
		
		  c.InjectProgram(program);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 128);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    85,        // ... this immediate value
		    null,                 // MVI into register ...
		    80,               // ...this immediate value
		    null,                 // XRA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].XRA;
		
		  c.InjectProgram(program);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 5);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		  }
		});
		
});
