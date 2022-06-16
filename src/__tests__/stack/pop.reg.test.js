import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

const opcode_lookup = {
    'B': {MVI: 0x06, PUSH: 0xC5, POP: 0xC1},
    'C': {MVI: 0x0E, NOP: 0x00, NOP: 0x00},
    'D': {MVI: 0x16, PUSH: 0xD5, POP: 0xD1},
    'E': {MVI: 0x1E, NOP: 0x00, NOP: 0x00},
    'H': {MVI: 0x26, PUSH: 0xE5, POP: 0xE1},
    'L': {MVI: 0x2E, NOP: 0x00, NOP: 0x00}
};

describe('POP (R)', () => {
	it('Pop data into B & C from the Stack', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    opcode_lookup['B'].MVI,             // MVI into first register...
		    0x8F,                                             // ...This byte
		    opcode_lookup['C'].MVI,              // MVI into second register...
		    0x9D,                                             // ...this byte
		    opcode_lookup['B'].PUSH,            // PUSH
		    opcode_lookup['B'].MVI,             // MVI into first register...
		    0x00,                                             // 0
		    opcode_lookup['C'].MVI,              // MVI into second register...
		    0x00,                                             // 0
		    0x76,                                             // HALT
		
		    // Part 2 (POP)
		
		    opcode_lookup['B'].POP,
		    0x76,
		
		  ]
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers['B'], 0);
		    assert.equal(c.cpu.registers['C'], 0);
		
		    assert.equal(c.bus.Read(0xFFFF-1), 0x8F);
		    assert.equal(c.bus.Read(0xFFFF-2), 0x9D);
		    assert.equal(c.cpu.stack_pointer, 0xFFFF-2);
		
		    c.cpu.halt = false;
		    c.ExecuteProgram(13);
		
		    assert.equal(c.cpu.registers['B'], 0x8f);
		    assert.equal(c.cpu.registers['C'], 0x9D);
		
		    assert.equal(c.cpu.Clock, 73);  
		
		    c.Reset();
		});
		
	it('Pop data into D & E from the Stack', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    opcode_lookup['D'].MVI,             // MVI into first register...
		    0x8F,                                             // ...This byte
		    opcode_lookup['E'].MVI,              // MVI into second register...
		    0x9D,                                             // ...this byte
		    opcode_lookup['D'].PUSH,            // PUSH
		    opcode_lookup['D'].MVI,             // MVI into first register...
		    0x00,                                             // 0
		    opcode_lookup['E'].MVI,              // MVI into second register...
		    0x00,                                             // 0
		    0x76,                                             // HALT
		
		    // Part 2 (POP)
		
		    opcode_lookup['D'].POP,
		    0x76,
		
		  ]
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers['D'], 0);
		    assert.equal(c.cpu.registers['E'], 0);
		
		    assert.equal(c.bus.Read(0xFFFF-1), 0x8F);
		    assert.equal(c.bus.Read(0xFFFF-2), 0x9D);
		    assert.equal(c.cpu.stack_pointer, 0xFFFF-2);
		
		    c.cpu.halt = false;
		    c.ExecuteProgram(13);
		
		    assert.equal(c.cpu.registers['D'], 0x8f);
		    assert.equal(c.cpu.registers['E'], 0x9D);
		
		    assert.equal(c.cpu.Clock, 73);  
		
		    c.Reset();
		});
		
	it('Pop data into H & L from the Stack', () => {
		const c = new Computer();
		const FlagType = c.cpu._flag_manager.FlagType;
		
		let program = [
		    0x31,                                             // LXI into Stack pointer
		    0xFF,                                             // ...addr low-byte
		    0xFF,                                             // ...addr high-byte
		    opcode_lookup['H'].MVI,             // MVI into first register...
		    0x8F,                                             // ...This byte
		    opcode_lookup['L'].MVI,              // MVI into second register...
		    0x9D,                                             // ...this byte
		    opcode_lookup['H'].PUSH,            // PUSH
		    opcode_lookup['H'].MVI,             // MVI into first register...
		    0x00,                                             // 0
		    opcode_lookup['L'].MVI,              // MVI into second register...
		    0x00,                                             // 0
		    0x76,                                             // HALT
		
		    // Part 2 (POP)
		
		    opcode_lookup['H'].POP,
		    0x76,
		
		  ]
		
		    c.InjectProgram(program);
		    c.ExecuteProgram();
		
		    assert.equal(c.cpu.registers['H'], 0);
		    assert.equal(c.cpu.registers['L'], 0);
		
		    assert.equal(c.bus.Read(0xFFFF-1), 0x8F);
		    assert.equal(c.bus.Read(0xFFFF-2), 0x9D);
		    assert.equal(c.cpu.stack_pointer, 0xFFFF-2);
		
		    c.cpu.halt = false;
		    c.ExecuteProgram(13);
		
		    assert.equal(c.cpu.registers['H'], 0x8f);
		    assert.equal(c.cpu.registers['L'], 0x9D);
		
		    assert.equal(c.cpu.Clock, 73);  
		
		    c.Reset();
		});
		
});
