const Computer = require('../../computer');
const i8080 = require('../../i8080');

describe('MOV Register to Register', () => {
	it('MOVE B,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('B', 'B')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE B,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('B', 'C')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE B,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('B', 'D')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE B,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('B', 'E')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE B,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('B', 'H')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE B,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('B', 'L')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE B,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('B', 'A')
		  expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MOVE C,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('C', 'B')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE C,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('C', 'C')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE C,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('C', 'D')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE C,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('C', 'E')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE C,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('C', 'H')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE C,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('C', 'L')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE C,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('C', 'A')
		  expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MOVE D,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('D', 'B')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE D,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('D', 'C')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE D,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('D', 'D')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE D,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('D', 'E')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE D,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('D', 'H')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE D,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('D', 'L')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE D,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('D', 'A')
		  expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MOVE E,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('E', 'B')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE E,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('E', 'C')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE E,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('E', 'D')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE E,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('E', 'E')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE E,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('E', 'H')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE E,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('E', 'L')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE E,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('E', 'A')
		  expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MOVE H,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('H', 'B')
		  expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MOVE H,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('H', 'C')
		  expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MOVE H,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('H', 'D')
		  expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MOVE H,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('H', 'E')
		  expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MOVE H,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('H', 'H')
		  expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MOVE H,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('H', 'L')
		  expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MOVE H,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('A', 'A')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE L,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('L', 'B')
		  expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MOVE L,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('L', 'C')
		  expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MOVE L,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('L', 'D')
		  expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MOVE L,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('L', 'E')
		  expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MOVE L,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('L', 'H')
		  expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MOVE L,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('L', 'L')
		  expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MOVE L,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('A', 'A')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('B', byte);
		  c.cpu.mov_reg('A', 'B')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('C', byte);
		  c.cpu.mov_reg('A', 'C')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('D', byte);
		  c.cpu.mov_reg('A', 'D')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('E', byte);
		  c.cpu.mov_reg('A', 'E')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('H', byte);
		  c.cpu.mov_reg('A', 'H')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('L', byte);
		  c.cpu.mov_reg('A', 'L')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
	it('MOVE A,A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		  c.cpu.mvi_reg('A', byte);
		  c.cpu.mov_reg('A', 'A')
		  expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
});
