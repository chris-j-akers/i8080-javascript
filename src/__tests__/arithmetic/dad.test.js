import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
'B': {MVI: 0x06, DAD: 0x09},
'C': {MVI: 0x0E, NOP: 0x00},
'D': {MVI: 0x16, DAD: 0x19},
'E': {MVI: 0x1E, NOP: 0x00}
};

describe('DAD', () => {
	it('Carry unset and not set', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  null,          // MVI into High_byte register...
		  51,   // ...this data
		  null,          //  MVI into low byte register...
		  159,    // ...this data
		  0x26,          // MVI into H...
		  161,       // ... this data
		  0x2E,          // MVI into L...
		  123,       // ...this data
		  null,          // Call relevant DAD command
		  0x76           // HALT
		
		]
		
		let low_reg;
		for (let high_reg of ['B', 'D']) {
		
		  switch(high_reg) {
		    case 'B':
		      low_reg = 'C';
		      break;
		    case 'D':
		      low_reg = 'E';
		      break;
		  }
		  program[0] = opcode_lookup[high_reg].MVI;
		  program[2] = opcode_lookup[low_reg].MVI;
		  program[8] = opcode_lookup[high_reg].DAD;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.CPUState.Registers['H'] << 8 | c.CPUState.Registers['L']) & 0xFFFF, 54554)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 45);
		  
		  c.Reset();
		};
		});
		
	it('Carry unset and set (result rolls to 0 when too large)', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  null,          // MVI into High_byte register...
		  128,   // ...this data
		  null,          //  MVI into low byte register...
		  0,    // ...this data
		  0x26,          // MVI into H...
		  128,       // ... this data
		  0x2E,          // MVI into L...
		  0,       // ...this data
		  null,          // Call relevant DAD command
		  0x76           // HALT
		
		]
		
		let low_reg;
		for (let high_reg of ['B', 'D']) {
		
		  switch(high_reg) {
		    case 'B':
		      low_reg = 'C';
		      break;
		    case 'D':
		      low_reg = 'E';
		      break;
		  }
		  program[0] = opcode_lookup[high_reg].MVI;
		  program[2] = opcode_lookup[low_reg].MVI;
		  program[8] = opcode_lookup[high_reg].DAD;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.CPUState.Registers['H'] << 8 | c.CPUState.Registers['L']) & 0xFFFF, 0)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 45);
		  
		  c.Reset();
		};
		});
		
	it('Carry set then unset', () => {
		const c = new Computer();
		const FlagType = c._cpu._flagManager.FlagType;
		
		
		let program = [
		  null,          // MVI into High_byte register...
		  170,   // ...this data
		  null,          //  MVI into low byte register...
		  170,    // ...this data
		  0x26,          // MVI into H...
		  0,       // ... this data
		  0x2E,          // MVI into L...
		  0,       // ...this data
		  null,          // Call relevant DAD command
		  0x76           // HALT
		
		]
		
		let low_reg;
		for (let high_reg of ['B', 'D']) {
		
		  switch(high_reg) {
		    case 'B':
		      low_reg = 'C';
		      break;
		    case 'D':
		      low_reg = 'E';
		      break;
		  }
		  program[0] = opcode_lookup[high_reg].MVI;
		  program[2] = opcode_lookup[low_reg].MVI;
		  program[8] = opcode_lookup[high_reg].DAD;
		
		  c.LoadProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.CPUState.Registers['H'] << 8 | c.CPUState.Registers['L']) & 0xFFFF, 43690)
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false)
		
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c._cpu._flagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.CPUState.Clock, 45);
		  
		  c.Reset();
		};
		});
		
});
