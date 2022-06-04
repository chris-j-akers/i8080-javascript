const Computer = require('../../computer');
const i8080 = require('../../i8080');

describe('MVI Register', () => {
	it('MVI B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('B', byte);
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	it('MVI C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('C', byte);
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	it('MVI D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('D', byte);
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	it('MVI E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('E', byte);
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	it('MVI H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('H', byte);
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	it('MVI L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('L', byte);
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	it('MVI A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('A', byte);
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
});
