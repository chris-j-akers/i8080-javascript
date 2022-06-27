import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
    'B': {MVI: 0x06, ORA: 0xB0},
    'C': {MVI: 0x0E, ORA: 0xB1},
    'D': {MVI: 0x16, ORA: 0xB2},
    'E': {MVI: 0x1E, ORA: 0xB3},
    'H': {MVI: 0x26, ORA: 0xB4},
    'L': {MVI: 0x2E, ORA: 0xB5}
};

describe('ORA Register', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    5,        // ... this immediate value
		    null,                 // MVI into register ...
		    4,               // ...this immediate value
		    null,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ORA;
		
		  c.LoadProgram(program);
		  c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 5);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    0,        // ... this immediate value
		    null,                 // MVI into register ...
		    0,               // ...this immediate value
		    null,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ORA;
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 0);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    127,        // ... this immediate value
		    null,                 // MVI into register ...
		    255,               // ...this immediate value
		    null,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ORA;
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 255);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c.CPUState.Clock, 25);
		
		  c.Reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    68,        // ... this immediate value
		    null,                 // MVI into register ...
		    81,               // ...this immediate value
		    null,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ORA;
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 85);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 25);
		
		  c.Reset();
		  }
		});
		
});
