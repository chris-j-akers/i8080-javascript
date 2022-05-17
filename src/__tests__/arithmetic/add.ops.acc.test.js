const Source = require('../../i8080');

// Accumulator math is tricky when it comes to setting exact flags. The smallest operation
// we can perform is to double the number in the accumulator, so we can't run small, 
// subtle tests like adding 1 (0x1, b00000001) to 15 (0xF, b00001111) to trigger
// the Aux Carry and *only* the Aux Carry. In a majority of theses tests, more than
// one flag is set whether the Carry bit is used or not. However, as long as the operation
// produces the correct result and sets or doesn't set the correct flag, even if it sets 
// others at the same time, then the test is successful. 

describe('ADD / ACCUMULATOR', () => {
  test('NO FLAGS SET', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (1, 0x1, b00000001)
    c.cpu.accumulator = 0x01;

    // Operation
    c.cpu.add_reg(c.cpu.accumulator);

    // Result (2, 0x2, b00000010)
    expect(c.cpu.accumulator).toBe(0x02);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET ZERO FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (0, 0x0, b00000000)
    c.cpu.accumulator = 0x00;

    // Operation
    c.cpu.add_reg(c.cpu.accumulator);

    // Result (0, 0x0, b00000000)
    expect(c.cpu.accumulator).toBe(0x00);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET PARITY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs (2, 0x2, b00000010)
    c.cpu.accumulator = 0x02;

    // Operation
    c.cpu.add_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x04);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET AUX CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x0f;

    // Operation
    c.cpu.add_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x1e);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

  test('SET SIGN FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x58;

    // Operation
    c.cpu.add_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0xb0);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('SET CARRY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0xf0;

    // Operation
    c.cpu.add_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0xe0);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('UNSET FLAGS', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x01;

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
    c.cpu.add_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x02);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
  });

});
