const Source = require('../../i8080');
describe('LXI Register', () => {
	test('LXI B,d16', () => {
		const c = new Source.Computer();
		
		for (let word = 0x0000; word <= 0xFFFF; word++) {
		    c.cpu.lxi_b(word);
		    expect(c.cpu.registers.B).toEqual(word & 0x00FF);
		    expect(c.cpu.registers.C).toEqual((word >> 8) & 0x00FF);
		}
		});
		
	test('LXI D,d16', () => {
		const c = new Source.Computer();
		
		for (let word = 0x0000; word <= 0xFFFF; word++) {
		    c.cpu.lxi_d(word);
		    expect(c.cpu.registers.D).toEqual(word & 0x00FF);
		    expect(c.cpu.registers.E).toEqual((word >> 8) & 0x00FF);
		}
		});
		
	test('LXI H,d16', () => {
		const c = new Source.Computer();
		
		for (let word = 0x0000; word <= 0xFFFF; word++) {
		    c.cpu.lxi_h(word);
		    expect(c.cpu.registers.H).toEqual(word & 0x00FF);
		    expect(c.cpu.registers.L).toEqual((word >> 8) & 0x00FF);
		}
		});
		
});
