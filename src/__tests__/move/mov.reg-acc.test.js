const Source = require('../../i8080');
describe('MOV Accumulator to Register', () => {
	test('MOVE A,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('A', 'B')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('A', 'C')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('A', 'D')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('A', 'E')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('A', 'H')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('A', 'L')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
});
