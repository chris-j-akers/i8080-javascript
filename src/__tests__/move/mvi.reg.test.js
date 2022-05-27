const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('MVI Register', () => {
	test('MVI B', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('B', byte);
		    expect(c.cpu.registers.B).toEqual(byte);
		}
		});
		
	test('MVI C', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('C', byte);
		    expect(c.cpu.registers.C).toEqual(byte);
		}
		});
		
	test('MVI D', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('D', byte);
		    expect(c.cpu.registers.D).toEqual(byte);
		}
		});
		
	test('MVI E', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('E', byte);
		    expect(c.cpu.registers.E).toEqual(byte);
		}
		});
		
	test('MVI H', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('H', byte);
		    expect(c.cpu.registers.H).toEqual(byte);
		}
		});
		
	test('MVI L', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('L', byte);
		    expect(c.cpu.registers.L).toEqual(byte);
		}
		});
		
	test('MVI A', () => {
		const c = new Computer();
		for (let byte = 0x00; byte <= 0xFF; byte++) {
		    c.cpu.mvi_reg('A', byte);
		    expect(c.cpu.registers.A).toEqual(byte);
		}
		});
		
});
