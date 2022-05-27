const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('MVI Memory', () => {
	test('MVI M', () => {
		const max_mem_addr = 255;
		const c = new Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		    c.cpu.mvi_to_mem(data);
		    expect(c.bus.read(mem_addr)).toEqual(data);
		    c.reset();
		}
		});
		
});
