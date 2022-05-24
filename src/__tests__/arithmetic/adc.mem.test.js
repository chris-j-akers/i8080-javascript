const Source = require('../../i8080');
describe('ADC Memory', () => {
	test('No Flags Set (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
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
		
	test('No Flags Set (With Carry Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		  
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
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
		
	test('Set Parity and Zero Flags (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 0;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity Flag (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 84;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 1)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Parity Flag (With Carry Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 83;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 1)
		  
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Aux Carry Flag (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 15;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 1)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(16);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Aux Carry Flag (With Carry Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 14;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 1)
		  
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(16);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Aux Carry and Sign Flag (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 127;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 1)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Set Sign Flag (With Carry Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 127;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 0)
		  
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Set Carry and Aux Carry Flag (With Carry Unset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 255;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 20)
		  
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(19);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Set Carry and Parity Flag (With Carry Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 255;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.cpu.load_mem_addr(mem_addr, 'H', 'L');
		  c.cpu.mvi_to_mem(data);
		  c.cpu.mvi_reg('A', 20)
		  
		  c.cpu.set_flag(FlagType.Carry);
		expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		
		
		  c.cpu.adc_mem();
		
		  expect(c.cpu.registers.A).toEqual(20);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
});
