const Computer = require('../../computer');
const i8080 = require('../../i8080');

describe('SHLD', () => {
	it('Store Accumulator in address found in registers B,C', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('L', 0x71);
		  c.cpu.mvi_reg('H', 0xE);
		
		
		  c.cpu.shld(mem_addr);
		
		  expect(c.bus.read(mem_addr)).toEqual(0x71);
		  expect(c.bus.read(mem_addr + 1)).toEqual(0xE);
		
		  c.reset();
		}
		});
		
});
