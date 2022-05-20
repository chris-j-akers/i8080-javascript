const Source = require('../../i8080');
describe('MOV Accumulator to Register', () => {
	test('MOVE B,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte
		    c.cpu.mov_reg('B', 'A')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE C,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte
		    c.cpu.mov_reg('C', 'A')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE D,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte
		    c.cpu.mov_reg('D', 'A')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE E,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte
		    c.cpu.mov_reg('E', 'A')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE H,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte
		    c.cpu.mov_reg('H', 'A')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE L,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte
		    c.cpu.mov_reg('L', 'A')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
});
