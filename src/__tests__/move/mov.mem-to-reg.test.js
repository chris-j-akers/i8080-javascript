const Source = require('../../i8080');
const max_mem_addr = 0x00FF;
describe('MOV Memory to Register', () => {
	test('MOVE B,M', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_from_mem('B');
		    expect(c.cpu.scratch_registers.B).toEqual(data);
		    c.reset();
		}
		});
		
	test('MOVE C,M', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_from_mem('C');
		    expect(c.cpu.scratch_registers.C).toEqual(data);
		    c.reset();
		}
		});
		
	test('MOVE D,M', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_from_mem('D');
		    expect(c.cpu.scratch_registers.D).toEqual(data);
		    c.reset();
		}
		});
		
	test('MOVE E,M', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_from_mem('E');
		    expect(c.cpu.scratch_registers.E).toEqual(data);
		    c.reset();
		}
		});
		
	test('MOVE H,M', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_from_mem('H');
		    expect(c.cpu.scratch_registers.H).toEqual(data);
		    c.reset();
		}
		});
		
	test('MOVE L,M', () => {
		const c = new Source.Computer();
		const data = 0xFFFF;
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		    c.bus.write(data, mem_addr);
		    c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		    c.cpu.scratch_registers.L = mem_addr & 0xff;
		    c.cpu.mov_from_mem('L');
		    expect(c.cpu.scratch_registers.L).toEqual(data);
		    c.reset();
		}
		});
		
});
