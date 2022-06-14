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
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    32,  // MOV A, #32
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent SUB opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 31);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent SUB opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 0);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    32,  // MOV A, #32
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    2,         // MOV [R], 2
		    null,           // Placeholder for relavent SUB opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 30);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    127,  // MOV A, #127
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    3,         // MOV [R], 3
		    null,           // Placeholder for relavent SUB opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 124);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    255,  // MOV A, #255
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent SUB opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 254);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    5,  // MOV A, #5
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    10,         // MOV [R], 10
		    null,           // Placeholder for relavent SUB opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SUB;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 251);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
});
