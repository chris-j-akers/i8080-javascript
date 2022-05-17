const Source = require('../../i8080');

// Accumulator math is tricky when it comes to setting exact flags. The smallest operation
// we can perform is to double the number in the accumulator, so we can't run small, 
// subtle tests like adding 1 (0x1, b00000001) to 15 (0xF, b00001111) to trigger
// the Aux Carry and *only* the Aux Carry. In a majority of theses tests, more than
// one flag is set whether the Carry bit is used or not. However, as long as the operation
// produces the correct result and sets or doesn't set the correct flag, even if it sets 
// others at the same time, then the test is successful. 

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

  test('SET ZERO FLAG', () => {

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x00;

    // 1. Without Carry Set - ZERO Flag should be set in this case
    c.cpu.clear_flag(FlagType.Carry);
    
    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x00);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

    c.reset();

    // 2. With Carry Set - ZERO Flag should NOT be set

    // Inputs
    c.cpu.accumulator = 0x00;

    c.cpu.set_flag(FlagType.Carry);

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x01);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

  });

  test('SET PARITY FLAG', () => {
    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x07;

    // 1. Without Carry Set
    c.cpu.clear_flag(FlagType.Carry);
  
    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);


    // Results
    expect(c.cpu.accumulator).toBe(0x0E);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

    c.reset();

    // 2. With Carry Set

    // Inputs
    c.cpu.accumulator = 0x07;

    c.cpu.set_flag(FlagType.Carry);

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x0F);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

  });

  test('SET AUX CARRY FLAG', () => {

    // Weird one to test with an accumulator because it's adding to itself so can only
    // double. This means we can't try an AuxCarry NOT set without the Carry flag, first.
    //
    // Basically, both tests should set the AuxCarry flag, but, we do check the results
    // are correct which gives some confidence the test works.

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x08;

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x10);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

    c.reset();

    // 2. With Carry Set

    // Inputs
    c.cpu.accumulator = 0x08;

    c.cpu.set_flag(FlagType.Carry);

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x11);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();


  });

  test('SET SIGN FLAG', () => {
    // Similar to above (Aux Carry) it's adding to itself so can only
    // double. This means we can't try a SIGN NOT set without the Carry flag, first.
    //
    // Basically, both tests should set the SIGN flag, but, we do check the results
    // are correct which gives some confidence the test works.

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x58;

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0xb0);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

    c.reset();

    // 2. With Carry Set

    // Inputs
    c.cpu.accumulator = 0x58;

    c.cpu.set_flag(FlagType.Carry);

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0xb1);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();


  });

  test('SET CARRY FLAG', () => {
    // Similar to above (Aux Carry) it's adding to itself so can only
    // double. This means we can't try a CARRY NOT set without the Carry flag, first.
    //
    // Basically, both tests should set the SIGN flag, but, we do check the results
    // are correct which gives some confidence the test works.

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0xf0;

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0xe0);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

    c.reset();

    // 2. With Carry Set

    // Inputs
    c.cpu.accumulator = 0xf0;

    c.cpu.set_flag(FlagType.Carry);

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0xe1);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();
  });

  test('UNSET FLAGS', () => {

    const c = new Source.Computer();
    const FlagType = Source.i8080.FlagType;

    // Inputs
    c.cpu.accumulator = 0x01;

    // Set all flags EXCEPT Carry
    c.cpu.set_flag(FlagType.Parity);
    c.cpu.set_flag(FlagType.AuxillaryCarry);
    c.cpu.set_flag(FlagType.Zero);
    c.cpu.set_flag(FlagType.Sign);

    // Check Inputs valid
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeTruthy();

    // Operation
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x02);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

    c.reset();

    // 2. With Carry Set

    // Inputs
    c.cpu.accumulator = 0x01;

    // Set all flags INCLUDING Carry
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
    c.cpu.adc_reg(c.cpu.accumulator);

    // Results
    expect(c.cpu.accumulator).toBe(0x03);
    expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
    expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
    expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();

  });
});
