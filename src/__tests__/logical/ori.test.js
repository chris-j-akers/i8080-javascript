const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('ORI', () => {
	test('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',5);
		
		c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		c.cpu.ori(4);
		
		expect(c.cpu.registers.A).toEqual(5);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',0);
		
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		c.cpu.ori(0);
		
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
		
		c.cpu.mvi_reg('A',127);
		
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		c.cpu.ori(255);
		
		expect(c.cpu.registers.A).toEqual(255);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',68);
		
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		c.cpu.ori(81);
		
		expect(c.cpu.registers.A).toEqual(85);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
});
