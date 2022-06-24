import { Computer } from '../../computer.js'
import { i8080 } from '../../i8080.js'
import { strict as assert } from 'assert'

describe('XTHL', () => {
	it('Standard exchange (taken from 8080 programmers manual)', () => {
		const c = new Computer();
		const FlagType = c.cpu.FlagManager.FlagType;
		
		let program = [
		  0x26,                   // MVI into Register H...
		  16,                   // ...This high-byte
		  0x2E,                   // MVI into Register L...
		  173,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  240,                   // ...This byte
		  0x2E,                   // MVI into Register L...
		  173+1,                   // ...This low-byte
		  0x36,                   // MVI into memory location (stored in registers H/L)
		  13,                   // ...This byte
		  0x31,                   // Load into Stack-pointer
		  173,                   // ...this low-byte (mem addr)
		  16,                   // ...this high-byte (mem_addr)
		  0x26,                   // MVI into Register H...
		  11,                   // ...This byte
		  0x2E,                   // MVI into Register L...
		  60,                   // ...This byte
		  0x76,                   // HALT (So we can check data is set-up correctly)
		
		  // Phew, now to test
		
		  0xE3,                   // XTHL
		  0x76                   // HALT
		]
		
		  c.InjectProgram(program);
		  c.ExecuteProgram();
		
		  // Check we're set-up correctly
		
		  assert.equal(c.bus.ReadRAM(16 << 8 | 173), 240);
		  assert.equal(c.bus.ReadRAM(16 << 8 | 173 + 1), 13);
		  assert.equal(c.cpu.Registers['H'], 0x0B);
		  assert.equal(c.cpu.Registers['L'], 0x3C);
		  
		  // Now execute the test
		
		  c.cpu.Halt = false;
		  c.ExecuteProgram(18);
		
		  assert.equal(c.bus.ReadRAM(16 << 8 | 173), 60);
		  assert.equal(c.bus.ReadRAM(16 << 8 | 173 + 1), 11);
		  assert.equal(c.cpu.Registers['H'], 13);
		  assert.equal(c.cpu.Registers['L'], 240);
		
		});
		
});
