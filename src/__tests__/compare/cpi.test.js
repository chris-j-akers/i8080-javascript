import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('CPI', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    32,  // ...this data
		    0xFE,           // CPI
		    1,         // ...this data
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 32);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 21);
		
		    c.Reset();
		};
		});
		
	it('Parity, Aux Carry and Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    1,  // ...this data
		    0xFE,           // CPI
		    1,         // ...this data
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 1);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 21);
		
		    c.Reset();
		};
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    32,  // ...this data
		    0xFE,           // CPI
		    2,         // ...this data
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 32);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 21);
		
		    c.Reset();
		};
		});
		
	it('Aux Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    127,  // ...this data
		    0xFE,           // CPI
		    3,         // ...this data
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 127);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		    assert.equal(c.CPUState.Clock, 21);
		
		    c.Reset();
		};
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    255,  // ...this data
		    0xFE,           // CPI
		    1,         // ...this data
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 255);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 21);
		
		    c.Reset();
		};
		});
		
	it('Carry and Sign Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		let program = [
		    0x3E,           // MVI into accumulator
		    5,  // ...this data
		    0xFE,           // CPI
		    10,         // ...this data
		    0x76            // HALT
		]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		    c.LoadProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.CPUState.Registers.A, 5);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		    assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		    assert.equal(c.CPUState.Clock, 21);
		
		    c.Reset();
		};
		});
		
});
