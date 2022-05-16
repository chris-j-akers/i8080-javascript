const Source = require('../../i8080');

// These tests can take a while because they test from each memory location 
// and there are 2^16 of them (65536). Maybe this is overkill, but I like the idea of
// testing everything. Can be skipped for most tests I should think.

describe('ADD / MEMORY', () => {
  test('NO FLAGS SET', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0x01;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.add_mem();

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

  test('SET ZERO FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0x0;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.add_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0x0);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      // Clear
      c.reset();
    }
  });

  test('SET PARITY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0x54;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

      c.cpu.add_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0x55);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      // Clear
      c.reset();
    }
  });

  test('SET AUX CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0x0f;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0f;

      c.cpu.add_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0x1e);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      // Clear
      c.reset();
    }
  });

  test('SET SIGN FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0x40;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x70;

      c.cpu.add_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0xB0);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

      // Clear
      c.reset();
    }
  });


  test('SET CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0xC0;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x42;

      c.cpu.add_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0x02);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      // Clear
      c.reset();
    }
  });

  test('UNSET FLAGS', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    const data = 0x01;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x00;

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

      c.cpu.add_mem();

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


