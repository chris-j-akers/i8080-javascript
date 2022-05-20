const Source = require('../../i8080');
describe('ADC Accumulator', () => {
	test('NO FLAGS SET | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 2;
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(4);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET ZERO | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 0;
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET PARITY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 0;
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(0);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET PARITY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 7;
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(15);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET AUX CARRY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 9;
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(18);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET AUX CARRY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 8;
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(17);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		c.reset();
		});
		
	test('SET SIGN | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 89;
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(178);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('SET SIGN | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 88;
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(177);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('SET CARRY | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 241;
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(226);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
	test('SET CARRY | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		c.cpu.accumulator = 240;
		c.cpu.set_flag(FlagType.Carry);
		
		c.cpu.adc_reg(c.cpu.accumulator);
		
		expect(c.cpu.accumulator).toEqual(225);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		c.reset();
		});
		
});
