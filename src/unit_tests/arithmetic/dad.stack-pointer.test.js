import { Computer } from '../../core/computer.js'
import { i8080 } from '../../core/i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
'B': {MVI: 0x06, DAD: 0x09},
'C': {MVI: 0x0E, NOP: 0x00},
'D': {MVI: 0x16, DAD: 0x19},
'E': {MVI: 0x1E, NOP: 0x00},
'H': {MVI: 0x26, DAD: 0x29},
'L': {MVI: 0x2E, NOP: 0x00}
};

describe('DAD SP', () => {
	it('Carry unset and not set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x31,                             // Set stack pointer to...
		  30000 & 0xFF,           // ...this low-byte....
		  30000 >> 8 & 0xFF,      // ...this high-byte
		  0x26,                             // MVI into H...
		  117,                          // ... this data
		  0x2E,                             // MVI into L...
		  48,                          // ...this data
		  0x39,                             // Call relevant DAD command
		  0x76                              // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.CPUState.Registers['H'] << 8 | c.CPUState.Registers['L']) & 0xFFFF, 60000)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 41);
		  
		  c.Reset();
		});
		
	it('Carry unset and set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x31,                             // Set stack pointer to...
		  1 & 0xFF,           // ...this low-byte....
		  1 >> 8 & 0xFF,      // ...this high-byte
		  0x26,                             // MVI into H...
		  255,                          // ... this data
		  0x2E,                             // MVI into L...
		  255,                          // ...this data
		  0x39,                             // Call relevant DAD command
		  0x76                              // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.CPUState.Registers['H'] << 8 | c.CPUState.Registers['L']) & 0xFFFF, 0)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 41);
		  
		  c.Reset();
		});
		
	it('Carry set then unset', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  0x31,                             // Set stack pointer to...
		  16385 & 0xFF,           // ...this low-byte....
		  16385 >> 8 & 0xFF,      // ...this high-byte
		  0x26,                             // MVI into H...
		  64,                          // ... this data
		  0x2E,                             // MVI into L...
		  1,                          // ...this data
		  0x39,                             // Call relevant DAD command
		  0x76                              // HALT
		]
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.CPUState.Registers['H'] << 8 | c.CPUState.Registers['L']) & 0xFFFF, 32770)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 41);
		  
		  c.Reset();
		});
		
});
