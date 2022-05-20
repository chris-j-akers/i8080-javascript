const Source = require('../../i8080');
describe('MOV Accumulator to Register', () => {
	test('MOVE A,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.scratch_registers.B = byte;
		    c.cpu.mov_reg('A', 'B')
		    expect(c.cpu.scratch_registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.scratch_registers.C = byte;
		    c.cpu.mov_reg('A', 'C')
		    expect(c.cpu.scratch_registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.scratch_registers.D = byte;
		    c.cpu.mov_reg('A', 'D')
		    expect(c.cpu.scratch_registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.scratch_registers.E = byte;
		    c.cpu.mov_reg('A', 'E')
		    expect(c.cpu.scratch_registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.scratch_registers.H = byte;
		    c.cpu.mov_reg('A', 'H')
		    expect(c.cpu.scratch_registers.A).toEqual(byte);
		}
		});
		
	test('MOVE A,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.scratch_registers.L = byte;
		    c.cpu.mov_reg('A', 'L')
		    expect(c.cpu.scratch_registers.A).toEqual(byte);
		}
		});
		
});
