

function __tst__carry_flag_set_after_addition() {
    let c = new Computer();
    console.log('Test: Carry Flag Test after AE+74 (=122)');

    // Status flags after ADD operation
    // +---------+---+---+---+---+---+---+---+---+---+
    // | BIT NO. | C | 7 | 6 | 5 | 4 | 3 | 2 | 1 | 0 |
    // +---------+---+---+---+---+---+---+---+---+---+
    // |  AE     |   | 1 | 0 | 1 | 0 | 1 | 1 | 1 | 0 |
    // | +       |   |   |   |   |   |   |   |   |   |
    // |  74     |   | 0 | 1 | 1 | 1 | 0 | 1 | 0 | 0 |
    // | ===     |   |   |   |   |   |   |   |   |   |
    // | 122     | 1 | 0 | 0 | 1 | 0 | 0 | 0 | 1 | 0 |
    // +---------+---+---+---+---+---+---+---+---+---+
    // Bit 7 was carried, so the carry flag should be set in this calculation.
    // In addition, the aux carry and the parity flag should also be set 
    // (2 bits set in the result not including carry)

    c.cpu.registers.B = 0xAE;
    c.cpu.registers.A = 0x74;
    c.cpu.add_b();
    console.log(c.cpu.__dbg__get_flags());
}

function __tst__zero_flag_set_after_addition() {

    let c = new Computer();
    console.log('Test: Zero Flag Test after 0x00 + 0x00');

    c.cpu.registers.B = 0x0;
    c.cpu.registers.A = 0x0;
    c.cpu.add_b();
    console.log(c.cpu.__dbg__get_flags());
}

function __tst__add_with_carry_b() {
    let c = new Computer();
    console.log('Test: ADC B');

    c.cpu.registers.B = 0x3D;
    c.cpu.registers.A = 0x42;
    c.cpu.clear_flag(i8080.FlagType.Carry);
    c.cpu.adc_b();
    
    console.log(`Value of Accumulator: ${c.cpu.registers.A.toString(16)}, ${__util__byte_as_binary(c.cpu.registers.A)}`);
    console.log(`${c.cpu.__dbg__get_flags()}`);

    console.log(`Second Test`);
    c = new Computer();

    c.cpu.registers.B = 0x3D;
    c.cpu.registers.A = 0x42;
    c.cpu.set_flag(i8080.FlagType.Carry);
    c.cpu.adc_b();
    
    console.log(`Value of Accumulator: ${c.cpu.registers.A.toString(16)}, ${c.cpu.__util__byte_as_binary(c.cpu.registers.A)}`);
    console.log(`${c.cpu.__dbg__get_flags()}`);

}

function __tst__add_mem() {

    let c = new Computer();

    const mem_addr = 0x10;
    c.bus.write(20,mem_addr);
    const mem_data = c.cpu.bus.read(mem_addr);

    console.log(`Test: Add Memory`);

    c.cpu.registers.H = (mem_addr >> 8) & 0xff;
    c.cpu.registers.L = mem_addr & 0xff;
    c.cpu.registers.A = 0x0;
    c.cpu.add_m();

    console.log(`addr: ${__util__word_as_binary(mem_addr)}`);
    console.log(`data: ${__util__byte_as_binary(mem_data)}`)
    
    console.log(`Loading ${__util__byte_as_binary((mem_data & 0xff) >> 8)} into H and ${__util__byte_as_binary(mem_data & 0xff)} into L to make address 0x${(c.cpu.registers.H + c.cpu.registers.L).toString(16)}`)
    console.log(c.cpu.__dbg__get_state());

}

function __tst_dbg_strings() {
    const c = new Computer();
    console.log(c.cpu.__dbg__get_registers());
    console.log(c.cpu.__dbg__get_flags());
    console.log(c.cpu.__dbg__get_sp());
    console.log(c.cpu.__dbg__get_pc());
    console.log(c.cpu.__dbg__get_clock());
}

function __tst_get_state_string() {

    const c = new Computer();
    console.log(c.cpu.__dbg__get_state());
}

