import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('PUSH (PSW)', () => {
	it('No Flags Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
	it('All flags set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		c._cpu.FlagManager.SetFlag(FlagType.Parity);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		
		c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		
		c._cpu.FlagManager.SetFlag(FlagType.Zero);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		
		c._cpu.FlagManager.SetFlag(FlagType.Sign);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
	it('Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		c._cpu.FlagManager.SetFlag(FlagType.Carry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
	it('Parity Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		c._cpu.FlagManager.SetFlag(FlagType.Parity);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
	it('Auxillary Carry Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		
		c._cpu.FlagManager.SetFlag(FlagType.AuxillaryCarry);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
	it('Zero Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		
		c._cpu.FlagManager.SetFlag(FlagType.Zero);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), true);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), false);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
	it('Sign Flag Set', () => {
		const c = new Computer();
		const FlagType = c._cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    0x3E,                                             // MVI into accumulator
		    0xFF,                                             // ...this byte
		    0xF5,                                             // PUSH PSW
		    0x3E,                                             // MVI into the accumulator... 
		    0x00,                                             // ...Zero
		    0x76,                                             // HALT
		]
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		
		c._cpu.FlagManager.SetFlag(FlagType.Sign);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		
		c.InjectProgram(program);
		c.ExecuteProgram();
		
		// No Op-Code for this, so set it here
		c._cpu.flags = 0x0;
		
		assert.equal(c._cpu.flags, 0);
		assert.equal(c._cpu.Registers['A'], 0);
		
		// We assign it back to flags so we can use the FlagManager code to check flag status
		c._cpu.flags = c.Bus.ReadRAM(c._cpu.StackPointer);
		
		assert.equal(c.Bus.ReadRAM(c._cpu.StackPointer+1), 0xFF);
		
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Parity), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.AuxillaryCarry), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Zero), false);
		assert.equal(c._cpu.FlagManager.IsSet(FlagType.Sign), true);
		
		assert.equal(c._cpu.Clock, 42);
		
		c.Reset();
		});
		
});
