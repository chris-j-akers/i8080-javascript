'use strict';

class Computer {
    constructor() {
        this.cpu = new i8080();
        this.mmu = new MMU();
        this.bus = new Bus();

        // Connect the Bus to the CPU and vice versa
        this.cpu.connect_bus(this.bus);
        this.bus.connect_cpu(this.cpu);

        // Connect the bus to the MMU and vice versa
        this.mmu.connect_bus(this.bus);
        this.bus.connect_mmu(this.bus);
    }

    reset() {
        this.cpu.reset();
        this.mmu.reset();
    }
}

class Bus {
    constructor(mmu, cpu) {
        this.mmu = null;
        this.cpu = null;
    }

    connect_mmu(mmu) {
        this.mmu = mmu;
    }

    connect_cpu(cpu) {
        this.cpu = cpu;
    }

    write(addr) {

    }

    read(addr) {

    }
}

class MMU {
    constructor() {
        this.ram = new Array(2**16);
        this.bus = null;
    }

    connect_bus(bus) {
        this.bus = bus;
    }

    reset() {
        this.ram = new Array(2**16);
    }

    write(address, val) {
        this.ram[address] = val;
    }

    read(address, val) {
        return this.ram[address];
    }
}

//  ===================================================================================
//  i8080 CPU
//  ===================================================================================

class i8080 {

    __dbg__get_flags() {
        let str = '** CPU flag status [';
        for (let flag in i8080.Flags) {
            str += `${flag}: ${(this.flags & (1 << i8080.Flags[flag])) ? '1' : '0'}, `
        }
        return str.slice(0,-2) + '] **';
    }

    static get Flags() {
        return {
            Carry: 0,
            Parity: 2,
            AuxillaryCarry: 4,
            Zero: 6,
            Sign: 7,
        };
    }

    constructor() {
        this.reset();
    }

    reset() {
        this.registers = {B:0x0, C:0x0, D:0x0, E:0x0, H:0x0, L:0x0, A:0x0};
        this.stack_pointer = 0x0;
        this.program_counter = 0x0;
        this.flags = 0x2;
        this.clock = 0x0;
        this.bus = null;
    }

    connect_bus(bus) {
        this.bus = bus;
    }

    parity(val) {
        let bit_count = 0;
        for (let i = 0; i < 7; i++) {
            if (val & (1 << i)) bit_count++;
        }
        return (bit_count % 2 === 0)
    }

    set_flag(bit_no) {
        this.flags |= (1 << bit_no);
    }

    clear_flag(bit_no) {
        this.flags &= ~(1 << bit_no);
    }

    flag_set(bit_no) {
        return this.flags & (1 << bit_no);
    }

    set_flags(val, lop, rop) {

        // Carry
       (val > 255 || val < 0) ? this.set_flag(i8080.Flags.Carry) : this.clear_flag(i8080.Flags.Carry);

        // Parity
        this.parity(val) ? this.set_flag(i8080.Flags.Parity) : this.clear_flag(i8080.Flags.Parity);

        // Auxillary Carry
        //
        // This one's a little tricky!
        //
        // Add the LSB nibbles of each byte together. If the result includes an additional bit set (carried) in 
        // position 4, then an auxillary (or half) carry will occur during this operation.
        //
        // e.g.
        //
        // +----------+
        // | 10011111 |
        // |+---------|
        // | 10100101 |
        // +----------+

        // Take least significant nibbles only, and sum.

        // +----------+
        // | 00001111 |
        // |+---------|
        // | 00000101 |
        // +==========+
        // | 00010100 |
        // +----------+
        
        // Above, we can see that binary arithmatic has resulted in 1 set in position 4 which means a
        // half-carry would have occurred in this operation.
        ((lop & 0xf) + (rop & 0xf)) & (1 << 4) ? this.set_flag(i8080.Flags.AuxillaryCarry) : this.clear_flag(i8080.Flags.AuxillaryCarry);

        // Zero
        val === 0 ? this.set_flag(i8080.Flags.Zero) : this.clear_flag(i8080.Flags.Zero);

        // Sign
        val & (1 << 7) ? this.set_flag(i8080.Flags.Sign) : this.clear_flag(i8080.Flags.Sign)
    }

//  ===================================================================================
//  NOP
//  ===================================================================================
//
//  Nowt.

    noop() {
        this.clock += 4;
    }

//  ===================================================================================
//  ADD Arithmetic Operations (ADD to Accumulator (A))
//  ===================================================================================

// The specified byte is added to the contents of the accumulator using 
// two's complement arithmetic.
//
// Condition bits affected: Carry, Sign, Zero, Parity, Auxiliary Carry

