const Source = require('../../i8080');

// The full test should run to 0xFFFF, but this can take a while. To start off with, and fix
// any broader bugs, set this to a low value.
const max_mem_addr = 0x01;
describe('ADD Memory', () => {
	test('NO FLAGS SET', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 1;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 0;
		
		  c.cpu.add_mem();
		
		  expect(c.cpu.registers.A).toEqual(1);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET ZERO', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 0;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 0;
		
		  c.cpu.add_mem();
		
		  expect(c.cpu.registers.A).toEqual(0);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET PARITY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 84;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 1;
		
		  c.cpu.add_mem();
		
		  expect(c.cpu.registers.A).toEqual(85);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET AUX CARRY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 15;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 1;
		
		  c.cpu.add_mem();
		
		  expect(c.cpu.registers.A).toEqual(16);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
	test('SET SIGN', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 127;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 1;
		
		  c.cpu.add_mem();
		
		  expect(c.cpu.registers.A).toEqual(128);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
		  c.reset();
		}
		});
		
	test('SET CARRY', () => {
		const c = new Source.Computer();
		const FlagType = Source.i8080.FlagType;
		
		const data = 255;
		
		for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
		  c.bus.write(data, mem_addr);
		  c.cpu.registers.H = (mem_addr >> 8) & 0xff;
		  c.cpu.registers.L = mem_addr & 0xff;
		  c.cpu.registers.A = 20;
		
		  c.cpu.add_mem();
		
		  expect(c.cpu.registers.A).toEqual(19);
		  expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
		  expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
		  expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
		  c.reset();
		}
		});
		
});
