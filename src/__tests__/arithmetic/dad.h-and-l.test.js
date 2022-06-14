import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
'B': {MVI: 0x06, DAD: 0x09},
'C': {MVI: 0x0E, NOP: 0x00},
'D': {MVI: 0x16, DAD: 0x19},
'E': {MVI: 0x1E, NOP: 0x00},
'H': {MVI: 0x26, DAD: 0x29},
'L': {MVI: 0x2E, NOP: 0x00}
};

describe('DAD (H & L)', () => {
	it('Carry unset and not set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x26,          // MVI into H...
		  117,       // ... this data
		  0x2E,          // MVI into L...
		  48,       // ...this data
		  0x29,          // Call relevant DAD command
		  0x76           // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.cpu.registers['H'] << 8 | c.cpu.registers['L']) & 0xFFFF, 60000)
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 31);
		  
		  c.Reset();
		});
		
	it('Carry unset and set', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x26,          // MVI into H...
		  128,       // ... this data
		  0x2E,          // MVI into L...
		  0,       // ...this data
		  0x29,          // Call relevant DAD command
		  0x76           // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.cpu.registers['H'] << 8 | c.cpu.registers['L']) & 0xFFFF, 0)
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 31);
		  
		  c.Reset();
		});
		
	it('Carry set then unset', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		let program = [
		  0x26,          // MVI into H...
		  64,       // ... this data
		  0x2E,          // MVI into L...
		  1,       // ...this data
		  0x29,          // Call relevant DAD command
		  0x76           // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal((c.cpu.registers['H'] << 8 | c.cpu.registers['L']) & 0xFFFF, 32770)
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false)
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 31);
		  
		  c.Reset();
		});
		
});
