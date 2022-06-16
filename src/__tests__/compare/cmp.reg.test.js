import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'


const opcode_lookup = {
    'B': {MVI: 0x06, CMP: 0xB8},
    'C': {MVI: 0x0E, CMP: 0xB9},
    'D': {MVI: 0x16, CMP: 0xBA},
    'E': {MVI: 0x1E, CMP: 0xBB},
    'H': {MVI: 0x26, CMP: 0xBC},
    'L': {MVI: 0x2E, CMP: 0xBD}
};

describe('CMP Register', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    32,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].CMP;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers.A, 32);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    1,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].CMP;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers.A, 1);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    32,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    2,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].CMP;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers.A, 32);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    127,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    3,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].CMP;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers.A, 127);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    255,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].CMP;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers.A, 255);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    5,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    10,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].CMP;
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers.A, 5);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.Clock, 25);
		
		    c.Reset();
		};
		});
		
});
