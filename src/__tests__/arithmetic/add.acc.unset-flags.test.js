const Computer = require('../../computer');
const i8080 = require('../../i8080');
describe('ADD Accumulator (Unset All Flags)', () => {
	test('Unset All Flags', () => {
		const c = new Computer();
		const FlagType = i8080.FlagType;
		
		c.cpu.mvi_reg('A', 0x01);
		
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
		
		c.cpu.add_reg(c.cpu.registers.A);
		
		expect(c.cpu.registers.A).toBe(2);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		});
		
});
