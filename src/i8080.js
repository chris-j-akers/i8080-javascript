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
        this.bus.connect_mmu(this.mmu);
    }

    reset() {
        this.cpu.reset();
        this.mmu.reset();
    }
}

/**
 * The bus links the CPU and other 'periphials' together. This is usually just
 * memory, but could also be a video display buffer or similar.
 */
class Bus {
    constructor() {
        this.mmu = null;
        this.cpu = null;
    }

    connect_mmu(mmu) {
        this.mmu = mmu;
    }

    connect_cpu(cpu) {
        this.cpu = cpu;
    }

    write(val, addr) {
        this.mmu.write(val, addr);
    }

    read(addr) {
        return this.mmu.read(addr);
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

    write(val, addr) {
        this.ram[addr] = val;
    }

    read(addr) {
        return this.ram[addr];
    }
}

//  ===================================================================================
//  i8080 CPU
//  ===================================================================================

class i8080 {
    //  ===================================================================================
    //  Methods to retrieve strings about the state of the CPU. Useful for debugging
    //  ===================================================================================
    __dbg__get_flags() {
        let str = 'F  [';
        for (let flag in i8080.FlagType) {
            str += `${flag}: ${(this.flags & (1 << i8080.FlagType[flag])) ? '1' : '0'}, `
        }
        return str.slice(0,-2) + ']';
    }

    __dbg__get_registers() {
        let str = 'R  [';
        let rval = '';
        for (let register in this.registers) {
            rval = this.registers[register];
            str += `${register}: ${rval}, 0x${rval.toString(16)}, ${__util__byte_as_binary(rval)} | `
        }
        return str.slice(0,-3) + ']';
    }

    __dbg__get_sp() {
        return `SP [${this.stack_pointer}, ${this.stack_pointer.toString(16)}, ${__util__word_as_binary(this.stack_pointer)}]`;
    }

    __dbg__get_pc() {
        return `PC [${this.program_counter}, ${this.program_counter.toString(16)}, ${__util__word_as_binary(this.program_counter)}]`;
    }

    __dbg__get_clock() {
        return `CL [${this.clock}, ${this.clock.toString(16)}, ${__util__word_as_binary(this.clock)}]`;
    }

    __dbg__get_state() {
        return `${this.__dbg__get_registers()}\n${this.__dbg__get_flags()}\n${this.__dbg__get_sp()}\n${this.__dbg__get_pc()}\n${this.__dbg__get_clock()}`;
    }

    //  ===================================================================================
    //  An 'Enum'. Allows us to reference each bit in the flags register using its name
    //  ===================================================================================
    static get FlagType() {
        return {
            Carry: 0,
            Parity: 2,
            AuxillaryCarry: 4,
            Zero: 6,
            Sign: 7,
        };
    }

    //  ===================================================================================
    //  Constructor methods,
    //  ===================================================================================
    constructor() {
        this.reset();
        this.bus = null;
    }

    reset() {
        this.registers = {A: 0x0, B:0x0, C:0x0, D:0x0, E:0x0, H:0x0, L:0x0};
        this.stack_pointer = 0x0;
        this.program_counter = 0x0;
        this.flags = 0x2;
        this.clock = 0x0;
    }

    connect_bus(bus) {
        this.bus = bus;
    }

    /**
     * Operations that *retrieve* data from memory get the relevant address from
     * one of the register pairs (BC, DE, HL). The first register in the pair
     * stores the high-byte of the address and the second register stores the
     * low-byte.
     * 
     * @param {character} The register which stores the high-byte of the address 
     * @param {character} The register which stores the low-byte of the address
     * @returns A 16-bit memory address.
     */
    get_mem_addr(reg_highbyte, reg_lowbyte) {
        return ((this.registers[reg_highbyte] << 8) | this.registers[reg_lowbyte]) & 0xFFFF;
    }

    /**
     * Operations that *store* data in memory get the relevant address from
     * one of the register pairs (BC, DE, HL). The first register in the pair
     * stores the high-byte of the address and the second register stores the
     * low-byte.
     * 
     * @param {number} addr The address that needs to be loaded
     * @param {character} reg_highbyte The register which will store the high-byte of the address
     * @param {character} reg_lowbyte  The register which will store the low-byte of the address
     */
    load_mem_addr(addr, reg_highbyte, reg_lowbyte) {
        this.mvi_reg(reg_highbyte,(addr >> 8) & 0xff);
        this.mvi_reg(reg_lowbyte,addr & 0xff);
    }

