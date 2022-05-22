const Source = require('../../i8080');
describe('SUB Register', () => {
	test('NO FLAGS SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 32;
		  c.cpu.registers[reg] = 1;
		  c.cpu.sub_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(31);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET ZERO', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 1;
		  c.cpu.sub_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET PARITY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 32;
		  c.cpu.registers[reg] = 2;
		  c.cpu.sub_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET AUX CARRY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 127;
		  c.cpu.registers[reg] = 3;
		  c.cpu.sub_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(124);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET SIGN', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 255;
		  c.cpu.registers[reg] = 1;
		  c.cpu.sub_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(254);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET CARRY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 5;
		  c.cpu.registers[reg] = 10;
		  c.cpu.sub_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(251);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
});
