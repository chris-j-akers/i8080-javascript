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
    'B': {MVI: 0x06, CMP: 0xB8},
    'C': {MVI: 0x0E, CMP: 0xB9},
    'D': {MVI: 0x16, CMP: 0xBA},
    'E': {MVI: 0x1E, CMP: 0xBB},
    'H': {MVI: 0x26, CMP: 0xBC},
    'L': {MVI: 0x2E, CMP: 0xBD}
};

describe('CMP Register (Unset All Flags)', () => {
	it('Unset All Flags', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    32,  // ...this data
		    null,           // MVI into Register (opcode added, below)
		    1,         // ...this data
		    null,           // SUB
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.Registers).filter((register) => register != 'A')) {
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].CMP;
		
		  c.cpu.FlagManager.SetFlag(FlagType.Carry);
		  c.cpu.FlagManager.SetFlag(FlagType.Parity);
		  c.cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		  c.cpu.FlagManager.SetFlag(FlagType.Zero);
		  c.cpu.FlagManager.SetFlag(FlagType.Sign);
		
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.Registers.A, 32);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 25);
		
		  c.Reset();
		};
		});
		
});
