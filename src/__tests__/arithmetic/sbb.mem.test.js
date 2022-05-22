const Source = require('../../i8080');
describe('SBB Memory', () => {
	test('No Flags Set (Carry Bit Reset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 32;
		  
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(31);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('No Flags Set (Carry Bit Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 33;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(31);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Parity, Aux Carry and Zero Flags Set (Carry Bit Reset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 1;
		  
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Parity, Aux Carry and Zero Flags Set (Carry Bit Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 2;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 3;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Parity Flag Set (Carry Bit Reset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 2;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 32;
		  
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Parity Flag Set (Carry Bit Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 32;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(30);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Aux Carry Set (Carry Bit Reset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 3;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 127;
		  
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(124);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Aux Carry Set (Carry Bit Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 4;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 127;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(122);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('Aux Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 255;
		  
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(254);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Aux Carry and Sign Flag Set (Carry Bit Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 3;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 253;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(249);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Carry and Sign Flag Set (Carry Bit Reset)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 10;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 5;
		  
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(251);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('Carry and Sign Flag Set (Carry Bit Set)', () => {
		const max_mem_addr = 255;
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 9;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 5;
		  c.cpu.set_flag(FlagType.Carry);
		
		
		  c.cpu.sbb_mem();
		
		  expect(c.cpu.registers.A).toEqual(251);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
});
