const Source = require('../../i8080');
describe('MOV Memory to Register', () => {
	test('MOVE B,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('B');
		  expect(c.cpu.registers.B).toEqual(data);
		  c.reset();
		}
		});
		
	test('MOVE C,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('C');
		  expect(c.cpu.registers.C).toEqual(data);
		  c.reset();
		}
		});
		
	test('MOVE D,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('D');
		  expect(c.cpu.registers.D).toEqual(data);
		  c.reset();
		}
		});
		
	test('MOVE E,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('E');
		  expect(c.cpu.registers.E).toEqual(data);
		  c.reset();
		}
		});
		
	test('MOVE H,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('H');
		  expect(c.cpu.registers.H).toEqual(data);
		  c.reset();
		}
		});
		
	test('MOVE L,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('L');
		  expect(c.cpu.registers.L).toEqual(data);
		  c.reset();
		}
		});
		
	test('MOVE A,M', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mov_from_mem('A');
		  expect(c.cpu.registers.A).toEqual(data);
		  c.reset();
		}
		});
		
});
