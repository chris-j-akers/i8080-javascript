const Computer = require('../../computer');
const i8080 = require('../../i8080');

describe('ORA Register', () => {
	it('Reset Carry Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.mvi_reg('A', 5);
		  c.cpu.mvi_reg(reg, 4);
		
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.ora_reg(reg);
		
		  expect(c.cpu.registers.A).toEqual(5);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
	it('Set Zero Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.mvi_reg('A', 0);
		  c.cpu.mvi_reg(reg, 0);
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.ora_reg(reg);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
	it('Set Sign Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.mvi_reg('A', 127);
		  c.cpu.mvi_reg(reg, 255);
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.ora_reg(reg);
		
		  expect(c.cpu.registers.A).toEqual(255);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		  }
		});
		
	it('Set Parity Flag', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.mvi_reg('A', 68);
		  c.cpu.mvi_reg(reg, 81);
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.ora_reg(reg);
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
});
