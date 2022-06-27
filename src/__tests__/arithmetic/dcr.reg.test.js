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
    'B': {MVI: 0x06, DCR: 0x05},
    'C': {MVI: 0x0E, DCR: 0x0D},
    'D': {MVI: 0x16, DCR: 0x15},
    'E': {MVI: 0x1E, DCR: 0x1D},
    'H': {MVI: 0x26, DCR: 0x25},
    'L': {MVI: 0x2E, DCR: 0x2D}
};

describe('DCR Register', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    null,           // MVI into Register (opcode added, below)...
		    32,         // ...this data
		    null,           // DCR (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c._cpu._flagManager.IsSet(FlagType.Carry);
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.CPUState.Registers[reg], 31);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    null,           // MVI into Register (opcode added, below)...
		    1,         // ...this data
		    null,           // DCR (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c._cpu._flagManager.IsSet(FlagType.Carry);
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.CPUState.Registers[reg], 0);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Parity Flag and Auxillary Carry Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    null,           // MVI into Register (opcode added, below)...
		    31,         // ...this data
		    null,           // DCR (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c._cpu._flagManager.IsSet(FlagType.Carry);
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.CPUState.Registers[reg], 30);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    null,           // MVI into Register (opcode added, below)...
		    125,         // ...this data
		    null,           // DCR (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c._cpu._flagManager.IsSet(FlagType.Carry);
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.CPUState.Registers[reg], 124);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    null,           // MVI into Register (opcode added, below)...
		    255,         // ...this data
		    null,           // DCR (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c._cpu._flagManager.IsSet(FlagType.Carry);
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.CPUState.Registers[reg], 254);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 19);
		    
		    c.Reset();
		};
		});
		
});
