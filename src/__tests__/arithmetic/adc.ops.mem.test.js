const Source = require('../../i8080');

// The full test should run to 0xFFFF, but this can take a while. To start off with, and fix
// any broader bugs, set this to a low value.
const max_mem_addr = 0x01;

describe('ADC / MEMORY', () => {
  test('NO FLAGS SET | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 |     0 | 001 | 0x01 | 00000001 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x01;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
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
  });

  test('NO FLAGS SET | CARRY SET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 |     1 | 002 | 0x02 | 00000010 |       |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x01;
    
    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
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

  test('SET ZERO | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 000 | 0x00 | 00000000 | 000 | 0x00 | 00000000 |     0 | 000 | 0x00 | 00000000 | P|Z   |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x0;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
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
  });

  test('SET PARITY | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 084 | 0x54 | 01010100 | 001 | 0x01 | 00000001 |     0 | 085 | 0x55 | 01010101 | P     |
// +-----------------------+-----------------------+-------+-----------------------+-------+ 

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x54;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x1;

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

  test('SET PARITY | CARRY SET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 083 | 0x53 | 01010011 | 001 | 0x01 | 00000001 |     1 | 085 | 0x55 | 01010101 | P     |
// +-----------------------+-----------------------+-------+-----------------------+-------+ 

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x53;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
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

  test('SET AUX CARRY | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 015 | 0x0F | 00001111 | 001 | 0x01 | 00000001 |     0 | 016 | 0x10 | 00010000 | A     |
// +-----------------------+-----------------------+-------+-----------------------+-------+   
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x0F;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x01;

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

  test('SET AUX CARRY | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 014 | 0x0F | 00001110 | 001 | 0x01 | 00000001 |     0 | 016 | 0x10 | 00010000 | A     |
// +-----------------------+-----------------------+-------+-----------------------+-------+   

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x0E;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
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

  test('SET SIGN | CARRY UNSET', () => {

// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 127 | 0x7F | 11111110 | 001 | 0x01 | 00000001 |     0 | 128 | 0x80 | 10000000 | A|S   |
// +-----------------------+-----------------------+-------+-----------------------+-------+   

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType; 

    const data = 0x7F

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x01;

      c.cpu.adc_mem();

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
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 127 | 0x7F | 11111110 | 000 | 0x00 | 00000000 |     1 | 128 | 0x80 | 10000000 | S   |
// +-----------------------+-----------------------+-------+-----------------------+-------+     

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x7F

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x00;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x80);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
      c.reset();
    }
  });


  test('SET CARRY | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 255 | 0xFF | 11111111 | 020 | 0x14 | 00001110 |     0 | 019 | 0x13 | 00010011 | C|A   |
// +-----------------------+-----------------------+-------+-----------------------+-------+
        
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0xFF;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x14;

      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x13);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

      c.reset();
    }
  });

  test('SET CARRY | CARRY SET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 255 | 0xFF | 11111111 | 020 | 0x14 | 00001110 |     1 | 020 | 0x14 | 00010100 | C|A   |
// +-----------------------+-----------------------+-------+-----------------------+-------+
      
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0xFF;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x14;

      c.cpu.set_flag(FlagType.Carry);
      c.cpu.adc_mem();

      expect(c.cpu.accumulator).toBe(0x14);
      expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
      expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
      expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
      c.reset();
    }
  });

  test('UNSET FLAGS | CARRY UNSET', () => {
// +-----------------------+-----------------------+-------+-----------------------+-------+
// |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
// +-----------------------+-----------------------+-------+-----------------------+-------+
// | 001 | 0x01 | 00000001 | 000 | 0x00 | 00000000 |     0 | 001 | 0x01 | 00000001 | C|A   |
// +-----------------------+-----------------------+-------+-----------------------+-------+

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    const data = 0x01;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
      c.bus.write(data, mem_addr);
      c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
      c.cpu.scratch_registers.L = mem_addr & 0xff;
      c.cpu.accumulator = 0x00;

      c.cpu.set_flag(FlagType.Parity);
      c.cpu.set_flag(FlagType.AuxillaryCarry);
      c.cpu.set_flag(FlagType.Zero);
      c.cpu.set_flag(FlagType.Sign);

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

  test('UNSET FLAGS | CARRY SET', () => {
    // +-----------------------+-----------------------+-------+-----------------------+-------+
    // |       Memory          |      Accumulator      | Carry |       Expected        | Flags |
    // +-----------------------+-----------------------+-------+-----------------------+-------+
    // | 000 | 0x00 | 00000001 | 000 | 0x00 | 00000000 |     1 | 001 | 0x01 | 00000001 | C|A   |
    // +-----------------------+-----------------------+-------+-----------------------+-------+
    
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;
    
        const data = 0x00;
    
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

});


