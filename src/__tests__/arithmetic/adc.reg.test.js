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
    'B': {MVI: 0x06, ADC: 0x88},
    'C': {MVI: 0x0E, ADC: 0x89},
    'D': {MVI: 0x16, ADC: 0x8A},
    'E': {MVI: 0x1E, ADC: 0x8B},
    'H': {MVI: 0x26, ADC: 0x8C},
    'L': {MVI: 0x2E, ADC: 0x8D}
};

describe('ADC Register', () => {
	it('No Flags Set (With Carry Unset)', () => {
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
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 1);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('No Flags Set (With Carry Set)', () => {
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
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 2);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Parity and Zero Flags (With Carry Unset)', () => {
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
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 0);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Parity Flag (With Carry Unset)', () => {
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
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 85);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Parity Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    83,         // MOV [R], 83
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 85);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Aux Carry Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    15,         // MOV [R], 15
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 16);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Aux Carry Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    14,         // MOV [R], 14
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 16);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Aux Carry and Sign Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    127,         // MOV [R], 127
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 128);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		    c.reset();
		};
		});
		
	it('Set Sign Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    126,         // MOV [R], 126
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 128);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		    c.reset();
		};
		});
		
	it('Set Carry and Aux Carry Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    20,  // MOV A, #20
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    255,         // MOV [R], 255
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 19);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
	it('Set Carry and Parity Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    254,         // MOV [R], 254
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.inject_program(program);
		    c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		    c.execute_program();
		
		    assert.equal(c.cpu.registers.A, 0);
		    assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		    assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		    assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		    c.reset();
		};
		});
		
});
