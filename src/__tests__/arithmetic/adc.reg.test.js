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
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    0,  // MOV A, #0
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 1);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('No Flags Set (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    0,  // MOV A, #0
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 2);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Parity and Zero Flags (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    0,  // MOV A, #0
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    0,         // MOV [R], 0
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
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
		};
		});
		
	it('Set Parity Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    84,         // MOV [R], 84
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
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
		};
		});
		
	it('Set Parity Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    83,         // MOV [R], 83
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 85);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Aux Carry Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    15,         // MOV [R], 15
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 16);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Aux Carry Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    14,         // MOV [R], 14
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 16);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Aux Carry and Sign Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    127,         // MOV [R], 127
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 128);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Sign Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    126,         // MOV [R], 126
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 128);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Carry and Aux Carry Flag (With Carry Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    20,  // MOV A, #20
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    255,         // MOV [R], 255
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 19);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Set Carry and Parity Flag (With Carry Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E, 
		    1,  // MOV A, #1
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    254,         // MOV [R], 254
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].ADC;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 0);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
});
