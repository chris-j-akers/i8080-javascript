const Source = require('../../i8080');
describe('ORA Memory', () => {
	test('Reset Carry Flag', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		const max_mem_addr = 255
		
		const data = 4;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 5)
		
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.ora_mem();
		
		  expect(c.cpu.registers.A).toEqual(5);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
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
		
		const data = 0;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.ora_mem();
		
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
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 127)
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.ora_mem();
		
		  expect(c.cpu.registers.A).toEqual(255);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
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
		
		const data = 81;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 68)
		
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.ora_mem();
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		  }
		});
		
});
