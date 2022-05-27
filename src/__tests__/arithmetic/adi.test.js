const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('ADI', () => {
	test('No Flags Set', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',0);
		
		c.cpu.adi(1);
		
		expect(c.cpu.registers.A).toEqual(1);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity and Zero Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',0);
		
		c.cpu.adi(0);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',1);
		
		c.cpu.adi(84);
		
		expect(c.cpu.registers.A).toEqual(85);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity and Aux Carry Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',15);
		
		c.cpu.adi(15);
		
		expect(c.cpu.registers.A).toEqual(30);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',112);
		
		c.cpu.adi(64);
		
		expect(c.cpu.registers.A).toEqual(176);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('Set Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A',66);
		
		c.cpu.adi(192);
		
		expect(c.cpu.registers.A).toEqual(2);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
});
