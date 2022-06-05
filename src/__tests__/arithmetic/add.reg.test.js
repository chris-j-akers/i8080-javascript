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
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    0,  // MOV A, #0
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 1);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		    
		    c.reset();
		};
		});
		
	it('Set Parity and Zero Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    0,  // MOV A, #0
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    0,         // MOV [R], 0
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 0);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		    
		    c.reset();
		};
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    84,         // MOV [R], 84
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 85);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		    
		    c.reset();
		};
		});
		
	it('Set Parity and Aux Carry Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    15,  // MOV A, #15
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    15,         // MOV [R], 15
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 30);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		    
		    c.reset();
		};
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    112,  // MOV A, #112
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    64,         // MOV [R], 64
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 176);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		    assert.equal(c.cpu.clock, 25);
		    
		    c.reset();
		};
		});
		
	it('Set Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    66,  // MOV A, #66
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    192,         // MOV [R], 192
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADD;
		
		    c.inject_program(program);
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 2);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    assert.equal(c.cpu.clock, 25);
		    
		    c.reset();
		};
		});
		
});
