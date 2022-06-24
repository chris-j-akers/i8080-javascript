import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'


const opcode_lookup = {
    'B': {MVI: 0x06, PUSH: 0xC5},
    'C': {MVI: 0x0E, NOP: 0x00},
    'D': {MVI: 0x16, PUSH: 0xD5},
    'E': {MVI: 0x1E, NOP: 0x00},
    'H': {MVI: 0x26, PUSH: 0xE5},
    'L': {MVI: 0x2E, NOP: 0x00}
};

describe('PUSH (R)', () => {
	it('Push data in B & C onto the Stack', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    opcode_lookup['B'].MVI,             // MVI into first register...
		    0x8F,                                             // ...this byte
		    opcode_lookup['C'].MVI,              // MVI into second register...
		    0x9D,                                             // ...this byte
		    opcode_lookup['B'].PUSH,            // PUSH
		    0x76                                              // HALT
		]
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.bus.ReadRAM(0xFFFF-1), 0x8F);
		    assert.equal(c.bus.ReadRAM(0xFFFF-2), 0x9D);
		    assert.equal(c.cpu.StackPointer, 0xFFFF-2);
		    assert.equal(c.cpu.Clock, 42);
		});
		
	it('Push data in D & E onto the Stack', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    opcode_lookup['D'].MVI,             // MVI into first register...
		    0x8F,                                             // ...this byte
		    opcode_lookup['E'].MVI,              // MVI into second register...
		    0x9D,                                             // ...this byte
		    opcode_lookup['D'].PUSH,            // PUSH
		    0x76                                              // HALT
		]
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.bus.ReadRAM(0xFFFF-1), 0x8F);
		    assert.equal(c.bus.ReadRAM(0xFFFF-2), 0x9D);
		    assert.equal(c.cpu.StackPointer, 0xFFFF-2);
		    assert.equal(c.cpu.Clock, 42);
		});
		
	it('Push data in H & L onto the Stack', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    opcode_lookup['H'].MVI,             // MVI into first register...
		    0x8F,                                             // ...this byte
		    opcode_lookup['L'].MVI,              // MVI into second register...
		    0x9D,                                             // ...this byte
		    opcode_lookup['H'].PUSH,            // PUSH
		    0x76                                              // HALT
		]
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.bus.ReadRAM(0xFFFF-1), 0x8F);
		    assert.equal(c.bus.ReadRAM(0xFFFF-2), 0x9D);
		    assert.equal(c.cpu.StackPointer, 0xFFFF-2);
		    assert.equal(c.cpu.Clock, 42);
		});
		
});
