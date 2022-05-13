const Computer = require('../i8080');


describe('add registers to accumulator, no flags Set', () => {

    // Note that in these tests, the default for unused bit 1
    // in the flags register is always 1 so this is taken into
    // account when checking the value of the flag register
    // after each test.

    test('ADD B (0x80)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.B = 0x10;

        c.cpu.add_reg(c.cpu.registers.B);
        expect(c.cpu.registers.A).toBe(0x10);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD C (0x81)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.C = 0x10;

        c.cpu.add_reg(c.cpu.registers.C);
        expect(c.cpu.registers.A).toBe(0x10);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD D (0x82)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.D = 0x10;

        c.cpu.add_reg(c.cpu.registers.D);
        expect(c.cpu.registers.A).toBe(0x10);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD E (0x83)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.E = 0x10;

        c.cpu.add_reg(c.cpu.registers.E);
        expect(c.cpu.registers.A).toBe(0x10);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD H (0x84)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.H = 0x10;

        c.cpu.add_reg(c.cpu.registers.H);
        expect(c.cpu.registers.A).toBe(0x10);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD L (0x85)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.L = 0x10;

        c.cpu.add_reg(c.cpu.registers.L);
        expect(c.cpu.registers.A).toBe(0x10);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD M (0x86)', () => {

        const c = new Computer();

        const mem_addr = 0x10;
        const mem_data = 2;

        c.bus.write(mem_data, mem_addr);
    
        c.cpu.registers.H = (mem_addr & 0xff) >> 8;
        c.cpu.registers.L = mem_addr & 0xff;
        c.cpu.registers.A = 0x0;

        c.cpu.add_mem();

        expect(c.cpu.registers.A).toBe(0x02);
        expect(c.cpu.flags).toBe(0x02);
        
    });

    test('ADD A (0x87)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x1;

        c.cpu.add_reg(c.cpu.registers.A);
        expect(c.cpu.registers.A).toBe(0x02);
        expect(c.cpu.flags).toBe(0x02);
        
    });
});

describe('add registers to accumulator, ZERO flag set', () => {

    // Note that in these tests, the default for unused bit 1
    // in the flags register is always 1 so this is taken into
    // account when checking the value of the flag register
    // after each test.

    // Additionallu, 0 (zero) has parity, so parity flag will
    // also be set.

    test('ADD B (0x80)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.B = 0x0;

        c.cpu.add_reg(c.cpu.registers.B);
        expect(c.cpu.registers.A).toBe(0x0);
        expect(c.cpu.flags).toBe(0x46);
        
    });
});

describe('add registers to accumulator, PARITY flag set', () => {

    // Note that in these tests, the default for unused bit 1
    // in the flags register is always 1 so this is taken into
    // account when checking the value of the flag register
    // after each test.

    // Additionallu, 0 (zero) has parity, so parity flag will
    // also be set.

    test('ADD B (0x80)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0;
        c.cpu.registers.B = 0x74;

        c.cpu.add_reg(c.cpu.registers.B);
        expect(c.cpu.registers.A).toBe(0x74);
        expect(c.cpu.flags).toBe(0x06);
        
    });
});

describe('add registers to accumulator, AUX CARRY flag set', () => {

    // Note that in these tests, the default for unused bit 1
    // in the flags register is always 1 so this is taken into
    // account when checking the value of the flag register
    // after each test.

    // Additionallu, 0 (zero) has parity, so parity flag will
    // also be set.

    test('ADD B (0x80)', () => {

        const c = new Computer();

        c.cpu.registers.A = 0x0F;
        c.cpu.registers.B = 0x0F;

        c.cpu.add_reg(c.cpu.registers.B);
        expect(c.cpu.registers.A).toBe(0x1e);
        expect(c.cpu.flags).toBe(0x16);
        
    });
});