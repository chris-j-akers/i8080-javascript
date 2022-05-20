const Source = require('../../i8080');
const max_mem_addr = 0x00FF;
describe('MOV to Register to Memory', () => {
	test('MOVE M,B', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_to_mem('B');
		    expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.scratch_registers.B);
		    c.reset();
		}
		});
		
	test('MOVE M,C', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_to_mem('C');
		    expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.scratch_registers.C);
		    c.reset();
		}
		});
		
	test('MOVE M,D', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_to_mem('D');
		    expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.scratch_registers.D);
		    c.reset();
		}
		});
		
	test('MOVE M,E', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_to_mem('E');
		    expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.scratch_registers.E);
		    c.reset();
		}
		});
		
	test('MOVE M,H', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_to_mem('H');
		    expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.scratch_registers.H);
		    c.reset();
		}
		});
		
	test('MOVE M,L', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_to_mem('L');
		    expect(c.cpu.bus.read(mem_addr)).toEqual(c.cpu.scratch_registers.L);
		    c.reset();
		}
		});
		
});
