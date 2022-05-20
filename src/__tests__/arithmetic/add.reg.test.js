const Source = require('../../i8080');
describe('ADD Register', () => {
	test('NO FLAGS SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 0;
		  c.cpu.scratch_registers[reg] = 1;
		
		  c.cpu.add_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(1);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 0;
		  c.cpu.scratch_registers[reg] = 0;
		
		  c.cpu.add_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET PARITY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 1;
		  c.cpu.scratch_registers[reg] = 84;
		
		  c.cpu.add_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(85);
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
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 15;
		  c.cpu.scratch_registers[reg] = 15;
		
		  c.cpu.add_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET SIGN', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 112;
		  c.cpu.scratch_registers[reg] = 64;
		
		  c.cpu.add_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(176);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET CARRY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 66;
		  c.cpu.scratch_registers[reg] = 192;
		
		  c.cpu.add_reg(c.cpu.scratch_registers[reg]);
		
		  expect(c.cpu.accumulator).toEqual(2);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
});
