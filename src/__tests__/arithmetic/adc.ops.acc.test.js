const Source = require('../../i8080');

describe('ADC / ACCUMULATOR', () => {
  test('NO FLAGS SET', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x02;

    // 1. Without Carry Set
    c.cpu.clear_flag(FlagType.Carry);
    
    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x04);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

    c.reset();

    // 2. With Carry Set

    // Inputs
    c.cpu.accumulator = 0x02;

    // 1. Without Carry Set
    c.cpu.set_flag(FlagType.Carry);

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x05);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

  });

  // test('SET ZERO FLAG', () => {
  //   const c = new Source.Computer();
  //   const FlagType = Source.i8080.FlagType;

  //   // Inputs
  //   c.cpu.accumulator = 0x00;

  //   // Operation
  //   c.cpu.add_reg(c.cpu.accumulator);

  //   // Results
  //   expect(c.cpu.accumulator).toBe(0x00);
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  // });

  // test('SET PARITY FLAG', () => {
  //   const c = new Source.Computer();
  //   const FlagType = Source.i8080.FlagType;

  //   // Inputs
  //   c.cpu.accumulator = 0x02;

  //   // Operation
  //   c.cpu.add_reg(c.cpu.accumulator);

  //   // Results
  //   expect(c.cpu.accumulator).toBe(0x04);
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  // });

  // test('SET AUX CARRY FLAG', () => {
  //   const c = new Source.Computer();
  //   const FlagType = Source.i8080.FlagType;

  //   // Inputs
  //   c.cpu.accumulator = 0x0f;

  //   // Operation
  //   c.cpu.add_reg(c.cpu.accumulator);

  //   // Results
  //   expect(c.cpu.accumulator).toBe(0x1e);
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  // });

  // test('SET SIGN FLAG', () => {
  //   const c = new Source.Computer();
  //   const FlagType = Source.i8080.FlagType;

  //   // Inputs
  //   c.cpu.accumulator = 0x58;

  //   // Operation
  //   c.cpu.add_reg(c.cpu.accumulator);

  //   // Results
  //   expect(c.cpu.accumulator).toBe(0xb0);
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  // });

  // test('SET CARRY FLAG', () => {
  //   const c = new Source.Computer();
  //   const FlagType = Source.i8080.FlagType;

  //   // Inputs
  //   c.cpu.accumulator = 0xf0;

  //   // Operation
  //   c.cpu.add_reg(c.cpu.accumulator);

  //   // Results
  //   expect(c.cpu.accumulator).toBe(0xe0);
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  // });

  // test('UNSET FLAGS', () => {
  //   const c = new Source.Computer();
  //   const FlagType = Source.i8080.FlagType;

  //   // Inputs
  //   c.cpu.accumulator = 0x01;

  //   c.cpu.set_flag(FlagType.Carry);
  //   c.cpu.set_flag(FlagType.Parity);
  //   c.cpu.set_flag(FlagType.AuxillaryCarry);
  //   c.cpu.set_flag(FlagType.Zero);
  //   c.cpu.set_flag(FlagType.Sign);

  //   // Check Inputs valid
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

  //   // Operation
  //   c.cpu.add_reg(c.cpu.accumulator);

  //   // Results
  //   expect(c.cpu.accumulator).toBe(0x02);
  //   expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
  //   expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  // });

});
