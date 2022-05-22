const Source = require('../../i8080');
describe('SBB Accumulator Flag', () => {
	test('ZERO FLAG SET | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.registers.A = 1;
		
		c.cpu.sbb_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SIGN FLAG SET | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.registers.A = 1;
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.sbb_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(255);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('SET PARITY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.registers.A = 10;
		
		c.cpu.sbb_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET PARITY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.registers.A = 7;
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.sbb_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(255);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
});
