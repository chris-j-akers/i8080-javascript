const Source = require('../../i8080');

describe('Test Register ADD operation', () => {

    test('REGISTER NO FLAGS', () => {
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x00;
        c.cpu.registers.B = 0x01;

        // Operation
        c.cpu.add_reg(c.cpu.registers.B);

        // Results
        expect(c.cpu.registers.A).toBe(0x01);
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });

    test('REGISTER ZERO FLAG', () => {
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x00;
        c.cpu.registers.B = 0x00;

        // Operation
        c.cpu.add_reg(c.cpu.registers.B);

        // Results
        expect(c.cpu.registers.A).toBe(0x00);
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });

    test('REGISTER PARITY FLAG', () => {
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x01;
        c.cpu.registers.B = 0x54;

        // Operation
        c.cpu.add_reg(c.cpu.registers.B);

        // Result (Answer should be: 01010101)
        expect(c.cpu.registers.A).toBe(0x55);

        // Check flags
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });

    test('REGISTER AUXILLARY CARRY FLAG', () => {
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x0F;
        c.cpu.registers.B = 0x0F;

        // Operation
        c.cpu.add_reg(c.cpu.registers.B);

        // Result (Answer should be: 00011110)
        expect(c.cpu.registers.A).toBe(0x1e);

        // Check flags (Parity should also be set in this case)
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });

    test('REGISTER SIGN FLAG', () => {
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x0F;
        c.cpu.registers.B = 0x0F;

        // Operation
        c.cpu.add_reg(c.cpu.registers.B);

        // Result (Answer should be: 00011110)
        expect(c.cpu.registers.A).toBe(0x1e);

        // Check flags (Parity should also be set in this case)
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeTruthy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });

    test('REGISTER UNSET FLAGS', () => {

        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x00;
        c.cpu.registers.B = 0x01;

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
        c.cpu.add_reg(c.cpu.registers.B);

        // Results
        expect(c.cpu.registers.A).toBe(0x01);
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });
});

describe('Test Memory ADD operations (0x86)', () => {

    test('MEMORY NO FLAGS', () => {
        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        const data = 0x01;

        // Operation (Test all Mem Locations)
        for (let mem_addr=0x00; mem_addr <= 0xFFFF; mem_addr++) {
            c.bus.write(data, mem_addr);
            c.cpu.registers.H = (mem_addr & 0xff) >> 8;
            c.cpu.registers.L = mem_addr & 0xff;
            c.cpu.registers.A = 0x0;

            c.cpu.add_mem();

            // Results
            expect(c.cpu.registers.A).toBe(0x01);
            expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
            expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
            expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
            expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
            expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        }
    });

    test('ACCUMULATOR NO FLAGS', () => {

        const c = new Source.Computer();
        const FlagType = Source.i8080.FlagType;

        // Inputs
        c.cpu.registers.A = 0x01;

        // Operation
        c.cpu.add_reg(c.cpu.registers.A);

        // Results
        expect(c.cpu.registers.A).toBe(0x02);
        expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Parity)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.AuxillaryCarry)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Zero)).toBeFalsy();
        expect(c.cpu.flag_set(FlagType.Sign)).toBeFalsy();
        
    });


});