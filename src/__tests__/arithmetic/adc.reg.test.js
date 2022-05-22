const Source = require('../../i8080');
describe('ADC Register', () => {
	test('No Flags Set (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 0;
		  c.cpu.registers[reg] = 1;
		  
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(1);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('No Flags Set (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 0;
		  c.cpu.registers[reg] = 1;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(2);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity and Zero Flags (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 0;
		  c.cpu.registers[reg] = 0;
		  
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity Flag (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 84;
		  
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity Flag (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 83;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Aux Carry Flag (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 15;
		  
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(16);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Aux Carry Flag (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 14;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(16);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Aux Carry and Sign Flag (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 127;
		  
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Set Sign Flag (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 126;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Set Carry and Aux Carry Flag (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 20;
		  c.cpu.registers[reg] = 255;
		  
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(19);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Carry and Parity Flag (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in Object.keys(c.cpu.registers).filter((register) => register != 'A')) {
		  c.cpu.registers.A = 1;
		  c.cpu.registers[reg] = 254;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.registers[reg]);
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
});
