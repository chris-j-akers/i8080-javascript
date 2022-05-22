const Source = require('../../i8080');
describe('SUB Accumulator Flag', () => {
	test('Zero, AuxCarry, Parity Flags Set', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',1);
		c.cpu.sub_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Carry, Sign Flags Set', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',255);
		c.cpu.sub_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
});
