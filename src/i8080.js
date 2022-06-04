'use strict';

import { __util__byte_as_binary, __util__word_as_binary} from './i8080-utils.js'

/**
 * An Intel 8080 CPU implemented in software.
 */
class i8080 {

    /**
     * @returns a formatted string listing each flag and its current value
     */
    __dbg__get_flags() {
        let str = 'F  [';
        for (let flag in i8080.FlagType) {
            str += `${flag}: ${(this.flags & (1 << i8080.FlagType[flag])) ? '1' : '0'}, `
        }
        return str.slice(0,-2) + ']';
    }

    /**
     * @returns {string} a formatted string listing each register and its
     * current value
     */
    __dbg__get_registers() {
        let str = 'R  [';
        let rval = '';
        for (let register in this.registers) {
            rval = this.registers[register];
            str += `${register}: ${rval}, 0x${rval.toString(16)}, ${__util__byte_as_binary(rval)} | `
        }
        return str.slice(0,-3) + ']';
    }

    /**
     *
     * @returns {string} a formatted string containing the current value of the
     * stack pointer
     */
    __dbg__get_sp() {
        return `SP [${this.stack_pointer}, ${this.stack_pointer.toString(16)}, ${__util__word_as_binary(this.stack_pointer)}]`;
    }

    /**
     *
     * @returns {string} a formatted string containing the current value of the
     * program counter
     */
    __dbg__get_pc() {
        return `PC [${this.program_counter}, ${this.program_counter.toString(16)}, ${__util__word_as_binary(this.program_counter)}]`;
    }

    /**
     *
     * @returns {string} a formatted string containing the current value of the
     * CPU clock
     */
    __dbg__get_clock() {
        return `CL [${this.clock}, ${this.clock.toString(16)}, ${__util__word_as_binary(this.clock)}]`;
    }

    /**
     *
     * @returns {string} a formatted string containing the state of all CPU
     * registers and flags, plus the values of the clock, stack pointer and
     * program counter.
     */
    __dbg__get_state() {
        return `${this.__dbg__get_registers()}\n${this.__dbg__get_flags()}\n${this.__dbg__get_sp()}\n${this.__dbg__get_pc()}\n${this.__dbg__get_clock()}`;
    }

    /** 
     * Used when setting or getting bit flags. Means we can use the flag name
     * instead of having to remember the bit position. A sort of enumy type
     * sort of thing.
     * 
     * NOTE, this isn't read-only, but we're all adults, right?
    */
    static get FlagType() {
        return {
            Carry: 0,
            Parity: 2,
            AuxillaryCarry: 4,
            Zero: 6,
            Sign: 7,
        };
    }

    /**
     * Constructor for the i8080 object.
     */
    constructor() {
        this.reset();
        this.bus = null;
    }

    /**
     * Reset the CPU, setting all registers, the program counter, clock and
     * stack-pointer to 0. Note, Flags are set to 0x2 because, according to the
     * 8080 Programmers Manual, bit-1 (unused) is always set to 1 as default.
     */
    reset() {
        this.registers = {A: 0x0, B:0x0, C:0x0, D:0x0, E:0x0, H:0x0, L:0x0};
        this.stack_pointer = 0x0;
        this.program_counter = 0x0;
        this.flags = 0x2;
        this.clock = 0x0;
        this.halt = false;
    }

    /**
     * Connect a `Bus` object to this CPU. A bus is used to access memory and
     * peripherals.
     * @param {ref} bus 
     */
    connect_bus(bus) {
        this.bus = bus;
    }

    set_program_counter(addr) {
        this.program_counter = addr;
    }

    /**
     * Store a 16-bit memory address into a pair of 8-bit registers.
     *
     * Operations that *retrieve* data from memory get the relevant address from
     * one of the register pairs (BC, DE, HL). The first register in the pair
     * stores the high-byte of the address and the second register stores the
     * low-byte. 
     *
     * @param {character} The register which stores the high-byte of the address 
     * @param {character} The register which stores the low-byte of the address
     * @returns A 16-bit memory address.
     */
    read_mem_addr(reg_highbyte, reg_lowbyte) {
        return ((this.registers[reg_highbyte] << 8) | this.registers[reg_lowbyte]) & 0xFFFF;
    }

