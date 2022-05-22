const Source = require('../../i8080');
describe('ADD Register', () => {
	test('No Flags Set', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 0;
		  c.cpu.registers[reg] = 1;
		
		  c.cpu.add_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(1);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity and Zero Flags', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 0;
		  c.cpu.registers[reg] = 0;
		
		  c.cpu.add_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 84;
		
		  c.cpu.add_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity and Aux Carry Flags', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 15;
		  c.cpu.registers[reg] = 15;
		
		  c.cpu.add_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Sign Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 112;
		  c.cpu.registers[reg] = 64;
		
		  c.cpu.add_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(176);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Set Carry Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 66;
		  c.cpu.registers[reg] = 192;
		
		  c.cpu.add_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(2);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
});
