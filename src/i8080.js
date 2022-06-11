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
     * @returns {string} a formatted string containing the current value of the
     * stack pointer
     */
    __dbg__get_sp() {
        return `SP [${this.stack_pointer}, ${this.stack_pointer.toString(16)}, ${__util__word_as_binary(this.stack_pointer)}]`;
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * program counter
     */
    __dbg__get_pc() {
        return `PC [${this.program_counter}, ${this.program_counter.toString(16)}, ${__util__word_as_binary(this.program_counter)}]`;
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * CPU clock
     */
    __dbg__get_clock() {
        return `CL [${this.clock}, ${this.clock.toString(16)}, ${__util__word_as_binary(this.clock)}]`;
    }

    /**
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

    /**
     * Sets the value of the CPU's internal program_counter. Usually used to set
     * the address from which to start executing an in-memory program.
     */
    set ProgramCounter(addr) {
        this.program_counter = addr;
    }

    /**
     * Returns the current value of the CPU's internal program_counter
     * (16-bit address).
     */
    get ProgramCounter() {
        return this.program_counter & 0xFFFF;
    }

    get StackPointer() {
        return this.stack_pointer & 0xFFFF;
    }

    /**
     * Get a 16-bit memory address stored in a pair of 8-bit registers.
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
    load_mem_addr(reg_highbyte, reg_lowbyte) {
        return ((this.registers[reg_highbyte] << 8) | this.registers[reg_lowbyte]) & 0xFFFF;
    }

    /**
     * Load a 16-bit memory address into a pair of 8-bit registers.
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
    store_mem_addr(addr, reg_highbyte, reg_lowbyte) {
        this.mvi_r(reg_highbyte,(addr >> 8) & 0xff);
        this.mvi_r(reg_lowbyte,addr & 0xff);
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


    /**
     * Object used to set or clears CPU Flags based on the results of various
     * operations. In the case of Aux Carry, only the left-hand side and
     * right-hand side of the operation is taken into account.
     *
     * @param {number} result The result of the operation.
     * @param {number} lhs The left-hand side of the operation.
     * @param {number} rhs The right-hand side of the operation.
     *
     */
    FlagSetter = {
        Carry: (result) => {
            /*
             * Carry Flag: Maximum storage size of any value in a 8080 register is
             * 1-byte (8-bits), so 255. Any higher result than that must mean a
             * Carry out of the 7th bit occured.
             */
            result > 255 || result < 0 ? this.set_flag(i8080.FlagType.Carry) : this.clear_flag(i8080.FlagType.Carry);
        },
        Parity: (result) => {
            /*
             * Parity Flag: Set if the number of 1's is even.
             */
            this.parity(result) ? this.set_flag(i8080.FlagType.Parity) : this.clear_flag(i8080.FlagType.Parity);
        },
        AuxillaryCarry: (lhs, rhs) => {
        /*
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
        */
            ((lhs & 0x0f) + (rhs & 0x0f)) & (1 << 4) ? this.set_flag(i8080.FlagType.AuxillaryCarry) : this.clear_flag(i8080.FlagType.AuxillaryCarry);
        },
        Zero: (result) => {
            /*
             * Zero Flag: Set if the operation result is 0
             */
             (result & 0xFF) === 0 ? this.set_flag(i8080.FlagType.Zero) : this.clear_flag(i8080.FlagType.Zero);
        },
        Sign: (result) => {
            /*
             * Sign Flag: Set if bit 7 of the result is 1. It is up to the 8080
             * programmer to decide whether or not to treat a number with bit-7 set
             * as negative. All the 8080 does is detect that bit-7 is set in the
             * result of some operation and sets the sign flag accordingly. It
             * doesn't care what the number actually is.
             */
             result & (1 << 7) ? this.set_flag(i8080.FlagType.Sign) : this.clear_flag(i8080.FlagType.Sign)
        }
    }


    /*--------------------------------------------------------------------------
                                          NOP
    --------------------------------------------------------------------------*/
   
   
    /**
     * Do nowt but take up clock ticks.
     */
     noop() {
        this.clock += 4;
    }

 
    /*--------------------------------------------------------------------------
                               Arithmetic Operations
    --------------------------------------------------------------------------*/

    /**
     * Add the value stored in register `reg` to the Accumulator.
     * 
     * Flags Affected: C, P, AC, Z, S
     * 
     * Covers Mnemonics: ADD B, ADD C, ADD D, ADD E ADD H, ADD L
     * 
     * @param {char} reg The name of the register which contains the value to be added.
     */
    add_r(reg) {
        const lhs = this.registers['A'];
        const rhs = this.registers[reg];
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    add_m() {
        const lhs = this.registers['A'];
        const rhs = this.bus.read(this.load_mem_addr('H','L'))
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    adc_r(reg) {
        const lhs = this.registers['A'];
        const rhs = this.registers[reg] + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const result = lhs + rhs;
        
        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    adc_m() {
        const lhs = this.registers['A'];
        const rhs = this.bus.read(this.load_mem_addr('H','L')) + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0);
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    adi(val) {
        const lhs = this.registers['A'] 
        const rhs = val;
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    aci(val) {
        const lhs = this.registers['A'];
        const rhs = val + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0)
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
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
    sub_r(reg) {
        const lhs = this.registers['A'];
        const rhs = ~(this.registers[reg]) + 1;
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);
        
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
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
    sub_m() {
        const lhs = this.registers['A'];
        const rhs = ~(this.bus.read(this.load_mem_addr('H','L'))) + 1;
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);
        
        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    sbb_r(reg) {        
        const lhs = this.registers['A'];
        const rhs = ~(this.registers[reg] + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0)) + 1;
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);
        
        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    sbb_m() {
        const lhs = this.registers['A'];
        const rhs = ~(this.bus.read(this.load_mem_addr('H','L')) + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0)) + 1;
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    sui(val) {
        const lhs = this.registers['A'];
        const rhs = ~val + 1
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;        
    }

    sbi(val) {
        const lhs = this.registers['A'];
        const rhs = ~(val + (this.flag_set(i8080.FlagType.Carry) ? 1 : 0)) + 1;
        const result = lhs + rhs;

        this.FlagSetter.Carry(result);
        this.FlagSetter.Parity(result);
        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }


    /*------------------------------------------------------------------------
                          16-BIT LOAD IMMEDIATE OPERATIONS                     
    ------------------------------------------------------------------------*/


    
    /**
     * Load a 16-bit immediate value into one of the register pairs (BC, DE, HL).
     * The first-byte is loaded into the first register of the specified pair, while
     * the second byte is loaded into the second register of the specified pair.
     *
     * If the Stack Pointer is specified (SP), then its value is simple overridden
     *  with `val`.
     *
     * @param {char} reg Name of the first register in the pair (BC, DE, HL)
     * @param {number} val 16-bit immediate value to be stored
     */
    lxi(reg, val) {

        const msb = (val >> 8) & 0xFF;
        const lsb = val & 0xFF;

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
                this.stack_pointer = val;
                break;
        }
        this.clock += 10;
    }

// *   ===================================================================================
// *   Single Register Operations
// *   ===================================================================================

// *  This section describes instructions which operate on a single register or memory 
// *  location. If a memory reference is specified, the memory byte addressed by the H
// *  and L registers is operated upon. The H register holds the most significant 8 bits 
// *  of the address wh ile the L register holds the least significant 8 bits of the 
// *  address.

    daa() {
        //  The eight-bit hexadecimal number in the accumulator is adjusted to form two 
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

    /* ---                                                                --- 
       ---                        MOVE OPERATIONS                         --- 
       ---                        ---------------                         --- */

    /**
     * Move (Copy) value from one register to another.
     *
     * @param {char} reg_destination The name of the destination register
     * (A,B,C,D,E,H,L)
     * @param {*} reg_source The name of the source register (A,B,C,D,E,H,L)
     */
    mov_r(reg_destination, reg_source) {
        this.registers[reg_destination] = this.registers[reg_source];
        this.clock += 5
    }

    /**
     * Move (Copy) value from register to location in memory. The 16-bit address of the
     * destination should be loaded into the H and L registers.
     *
     * @param {char} reg_source The name of the source register (A,B,C,D,E,H,L)
     */
    mov_t_m(reg_source) {
        this.bus.write(this.registers[reg_source], this.load_mem_addr('H', 'L'));
        this.clock += 7
    }

    /**
     * Move (Copy) value from memory location to register. The 16-bit address of the
     * memory location should be loaded into the H and L registers.
     * 
     * @param {char} reg_destination The name of the destination register
     * (A,B,C,D,E,H,L)
     */
    mov_f_m(reg_destination) {
        this.registers[reg_destination] = this.bus.read(this.load_mem_addr('H', 'L'));
        this.clock += 7
    }

    /**
     * Move an immediate 8-bit value into a register.
     * 
     * @param {char} reg_destination Name of the destination register
     * (A,B,C,D,E,H,L)
     * @param {*} val The 8-bit immediate value to store
     */
    mvi_r(reg_destination, val) {
        this.registers[reg_destination] = (val & 0xFF);
        this.clock += 7
    }

    /**
     * Move an immediate 8-bit value into a memory location. The address of the
     * location should be loaded into the H and L registers.
     *
     * @param {number} val The 8-bit immediate value to store
     */
    mvi_t_m(val) {
        const addr = this.load_mem_addr('H', 'L');
        this.bus.write(val, addr);
        this.clock += 10;
    }


    /* ---                                                                --- 
       ---                 LOGICAL BITWISE OPERATIONS                     --- 
       ---                 --------------------------                     --- */
    

    /**
     * Logically AND the contents of a register with the contents of the
     * Accumulator, leaving the result in the Accumulator.
     *
     * @param {char} reg The register to use.
     */
    ana_r(reg) {
        const lhs = this.registers['A'];
        const rhs = this.registers[reg];
        const result = lhs & rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    /**
     * Logically AND the contents of a memory location with the contents of the
     * Accumulator, leaving the result in the Accumulator.
     *
     * The address of the memory location is stored in the `H` and `L`
     * registers.
     */
    ana_m() {
        const lhs = this.registers['A'];
        const rhs = this.bus.read(this.load_mem_addr('H','L'));
        const result = lhs & rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;

        this.clock += 7;
    }

    /**
     * Logically AND an immediate value with the contents of the Accumulator,
     * leaving the result in the Accumulator.
     *
     * @param {number} val Immediate value to use.
     */
    ani(val) {
        const lhs = this.registers['A'];
        const rhs = val;
        const result = lhs & rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;

        this.clock += 4;
    }

    /**
     * EXCLUSIVE OR contents of the Accumulator with the contents of a register,
     * leaving the result in the Accumulator.
     *
     * @param {char} reg Register to use.
     */
    xra_r(reg) {
        const lhs = this.registers['A'];
        const rhs = this.registers[reg];
        const result = lhs ^ rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    /**
     * EXCLUSIVE OR contents of the accumulator with the contents of a memory
     * location. The 16-bit address of the memory location is stored in
     * register-pair HL.
     */
    xra_m() {
        const lhs = this.registers['A'];
        const rhs = this.bus.read(this.load_mem_addr('H', 'L'));
        const result = lhs ^ rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    xri(val) {
        const lhs = this.registers['A'];
        const rhs = val;
        const result = lhs ^ rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    ora_r(reg) {
        const lhs = this.registers['A'];
        const rhs = this.registers[reg];
        const result = lhs | rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 4;
    }

    ora_m() {
        const lhs = this.registers['A'];
        const rhs = this.bus.read(this.load_mem_addr('H','L'));
        const result = lhs | rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
        this.clock += 7;
    }

    ori(val) {
        const lhs = this.registers['A'];
        const rhs = val;
        const result = lhs | rhs;

        this.clear_flag(i8080.FlagType.Carry);
        this.FlagSetter.Zero(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Parity(result);

        this.registers['A'] = result & 0xFF;
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
                addr = this.load_mem_addr('B','C');
                break;
            case 'D':
                addr = this.load_mem_addr('D','E');
                break;
        }
        this.bus.write(this.registers['A'], addr);
        this.clock += 7;
    }

    /**
     * Store contents of `H` and `L` registers in memory. Contents of `H`
     * register are stored at `addr` and contents of `L` register are stored at
     * the next higher memory address.
     * @param {number} addr 16-bit memory address of storage location.
     */
    shld(addr) {
        this.bus.write(this.registers.L, addr);
        this.bus.write(this.registers.H, addr + 1);
        this.clock += 16;
    }

    /**
     * Store contents of the accumulator in memory address, `addr`.
     * @param {number} addr 16-bit memory address of storage location
     */
    sta(addr) {
        this.bus.write(this.registers.A, addr);
        this.clock += 13;
    }


    //                     INCREMENT AND DECREMENT OPERATIONS

    
    /**
     * The 16-bit number stored in the specified register pair (BC, DE, HL) is
     * incremented by 1.
     * .
     * @param {char} high_byte_register First register of the pair (B, D, H)
     */
    inx(high_byte_register) {
        const _inx = (reg_high, reg_low) => {
            const word = ((this.registers[reg_high] << 8) | this.registers[reg_low]) + 1;
            this.registers[reg_high] = (word >> 8) & 0xFF;
            this.registers[reg_low] = word & 0xFF;
        }

        switch(high_byte_register) {
            case 'B':
                _inx('B', 'C');
                break;
            case 'D':
                _inx('D', 'E');
                break;
            case 'H':
                _inx('H', 'L');
                break;
            case 'SP':
                this.stack_pointer = (this.stack_pointer + 1) & 0xFFFF;
                break;
        }
        this.clock += 5;
    }

    /**
     * The 16-bit number stored in the specified register pair (BC, DE, HL) is
     * decremented by 1 (uses two's complement addition).
     * .
     * @param {char} high_byte_register First register of the pair (B, D, H)
     */
    dcx(high_byte_register) {
        const _dcx = (reg_high, reg_low) => {
            // 0xFFFF = 16-bit two's complement of 1.
            const word = ((this.registers[reg_high] << 8) | this.registers[reg_low]) + 0xFFFF;
            this.registers[reg_high] = (word >> 8) & 0xFF;
            this.registers[reg_low] = word & 0xFF;
        }
        switch(high_byte_register) {
            case 'B':
                _dcx('B', 'C');
                break;
            case 'D':
                _dcx('D', 'E');
                break;
            case 'H':
                _dcx('H', 'L');
                break;
            case 'SP':
                this.stack_pointer = (this.stack_pointer + 0xFFFF) & 0xFFFF;
                break;
        }



        this.clock += 5;
    }

    /**
     * The named register is incremented by 1.
     * 
     * Flags affected: P, Z, AC, S.
     * 
     * @param {char} reg Name of the register to incremement.
     */
    inr_r(reg) {
        const lhs = this.registers[reg];
        const rhs = 1;
        const result = lhs + rhs;

        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Parity(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers[reg] = result & 0xFF;

        this.clock += 5;
    }

    /**
     * The memory location specified by the address in register pair HL is
     * incremented by 1.
     *
     * Flags affected: P, Z, AC, S.
     */
    inr_m() {
        const addr = this.load_mem_addr('H','L');

        const lhs = this.bus.read(addr);
        const rhs = 1;
        const result = lhs + rhs;

        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Parity(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.bus.write(result & 0xFF, addr);

        this.clock += 10;
    }

    /**
     * The named register is decremented by 1 (uses two's complement addition).
     * 
     * Flags affected: P, Z, AC, S.
     * 
     * @param {char} reg Name of the register to decrement.
     */
    dcr_r(reg) {

        const lhs = this.registers[reg];

        // 0xFF is the 8-bit two's complement of 1.
        const rhs = 0xFF; 
        const result = lhs + rhs;

        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Parity(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.registers[reg] = result & 0xFF;

        this.clock += 5;

    }

    /**
     * The memory location specified by the address in register pair HL is
     * decremented by 1 (uses two's complement addition).
     *
     * Flags affected: P, Z, AC, S.
     */
    dcr_m() {
        const addr = this.load_mem_addr('H','L');
        const lhs = this.bus.read(addr);

        // 0xFF is the 8-bit two's complement of 1.
        const rhs = 0xFF; 
        
        const result = lhs + rhs;

        this.FlagSetter.AuxillaryCarry(lhs, rhs);
        this.FlagSetter.Parity(result);
        this.FlagSetter.Sign(result);
        this.FlagSetter.Zero(result);

        this.bus.write(result & 0xFF, addr);

        this.clock += 10;
    }


    /*--------------------------------------------------------------------------
                            ACCUMULATOR ROTATE OPERATIONS        
    --------------------------------------------------------------------------*/
   
    /**
     * Rotate Accumulator Left.
     *
     * The Carry bit is set to the MSB of the accumulator, the accumulator value
     * is shifted once left and the MSB bit is copied back to the LSB of the
     * Accumulator.
     */
    rlc() {
        this.clear_flag(i8080.FlagType.Carry);
        this.flags |= (this.registers['A'] >> 7) & 0x01;
        this.registers['A'] <<= 1;
        this.registers['A'] |= (this.flags & 0x01);
        this.registers['A'] &= 0xFF;
        this.clock += 4;
    }

    /**
     * Rotate Accumulator Right.
     *
     * The Carry bit is set to the LSB of the accumulator, the accumulator is
     * shifted once right and the LSB bit is copied back to the MSB of the
     * accumulator.
     */
    rrc() {
        this.clear_flag(i8080.FlagType.Carry);
        this.flags |= this.registers['A'] & 0x01;
        this.registers['A'] >>= 1;
        this.registers['A'] |= (this.flags << 7) & 0x80;
        this.registers['A'] &= 0xFF;
        this.clock += 4;
    }

    /**
     * Rotate Accumulator Left Through Carry.
     *
     * The accumulator is rotated left once with the carry bit being appended to
     * as the LSB and replaced with the MSB.
     */
    ral() {
        const carry_bit = this.flag_set(i8080.FlagType.Carry) ? 1 : 0;
        this.registers['A'] & 0x80 ? this.set_flag(i8080.Carry) : this.clear_flag(i8080.Carry);
        this.registers['A'] <<= 1;
        this.registers['A'] |= carry_bit & 0x01;
        this.registers['A'] &= 0xFF;
        this.clock += 4;
    }

    rar() {
        const carry_bit = this.flag_set(i8080.FlagType.Carry) ? 1 : 0;
        this.registers['A'] & 0x01 ? this.set_flag(i8080.Carry) : this.clear_flag(i8080.Carry);
        this.registers['A'] >>= 1;
        this.registers['A'] |= (carry_bit << 7) & 0x80;
        this.registers['A'] &= 0xFF;
        this.clock += 4;
    }


    /*--------------------------------------------------------------------------
                                  CARRY BIT OPERATIONS    
    --------------------------------------------------------------------------*/


    /**
     * The Carry flag is set to 1.
     */
    stc() {
        this.set_flag(i8080.FlagType.Carry);
        this.clock += 4;
    }

    /**
     * Toggle Carry bit: If 1, set to 0 and if 0, set to 1.
     */
    cmc() {
        this.flag_set(i8080.Carry) ? this.clear_flag(i8080.Carry) : this.set_flag(i8080.Carry);
        this.clock += 4;
    }

    // SINGLE REGISTER OPERATIONS

    /** 
     * Complement Accumulator
    */
    cma() {
        this.registers['A'] = ~(this.registers['A']) & 0xFF;
        this.registers['A'] & 0xFF;
        this.clock += 4;
    }

    dad(high_byte_register) {
        let register_pair_val;
        switch(high_byte_register) {
            case 'B':
                register_pair_val = (this.registers['B'] << 8) | this.registers['C'] & 0xFFFF;
                break;
            case 'D':
                register_pair_val = (this.registers['D'] << 8) | this.registers['E'] & 0xFFFF;
                break;
            case 'H':
                register_pair_val = (this.registers['H'] << 8) | this.registers['L'] & 0xFFFF;
                break;
            case 'SP':
                register_pair_val = this.stack_pointer
                break;
        }
        const h_and_l_val = (this.registers['H'] << 8) | this.registers['L'] & 0xFFFF;
        let result = h_and_l_val + register_pair_val;
        (result > 0xFFFF | result < 0) ? this.set_flag(i8080.FlagType.Carry) : this.clear_flag(i8080.FlagType.Carry);
        result &= 0xFFFF;
        this.registers['H'] = (result >> 8) & 0xFF;
        this.registers['L'] = result & 0xFF;
        this.clock += 10;
    }

    ldax(high_byte_register) {
        let low_byte_register;
        switch(high_byte_register) {
            case 'B':
                low_byte_register = 'C';
                break;
            case 'D':
                low_byte_register = 'E'
                break;
        }
        const data = this.bus.read(this.registers[high_byte_register] << 8 | this.registers[low_byte_register] & 0xFF);
        this.registers['A'] = data;
        this.clock += 7;
    }

    /*--------------------------------------------------------------------------
                                  PROGRAM EXECUTION  
    --------------------------------------------------------------------------*/

    /**
     * @returns The next 8-bits of memory from the current program counter
     * position, then increments the program counter by 1 byte.
     */
    get_next_byte() {
        const next_byte = this.bus.read(this.program_counter);
        this.program_counter++;
        return next_byte;
    }

    /**
    * @returns The next 16-bits of memory from the current program counter
    * position. The first byte forms the lower-byte of the word and the second
    * byte forms the upper-byte (little endian). Program
    * counter is incremented by 2 bytes. 
    */
    get_next_word() {
        const lower_byte = this.bus.read(this.program_counter);
        this.program_counter++;
        const upper_byte = this.bus.read(this.program_counter);
        this.program_counter++;
        return (upper_byte << 8) | lower_byte;
    }

    /**
     * Get the next opcode from the program counter location then execute it.
     * The program counter is incremented automatically, depending on the number
     * of bytes consumed by the instruction.
     *
     * In the emulation world, this method is officially known as: '*The Big,
     * Fuck-Off Switch Statement Technique*'. Others have used tables to lookup
     * instructions, but switch works just as well and, although longer, is
     * simple to read.
     */
    execute_next_instruction() {
        const opcode = this.get_next_byte();
        switch(opcode) {
            case 0x00:
            case 0x08:
            case 0x10:
            case 0x18:
            case 0x20:
            case 0x28:
            case 0x38:
            case 0x30:
                this.noop();
                break;
            case 0x0A:
                this.ldax('B');
                break;
            case 0x1A:
                this.ldax('D');
                break;
            case 0x09:
                this.dad('B');
                break;
            case 0x19:
                this.dad('D');
                break;
            case 0x29:
                this.dad('H');
                break;
            case 0x39:
                this.dad('SP');
                break;
            case 0x2F:
                this.cma();
                break;
            case 0x37:
                this.stc();
                break;
            case 0x3F:
                this.cmc();
                break;
            case 0x17:
                this.ral();
                break;
            case 0x1F:
                this.rar();
                break;
            case 0x07:
                this.rlc();
                break;
            case 0x0F:
                this.rrc();
                break;
            case 0x0B:
                this.dcx('B');
                break;
            case 0x1B:
                this.dcx('D');
                break;
            case 0x2B:
                this.dcx('H');
                break;
            case 0x3B:
                this.dcx('SP');
                break;
            case 0x05:
                this.dcr_r('B');
                break;
            case 0x15:
                this.dcr_r('D');
                break;
            case 0x25:
                this.dcr_r('H');
                break;
            case 0x35:
                this.dcr_m();
                break;
            case 0x0D:
                this.dcr_r('C');
                break;
            case 0x1D:
                this.dcr_r('E');
                break;
            case 0x2D:
                this.dcr_r('L');
                break;
            case 0x3D:
                this.dcr_r('A');
                break;
            case 0x04:
                this.inr_r('B');
                break;
            case 0x14:
                this.inr_r('D');
                break;
            case 0x24:
                this.inr_r('H');
                break;
            case 0x34:
                this.inr_m();
                break;
            case 0x0C:
                this.inr_r('C');
                break;
            case 0x1C:
                this.inr_r('E');
                break;
            case 0x2C:
                this.inr_r('L');
                break;
            case 0x3C:
                this.inr_r('A');
                break;
            case 0x01: 
                this.lxi('B', this.get_next_word());
                break;
            case 0x02:
                this.stax('B');
                break;
            case 0x03:
                this.inx('B');
                break;
            case 0x11:
                this.lxi('D', this.get_next_word());
                break;
            case 0x12:
                this.stax('D');
                break;
            case 0x13:
                this.inx('D');
                break;
            case 0x21:
                this.lxi('H', this.get_next_word());
                break;
            case 0x0E:
                this.mvi_r('C', this.get_next_byte());
                break;
            case 0x1E:
                this.mvi_r('E', this.get_next_byte());
                break;
            case 0x22:
                this.shld(this.get_next_word());
                break;
            case 0x23:
                this.inx('H');
                break;
            case 0x2E:
                this.mvi_r('L', this.get_next_byte());
                break;
            case 0x31:
                this.lxi('SP', this.get_next_word());
                break;
            case 0x32:
                this.sta(this.get_next_word());
                break;
            case 0x33:
                this.inx('SP');
                break;
            case 0x3E:
                this.mvi_r('A', this.get_next_byte());
                break;
            case 0x06:
                this.mvi_r('B', this.get_next_byte());
                break;
            case 0x16:
                this.mvi_r('D', this.get_next_byte());
                break;
            case 0x26:
                this.mvi_r('H', this.get_next_byte());
                break;
            case 0x36:
                this.mvi_t_m(this.get_next_byte());
                break;
            case 0x40:
                this.mov_r('B', 'B');
                break;
            case 0x41:
                this.mov_r('B', 'C');
                break;
            case 0x42:
                this.mov_r('B', 'D');
                break;
            case 0x43:
                this.mov_r('B', 'E');
                break;
            case 0x44:
                this.mov_r('B', 'H');
                break;
            case 0x45:
                this.mov_r('B', 'L');
                break;
            case 0x46:
                this.mov_f_m('B');
                break;
            case 0x47:
                this.mov_r('B', 'A');
                break;
            case 0x48:
                this.mov_r('C', 'B');
                break;
            case 0x49:
                this.mov_r('C', 'C');
                break;
            case 0x4A:
                this.mov_r('C', 'D');
                break;
            case 0x4B:
                this.mov_r('C', 'E');
                break;
            case 0x4C:
                this.mov_r('C', 'H');
                break;
            case 0x4D:
                this.mov_r('C', 'L');
                break;
            case 0x4E:
                this.mov_f_m('C');
                break;
            case 0x4F:
                this.mov_r('C', 'A');
                break;
            case 0x50:
                this.mov_r('D', 'B');
                break;
            case 0x51:
                this.mov_r('D', 'C');
                break;
            case 0x52:
                this.mov_r('D', 'D');
                break;
            case 0x53:
                this.mov_r('D', 'E');
                break;
            case 0x54:
                this.mov_r('D', 'H');
                break;
            case 0x55:
                this.mov_r('D', 'L');
                break;
            case 0x56:
                this.mov_f_m('D');
                break;
            case 0x57:
                this.mov_r('D', 'A');
                break;
            case 0x58:
                this.mov_r('E', 'B');
                break;
            case 0x59:
                this.mov_r('E', 'C');
                break;
            case 0x5A:
                this.mov_r('E', 'D');
                break;
            case 0x5B:
                this.mov_r('E', 'E');
                break;
            case 0x5C:
                this.mov_r('E', 'H');
                break;
            case 0x5D:
                this.mov_r('E', 'L');
                break;
            case 0x5E:
                this.mov_f_m('E');
                break;
            case 0x5F:
                this.mov_r('E', 'A');
                break;
            case 0x60:
                this.mov_r('H', 'B');
                break;
            case 0x61:
                this.mov_r('H', 'C');
                break;
            case 0x62:
                this.mov_r('H', 'D');
                break;
            case 0x63:
                this.mov_r('H', 'E');
                break;
            case 0x64:
                this.mov_r('H', 'H');
                break;
            case 0x65:
                this.mov_r('H', 'L');
                break;
            case 0x66:
                this.mov_f_m('H');
                break;
            case 0x67:
                this.mov_r('H', 'A');
                break;
            case 0x68:
                this.mov_r('L', 'B');
                break;
            case 0x69:
                this.mov_r('L', 'C');
                break;
            case 0x6A:
                this.mov_r('L', 'D');
                break;
            case 0x6B:
                this.mov_r('L', 'E');
                break;
            case 0x6C:
                this.mov_r('L', 'H');
                break;
            case 0x6D:
                this.mov_r('L', 'L');
                break;
            case 0x6E:
                this.mov_f_m('L');
                break;
            case 0x6F:
                this.mov_r('L', 'A');
                break;
            case 0x70:
                this.mov_t_m('B');
                break;
            case 0x71:
                this.mov_t_m('C');
                break;
            case 0x72:
                this.mov_t_m('D');
                break;
            case 0x73:
                this.mov_t_m('E');
                break;
            case 0x74:
                this.mov_t_m('H');
                break;
            case 0x75:
                this.mov_t_m('L');
                break;
            case 0x77:
                this.mov_t_m('A');
                break;
            case 0x78:
                this.mov_r('A', 'B');
                break;
            case 0x79:
                this.mov_r('A', 'C');
                break;
            case 0x7A:
                this.mov_r('A', 'D');
                break;
            case 0x7B:
                this.mov_r('A', 'E');
                break;
            case 0x7C:
                this.mov_r('A', 'H');
                break;
            case 0x7D:
                this.mov_r('A', 'L');
                break;
            case 0x7E:
                this.mov_f_m('A');
                break;
            case 0x7F:
                this.mov_r('A', 'A');
                break;
            case 0x76:
                this.halt = true;
                this.clock += 7;
                return;
            case 0x80:
                this.add_r('B');
                break;
            case 0x81:
                this.add_r('C');
                break;
            case 0x82:
                this.add_r('D');
                break;
            case 0x83:
                this.add_r('E');
                break;
            case 0x84:
                this.add_r('H');
                break;
            case 0x85:
                this.add_r('L');
                break;
            case 0x86:
                this.add_m();
                break;
            case 0x87:
                this.add_r('A');
                break;
            case 0x88:
                this.adc_r('B');
                break;
            case 0x89:
                this.adc_r('C');
                break;
            case 0x8A:
                this.adc_r('D');
                break;
            case 0x8B:
                this.adc_r('E');
                break;
            case 0x8C:
                this.adc_r('H');
                break;
            case 0x8D:
                this.adc_r('L');
                break;
            case 0x8E:
                this.adc_m();
                break;
            case 0x8F:
                this.adc_r('A');
                break;
            case 0x90:
                this.sub_r('B');
                break;
            case 0x91:
                this.sub_r('C');
                break;
            case 0x92:
                this.sub_r('D');
                break;
            case 0x93:
                this.sub_r('E');
                break;
            case 0x94:
                this.sub_r('H');
                break;
            case 0x95:
                this.sub_r('L');
                break;
            case 0x96:
                this.sub_m();
                break;
            case 0x97:
                this.sub_r('A');
                break;
            case 0x98:
                this.sbb_r('B');
                break;
            case 0x99:
                this.sbb_r('C');
                break;
            case 0x9A:
                this.sbb_r('D');
                break;
            case 0x9B:
                this.sbb_r('E');
                break;
            case 0x9C:
                this.sbb_r('H');
                break;
            case 0x9D:
                this.sbb_r('L');
                break;
            case 0x9E:
                this.sbb_m();
                break;
            case 0x9F:
                this.sbb_r('A');
                break;
            case 0xA0:
                this.ana_r('B');
                break;
            case 0xA1:
                this.ana_r('C');
                break;
            case 0xA2:
                this.ana_r('D');
                break;
            case 0xA3:
                this.ana_r('E');
                break;
            case 0xA4:
                this.ana_r('H');
                break;
            case 0xA5:
                this.ana_r('L');
                break;
            case 0xA6:
                this.ana_m();
                break;
            case 0xA7:
                this.ana_r('A');
                break;  
            case 0xA8:
                this.xra_r('B');
                break;
            case 0xA9:
                this.xra_r('C');
                break;
            case 0xAA:
                this.xra_r('D');
                break;
            case 0xAB:
                this.xra_r('E');
                break;
            case 0xAC:
                this.xra_r('H');
                break;
            case 0xAD:
                this.xra_r('L');
                break;       
            case 0xAE:
                this.xra_m();
                break;
            case 0xAF:
                this.xra_r('A');
                break;              
            case 0xB0:
                this.ora_r('B');
                break;
            case 0xB1:
                this.ora_r('C');
                break;
            case 0xB2:
                this.ora_r('D');
                break;
            case 0xB3:
                this.ora_r('E');
                break;
            case 0xB4:
                this.ora_r('H');
                break;
            case 0xB5:
                this.ora_r('L');
                break;
            case 0xB6:
                this.ora_m();
                break;
            case 0xB7:
                this.ora_r('A');
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
            case 0xE6:
                this.ani(this.get_next_byte());
                break;
            case 0xEE:
                this.xri(this.get_next_byte());
                break;
            case 0xF6:
                this.ori(this.get_next_byte());
                break;
        }
    }


}

export { i8080 };