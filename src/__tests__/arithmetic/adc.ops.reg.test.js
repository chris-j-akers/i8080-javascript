const Source = require('../../i8080');

describe('ADC / REGISTERS', () => {

  test('NO FLAGS SET | NO CARRY', () => {

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

  test('NO FLAGS SET | CARRY', () => {

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

  test('SET ZERO FLAG | NO CARRY', () => {

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

  test('SET ZERO FLAG | CARRY', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 |     1 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x00;

      c.cpu.set_flag(FlagType.Carry);
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

  test('SET PARITY FLAG | NO CARRY)', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Register        |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 083 | 0x53 | 01010011 | 001 | 0x01 | 00000001 |     0 | 084 | 0x54 | 01010100 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x53;

      // Operation
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x54);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET PARITY FLAG | CARRY)', () => {

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

  test('SET AUX CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0xE;

      // Operation
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0xF);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }

    // 2. With Carry
    c.reset();

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0xE;
      c.cpu.set_flag(FlagType.Carry);

      // Operation
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x10);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET SIGN FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // 1. Without Carry

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x1;
      c.cpu.scratch_registers[reg] = 0x7E;

      // Operation
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x7f);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x1;
      c.cpu.scratch_registers[reg] = 0x7e;
      c.cpu.set_flag(FlagType.Carry);

      // Operation
      c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x80);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }

  });

  test('SET CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // 1. Without Carry flag
    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x1;
      c.cpu.scratch_registers[reg] = 0xfe;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0xff); 
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }

    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x1;
      c.cpu.scratch_registers[reg] = 0xfe;
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

        // Check Inputs valid
        expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

        // Operation
        c.cpu.adc_reg(c.cpu.scratch_registers[reg]);

        // Results
        expect(c.cpu.accumulator).toBe(0x02);
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

        // Clear
        c.reset();
    }


  });
});
