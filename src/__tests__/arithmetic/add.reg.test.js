import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
    'B': {MVI: 0x06, ADD: 0x80},
    'C': {MVI: 0x0E, ADD: 0x81},
    'D': {MVI: 0x16, ADD: 0x82},
    'E': {MVI: 0x1E, ADD: 0x83},
    'H': {MVI: 0x26, ADD: 0x84},
    'L': {MVI: 0x2E, ADD: 0x85}
};

describe('ADD OpCode Tests (0x80, 0x81, 0x82, 0x83, 0x84, 0x85)', () => {
	it('Add 1 to the Accumulator and set no flags', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    0,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    1,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 1);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		    
		    c.Reset();
		};
		});
		
	it('Set Parity and Zero Flags', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    0,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    0,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 0);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		    
		    c.Reset();
		};
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    1,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    84,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 85);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		    
		    c.Reset();
		};
		});
		
	it('Set Parity and Aux Carry Flags', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    15,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    15,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 30);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		    
		    c.Reset();
		};
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    112,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    64,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 176);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.Clock, 25);
		    
		    c.Reset();
		};
		});
		
	it('Set Carry Flag', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    66,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    192,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 2);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		    
		    c.Reset();
		};
		});
		
});
