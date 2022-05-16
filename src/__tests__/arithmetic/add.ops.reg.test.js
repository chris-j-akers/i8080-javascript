const Source = require('../../i8080');

describe('ADD / REGISTERS', () => {
  test('NO FLAGS SET', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x01;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x01);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET ZERO FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x00;
      c.cpu.scratch_registers[reg] = 0x00;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x00);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();

      // Zero has Parity, according to the interwebs
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET PARITY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x01;
      c.cpu.scratch_registers[reg] = 0x54;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
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

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x0f;
      c.cpu.scratch_registers[reg] = 0x0f;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x1e);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('SET SIGN FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0x70;
      c.cpu.scratch_registers[reg] = 0x40;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0xB0);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }
  });

  test('SET CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (let's do all registers!)
    for (reg in c.cpu.scratch_registers) {
      c.cpu.accumulator = 0xC0;
      c.cpu.scratch_registers[reg] = 0x42;

      // Operation
      c.cpu.add_reg(c.cpu.scratch_registers[reg]);

      // Results
      expect(c.cpu.accumulator).toBe(0x02); // zero's out data
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
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
        c.cpu.add_reg(c.cpu.scratch_registers[reg]);

        // Results
        expect(c.cpu.accumulator).toBe(0x01);
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
