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

describe('SBB Register (Unset All Flags)', () => {
	it('Unset All Flags (Carry Bit Unset)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    32,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].SBB;
		
		  c._cpu.FlagManager.SetFlag(FlagType.Parity);
		  c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		  c._cpu.FlagManager.SetFlag(FlagType.Zero);
		  c._cpu.FlagManager.SetFlag(FlagType.Sign);
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  c.InjectProgram(program);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 31);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		};
		});
		
	it('Unset All Flags (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator...
		    33,  // ...this data
		    null,           // MVI into register (opcode added, below)
		    1,         // ...this data
		    null,           // SBB register (opcode added, below)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c._cpu.Registers).filter((register) => register != 'A')) {
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].SBB;
		
		  c._cpu.FlagManager.SetFlag(FlagType.Parity);
		  c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		  c._cpu.FlagManager.SetFlag(FlagType.Zero);
		  c._cpu.FlagManager.SetFlag(FlagType.Sign);
		
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		  c.InjectProgram(program);
		  c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c._cpu.Registers.A, 31);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c._cpu.Clock, 25);
		
		  c.Reset();
		};
		});
		
});
