const Source = require('../../i8080');
describe('ADC Accumulator (Unset All Flags)', () => {
	test('Unset All Flags (Carry Bit Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A', 0x01);
		
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
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toBe(2);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		});
		
	test('Unset All Flags and Set Parity (Carry Bit Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A', 0x01);
		
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
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toBe(3);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		});
		
});