function test_aux_carry() {

    const c = new Computer();

    console.log(c.cpu.__dbg__get_state());

    c.cpu.registers.A = 0x0F;
    c.cpu.registers.B = 0x0F;

    const lop = c.cpu.registers.A;
    const rop = c.cpu.registers.B;

    console.log(((lop & 0x0f) + (rop & 0x0f)) & (1 << 4));

    console.log(__util__byte_as_binary(lop & 0x0f));
    console.log(__util__byte_as_binary(rop & 0x0f));
    console.log(c.cpu.__dbg__get_state());
    c.cpu.add_reg(c.cpu.registers.B);
    console.log(c.cpu.__dbg__get_state());

}

function draft_test() {

    const c = new Computer();
    c.cpu.registers.A = 0x0;

    max_int = 0xFF;

    for (let a_val=0x0;a_val<=max_int; a_val++) {
        c.cpu.registers.A = a_val;
        for (let reg_val=0x0; reg_val<=max_int; reg_val++) {
            c.cpu.registers.B=reg_val;
            c.cpu.add_reg(c.cpu.registers.B);
            console.log(c.cpu.__dbg__get_registers());
            console.log(c.cpu.__dbg__get_flags());
            c.reset();
        }
    }
}

function sbb_test() {

    const testno = 0x3;
    const tctest = ~(testno) + 1;
    console.log(__util__byte_as_binary(tctest));

    const c = new Computer();
    const FlagType = i8080.FlagType;
    c.cpu.registers.A = 197;
    c.cpu.registers.L = 98;
    // c.cpu.set_flag(FlagType.Carry);

    console.log(c.cpu.__dbg__get_state());
    c.cpu.sbb_reg(c.cpu.registers.L);
    console.log(c.cpu.__dbg__get_state());

    c.cpu.registers.A = 12;
    c.cpu.registers.L = 15;
    // c.cpu.set_flag(FlagType.Carry);

    console.log(c.cpu.__dbg__get_state());
    c.cpu.sbb_reg(c.cpu.registers.L);
    console.log(c.cpu.__dbg__get_state());
    
}

function sbb_test2() {

    const c = new Computer();
    const FlagType = i8080.FlagType;


    c.cpu.registers.A = 12;
    c.cpu.registers.L = 4;
    console.log(c.cpu.__dbg__get_state());
    c.cpu.set_flag(FlagType.Carry);
    c.cpu.sbb_reg(c.cpu.registers.A);
    console.log(c.cpu.__dbg__get_state());

    // console.log(c.cpu.__dbg__get_state());
    // console.log('\n\n');
    c.reset();
    // c.cpu.set_flag(FlagType.Carry);
    // c.cpu.registers.L = 2;
    // c.cpu.registers.A = 4;
    // c.cpu.sbb_reg(c.cpu.registers.L);
    // console.log(c.cpu.__dbg__get_state());

    // c.reset();
    // console.log('\n\n');
    // c.cpu.set_flag(FlagType.Carry);
    // c.cpu.registers.A = 1;
    // c.cpu.sbb_reg(c.cpu.registers.A);
    // console.log(c.cpu.__dbg__get_state());
}

function sub_test() {

    const c = new Computer();
    const FlagType = i8080.FlagType;

    c.cpu.registers.A = 255;
    console.log(c.cpu.__dbg__get_state());
    c.cpu.sub_reg(c.cpu.registers.A);
    console.log(c.cpu.__dbg__get_state());

}

function ana_test() {

    const c = new Computer();
    const FlagType = i8080.FlagType;

    c.cpu.mvi_reg('A', 0x0FC);
    c.cpu.mvi_reg('C', 0x0F);
    console.log(c.cpu.__dbg__get_state());
    c.cpu.ana_reg('C');
    console.log(c.cpu.__dbg__get_state());
    
}

function stax_test() {
    const c = new Computer();
    c.cpu.bus.write(10, 2000);

    c.cpu.load_mem_addr(2000, 'B', 'C');
    console.log(c.cpu.__dbg__get_state());

    const t = c.cpu.get_mem_addr('B','C');
    console.log(t);

}

stax_test();


