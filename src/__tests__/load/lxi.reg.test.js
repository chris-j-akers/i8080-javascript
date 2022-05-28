const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('LXI Register', () => {
	test('LXI B,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		let msb, lsb;
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		
		    msb = word & 0xFF;
		    lsb = (word >> 8) & 0xFF;
		
		    c.cpu.lxi('B', msb, lsb);
		    expect(c.cpu.registers.B).toEqual(word & 0x00FF);
		    expect(c.cpu.registers.C).toEqual((word >> 8) & 0x00FF);
		}
		});
		
	test('LXI D,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		let msb, lsb;
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		
		    msb = word & 0xFF;
		    lsb = (word >> 8) & 0xFF;
		
		    c.cpu.lxi('D', msb, lsb);
		    expect(c.cpu.registers.D).toEqual(word & 0x00FF);
		    expect(c.cpu.registers.E).toEqual((word >> 8) & 0x00FF);
		}
		});
		
	test('LXI H,d16', () => {
		const max_value_to_test = 255;
		const c = new Computer();
		let msb, lsb;
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		
		    msb = word & 0xFF;
		    lsb = (word >> 8) & 0xFF;
		
		    c.cpu.lxi('H', msb, lsb);
		    expect(c.cpu.registers.H).toEqual(word & 0x00FF);
		    expect(c.cpu.registers.L).toEqual((word >> 8) & 0x00FF);
		}
		});
		
});
