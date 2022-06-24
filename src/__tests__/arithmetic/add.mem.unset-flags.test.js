import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('ADD Memory (Unset All Flags)', () => {
	it('Unset All Flags', () => {
		const max_mem_addr = 4095;
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		
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
		
		  assert.equal(c.cpu.Registers.A, 1);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Parity),false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Zero), false);
		  assert.equal(c.cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		  assert.equal(c.cpu.Clock, 45);
		
		  c.Reset();
		}
		});
		
});
