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
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    null,
		    32,
		    null,
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c.cpu._flag_manager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.cpu.registers[reg], 31);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    null,
		    1,
		    null,
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c.cpu._flag_manager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.cpu.registers[reg], 0);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Parity Flag and Auxillary Carry Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    null,
		    31,
		    null,
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c.cpu._flag_manager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.cpu.registers[reg], 30);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    null,
		    125,
		    null,
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c.cpu._flag_manager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.cpu.registers[reg], 124);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		    null,
		    255,
		    null,
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].DCR;
		
		    carry_set = c.cpu._flag_manager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c.cpu.registers[reg], 254);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		    assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
});
