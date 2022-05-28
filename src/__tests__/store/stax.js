const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('STAX', () => {
	test('Store Accumulator in address found in registers B,C', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('A', 0xFF);
		
		  c.cpu.load_mem_addr(mem_addr, 'B', 'C');
		  c.cpu.stax('B');
		
		  expect(c.bus.read(mem_addr)).toEqual(0xFF);
		
		  c.reset();
		
		}
		});
		
	test('Store Accumulator in address found in registers D,E', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('A', 0xFF);
		
		  c.cpu.load_mem_addr(mem_addr, 'D', 'E');
		  c.cpu.stax('D');
		
		  expect(c.bus.read(mem_addr)).toEqual(0xFF);
		
		  c.reset();
		
		}
		});
		
});
