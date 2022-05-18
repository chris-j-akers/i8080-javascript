const Source = require('../../i8080');

describe('ADD / ACCUMULATOR', () => {
  test('NO FLAGS SET', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 002 | 0x02 | 00000010 |       |
// +-----------------------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x01;

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x02);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET ZERO', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 | P|Z   |
// +-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x00;

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x00);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET PARITY', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 | P|Z   |
// +-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x00;

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x00);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET AUX CARRY', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 015 | 0x0f | 00001111 | 030 | 0x1E | 00011110 | P|A   |
// +-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x0F;

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x1E);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET SIGN', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 088 | 0x58 | 01011000 | 176 | 0xB0 | 10110000 | S     |
// +-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x58;

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0xb0);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('SET CARRY', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 240 | 0cF0 | 11110000 | 224 | 0xE0 | 11100000 | C|S   |
// +-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0xF0;

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0xe0);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('UNSET FLAGS', () => {
// +-----------------------+-----------------------+-------+
// |      Accumulator      |      Expected         | Flags |
// +-----------------------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 002 | 0x02 | 00000010 |       |
// +-----------------------+-----------------------+-------+
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x01;

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

    c.cpu.add_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x02);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });
});
