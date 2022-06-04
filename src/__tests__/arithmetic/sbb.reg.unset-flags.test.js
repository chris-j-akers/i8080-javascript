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
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    32,  // MOV A, #32
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].SBB;
		
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		  c.inject_program(program);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 31);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  c.reset();
		};
		});
		
	it('Unset All Flags (Carry Bit Set)', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		let program = [
		    0x3E, 
		    33,  // MOV A, #33
		    null,           // Placeholder for relavent MOV opcode (see opcode lookup table)
		    1,         // MOV [R], 1
		    null,           // Placeholder for relavent ADD opcode (see opcode lookup table)
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  program[2] = opcode_lookup[reg].MVI;
		  program[4] = opcode_lookup[reg].SBB;
		
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  assert.equal(c.cpu.flag_set(FlagType.Parity),true);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), true);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), true);
		
		  c.inject_program(program);
		  c.cpu.set_flag(FlagType.Carry);
		assert.equal(c.cpu.flag_set(FlagType.Carry), true);
		
		  c.execute_program();
		
		  assert.equal(c.cpu.registers.A, 31);
		  assert.equal(c.cpu.flag_set(FlagType.Carry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Parity),false);
		  assert.equal(c.cpu.flag_set(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.flag_set(FlagType.Zero), false);
		  assert.equal(c.cpu.flag_set(FlagType.Sign), false);
		
		  c.reset();
		};
		});
		
});
