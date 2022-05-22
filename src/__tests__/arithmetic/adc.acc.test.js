const Source = require('../../i8080');
describe('ADC Accumulator', () => {
	test('No Flags Set (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',2);
		
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(4);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity and Zero Flag (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',0);
		
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity and Zero Flag (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',0);
		
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',7);
		
		c.cpu.set_flag(FlagType.Carry);
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(15);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity and Aux Carry Flags (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',9);
		
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(18);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity and Aux Carry Flags (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',8);
		
		c.cpu.set_flag(FlagType.Carry);
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(17);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('Set Parity, Aux Carry and Sign Flags (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',89);
		
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(178);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('Set Parity, Aux Carry and Sign Flags (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',88);
		
		c.cpu.set_flag(FlagType.Carry);
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(177);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('Set Carry, Parity and Sign Flags (With Carry Unset)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',241);
		
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(226);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('Set Carry, Parity and Sign Flags (With Carry Set)', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.mvi_reg('A',240);
		
		c.cpu.set_flag(FlagType.Carry);
		
		
		c.cpu.adc_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toEqual(225);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
});
