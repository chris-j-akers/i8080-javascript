const Source = require('../../i8080');

describe('ADC / MEMORY', () => {
  test('NO FLAGS SET', () => {
 
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

// ================================================================================
// Without Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x1          | 0x0               |          0 | 0x1             |            |
// +--------------+-------------------+------------+-----------------+------------+  

    const data = 0x01;

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x01);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      c.reset();
    }

// ================================================================================
// With Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x1          | 0x0               |          1 | 0x2             |            |
// +--------------+-------------------+------------+-----------------+------------+
    
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x02);
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

// ================================================================================
// Without Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x0          | 0x0               |          0 | 0x0             | P|Z        |
// +--------------+-------------------+------------+-----------------+------------+   

    const data = 0x0;

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x0);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      c.reset();
    }

// ================================================================================
// With Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x0          | 0x0               |          1 | 0x1             |            |
// +--------------+-------------------+------------+-----------------+------------+   

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x0;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x01);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      c.reset();
    }

  });

  test('SET PARITY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

// ================================================================================
// Without Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x53         | 0x1               |          0 | 0x54            |            |
// +--------------+-------------------+------------+-----------------+------------+   

    const data = 0x53;

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x54);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      c.reset();
    }

// ================================================================================
// With Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x53         | 0x1               |          1 | 0x55            | P          |
// +--------------+-------------------+------------+-----------------+------------+  

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

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

// ================================================================================
// Without Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0xE          | 0x1               |          0 | 0xF             | P          |
// +--------------+-------------------+------------+-----------------+------------+   

    const data = 0xE;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x01;

      c.cpu.adc_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0xF);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      // Clear
      c.reset();
    }

// ================================================================================
// With Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0xE          | 0x1               |          1 | 0x10            | AC         |
// +--------------+-------------------+------------+-----------------+------------+   

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x01;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

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

// ================================================================================
// Without Carry
// ================================================================================
// +--------------+-------------------+------------+-----------------+------------+
// | Memory Input | Accumulator Input | Carry Flag | Expected Result |  Flags Set |
// +--------------+-------------------+------------+-----------------+------------+
// | 0x7E         | 0x1               |          0 | 0x7F            | P          |
// +--------------+-------------------+------------+-----------------+------------+  

    const data = 0x7E

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x01;

      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x7F);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      // Clear
      c.reset();
    }

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x01;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0x80);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
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
    const data = 0xfe;

    // Operation (Test all Mem Locations)
    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

      c.cpu.adc_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0xff);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

      // Clear
      c.reset();
    }

    for (let mem_addr = 0x00; mem_addr <= 0xffff; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

      // Results
      expect(c.cpu.accumulator).toBe(0x00);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
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


