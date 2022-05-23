const Source = require('../../i8080');
describe('ADC Memory (Unset All Flags)', () => {
	test('Unset All Flags (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(1);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		
		  c.reset();
		}
		});
		
	test('Unset All Flags (With Carry Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		  
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(2);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		
		  c.reset();
		}
		});
		
});
