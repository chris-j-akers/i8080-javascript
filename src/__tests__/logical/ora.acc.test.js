import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ORA Accumulator', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    4,        // ... this immediate value
		    0xB7,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  c.LoadProgram(program);
		  c._cpu._flagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 4);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    0,        // ... this immediate value
		    0xB7,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 0);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    128,        // ... this immediate value
		    0xB7,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 128);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), true);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		    0x3E,                 // MVI into the accumulator...
		    68,        // ... this immediate value
		    0xB7,                 // ORA
		    0x76                  // HALT
		  ]
		
		for (let reg of Object.keys(c.CPUState.Registers).filter((register) => register != 'A')) {
		
		  c.LoadProgram(program);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		
		  c.ExecuteProgram();
		
		  assert.equal(c.CPUState.Registers.A, 68);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),true);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 18);
		
		  c.Reset();
		  }
		});
		
});
