const Source = require('../../i8080');
describe('ADC Register', () => {
	test('NO FLAGS SET | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 0;
		  c.cpu.scratch_registers[reg] = 1;
		  
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(1);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 0;
		  c.cpu.scratch_registers[reg] = 1;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(2);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 0;
		  c.cpu.scratch_registers[reg] = 0;
		  
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET PARITY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 84;
		  
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(85);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 83;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(85);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 15;
		  
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(16);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 14;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(16);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 127;
		  
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(128);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 126;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET CARRY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 20;
		  c.cpu.scratch_registers[reg] = 255;
		  
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(19);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET CARRY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 254;
		  c.cpu.set_flag(FlagType.Carry);
		
		  c.cpu.adc_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
});
