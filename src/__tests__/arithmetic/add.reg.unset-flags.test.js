const Source = require('../../i8080');
describe('ADD Register (Unset All Flags)', () => {
	test('UNSET FLAGS', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		for (reg in c.cpu.scratch_registers) {
		  c.cpu.accumulator = 0;
		  c.cpu.scratch_registers[reg] = 1;
		
		  c.cpu.set_flag(FlagType.Carry);
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
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
		
});
