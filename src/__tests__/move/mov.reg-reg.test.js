const Source = require('../../i8080');
describe('MOV Register to Register', () => {
	test('MOVE B,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('B', 'B')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE B,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('B', 'C')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE B,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('B', 'D')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE B,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('B', 'E')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE B,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('B', 'H')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE B,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('B', 'L')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE B,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('B', 'A')
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MOVE C,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('C', 'B')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE C,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('C', 'C')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE C,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('C', 'D')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE C,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('C', 'E')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE C,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('C', 'H')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE C,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('C', 'L')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE C,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('C', 'A')
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MOVE D,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('D', 'B')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE D,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('D', 'C')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE D,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('D', 'D')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE D,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('D', 'E')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE D,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('D', 'H')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE D,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('D', 'L')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE D,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('D', 'A')
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MOVE E,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('E', 'B')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE E,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('E', 'C')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE E,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('E', 'D')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE E,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('E', 'E')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE E,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('E', 'H')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE E,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('E', 'L')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE E,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('E', 'A')
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MOVE H,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('H', 'B')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE H,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('H', 'C')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE H,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('H', 'D')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE H,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('H', 'E')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE H,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('H', 'H')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE H,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('H', 'L')
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MOVE H,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('A', 'A')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	test('MOVE L,B', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.B = byte;
		    c.cpu.mov_reg('L', 'B')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MOVE L,C', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.C = byte;
		    c.cpu.mov_reg('L', 'C')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MOVE L,D', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.D = byte;
		    c.cpu.mov_reg('L', 'D')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MOVE L,E', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.E = byte;
		    c.cpu.mov_reg('L', 'E')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MOVE L,H', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.H = byte;
		    c.cpu.mov_reg('L', 'H')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MOVE L,L', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.L = byte;
		    c.cpu.mov_reg('L', 'L')
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MOVE L,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('A', 'A')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
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
		
	test('MOVE A,A', () => {
		const c = new Source.Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.registers.A = byte;
		    c.cpu.mov_reg('A', 'A')
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
});
