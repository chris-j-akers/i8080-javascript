const Source = require('../../i8080');

describe('ADD / REGISTERS', () => {
  
  test('NO FLAGS SET', () => {
// +-----------------------+-----------------------+-----------------------+-------+
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x01;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

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
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 | P|Z   |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x00;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x00);
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
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 084 | 0x54 | 01010100 | 001 | 0x01 | 00000001 | 085 | 0x55 | 01010101 | P     |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x54;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

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
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 015 | 0x0F | 00001111 | 015 | 0x0F | 00001111 | 030 | 0x1E | 00011110 | P|A   |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x0F;
      c.cpu.scratch_registers[reg] = 0x0F;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x1E);
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
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 064 | 0x40 | 01000000 | 112 | 0x70 | 01110000 | 176 | 0xB0 | 10110000 | S     |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x70;
      c.cpu.scratch_registers[reg] = 0x40;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

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
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 192 | 0xC0 | 11000000 | 066 | 0x42 | 01000010 | 002 | 0x02 | 00000010 | C     |
// +-----------------------+-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0xC0;
      c.cpu.scratch_registers[reg] = 0x42;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

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
// |       Register        |      Accumulator      |       Expected        | Flags |
// +-----------------------+-----------------------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-------+-----------------------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
        c.cpu.accumulator = 0x00;
        c.cpu.scratch_registers[reg] = 0x01;

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

        c.cpu.add_reg(c.cpu.scratch_registers[reg]);

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
