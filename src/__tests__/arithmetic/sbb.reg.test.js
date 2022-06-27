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
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    32,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 31);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('No Flags Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    33,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 31);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    1,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 0);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flags Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    3,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    2,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 0);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('arity Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    32,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    2,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 30);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Parity Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    32,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 30);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    127,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    3,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 124);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    127,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    4,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 122);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    255,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 254);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry and Sign Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    253,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    3,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 249);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    5,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    10,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 251);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
	it('Carry and Sign Flag Set (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    5,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    9,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[2] = opcode_lookup[reg].MVI;
		    program[4] = opcode_lookup[reg].SBB;
		
		    c.LoadProgram(program);
		    c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 251);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 25);
		
		    c.Reset();
		};
		});
		
});
