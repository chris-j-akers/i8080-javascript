const Source = require('../../i8080');
describe('SBB Register', () => {
	test('NO FLAGS SET | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 32;
		  c.cpu.registers[reg] = 1;
		  
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(31);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('NO FLAGS SET | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 33;
		  c.cpu.registers[reg] = 1;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(31);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET ZERO | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 1;
		  
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET ZERO | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 3;
		  c.cpu.registers[reg] = 2;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET PARITY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 32;
		  c.cpu.registers[reg] = 2;
		  
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET PARITY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 32;
		  c.cpu.registers[reg] = 1;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET AUX CARRY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 127;
		  c.cpu.registers[reg] = 3;
		  
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(124);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET AUX CARRY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 127;
		  c.cpu.registers[reg] = 4;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(122);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET SIGN | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 255;
		  c.cpu.registers[reg] = 1;
		  
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(254);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET SIGN | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 253;
		  c.cpu.registers[reg] = 3;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(249);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET CARRY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 5;
		  c.cpu.registers[reg] = 10;
		  
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(251);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET CARRY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 5;
		  c.cpu.registers[reg] = 9;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.sbb_reg(c.cpu.registers[reg]);
		
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
