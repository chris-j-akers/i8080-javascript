const Source = require('../../i8080');

describe('ADC / REGISTERS', () => {

  test('NO FLAGS SET | CARRY UNSET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 |     0 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x01;

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x01);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('NO FLAGS SET | CARRY SET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 |     1 | 002 | 0x02 | 00000010 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x01;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x02);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET ZERO | CARRY UNSET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 |     0 | 000 | 0x000 | 00000000 | P|Z  |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x00;

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x00);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });


  test('SET PARITY | CARRY UNSET)', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 084 | 0x54 | 00110110 | 001 | 0x01 | 00000001 |     0 | 085 | 0x55 | 00110111 | P     |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x54;

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x55);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET PARITY | CARRY SET)', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 083 | 0x53 | 01010011 | 001 | 0x01 | 00000001 |     1 | 085 | 0x55 | 01010101 | P     |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x53;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x55);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }

  });

  test('SET AUX CARRY | CARRY UNSET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 015 | 0x0F | 00001111 | 001 | 0x01 | 00000001 |     0 | 016 | 0x10 | 00010000 | A     |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x0F;

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x10);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET AUX CARRY | CARRY SET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 014 | 0x0E | 01010011 | 001 | 0x01 | 00000001 |     1 | 016 | 0x10 | 00010000 | A     |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x0E;
      c.cpu.set_flag(FlagType.Carry);

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x10);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET SIGN | CARRY UNSET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 127 | 0x7F | 01111111 | 001 | 0x01 | 00000001 |     0 | 128 | 0x80 | 10000000 | A|S   |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x7F;

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x80);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }
  });

  test('SET SIGN | CARRY SET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 126 | 0x7E | 01111110 | 001 | 0x01 | 00000001 |     1 | 128 | 0x80 | 10000000 | S|A |
// +-----------------------+-----------------------+-------+-----------------------+-------+
    
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x7E;
      c.cpu.set_flag(FlagType.Carry);

      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0x80);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }
  });

  test('SET CARRY | CARRY UNSET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 255 | 0xFF | 11111111 | 001 | 0x01 | 00000001 |     0 | 000 | 0x00 | 00000000 | C|P|A |
// +-----------------------+-----------------------+-------+-----------------------+-------+
    
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0xFE;

      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      expect(c.cpu.accumulator).toBe(0xff); 
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }
  });

  test('SET CARRY | CARRY SET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 254 | 0xFE | 11111110 | 001 | 0x01 | 00000001 |     1 | 000 | 0x00 | 00000000 | C|P|A |
// +-----------------------+-----------------------+-------+-----------------------+-------+
    
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0xFE;
      c.cpu.set_flag(FlagType.Carry);

      // Operation
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x00);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('UNSET FLAGS', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 001 | 0x01 | 00000001 |     1 | 002 | 0x02 | 00000010 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
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

        c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

        expect(c.cpu.accumulator).toBe(0x02);
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

        c.reset();
    }
  });
});
