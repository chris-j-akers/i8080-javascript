const Source = require('../../i8080');

// The full test should run to 0xFFFF, but this can take a while. To start off with, and fix
// any broader bugs, set this to a low value.
const max_mem_addr = 0x01;

describe('ADD / MEMORY', () => {

  test('NO FLAGS SET', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-------+-----------------------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x01;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0x01);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET ZERO', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 000 | 0x01 | 00000001 | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 | P|Z   |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x0;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0x0);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET PARITY', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 084 | 0x54 | 01010100 | 001 | 0x01 | 00000001 | 085 | 0x55 | 01010101 | P     |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x54;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0x55);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      c.reset();
    }
  });

  test('SET AUX CARRY', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 015 | 0x0F | 00001111 | 015 | 0x0F | 00001111 | 030 | 0x1E | 00011110 | P|A   |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x0F;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0F;

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0x1e);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET SIGN', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 064 | 0x40 | 01000000 | 112 | 0x70 | 01110000 | 176 | 0xB0 | 10110000 | S     |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x40;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x70;

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0xB0);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }
  });


  test('SET CARRY', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 192 | 0xC0 | 11000000 | 066 | 0x42 | 01000010 | 002 | 0x02 | 00000010 | C     |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0xC0;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x42;

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0x02);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('UNSET FLAGS', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Memory          |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-------+-----------------------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x01;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x00;

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

      c.cpu.add_mem();

      expect(c.cpu.accumulator).toBe(0x01);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });
});


