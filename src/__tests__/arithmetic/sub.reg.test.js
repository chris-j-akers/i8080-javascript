import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

/**
* An opcode lookup table allows us to programmatically determine which OpCodes
* to use, depending on the register being tested. It saves us having to write a
* separate test per register. Instead we can loop through each one and run the
* same test.
*/
const opcode_lookup = {
    'B': {MVI: 0x06, SUB: 0x90},
    'C': {MVI: 0x0E, SUB: 0x91},
    'D': {MVI: 0x16, SUB: 0x92},
    'E': {MVI: 0x1E, SUB: 0x93},
    'H': {MVI: 0x26, SUB: 0x94},
    'L': {MVI: 0x2E, SUB: 0x95}
};

describe('SUB Register', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into Accumulator...
		    32,  // ...This value
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 31);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into Accumulator...
		    1,  // ...This value
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 0);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into Accumulator...
		    32,  // ...This value
		    null,           // MVI into register (opcode added, below)
		    2,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 30);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into Accumulator...
		    127,  // ...This value
		    null,           // MVI into register (opcode added, below)
		    3,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 124);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into Accumulator...
		    255,  // ...This value
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 254);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into Accumulator...
		    5,  // ...This value
		    null,           // MVI into register (opcode added, below)
		    10,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.Registers.A, 251);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
});
