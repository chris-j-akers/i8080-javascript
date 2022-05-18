const Source = require('../../i8080');

describe('ADC / ACCUMULATOR', () => {
  test('NO FLAGS SET | CARRY UNSET', () => {
// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 001 | 0x01 | 00000001 |     0 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-------+-----------------------+-------+
    
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x02;
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x04);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
    c.reset();
  });

  test('SET ZERO | CARRY UNSET', () => {

// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 000 | 0x00 | 00000000 |     0 | 000 | 0x00 | 00000000 | P|Z   |
// +-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x00;
    c.cpu.clear_flag(FlagType.Carry);
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x00);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET PARITY | CARRY UNSET', () => {

// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 000 | 0x00 | 00000000 |     0 | 000 | 0x00 | 0000000 | P|Z    |
// +-----------------------+-------+-----------------------+-------+
  
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x00;
    c.cpu.clear_flag(FlagType.Carry);
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x00);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET PARITY | CARRY SET', () => {

// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 007 | 0x07 | 00000111 |     1 | 015 | 0x0F | 00001111 | P     |
// +-----------------------+-------+-----------------------+-------+
      
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x07;
    c.cpu.set_flag(FlagType.Carry);
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x0F);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET AUX CARRY | CARRY UNSET', () => {

// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 009 | 0x09 | 00001001 |     0 | 018 | 0x12 | 00010010 | P|A   |
// +-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x09;
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x12);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET AUX CARRY | CARRY SET', () => {
// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 008 | 0x08 | 00001000 |     1 | 017 | 0x11 | 00010001 | P|A   |
// +-----------------------+-------+-----------------------+-------+
    
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x08;

    c.cpu.set_flag(FlagType.Carry);
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x11);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET SIGN | CARRY UNSET', () => {
    // +-----------------------+-------+-----------------------+-------+
    // |      Accumulator      | Carry |      Expected         | Flags |
    // +-----------------------+-------+-----------------------+-------+
    // | 089 | 0x59 | 01011001 |     0 | 177 | 0xB1 | 10110001 | P|A|S |
    // +-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x59;
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0xB2);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('SET SIGN | CARRY SET', () => {
// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 088 | 0x58 | 01011000 |     1 | 177 | 0xB1 | 10110001 | P|A|S |
// +-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x58;
    c.cpu.set_flag(FlagType.Carry);
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0xb1);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('SET CARRY | CARRY UNSET', () => {
// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 241 | 0xF1 | 11110001 |     0 | 226 | 0xE2 | 11100010 | C|P|S |
// +-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0xF1;
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0xE2);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

test('SET CARRY | CARRY SET', () => {
// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 240 | 0xF0 | 11110000 |     1 | 225 | 0xE1 | 11100001 | C|P|S |
// +-----------------------+-------+-----------------------+-------+
  
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0xf0;
    c.cpu.set_flag(FlagType.Carry);
    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0xE1);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('UNSET FLAGS | CARRY UNSET', () => {
  // +-----------------------+-------+-----------------------+-------+
  // |      Accumulator      | Carry |      Expected         | Flags |
  // +-----------------------+-------+-----------------------+-------+
  // | 001 | 0X01 | 00000001 |     0 | 002 | 0x02 | 00000010 |       |
  // +-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    c.cpu.accumulator = 0x01;

    c.cpu.set_flag(FlagType.Parity);
    c.cpu.set_flag(FlagType.AuxillaryCarry);
    c.cpu.set_flag(FlagType.Zero);
    c.cpu.set_flag(FlagType.Sign);

    // We're not setting this as this is the Carry test, remember!
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();

    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x02);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('UNSET FLAGS | CARRY SET', () => {
// +-----------------------+-------+-----------------------+-------+
// |      Accumulator      | Carry |      Expected         | Flags |
// +-----------------------+-------+-----------------------+-------+
// | 001 | 0X01 | 00000001 |     1 | 003| 0x03 | 00000011  | P     |
// +-----------------------+-------+-----------------------+-------+
    
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

    c.cpu.adc_reg(c.cpu.accumulator);

    expect(c.cpu.accumulator).toBe(0x03);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();

    // Can't stop Parity being truthy, here, because we'll always end up with and odd
    // number in the Accumulator tests with a Carry, so always an even number of bits.
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });
});