    // ADD B
    add_b() {
        const val = this.registers.A += this.registers.B;
        this.set_flags(val, this.registers.A, this.registers.B);
        this.registers.A = val & 0xFF;

        this.clock += 4;
    }

//  ===================================================================================
//  LXI Operations
//  ===================================================================================
//
// The third byte of the instruction (the most significant 8 bits of
// the 16-bit immediate data) is loaded into the first register of the specified
// pair, while the second byte of the instruction (the least significant 8 bits of
// the 16-bit immediate data) is loaded into the second register of the specified
// pair.

// Note the swapping of bytes is due to the little-endian storage method of the 8080

// e.g. For OpCode 0x01 (LX B,D16)

// +---------------------+--------------+-------------+
// | OPCODE (FIRST BYTE) |  SECOND BYTE |  THIRD BYTE |
// +---------------------+--------------+-------------+
// | 00000001            | 10101010     | 01010101    |
// +---------------------+--------------+-------------+

// After execution, register pair B,C will contain the following:

// +------------+-------------+
// | REGISTER B |  REGISTER C |
// +------------+-------------+
// | 01010101   | 10101010    |
// +------------+-------------+

// If SP is specified as the register pair, the second byte of the
// instruction replaces the least significant 8 bits of the stack pointer, while
// the third byte of the instruction replaces the most significant 8 bits of the
// stack pointer.

// e.g.

// +---------------------+--------------+-------------+
// | OPCODE (FIRST BYTE) |  SECOND BYTE |  THIRD BYTE |
// +---------------------+--------------+-------------+
// | 00110001            | 10101010     | 01010101    |
// +---------------------+--------------+-------------+

// After execution, Stack Pointer will contain the following:

// +--------------------+
// | STACK POINTER (SP) |
// +--------------------+
// | 01010101|10101010  |
// +--------------------+

// Condition bits affected: None

    // LXI B,d16
    lxi_b(val) {
        this.registers.B = val & 0xFF;
        this.registers.C = (val >> 8) & 0xFF;

        this.clock += 10;
    }

    // LXI D,d16
    lxi_d(val) {
        this.registers.D = val & 0xFF;
        this.registers.E = (val >> 8) & 0xFF;

        this.clock += 10;
    }

    // LXI H,d16
    lxi_h(val) {
        this.registers.H = val & 0xFF;
        this.registers.L = (val >> 8) & 0xFF;

        this.clock += 10;
    }

    // LXI SP,d16
    lxi_sp(val) {
        const second_byte = val >> 8 & 0xFF;
        const third_byte = val & 0xFF;

        this.stack_pointer = 0x0;
        this.stack_pointer = (third_byte << 8) | second_byte;

        this.clock += 10;
    }


//  ===================================================================================
//  Single Register Operations
//  ===================================================================================

// This section describes instructions which operate on a single register or memory 
// location. If a memory reference is specified, the memory byte addressed by the H
// and L registers is operated upon. The H register holds the most significant 8 bits 
// of the address wh ile the L register holds the least significant 8 bits of the 
// address.

    daa() {
        // The eight-bit hexadecimal number in the accumulator is adjusted to form two 
        // four-bit binary-coded-decimal digits by the following two-step process:

        // (1) If the least significant four bits of the accumulator represents a number
        // greater than 9, or if the Auxiliary Carry bit is equal to one, the 
        // accumulator is incremented by six. Otherwise, no incrementing occurs.

        // (2) If the most significant four bits of the accumulator now represent a 
        // number greater than 9, or if the normal carry bit is equal to one, the most
        // significant four bits of the accumulator are incremented by six. Otherwise, 
        // no incrementing occurs.

        // If a carry out of the least significant four bits occurs during Step (1), 
        // the Auxiliary Carry bit is set; otherwise it is reset. Likewise, if a carry 
        // out of the most significant four bits occurs during Step (2). the normal 
        // Carry bit is set; otherwise, it is unaffected:

        // This instruction is used when adding decimal numbers. It is the only 
        // instruction whose operation is affected by the Auxiliary Carry bit.

        if ((this.registers.A & 0x0F) > 9 || this.flag_set(i8080.Flags.AuxillaryCarry)) {
            const val = this.registers.A += 0x06;
            this.set_flags(val, this.registers.A, 0x06);
            this.registers.A = val & 0xFF;
        }

        if ((this.registers.A & 0xF0) > 0x90 || this.flag_set(i8080.Flags.Carry)) {
            const val = this.registers.A += 0x60;
            if (val > 255 || val < 0) this.set_flag(i8080.Flags.Carry);
            this.registers.A = val & 0xFF;
        }

        this.clock += 4;
    }



//  ===================================================================================
//  MOV Operations
//  ===================================================================================
//
// Moving data from register to register, memory to register, memory to memory!
//
// MOV DST, SRC

    mov_bb() {
        this.clock += 5
    }

    mov_db() {
        this.D = this.B;

        this.clock += 5
    }

}

function print_num_as_binary(val) {
    var str = '';
    for (let i = 0; i<16; i++) {
        if (val & (1 << i)) {
            str += '1';
        } 
        else {
            str += '0';
        }
    }
    return str.split('').reverse().join('');
}

function __tst__carry_flag_set_after_addition() {
    let c = new Computer();
    console.log('Test: Carry Flag Test after AE+74 (=122)');

    // Status flags after ADD operation
    // +---------+----+----+----+----+----+----+----+
    // | BIT NO. | 7  |  6 |  5 |  4 |  3 |  2 |  0 |
    // +---------+----+----+----+----+----+----+----+
    // |         |    |    |    |    |    |    |    |
    // |   AE    | 1  | 0  | 1  |  0 | 1  | 1  | 1  |
    // |         |    |    |    |    |    |    |    |
    // | + 74    | 0  | 1  | 1  | 1  | 0  | 1  | 0  |
    // |         |    |    |    |    |    |    |    |
    // | = 122   | 0  | 0  | 1  | 0  | 0  | 0  | 1  |
    // +---------+----+----+----+----+----+----+----+
    // Bit 7 was carried, so the carry flag should be set in this calculation.
    // Note that in the calculation above, the aux carry flag is also set
    // Note that the parity flag should also be set (2 bits set in the result)

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
