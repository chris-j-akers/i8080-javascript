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

class i8080 {
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

    set_flags(val, lop, rop) {
        this.flags = 0x2;

        // Carry
        if (val > 255 || val < 0) this.flags |= 1;

        // Parity
        if (this.parity(val)) this.flags |= (1 << 2);

        // Auxillary Carry
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
        if (((lop & 0xf) + (rop & 0xf)) & (1 << 4)) this.flags |= (1 << 4);

        // Zero
        if (val === 0) this.flags |= (1 << 6);

        // Sign
        if (val & (1 << 7)) this.flags |= (1 << 7);
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
        const val = this.A += this.B;
        this.set_flags(val, this.A, this.B);
        this.A = val & 0xFF;

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


function dump_flags(c) {
    console.log(`FLAGS`);
    for (let i=0; i<8; i++) {
        console.log(`FLAG BIT ${i} = ${c.cpu.flags & (1 << i) ? 1 : 0}`);
    }
}

const c = new Computer();
console.log(c); 

