const Source = require('../../i8080');

// The full test should run to 0xFFFF, but this can take a while. To start off with, and fix
// any broader bugs, set this to a low value.
const max_mem_addr = 0x01;
describe('ADC Memory (Unset All Flags)', () => {
	test('UNSET FLAGS | CARRY UNSET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.scratch_registers.L = mem_addr & 0xff;
		  c.cpu.accumulator = 0;
		  
		
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.accumulator).toEqual(1);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		
		  c.reset();
		}
		});
		
	test('UNSET FLAGS | CARRY SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.scratch_registers.L = mem_addr & 0xff;
		  c.cpu.accumulator = 0;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.set_flag(FlagType.Parity);
		  c.cpu.set_flag(FlagType.AuxillaryCarry);
		  c.cpu.set_flag(FlagType.Zero);
		  c.cpu.set_flag(FlagType.Sign);
		
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.accumulator).toEqual(2);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		
		  c.reset();
		}
		});
		
});
