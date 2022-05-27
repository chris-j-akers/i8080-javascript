const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('ANA Accumulator', () => {
	test('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A', 4);
		
		c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		c.cpu.ana_reg('A');
		
		expect(c.cpu.registers.A).toEqual(4);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A', 0);
		
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		c.cpu.ana_reg('A');
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A', 128);
		
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		c.cpu.ana_reg('A');
		
		expect(c.cpu.registers.A).toEqual(128);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A', 5);
		
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		c.cpu.ana_reg('A');
		
		expect(c.cpu.registers.A).toEqual(5);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
});
