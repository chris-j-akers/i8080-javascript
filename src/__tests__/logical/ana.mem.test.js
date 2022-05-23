const Source = require('../../i8080');
describe('ANA Memory', () => {
	test('Reset Carry Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		const max_mem_addr = 255
		
		const data = 100;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 4)
		
		  c.cpu.set_flag(FlagType.Carry);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  c.cpu.ana_mem();
		
		  expect(c.cpu.registers.A).toEqual(4);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
	test('Set Zero Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		const max_mem_addr = 255
		
		const data = 255;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		
		  c.cpu.set_flag(FlagType.Carry);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  c.cpu.ana_mem();
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
	test('Set Sign Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		const max_mem_addr = 255
		
		const data = 255;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 128)
		
		  c.cpu.set_flag(FlagType.Carry);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  c.cpu.ana_mem();
		
		  expect(c.cpu.registers.A).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		  }
		});
		
	test('Set Parity Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		const max_mem_addr = 255
		
		const data = 255;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.mvi_reg('H', (mem_addr >> 8) & 0xff);
		  c.cpu.mvi_reg('L', mem_addr & 0xff);
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 5)
		
		  c.cpu.set_flag(FlagType.Carry);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  c.cpu.ana_mem();
		
		  expect(c.cpu.registers.A).toEqual(5);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
});
