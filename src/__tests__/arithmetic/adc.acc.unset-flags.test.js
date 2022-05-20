const Source = require('../../i8080');
describe('ADC Accumulator (Unset All Flags)', () => {
	test('UNSET FLAGS | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 0x01;
		
		c.cpu.set_flag(FlagType.Parity);
		c.cpu.set_flag(FlagType.AuxillaryCarry);
		c.cpu.set_flag(FlagType.Zero);
		c.cpu.set_flag(FlagType.Sign);
		
		// We're not setting this as this is the Carry test, remember!
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toBe(2);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		});
		
	test('UNSET FLAGS | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 0x01;
		
		c.cpu.set_flag(FlagType.Parity);
		c.cpu.set_flag(FlagType.AuxillaryCarry);
		c.cpu.set_flag(FlagType.Zero);
		c.cpu.set_flag(FlagType.Sign);
		
		// We're not setting this as this is the Carry test, remember!
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toBe(3);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		});
		
});