    /**
     * Load a 16-bit memory address a pair of 8-bit registers.
     *
     * Operations that *store* data in memory get the relevant address from one
     * of the register pairs (BC, DE, HL). The first register in the pair stores
     * the high-byte of the address and the second register stores the low-byte.
     *
     * @param {number} addr The address that needs to be loaded
     * @param {character} reg_highbyte The register which will store the
     * high-byte of the address
     * @param {character} reg_lowbyte  The register which will store the
     * low-byte of the address
     */
    load_mem_addr(addr, reg_highbyte, reg_lowbyte) {
        this.mvi_reg(reg_highbyte,(addr >> 8) & 0xff);
        this.mvi_reg(reg_lowbyte,addr & 0xff);
    }


    /**
     * Test whether the number of bits set to `1` in `val` is even. If so, then
     * returns `True`, else returns `False`. Used for setting the `Parity` flag.
     * @param {number} val to check
     * @returns `True` if number of bits set is even (or 0) or `False`if odd.
     */
    parity(val) {
        let bit_count = 0;
        for (let i = 0; i < 8; i++) {
            if (val & (1 << i)) bit_count++;
        }
        return (bit_count % 2 === 0)
    }

    /**
     * Sets the specified flag bit in the flag register.
     *
     * @param {number} bit_pos bit position of the flag to set (see `FlagType`
     * object)
     */
    set_flag(bit_pos) {
        this.flags |= (1 << bit_pos);
    }

    /**
     * Clears (Unsets) the specified flag bit in the flag register.
     * 
     * @param {number} bit_pos bit position of the flag to clear (see `FlagType`
     * object))
     */
    clear_flag(bit_pos) {
        this.flags &= ~(1 << bit_pos);
    }

