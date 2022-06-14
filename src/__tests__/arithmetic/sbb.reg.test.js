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
    'B': {MVI: 0x06, SBB: 0x98},
    'C': {MVI: 0x0E, SBB: 0x99},
    'D': {MVI: 0x16, SBB: 0x9A},
    'E': {MVI: 0x1E, SBB: 0x9B},
    'H': {MVI: 0x26, SBB: 0x9C},
    'L': {MVI: 0x2E, SBB: 0x9D}
};

describe('SBB Register', () => {
	it('No Flags Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    32,  // MOV A, #32
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('No Flags Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    33,  // MOV A, #33
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
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
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    3,  // MOV A, #3
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    2,         // MOV [R], 2
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
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
		
	it('arity Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    32,  // MOV A, #32
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    2,         // MOV [R], 2
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('Parity Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    32,  // MOV A, #32
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
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
		
	it('Aux Carry Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    127,  // MOV A, #127
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    3,         // MOV [R], 3
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('Aux Carry Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    127,  // MOV A, #127
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    4,         // MOV [R], 4
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 122);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    255,  // MOV A, #255
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('Aux Carry and Sign Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    253,  // MOV A, #253
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    3,         // MOV [R], 3
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 249);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.clock, 25);
		
		    c.reset();
		};
		});
		
	it('Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    5,  // MOV A, #5
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    10,         // MOV [R], 10
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		
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
		
	it('Carry and Sign Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    0x3E, 
		    5,  // MOV A, #5
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    9,         // MOV [R], 9
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.inject_program(program);
		    c.cpu._flag_manager.SetFlag(FlagType.Carry);
		assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		
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
