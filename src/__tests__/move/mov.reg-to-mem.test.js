const Source = require('../../i8080');
describe('MOV to Register to Memory', () => {
	test('MOVE M,B', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('B');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.B);
		  c.reset();
		}
		});
		
	test('MOVE M,C', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('C');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.C);
		  c.reset();
		}
		});
		
	test('MOVE M,D', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('D');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.D);
		  c.reset();
		}
		});
		
	test('MOVE M,E', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('E');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.E);
		  c.reset();
		}
		});
		
	test('MOVE M,H', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('H');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.H);
		  c.reset();
		}
		});
		
	test('MOVE M,L', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('L');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.L);
		  c.reset();
		}
		});
		
	test('MOVE M,A', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mov_to_mem('A');
		  expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.registers.A);
		  c.reset();
		}
		});
		
});