    /**
     * Used to determine whether a specified flag is set.
     * 
     * @param {number} bit_pos of the flag to check (see `FlagType` object))
     * @returns `True` or `False`depending on whether the selected flag is set.
     */
    flag_set(bit_pos) {
        return (this.flags & (1 << bit_pos)) > 0;
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

    /**
     * Sets or Clears CPU Flags based on the results of arithmetic operations.
     * In the case of Aux Carry, only the left-hand side and right-hand side of
     * the operation is taken into account.
     *
     * @param {number} result The result of the operation.
     * @param {number} lhs The left-hand side of the operation.
     * @param {number} rhs The right-hand side of the operation.
     *
     */
    set_flags_on_arithmetic_op(result, lhs, rhs) {

        /**
         * Carry Flag: Maximum storage size of any value in a 8080 register is
         * 1-byte (8-bits), so 255. Any higher result than that must mean a
         * Carry out of the 7th bit occured.
         */
        result > 255 || result < 0 ? this.set_flag(i8080.FlagType.Carry) : this.clear_flag(i8080.FlagType.Carry);

        /**
         * Parity Flag: Set if the number of 1's is even. A very old form of
         * tame CRC checking
         */
        this.parity(result) ? this.set_flag(i8080.FlagType.Parity) : this.clear_flag(i8080.FlagType.Parity);

        /**
        * Auxillary Carry Flag
        *
        * Add the LSB nibbles of each byte together. If the result includes a
        * bit carried into position 4, then an auxillary (or half) carry will
        * occur during this operation and the flag must be set.
        *
        * In the example below, we can see that adding the two least significant
        * nibbles of numbers 159 and 165 together results in a 1 being carried
        * to bit position 4. This means an auxillary carry (or half-carry) will
        * occur during this add operation and the flag must be set accordingly.
        *
        * +---------------+
        * | 159: 10011111 |
        * |+--------------|
        * | 165: 10100101 |
        * +---------------+
        *
        * Take least significant nibbles only, and sum.
        *
        * +----------+
        * | 00001111 |
        * |+---------|
        * | 00000101 |
        * +==========+
        * | 00010100 |
        * +----------+
        *
        * Result has meant a carry out of bit-3 to bit-4, so we set Aux Carry in
        * this case.
        *
        * */
        ((lhs & 0x0f) + (rhs & 0x0f)) & (1 << 4) ? this.set_flag(i8080.FlagType.AuxillaryCarry) : this.clear_flag(i8080.FlagType.AuxillaryCarry);

        /**
         * Zero Flag: Set if the operation result is 0
         */
        result === 0 ? this.set_flag(i8080.FlagType.Zero) : this.clear_flag(i8080.FlagType.Zero);

        /**
         * Sign Flag: Set if bit 7 of the result is 1. It is up to the 8080
         * programmer to decide whether or not to treat a number with bit-7 set
         * as negative. All the 8080 does is detect that bit-7 is set in the
         * result of some operation and sets the sign flag accordingly. It
         * doesn't care what the number actually is.
         */
        result & (1 << 7) ? this.set_flag(i8080.FlagType.Sign) : this.clear_flag(i8080.FlagType.Sign)
    }

//  ===================================================================================
//  ADD Arithmetic Operations (ADD,ADC)
//  ===================================================================================

    /**
     * Add the value stored in register `reg` to the Accumulator.
     * 
     * Flags Affected: C, P, AC, Z, S
     * 
     * Covers Mnemonics: ADD
     * 
     * @param {char} reg The name of the register which contains the value to be added.
     */
    add_reg(reg) {
        const result = this.registers['A'] + this.registers[reg];
        this.set_flags_on_arithmetic_op(result, this.registers['A'], this.registers[reg]);
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    add_mem() {
        const mem_data = this.bus.read(this.read_mem_addr('H','L'));
        const result = this.registers['A'] + mem_data;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], mem_data);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    adc_reg(reg) {
        const register_with_carry = this.registers[reg] + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const result = this.registers['A'] + register_with_carry;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], register_with_carry);
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    adc_mem() {
        const mem_data = this.bus.read(this.read_mem_addr('H','L'));
        const carry = (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const mem_data_with_carry = mem_data + carry;
        const result = this.registers['A'] + mem_data_with_carry;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], mem_data_with_carry);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    adi(val) {
        const result = this.registers['A'] + val;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], val);
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    aci(val) {
        const carry = (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const val_with_carry = val + carry;
        const result = this.registers['A'] + val_with_carry;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], val_with_carry);
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    
    /**
     *  Subtract value held in register `reg` from the current value in the
     *  Accumulator. Result is loaded to the Accumulator.
     *
     * e.g. If the value in the Accumulator is currently 10 and the value in
     * register `B` is 5, then `sub_reg('B')` will subtract 5 from 10 and leave 5
     * in the Accumulator.
     * 
     * Flags affected: C, P, AC, Z, S
     *
     * @param {character} reg Name of register that contains value to be
     * subtracted from the Accumulator (B,C,D,E,H,L)
     */
    sub_reg(reg) {
        const reg_twos_comp = ~(this.registers[reg]) + 1;
        const result = (this.registers['A'] + reg_twos_comp);
        this.set_flags_on_arithmetic_op(result, this.registers['A'], reg_twos_comp);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    /**
     * Subtract value held in the 16-bit memory address currently loaded into
     * registers `H` and `L` from the Accumulator, leaving the result in the
     * Accumulator.
     *
     * Flags affected: C, P, AC, Z, S
     * 
     * e.g. If the Accumulator currentyl holds the value 10 and `H` and `L` point
     * to the memory location at address 0x100 which holds the value 5, then 5
     * will be subtracted from 10, leaving 5 in the Accumulator.
     *
     */
    sub_mem() {
        const data = this.bus.read(this.read_mem_addr('H','L'));
        const data_twos_comp = ~(data)+1;
        const result = this.registers['A'] + data_twos_comp;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], data_twos_comp);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    sbb_reg(reg) {        
        const reg_carry = this.registers[reg] + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const reg_carry_twos_comp = ~(reg_carry) + 1;
        const result = (this.registers['A'] + reg_carry_twos_comp);
        this.set_flags_on_arithmetic_op(result, this.registers['A'], reg_carry_twos_comp);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    sbb_mem() {
        const data = this.bus.read(this.read_mem_addr('H','L'));
        const carry = (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const data_carry = data + carry;
        const data_carry_twos_comp = ~(data_carry)+1;
        const result = this.registers['A'] + data_carry_twos_comp;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], data_carry_twos_comp);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    sui(val) {
        const val_twos_comp = ~(val) + 1;
        const result = (this.registers['A'] + val_twos_comp);
        this.set_flags_on_arithmetic_op(result, this.registers['A'], val_twos_comp);
        this.registers['A'] = result & 0xFF;
        this.clock += 7;        
    }

    sbi(val) {
        const carry = (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const val_carry = val + carry;
        const val_carry_twos_comp = ~(val_carry) + 1;
        const result = this.registers['A'] + val_carry_twos_comp;
        this.set_flags_on_arithmetic_op(result, this.registers['A'], val_carry_twos_comp);
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
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

    lxi(reg, msb, lsb) {

        switch(reg) {
            case 'B':
                this.registers.B = msb;
                this.registers.C = lsb;
                break;
            case 'D':
                this.registers.D = msb;
                this.registers.E = lsb;
                break;
            case 'H':
                this.registers.H = msb;
                this.registers.L = lsb;
            case 'SP':
                this.stack_pointer = (msb << 8) | lsb;
                break;
        }
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

        if ((this.registers['A'] & 0x0F) > 9 || this.flag_set(i8080.FlagType.AuxillaryCarry)) {
            const val = this.registers['A'] += 0x06;
            this.set_flags_on_arithmetic_op(val, this.registers['A'], 0x06);
            this.registers['A'] = val & 0xFF;
        }

        if ((this.registers['A'] & 0xF0) > 0x90 || this.flag_set(i8080.FlagType.Carry)) {
            const val = this.registers['A'] += 0x60;

            // According to the documentation, we do not clear the Carry if the test
            // is false, here. We leave it, so calling set_flag() directly instead of
            // set_flags() to stop the reset on the false condition.
            if (val > 255 || val < 0) this.set_flag(i8080.FlagType.Carry);
            this.registers['A'] = val & 0xFF;
        }

        this.clock += 4;
    }

    // +-----------------------------------------------------------------------+
    // |                           MOV Operations                              |
    // +-----------------------------------------------------------------------+

    mov_reg(reg_destination, reg_source) {
        this.registers[reg_destination] = this.registers[reg_source];
        this.clock += 5
    }

    mov_to_mem(reg_source) {
        this.bus.write(this.registers[reg_source], this.read_mem_addr('H', 'L'));
        this.clock += 7
    }

    mov_from_mem(reg_destination) {
        this.registers[reg_destination] = this.bus.read(this.read_mem_addr('H', 'L'));
        this.clock += 7

        // const mem_data = this.bus.read(this.read_mem_addr('H','L'));
    }

// +-------------------------------------------------------------------------------------+
// |                                    MVI Operations                                   |
// +-------------------------------------------------------------------------------------+

    mvi_reg(reg_destination, val) {
        this.registers[reg_destination] = (val & 0xFF);
        this.clock += 7
    }

    mvi_to_mem(val) {
        const addr = this.read_mem_addr('H', 'L');
        this.bus.write(val, addr);
        this.clock += 7
    }

//  ===================================================================================
//  Logical Bit-Wise Operations
//  ===================================================================================
//
    
    set_flags_on_logical_op() {
        this.clear_flag(i8080.FlagType.Carry);
        this.registers['A'] === 0 ? this.set_flag(i8080.FlagType.Zero) : this.clear_flag(i8080.FlagType.Zero);
        this.registers['A'] & (1 << 7) ? this.set_flag(i8080.FlagType.Sign) : this.clear_flag(i8080.FlagType.Sign)
        this.parity(this.registers['A']) ? this.set_flag(i8080.FlagType.Parity) : this.clear_flag(i8080.FlagType.Parity);
    }

    ana_reg(reg) {
        this.registers['A'] &= this.registers[reg];
        this.set_flags_on_logical_op();
        
        this.clock += 4;
    }

    ana_mem() {
        this.registers['A'] &= this.bus.read(this.read_mem_addr('H','L'));
        this.set_flags_on_logical_op();

        this.clock += 7;
    }

    ani(val) {
        this.registers['A'] &= val;
        this.set_flags_on_logical_op();

        this.clock += 4;
    }

    xra_reg(reg) {
        this.registers['A'] ^= this.registers[reg];
        this.set_flags_on_logical_op();

        this.clock += 4;
    }

    xra_mem() {
        this.registers['A'] ^= this.bus.read(this.read_mem_addr('H','L'));
        this.set_flags_on_logical_op();

        this.clock += 7;
    }

    xri(val) {
        this.registers['A'] ^= val;
        this.set_flags_on_logical_op();
        this.clock += 4;
    }

    ora_reg(reg) {
        this.registers['A'] |= this.registers[reg];
        this.set_flags_on_logical_op();

        this.clock += 4;
    }

    ora_mem() {
        this.registers['A'] |= this.bus.read(this.read_mem_addr('H','L'));
        this.set_flags_on_logical_op();

        this.clock += 7;
    }

    ori(val) {
        this.registers['A'] |= val;
        this.set_flags_on_logical_op()
        this.clock += 4;
    }


    /**
     * Store the current value in the Accumulator to a location in memory.
     *
     * @param {char} reg First register of the register pair that holds
     * the relevant memory address. `B` = `B` &
     * `C`, `D` = `D` & `E`. 
     */
    stax(reg) {
        let addr;
        switch(reg) {
            case 'B':
                addr = this.read_mem_addr('B','C');
                break;
            case 'D':
                addr = this.read_mem_addr('D','E');
                break;
        }
        this.bus.write(this.registers['A'], addr);
        this.clock += 7;
    }


    /**
     * Store contents of `H` and `L` registers in memory. Contents of `H`
     * register are stored at `addr` and contents of `L` register are stored at
     * the next higher memory address.
     * @param {number} operand 16-bit memory address of storage location in little-endian format
     */
    shld(addr) {
        this.bus.write(this.registers.L, addr);
        this.bus.write(this.registers.H, addr + 1);
        this.clock += 16;
    }

    get_next_byte() {
        const next_byte = this.bus.read(this.program_counter);
        this.program_counter++;
        return next_byte;
    }

    /**
     *
     * @returns The next 16-bits of memory from the current program counter
     * position, then increments the program counter by 2 bytes.
     */
    get_next_word() {
        const lsb = this.bus.read(this.program_counter);
        this.program_counter++;
        const msb = this.bus.read(this.program_counter);
        this.program_counter++;
        return (msb <<8) | lsb;
    }

    /**
     * Get the next opcode from the program counter location, then execute it.
     * The program counter is incremented automatically, depending on the number
     * of bytes consumed by the instruction.
     *
     * In the emulation world, this method is officially known as: '*The Big,
     * Fuck-Off Switch Statement Technique*'. Others have used tables to lookup
     * instructions, but switch works just as well and, although longer, is
     * simple to read.
     *
     */
    execute_instruction() {
        const opcode = this.get_next_byte();
        switch(opcode) {
            case 0x0E:
                this.mvi_reg('C', this.get_next_byte());
                break;
            case 0x1E:
                this.mvi_reg('E', this.get_next_byte());
                break;
            case 0x2E:
                this.mvi_reg('L', this.get_next_byte());
                break;
            case 0x3E:
                this.mvi_reg('A', this.get_next_byte());
                break;
            case 0x06:
                this.mvi_reg('B', this.get_next_byte());
                break;
            case 0x16:
                this.mvi_reg('D', this.get_next_byte());
                break;
            case 0x26:
                this.mvi_reg('H', this.get_next_byte());
                break;
            case 0x36:
                this.mvi_to_mem(this.get_next_byte());
                break;
            case 0x40:
                this.mov_reg('B', 'B');
                break;
            case 0x41:
                this.mov_reg('B', 'C');
                break;
            case 0x42:
                this.mov_reg('B', 'D');
                break;
            case 0x43:
                this.mov_reg('B', 'E');
                break;
            case 0x44:
                this.mov_reg('B', 'H');
                break;
            case 0x45:
                this.mov_reg('B', 'L');
                break;
            case 0x46:
                this.mov_from_mem('B');
                break;
            case 0x47:
                this.mov_reg('B', 'A');
            case 0x48:
                this.mov_reg('C', 'B');
                break;
            case 0x49:
                this.mov_reg('C', 'C');
                break;
            case 0x4A:
                this.mov_reg('C', 'D');
                break;
            case 0x4B:
                this.mov_reg('C', 'E');
                break;
            case 0x4C:
                this.mov_reg('C', 'H');
                break;
            case 0x4D:
                this.mov_reg('C', 'L');
                break;
            case 0x4E:
                this.mov_from_mem('C');
                break;
            case 0x4F:
                this.mov_reg('C', 'A');
                break;
            case 0x50:
                this.mov_reg('D', 'B');
                break;
            case 0x51:
                this.mov_reg('D', 'C');
                break;
            case 0x52:
                this.mov_reg('D', 'D');
                break;
            case 0x53:
                this.mov_reg('D', 'E');
                break;
            case 0x54:
                this.mov_reg('D', 'H');
                break;
            case 0x55:
                this.mov_reg('D', 'L');
                break;
            case 0x56:
                this.mov_from_mem('D');
                break;
            case 0x57:
                this.mov_reg('D', 'A');
                break;
            case 0x58:
                this.mov_reg('E', 'B');
                break;
            case 0x59:
                this.mov_reg('E', 'C');
                break;
            case 0x5A:
                this.mov_reg('E', 'D');
                break;
            case 0x5B:
                this.mov_reg('E', 'E');
                break;
            case 0x5C:
                this.mov_reg('E', 'H');
                break;
            case 0x5D:
                this.mov_reg('E', 'L');
                break;
            case 0x5E:
                this.mov_from_mem('E');
                break;
            case 0x5F:
                this.mov_reg('E', 'A');
                break;
            case 0x60:
                this.mov_reg('H', 'B');
                break;
            case 0x61:
                this.mov_reg('H', 'C');
                break;
            case 0x62:
                this.mov_reg('H', 'D');
                break;
            case 0x63:
                this.mov_reg('H', 'E');
                break;
            case 0x64:
                this.mov_reg('H', 'H');
                break;
            case 0x65:
                this.mov_reg('H', 'L');
                break;
            case 0x66:
                this.mov_from_mem('H');
                break;
            case 0x67:
                this.mov_reg('H', 'A');
                break;
            case 0x68:
                this.mov_reg('L', 'B');
                break;
            case 0x69:
                this.mov_reg('L', 'C');
                break;
            case 0x6A:
                this.mov_reg('L', 'D');
                break;
            case 0x6B:
                this.mov_reg('L', 'E');
                break;
            case 0x6C:
                this.mov_reg('L', 'H');
                break;
            case 0x6D:
                this.mov_reg('L', 'L');
                break;
            case 0x6E:
                this.mov_from_mem('L');
                break;
            case 0x6F:
                this.mov_reg('L', 'A');
                break;
            case 0x70:
                this.mov_to_mem('B');
                break;
            case 0x71:
                this.mov_to_mem('C');
                break;
            case 0x72:
                this.mov_to_mem('D');
                break;
            case 0x73:
                this.mov_to_mem('E');
                break;
            case 0x74:
                this.mov_to_mem('H');
                break;
            case 0x75:
                this.mov_to_mem('L');
                break;
            case 0x77:
                this.mov_to_mem('A');
                break;
            case 0x78:
                this.mov_reg('A', 'B');
                break;
            case 0x79:
                this.mov_reg('A', 'C');
                break;
            case 0x7A:
                this.mov_reg('A', 'D');
                break;
            case 0x7B:
                this.mov_reg('A', 'E');
                break;
            case 0x7C:
                this.mov_reg('A', 'H');
                break;
            case 0x7D:
                this.mov_reg('A', 'L');
                break;
            case 0x7E:
                this.mov_from_mem('A');
                break;
            case 0x7F:
                this.mov_reg('A', 'A');
                break;
            case 0x76:
                this.halt = true;
                return;
            case 0x80:
                this.add_reg('B');
                break;
            case 0x81:
                this.add_reg('C');
                break;
            case 0x82:
                this.add_reg('D');
                break;
            case 0x83:
                this.add_reg('E');
                break;
            case 0x84:
                this.add_reg('H');
                break;
            case 0x85:
                this.add_reg('L');
                break;
            case 0x86:
                this.add_mem();
                break;
            case 0x87:
                this.add_reg('A');
                break;
            case 0x88:
                this.adc_reg('B');
                break;
            case 0x89:
                this.adc_reg('C');
                break;
            case 0x8A:
                this.adc_reg('D');
                break;
            case 0x8B:
                this.adc_reg('E');
                break;
            case 0x8C:
                this.adc_reg('H');
                break;
            case 0x8D:
                this.adc_reg('L');
                break;
            case 0x8E:
                this.adc_mem();
                break;
            case 0x8F:
                this.adc_reg('A');
                break;
            case 0x90:
                this.sub_reg('B');
                break;
            case 0x91:
                this.sub_reg('C');
                break;
            case 0x92:
                this.sub_reg('D');
                break;
            case 0x93:
                this.sub_reg('E');
                break;
            case 0x94:
                this.sub_reg('H');
                break;
            case 0x95:
                this.sub_reg('L');
                break;
            case 0x96:
                this.sub_mem();
                break;
            case 0x97:
                this.sub_reg('A');
                break;
            case 0x98:
                this.sbb_reg('B');
                break;
            case 0x99:
                this.sbb_reg('C');
                break;
            case 0x9A:
                this.sbb_reg('D');
                break;
            case 0x9B:
                this.sbb_reg('E');
                break;
            case 0x9C:
                this.sbb_reg('H');
                break;
            case 0x9D:
                this.sbb_reg('L');
                break;
            case 0x9E:
                this.sbb_mem();
                break;
            case 0x9F:
                this.sbb_reg('A');
                break;
            case 0xC6:
                this.adi(this.get_next_byte());
                break;
            case 0xCE:
                this.aci(this.get_next_byte());
                break;
            case 0xD6:
                this.sui(this.get_next_byte());
                break;
            case 0xDE:
                this.sbi(this.get_next_byte());
                break;
        }
    }


}

export { i8080 };