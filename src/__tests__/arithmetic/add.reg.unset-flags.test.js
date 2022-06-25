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

describe('ADD OpCode Tests (0x80, 0x81, 0x82, 0x83, 0x84, 0x85) With Unset All Flags', () => {
	it('Unset All Flags', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    0,  // ...this immediate value
		    null,           // MVI into Register (opcode inserted, below)...
		    1,         // ...this data
		    null,           // ADD (opcode inserted, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].ADD;
		
		  c._cpu.FlagManager.SetFlag(FlagType.Carry);
		  c._cpu.FlagManager.SetFlag(FlagType.Parity);
		  c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		  c._cpu.FlagManager.SetFlag(FlagType.Zero);
		  c._cpu.FlagManager.SetFlag(FlagType.Sign);
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 1);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		}
		});
		
});