    //  ===================================================================================
    //  Flag helper methods for testing, setting and clearing flags and their values
    //  ===================================================================================
    parity(val) {
        // If the number of bits in a value is even, then the value has parity and parity
        // flag should be set.
        let bit_count = 0;
        for (let i = 0; i < 8; i++) {
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


//  ===================================================================================
//  NOP
//  ===================================================================================

    /**
     * Do nowt but take up clock ticks.
     */
    noop() {
        this.clock += 4;
    }

//  ===================================================================================
//  ARITHMETIC OPERATIONS
//  ===================================================================================


    /**
     * Sets or Clears CPU Flags based on the results and, in the case of Aux Carry, the
     * left-hand side and right-hand side of an arithmetic operation. 
     * 
     * @param {number} val The result of the operation.
     * @param {number} lhs The left-hand side of the operation.
     * @param {number} rhs The right-hand side of the operation.
     * 
     */
    set_flags_on_arithmetic_op(val, lhs, rhs) {

        // Carry Flag
       (val > 255 || val < 0) ? this.set_flag(i8080.FlagType.Carry) : this.clear_flag(i8080.FlagType.Carry);

        // Parity Flag
        this.parity(val) ? this.set_flag(i8080.FlagType.Parity) : this.clear_flag(i8080.FlagType.Parity);

        // Auxillary Carry Flag
        
        // Add the LSB nibbles of each byte together. If the result includes a bit 
        // carried into position 4, then an auxillary (or half) carry will occur 
        // during this operation and the flag must be set.
        
        // In the example below, we can see that binary arithmatic has resulted in 
        // 1 set in position 4 which means a half-carry would have occurred in this 
        // operation.
        
        // Let's add 159 to 165.
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
        
        ((lhs & 0x0f) + (rhs & 0x0f)) & (1 << 4) ? this.set_flag(i8080.FlagType.AuxillaryCarry) : this.clear_flag(i8080.FlagType.AuxillaryCarry);

        // Zero Flag
        val === 0 ? this.set_flag(i8080.FlagType.Zero) : this.clear_flag(i8080.FlagType.Zero);

        // Sign Flag
        val & (1 << 7) ? this.set_flag(i8080.FlagType.Sign) : this.clear_flag(i8080.FlagType.Sign)
    }

//  ===================================================================================
//  ADD Arithmetic Operations (ADD,ADC)
//  ===================================================================================

    add_reg(reg) {
        const val = this.registers.A + reg;
        this.set_flags_on_arithmetic_op(val, this.registers.A, reg);
        this.registers.A = val & 0xFF;

        this.clock += 4;
    }

    add_mem() {
        // Add memory - Address is in HL
        const mem_data = this.bus.read(this.get_mem_addr('H','L'));
        const val = this.registers.A + mem_data;
        this.set_flags_on_arithmetic_op(val, this.registers.A, mem_data);
        this.registers.A = val & 0xFF;

        this.clock += 7;
    }

    adc_reg(reg) {
        const register_with_carry = reg + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const val = this.registers.A + register_with_carry;
        this.set_flags_on_arithmetic_op(val, this.registers.A, register_with_carry);
        this.registers.A = val & 0xFF;

        this.clock += 4;
    }

    adc_mem() {
        const mem_data = this.bus.read(this.get_mem_addr('H','L'));
        const carry = (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const mem_data_with_carry = mem_data + carry;
        const val = this.registers.A + mem_data_with_carry;
        this.set_flags_on_arithmetic_op(val, this.registers.A, mem_data_with_carry);
        this.registers.A = val & 0xFF;

        this.clock += 7;
    }

//  ===================================================================================
//  SUBTRACT Arithmetic Operations (SUB, SBB)
//  ===================================================================================

    sub_reg(reg) {
        const reg_twos_complement = ~(reg) + 1;

        const val = (this.registers.A + reg_twos_complement);
        this.set_flags_on_arithmetic_op(val, this.registers.A, reg_twos_complement);

        this.registers.A = val & 0xFF;
        this.clock += 7;
    }

    sub_mem() {
        const mem_data = this.bus.read(this.get_mem_addr('H','L'));
        const mem_data_twos_complement = ~(mem_data)+1;

        const val = this.registers.A + mem_data_twos_complement;
        this.set_flags_on_arithmetic_op(val, this.registers.A, mem_data_twos_complement);

        this.registers.A = val & 0xFF;
        this.clock += 7;
    }

    sbb_reg(reg) {        
        const register_with_carry = reg + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const reg_twos_complement = ~(register_with_carry) + 1;

        const val = (this.registers.A + reg_twos_complement);
        this.set_flags_on_arithmetic_op(val, this.registers.A, reg_twos_complement);

        this.registers.A = val & 0xFF;
        this.clock += 7;
    }

    sbb_mem() {
        const mem_data = this.bus.read(this.get_mem_addr('H','L'));
        const carry = (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const mem_data_with_carry = mem_data + carry;

        const mem_data_twos_complement = ~(mem_data_with_carry)+1;

        const val = this.registers.A + mem_data_twos_complement;
        this.set_flags_on_arithmetic_op(val, this.registers.A, mem_data_twos_complement);

        this.registers.A = val & 0xFF;
        this.clock += 7;
    }

//  ===================================================================================
//  LXI Operations (16-bit Load)
//  ===================================================================================
//
// The third byte of the instruction (the most significant 8 bits of
// the 16-bit immediate data) is loaded into the first register of the specified
// pair, while the second byte of the instruction (the least significant 8 bits of
// the 16-bit immediate data) is loaded into the second register of the specified
// pair.

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
// | 0101010110101010  |
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

        if ((this.registers.A & 0x0F) > 9 || this.flag_set(i8080.FlagType.AuxillaryCarry)) {
            const val = this.registers.A += 0x06;
            this.set_flags_on_arithmetic_op(val, this.registers.A, 0x06);
            this.registers.A = val & 0xFF;
        }

        if ((this.registers.A & 0xF0) > 0x90 || this.flag_set(i8080.FlagType.Carry)) {
            const val = this.registers.A += 0x60;

            // According to the documentation, we do not clear the Carry if the test
            // is false, here. We leave it, so calling set_flag() directly instead of
            // set_flags() to stop the reset on the false condition.
            if (val > 255 || val < 0) this.set_flag(i8080.FlagType.Carry);
            this.registers.A = val & 0xFF;
        }

        this.clock += 4;
    }

    // +------------------------------------------------------------------------------+
    // |                                MOV Operations                                |
    // +------------------------------------------------------------------------------+

    mov_reg(reg_destination, reg_source) {
        this.registers[reg_destination] = this.registers[reg_source];
        this.clock += 5
    }

    mov_to_mem(reg_source) {
        const addr = this.get_mem_addr('H', 'L');
        this.bus.write(this.registers[reg_source], addr);
        this.clock += 7
    }

    mov_from_mem(reg_destination) {
        const addr = this.get_mem_addr('H', 'L');
        this.registers[reg_destination] = this.bus.read(addr);
        this.clock += 7
    }

// +-------------------------------------------------------------------------------------+
// |                                    MVI Operations                                   |
// +-------------------------------------------------------------------------------------+

    mvi_reg(reg_destination, val) {
        this.registers[reg_destination] = (val & 0xFF);
        this.clock += 7
    }

    mvi_to_mem(val) {
        const addr = this.get_mem_addr('H', 'L');
        this.bus.write(val, addr);
        this.clock += 7
    }

//  ===================================================================================
//  Logical Bit-Wise Operations
//  ===================================================================================
//
    
    set_flags_on_logical_op() {
        this.clear_flag(i8080.FlagType.Carry);
        this.registers.A === 0 ? this.set_flag(i8080.FlagType.Zero) : this.clear_flag(i8080.FlagType.Zero);
        this.registers.A & (1 << 7) ? this.set_flag(i8080.FlagType.Sign) : this.clear_flag(i8080.FlagType.Sign)
        this.parity(this.registers.A) ? this.set_flag(i8080.FlagType.Parity) : this.clear_flag(i8080.FlagType.Parity);
    }

    ana_reg(reg) {
        this.registers.A &= this.registers[reg];
        this.set_flags_on_logical_op();
        
        this.clock += 4;
    }

    ana_mem() {
        this.registers.A &= this.bus.read(this.get_mem_addr('H','L'));
        this.set_flags_on_logical_op();

        this.clock += 7;
    }

    xra_reg(reg) {
        this.registers.A ^= this.registers[reg];
        this.set_flags_on_logical_op();

        this.clock += 4;
    }

    xra_mem() {
        this.registers.A ^= this.bus.read(this.get_mem_addr('H','L'));
        this.set_flags_on_logical_op();

        this.clock += 7;
    }

    ora_reg(reg) {
        this.registers.A |= this.registers[reg];
        this.set_flags_on_logical_op();

        this.clock += 4;
    }

    ora_mem() {
        this.registers.A |= this.bus.read(this.get_mem_addr('H','L'));
        this.set_flags_on_logical_op();

        this.clock += 7;
    }


    // Store Accumulator

    stax_b() {
        const addr = this.get_mem_addr('B','C');
        this.bus.write(addr, this.registers.A);

        this.clock += 7;
    }

    stax_d() {
        const addr = this.get_mem_addr('D','E');
        this.bus.write(addr, this.registers.A);

        this.clock += 7;
    }

}

// Enables the use of Jest for unit testing
if (typeof module !== 'undefined') module.exports = { i8080 : i8080, 
                                                      Computer : Computer };
