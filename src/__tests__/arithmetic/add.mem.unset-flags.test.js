import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Memory (Unset All Flags)', () => {
	it('Unset All Flags', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		
		const data = 1;
		
		const program = [
		  0x3E,                   // MVI into Accumulator...
		  0,          // ...this immediate value (in test config)
		  0x26,                   // MOV into H...
		  null,                   // ...the high-byte of the memory address (inserted, below)
		  0x2E,                   // MOV into L...
		  null,                   // ... the low-byte of the memory address (inserted, below)
		  0x36,                   // MOV into the memory address...
		  data,                   // ...the data value
		  0x86,                   // Add data in Memory Location to Accumulator
		  0x76                    // Halt Program
		  ]
		
		for (let mem_addr = program.length; mem_addr <= max_mem_addr; mem_addr++) {
		  program[3] = (mem_addr >> 8) & 0xFF;
		  program[5] = mem_addr & 0xFF;
		
		  c.cpu._flag_manager.SetFlag(FlagType.Carry);
		  c.cpu._flag_manager.SetFlag(FlagType.Parity);
		  c.cpu._flag_manager.SetFlag(FlagType.AuxillaryCarry);
		  c.cpu._flag_manager.SetFlag(FlagType.Zero);
		  c.cpu._flag_manager.SetFlag(FlagType.Sign);
		
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), true);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), true);
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  assert.equal(c.cpu.registers.A, 1);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu._flag_manager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 45);
		
		  c.Reset();
		}
		});
		
});
