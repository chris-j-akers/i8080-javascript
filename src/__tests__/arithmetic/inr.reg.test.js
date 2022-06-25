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
    'B': {MVI: 0x06, INR: 0x04},
    'C': {MVI: 0x0E, INR: 0x0C},
    'D': {MVI: 0x16, INR: 0x14},
    'E': {MVI: 0x1E, INR: 0x1C},
    'H': {MVI: 0x26, INR: 0x24},
    'L': {MVI: 0x2E, INR: 0x2C}
};

describe('INR R', () => {
	it('Set no flags', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    null,           // MVI into register (opcode added, below)...
		    0,         // ...this data
		    null,           // INR on register (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].INR;
		
		    carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c._cpu.Registers[reg], 1);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c._cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Rollover from 255 (Set Parity, AC and Zero flags)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    null,           // MVI into register (opcode added, below)...
		    255,         // ...this data
		    null,           // INR on register (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].INR;
		
		    carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c._cpu.Registers[reg], 0);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c._cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    null,           // MVI into register (opcode added, below)...
		    84,         // ...this data
		    null,           // INR on register (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].INR;
		
		    carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c._cpu.Registers[reg], 85);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c._cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    null,           // MVI into register (opcode added, below)...
		    175,         // ...this data
		    null,           // INR on register (opcode added, below)
		    0x76            // HALT
		]
		
		let carry_set;
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		    program[0] = opcode_lookup[reg].MVI;
		    program[2] = opcode_lookup[reg].INR;
		
		    carry_set = c._cpu.FlagManager.IsSet(FlagType.Carry);
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    // Here, we're just checking the carry flag hasn't been touched.
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), carry_set);
		
		    assert.equal(c._cpu.Registers[reg], 176);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c._cpu.Clock, 19);
		    
		    c.Reset();
		};
		});
		
});
