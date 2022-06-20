'use strict';

/**
 * An Intel 8080 CPU implemented in JavaScript.
 */
class i8080 {

    // DEBUG AND HELPER FUNCTIONS
     
    /**
     * Returns a string representation of an an 8-bit (byte) number in binary.
     * NOTE: Assumes that `val` passed is an 8-bit number.
     *
     * @param {number} val Value to be formatted
     * @returns 
     */
    __dbg__byte_to_binary_str(val) {
        let str = '';
        for (let i = 0; i<8; i++) {
            if (val & (1 << i)) {
                str += '1';
            } 
            else {
                str += '0';
            }
        }
        return str.split('').reverse().join('');
        }


    /**
     * Returns a string representation of a 16-bit (word) number in binary.
     * NOTE: Assumes that `val` passed is a 16-bit number.
     *
     * @param {number} val Value to be formatted
     * @returns 
     */
    __dbg__word_to_binary_str(val) {
        let str = '';
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

    /**
     * @returns a formatted string listing each flag and its current value
     */
    __dbg__get_flags() {
        let str = 'F  [';
        for (let flag in this._flag_manager.FlagType) {
            str += `${flag}: ${(this.flags & (1 << this._flag_manager.FlagType[flag])) ? '1' : '0'}, `
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
            str += `${register}: ${rval}, 0x${rval.toString(16)}, ${this.__dbg__byte_to_binary_str(rval)} | `
        }
        return str.slice(0,-3) + ']';
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * stack pointer
     */
    __dbg__get_sp() {
        return `SP [${this.stack_pointer}, ${this.stack_pointer.toString(16)}, ${this.__dbg__word_to_binary_str(this.stack_pointer)}]`;
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * program counter
     */
    __dbg__get_pc() {
        return `PC [${this.program_counter}, ${this.program_counter.toString(16)}, ${this.__dbg__word_to_binary_str(this.program_counter)}]`;
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * CPU clock
     */
    __dbg__get_clock() {
        return `CL [${this.clock}, ${this.clock.toString(16)}, ${this.__dbg__word_to_binary_str(this.clock)}]`;
    }

    /**
     * @returns {string} a formatted string containing the state of all CPU
     * registers and flags, plus the values of the clock, stack pointer and
     * program counter.
     */
    __dbg__get_state() {
        return `${this.__dbg__get_registers()}\n${this.__dbg__get_flags()}\n${this.__dbg__get_sp()}\n${this.__dbg__get_pc()}\n${this.__dbg__get_clock()}`;
    }

    // INTERNAL METHODS AND PROPERTIES

    /**
     * Constructor for the i8080 object.
     */
    constructor() {
        this.Reset();
        this.bus = null;
    }

    /**
     * Reset the CPU, setting all registers, the program counter, clock and
     * stack-pointer to 0. Note, Flags are set to 0x2 because, according to the
     * 8080 Programmers Manual, bit-1 (unused) is always set to 1 as default.
     */
    Reset() {
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
    ConnectBus(bus) {
        this.bus = bus;
    }

    /**
     * Sets the value of the CPU's internal program_counter. Usually used to set
     * the address from which to start executing an in-memory program (JMP calls
     * access the field directly).
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

    /**
     * Returns the current value of the CPU's internal stack pointer
     */
    get StackPointer() {
        return this.stack_pointer & 0xFFFF;
    }

    /**
     * Returns the current value of the CPU's internal clock
     */
    get Clock() {
        return this.clock;
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
    _get_register_pair_word(reg_highbyte, reg_lowbyte) {
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
    _store_word_in_register_pair(addr, reg_highbyte, reg_lowbyte) {
        this.MVI_R(reg_highbyte,(addr >> 8) & 0xff);
        this.MVI_R(reg_lowbyte,addr & 0xff);
    }


    /**
     * Test whether the number of bits set to `1` in `val` is even. If so, then
     * returns `True`, else returns `False`. Used for setting the `Parity` flag.
     * @param {number} val to check
     * @returns `True` if number of bits set is even (or 0) or `False`if odd.
     */
    _parity(val) {
        let bit_count = 0;
        for (let i = 0; i < 8; i++) {
            if (val & (1 << i)) bit_count++;
        }
        return (bit_count % 2 === 0)
    }

    /**
     * Object used to set, check and clear bits in the CPU flags register.
     */
    _flag_manager = {
        /** 
         * Get bit-pos of flag by FlagName
         * 
        */
        get FlagType() {
            return {
                Carry: 0,
                Parity: 2,
                AuxillaryCarry: 4,
                Zero: 6,
                Sign: 7,
            };
        },

        /**
         * Sets the specified flag bit in the flag register.
         *
         * @param {number} bit_pos bit position of the flag to set (see `FlagType`
         * object)
         */
        SetFlag: (bit_pos) => {
            this.flags |= (1 << bit_pos);
        },
    
        /**
         * Used to determine whether a specified flag is set.
         * 
         * @param {number} bit_pos of the flag to check (see `FlagType` object))
         * @returns `True` or `False`depending on whether the selected flag is set.
         */
    
        IsSet: (bit_pos) => {
            return (this.flags & (1 << bit_pos)) > 0;
        },
    
        /**
         * Clears (Unsets) the specified flag bit in the flag register.
         * 
         * @param {number} bit_pos bit position of the flag to clear (see `FlagType`
         * object))
         */
    
        ClearFlag:  (bit_pos) => {
            this.flags &= ~(1 << bit_pos);
        },
    
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
        CheckAndSet:  {
            Carry: (result) => {
                /*
                 * Carry Flag: Maximum storage size of any value in a 8080 register is
                 * 1-byte (8-bits), so 255. Any higher result than that must mean a
                 * Carry out of the 7th bit occured.
                 */
                result > 255 || result < 0 ? this._flag_manager.SetFlag(this._flag_manager.FlagType.Carry) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.Carry);
            },
            Parity: (result) => {
                /*
                 * Parity Flag: Set if the number of 1's is even.
                 */
                this._parity(result) ? this._flag_manager.SetFlag(this._flag_manager.FlagType.Parity) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.Parity);
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
                ((lhs & 0x0f) + (rhs & 0x0f)) & (1 << 4) ? this._flag_manager.SetFlag(this._flag_manager.FlagType.AuxillaryCarry) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.AuxillaryCarry);
            },
            Zero: (result) => {
                /*
                 * Zero Flag: Set if the operation result is 0
                 */
                 (result & 0xFF) === 0 ? this._flag_manager.SetFlag(this._flag_manager.FlagType.Zero) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.Zero);
            },
            Sign: (result) => {
                /*
                 * Sign Flag: Set if bit 7 of the result is 1. It is up to the 8080
                 * programmer to decide whether or not to treat a number with bit-7 set
                 * as negative. All the 8080 does is detect that bit-7 is set in the
                 * result of some operation and sets the sign flag accordingly. It
                 * doesn't care what the number actually is.
                 */
                 result & (1 << 7) ? this._flag_manager.SetFlag(this._flag_manager.FlagType.Sign) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.Sign)
            }
        }
    }
  
    // NOP
    
    /**
     * No Operation - Just takes up clock-ticks.
     */
     NOP() {
        this.clock += 4;
    }

    // ARITHMETIC OPERATIONS
 
    /**
     * Sets flags accordingly for the results of an ADD/SUB arithmetic
     * operation.
     *
     * @param {number} lhs Left-hand side of expression used in operation
     * @param {number} rhs Right-hand side of expression used in operation
     * @param {number} raw_result Result of operation (before being &'d to
     * 8-bit)
     */
     _set_flags_on_arithmetic_op(lhs, rhs, raw_result) {
        this._flag_manager.CheckAndSet.Carry(raw_result);
        this._flag_manager.CheckAndSet.Parity(raw_result);
        this._flag_manager.CheckAndSet.AuxillaryCarry(lhs, rhs);
        this._flag_manager.CheckAndSet.Sign(raw_result);
        this._flag_manager.CheckAndSet.Zero(raw_result & 0xFF);
    }

    // ADD ARITHMETIC OPERATIONS

    /**
     * Internal method to perform an ADD operation and set flags accordingly.
     * NOTE: This method is also used by the `sub()` method to carry-out
     * subtraction using two's complement. When called by the `sub()` method,
     * the `carry` parameter is always passed as 0 because it is folded into the
     * two's complement calculation of the `rhs` before `add()` is called.
     *
     * @param {number} lhs Left-hand side of expression used in operation
     * @param {number} rhs Right-hand side of expression used in operation
     * @param {number} carry Carry-bit (defaults to 0, if absent)
     * @returns {number} Result of the operation
     */
    _add(lhs, rhs, carry = 0) {
        const raw_result = lhs + (rhs + carry);
        this._set_flags_on_arithmetic_op(lhs, rhs + carry, raw_result);
        return raw_result & 0xFF;
    }

    /**
     * Add the value stored in register `register` to the Accumulator.
     *
     * @param {char} register The name of the register which contains the value
     * to be added.
     */
    ADD_R(register) {
        this.registers['A'] = this._add(this.registers['A'], this.registers[register]);
        this.clock += 4;
    }

    /**
     * Add the value stored in the memory address loaded into register's `H` and
     * `L` to the Accumulator.
     */
    ADD_M() {
        this.registers['A'] = this._add(this.registers['A'], this.bus.Read(this._get_register_pair_word('H','L')));
        this.clock += 7;
    }

    /**
     * Add the value stored in register `register` to the Accumulator, including
     * the Carry bit, if set.
     *
     * @param {char} register The name of the register which contains the value
     * to be added.
     */
    ADC_R(register) {
        this.registers['A'] = this._add(this.registers['A'], this.registers[register], this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0 );
        this.clock += 4;
    }

    /**
     * Add the value stored in the memory address loaded into register's `H` and
     * `L` to the Accumulator, including the Carry bit, if set.
     */
    ADC_M() {
        this.registers['A'] = this._add(this.registers['A'], this.bus.Read(this._get_register_pair_word('H','L')), this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0);
        this.clock += 7;
    }

    /**
     * Add an immediate (8-bit) value to the Accumulator.
     * 
     * @param {number} val The immediate value to add.
     */
    ADI(val) {
        this.registers['A'] = this._add(this.registers['A'], val);
        this.clock += 7;
    }

    /**
     * Add an immediate (8-bit) value to the Accumulator, including the Carry
     * bit, if set.
     *
     * @param {number} val The immediate value to add.
     */
    ACI(val) {
        this.registers['A'] = this._add(this.registers['A'], val, this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0);
        this.clock += 7;
    }

    // SUBTRACT ARITHMETIC OPERATIONS

    /**
     * Internal method used to perform a subtract operation. Note that two's
     * complement is used to perform all subtraction operations in the 8080, so
     * this method actually calls the `add` method above, but with the `rhs`
     * value converted to its two's complement representation. Additionally, as
     * mentioned in the description of the `add()` method, calls to `add()` from
     * here always set the `carry` parameter to 0 because the carry bit is
     * already factored into the two's complement conversion.
     *
     * @param {number} lhs Left-hand side of expression used in operation
     * @param {number} rhs Right-hand side of expression used in operation
     * @param {number} carry 1 or 0, depending if Carry but is set (default is
     * 0)
     * @returns 
     */
    _sub(lhs, rhs, carry = 0) {
        return this._add(lhs, ~(rhs + carry) + 1);
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
     * @param {character} register Name of register that contains value to be
     * subtracted from the Accumulator (B,C,D,E,H,L)
     */
    SUB_R(register) {
        this.registers['A'] = this._sub(this.registers['A'], this.registers[register]);
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
    SUB_M() {      
        this.registers['A'] = this._sub(this.registers['A'], this.bus.Read(this._get_register_pair_word('H','L')));
        this.clock += 7;
    }

    /**
     *  Subtract value held in register `reg`, plus the value of the Carry bit,
     *  from the current value in the Accumulator.
     *
     * @param {char} register Name of the register which holds the value to
     * subtract.
     */
    SBB_R(register) {               
        this.registers['A'] = this._sub(this.registers['A'], this.registers[register], this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0);
        this.clock += 4;
    }

    /**
     * Subtract value held in the 16-bit memory address currently loaded into
     * registers `H` and `L` plus the value of the Carry bit from the
     * Accumulator.
     */
    SBB_M() {
        this.registers['A'] = this._sub(this.registers['A'], this.bus.Read(this._get_register_pair_word('H','L')), this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0);
        this.clock += 7;
    }

    /**
     * Subtract and immediate 8-bit value from the Accumulator.
     * 
     * @param {number} val Immediate value to subtract
     */
    SUI(val) {
        this.registers['A'] = this._sub(this.registers['A'], val);
        this.clock += 7;        
    }

    /**
     * Subtract and immediate 8-bit value, including the carry bit from the Accumulator.
     *
     * @param {number} val Immediate value to subtract
     */
    SBI(val) {
        this.registers['A'] = this._sub(this.registers['A'], val, this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0);
        this.clock += 7;
    }

    // COMPARISON OPERATIONS

    /**
     * Compares value in Accumulator with value in `register`. 
     *
     * Performs a subtract operation and sets flags accordingly, but does not
     * record the result.
     */
    CMP_R(register) {
        const result = this._sub(this.registers['A'], this.registers[register]);
        this.clock += 4;
    }

    /**
     * Compares value in Accumulator with value at the memory address stored in
     * register's H and L.
     *
     * Performs a subtract operation and sets flags accordingly, but does not
     * record the result.
     */
    CMP_M() {
        const result = this._sub(this.registers['A'], this.bus.Read(this._get_register_pair_word('H','L')));
        this.clock += 7;
    }

    // STACK POINTER OPERATIONS

    /**
    * Push a 16-bit value onto the stack from one of the register pairs (BC, DE,
    * HL).
    *
    * @param {char} high_byte_register Register that contains high-byte of
    * 16-bit value
    * @param {char} low_byte_register Register that contains low-byte of 16-bit
    * value
    */
    PUSH_R(high_byte_register, low_byte_register) {
        this.bus.Write(this.registers[high_byte_register], --this.stack_pointer);
        this.bus.Write(this.registers[low_byte_register], --this.stack_pointer);
        this.clock += 11;
    }


    PUSH_PSW() {
        this.bus.Write(this.registers['A'], --this.stack_pointer);
        this.bus.Write(this.flags, --this.stack_pointer);
        this.clock += 11;
    }
    
    /**
     * 
     * @param {*} high_byte_register 
     * @param {*} low_byte_register 
     */
    POP_R(high_byte_register, low_byte_register) {
        this.registers[low_byte_register] = this.bus.Read(this.stack_pointer++);
        this.registers[high_byte_register] = this.bus.Read(this.stack_pointer++);
        this.clock += 10;
    }
    
    POP_PSW() {
        this.flags = this.bus.Read(this.stack_pointer++);
        this.registers['A'] = this.bus.Read(this.stack_pointer++);
        this.clock += 10;
    }

    // 16-BIT LOAD IMMEDIATE OPERATIONS
   
    /**
     * Load a 16-bit immediate value into one of the register pairs (BC, DE, HL).
     * The first-byte is loaded into the first register of the specified pair, while
     * the second byte is loaded into the second register of the specified pair.
     *
     * @param {char} high_byte_register Name of the first register in the pair (B, D, H)
     * @param {char} low_byte_register Name of the second register in the pair (C, E, L)
     * @param {number} val 16-bit immediate value to be stored
     */
    LXI_R(high_byte_register, low_byte_register, val) {
        this.registers[high_byte_register] = (val >> 8) & 0xFF;
        this.registers[low_byte_register] = val & 0xFF;
        this.clock += 10;
    }
    
    /**
     * Load a 16-bit immediate value into the stack pointer.
     */
    LXI_SP(val) {
        this.stack_pointer = val & 0xFFFF;
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

    DAA() {
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

        if ((this.registers['A'] & 0x0F) > 9 || this._flag_manager.IsSet(this._flag_manager.FlagType.AuxillaryCarry)) {
            const val = this.registers['A'] += 0x06;
            this._set_flags_on_arithmetic_op(val, this.registers['A'], 0x06);
            this.registers['A'] = val & 0xFF;
        }

        if ((this.registers['A'] & 0xF0) > 0x90 || this._flag_manager.IsSet(this._flag_manager.FlagType.Carry)) {
            const val = this.registers['A'] += 0x60;

            // According to the documentation, we do not clear the Carry if the test
            // is false, here. We leave it, so calling set_flag() directly instead of
            // set_flags() to stop the reset on the false condition.
            if (val > 255 || val < 0) this._flag_manager.SetFlag(this._flag_manager.FlagType.Carry);
            this.registers['A'] = val & 0xFF;
        }

        this.clock += 4;
    }


    /*------------------------------------------------------------------------
                                MOV(E) OPERATIONS                             
    ------------------------------------------------------------------------*/


    /**
     * Move value from one register to another.
     *
     * @param {char} reg_destination The name of the destination register
     * (A,B,C,D,E,H,L)
     * @param {*} reg_source The name of the source register (A,B,C,D,E,H,L)
     */
    MOV_R(reg_destination, reg_source) {
        this.registers[reg_destination] = this.registers[reg_source];
        this.clock += 5
    }

    /**
     * Move value from register to location in memory. The 16-bit address of the
     * destination should be loaded into the H and L registers.
     *
     * @param {char} reg_source The name of the source register (A,B,C,D,E,H,L)
     */
    MOV_TO_MEM(reg_source) {
        this.bus.Write(this.registers[reg_source], this._get_register_pair_word('H', 'L'));
        this.clock += 7
    }

    /**
     * Move value from memory location to register. The 16-bit address of the
     * memory location should be loaded into the H and L registers.
     *
     * @param {char} reg_destination The name of the destination register
     * (A,B,C,D,E,H,L)
     */
    MOV_FROM_MEM(reg_destination) {
        this.registers[reg_destination] = this.bus.Read(this._get_register_pair_word('H', 'L'));
        this.clock += 7
    }

    /**
     * Move an immediate 8-bit value into a register.
     *
     * @param {char} reg_destination Name of the destination register
     * (A,B,C,D,E,H,L)
     * @param {*} val The 8-bit immediate value to store
     */
    MVI_R(reg_destination, val) {
        this.registers[reg_destination] = (val & 0xFF);
        this.clock += 7
    }

    /**
     * Move an immediate 8-bit value into a memory location. The address of the
     * location is loaded into the H and L registers.
     *
     * @param {number} val The 8-bit immediate value to store
     */
    MVI_TO_MEM(val) {
        const addr = this._get_register_pair_word('H', 'L');
        this.bus.Write(val, addr);
        this.clock += 10;
    }

    // LOGICAL BITWISE OPERATIONS

    _set_flags_on_logical_op(raw_result) {
        this._flag_manager.ClearFlag(this._flag_manager.FlagType.Carry);
        this._flag_manager.CheckAndSet.Zero(raw_result & 0xFF);
        this._flag_manager.CheckAndSet.Sign(raw_result);
        this._flag_manager.CheckAndSet.Parity(raw_result);
    }
       
    /**
     * AND contents of the Accumulator with contents of a register. Result is
     * stored in the accumulator.
     *
     * @param {char} register The register to use.
     */
    ANA_R(register) {
        const raw_result = this.registers['A'] & this.registers[register];
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 4;
    }

    /**
    * AND contents of the accumulator with the contents of a memory location.
    * Result is stored in the accumulator.
    *
    * The 16-bit address of the memory location is loaded from register-pair HL.
    */
    ANA_M() {
        const raw_result = this.registers['A'] & this.bus.Read(this._get_register_pair_word('H','L'));
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 7;
    }

    /**
     * AND contents of the accumulator with an immediate 8-bit value. Result is
     * stored in the accumulator.
     *
     * @param {number} val Immediate value to use.
     */
    ANI(val) {
        const raw_result = this.registers['A'] & val;
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 4;
    }

    /**
     * EXCLUSIVE OR contents of the Accumulator with the contents of a register.
     * Result is stored in the accumulator.
     *
     * @param {char} reg Register to use.
     */
    XRA_R(reg) {
        const raw_result = this.registers['A'] ^ this.registers[reg];
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 4;
    }

    /**
    * EXCLUSIVE OR contents of the accumulator with the contents of a memory
    * location. Result is stored in the accumulator.
    * 
    * The 16-bit address of the memory location is loaded from register-pair
    * HL.
    */
    XRA_M() {
        const raw_result = this.registers['A'] ^ this.bus.Read(this._get_register_pair_word('H', 'L'));
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 7;
    }

    /**
     * EXCLUSIVE OR an immediate 8-bit value with the contents of the
     * accumulator. Result is stored in the accumulator.
     *
     * @param {number} val Immediate value to use.
     */
    XRI(val) {
        const raw_result = this.registers['A'] ^ val;
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 4;
    }

    /**
     * OR contents of a register with the contents of the accumulator. Result is
     * stored in the accumulator.
     *
     * @param {char} register Register to use
     */
    ORA_R(register) {
        const raw_result = this.registers['A'] | this.registers[register];
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 4;
    }

    /**
     * OR contents of the accumulator with the contents of a memory location.
     * Result is stored in the accumulator.
     *
     * The 16-bit address of the memory location is loaded from register-pair
     * HL.
     */
    ORA_M() {
        const raw_result = this.registers['A'] | this.bus.Read(this._get_register_pair_word('H','L'));
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 7;
    }

    /**
     * OR an immediate 8-bit value with the contents of the accumulator. Result
     * is stored in the accumulator.
     *
     * @param {number} val Immediate value to use.
     */
    ORI(val) {
        const raw_result = this.registers['A'] | val;
        this._set_flags_on_logical_op(raw_result);
        this.registers['A'] = raw_result & 0xFF;
        this.clock += 4;
    }

    /**
     * Store the current value in the Accumulator to a location in memory.
     *
     * @param {char} reg First register of the register pair that holds
     * the relevant memory address. `B` = `B` &
     * `C`, `D` = `D` & `E`. 
     */
    STAX(high_byte_register, low_byte_register) {
        const addr = this._get_register_pair_word(high_byte_register, low_byte_register);
        this.bus.Write(this.registers['A'], addr);
        this.clock += 7;
    }

    /**
     * Store contents of `H` and `L` registers in memory. Contents of `H`
     * register are stored at `addr` and contents of `L` register are stored at
     * the next higher memory address.
     * @param {number} addr 16-bit memory address of storage location.
     */
    SHLD(addr) {
        this.bus.Write(this.registers.L, addr);
        this.bus.Write(this.registers.H, addr + 1);
        this.clock += 16;
    }

    /**
     * The byte at the memory address replaces the con- tents of the L register.
     * The byte at the next higher memory address replaces the contents of the H
     * register.
     *
     * @param {number} addr Memory address of data.
     */
    LHLD(addr) {
        this.registers['L'] = this.bus.Read(addr);
        this.registers['H'] = this.bus.Read(addr+1);
        this.clock += 16;
    }

    /**
     * Store contents of the accumulator in memory address, `addr`.
     * @param {number} addr 16-bit memory address of storage location
     */
    STA(addr) {
        this.bus.Write(this.registers.A, addr);
        this.clock += 13;
    }

    /**
     * Load into accumulator byte from memory location
     * 
     * @param {number} val Address of data to load into Accumulator
     */
    LSA(addr) {
        this.registers['A'] = this.bus.Read(addr);
        this.clock += 13;
    }


    /*------------------------------------------------------------------------
                        INCREMENT AND DECREMENT OPERATIONS                    
    ------------------------------------------------------------------------*/

    
    /**
     * The 16-bit number stored in the specified register pair (BC, DE, HL) is
     * incremented by 1.
     * .
     * @param {char} high_byte_register First register of the pair (B, D, H)
     */
    INX_R(high_byte_register, low_byte_register) {
        const word = ((this.registers[high_byte_register] << 8) | this.registers[low_byte_register]) + 1;
        this.registers[high_byte_register] = (word >> 8) & 0xFF;
        this.registers[low_byte_register] = word & 0xFF;        
        this.clock += 5;
    }
    
    /**
     * The stack pointer is incremented by 1.
     */
    INX_SP() {
        this.stack_pointer = (this.stack_pointer + 1) & 0xFFFF;
        this.clock += 5;
    }

    /**
     * The 16-bit number stored in the specified register pair (BC, DE, HL) is
     * decremented by 1 (uses two's complement addition).
     * 
     * @param {char} high_byte_register First register of the pair (B, D, H)
     * @param {char} low_byte_register Second register of the pair (C, E, L)
     */
    DCX_R(high_byte_register, low_byte_register) {
        const word = ((this.registers[high_byte_register] << 8) | this.registers[low_byte_register]) + 0xFFFF;
        this.registers[high_byte_register] = (word >> 8) & 0xFF;
        this.registers[low_byte_register] = word & 0xFF;        
        this.clock += 5;
    }

    /**
    * The stack pointer is decremented by 1 (uses two's complement)
    */
    DCX_SP() {
        this.stack_pointer = (this.stack_pointer + 0xFFFF) & 0xFFFF;
        this.clock += 5;
    }

    _set_flags_on_inc_dec_op(lhs, rhs, raw_result) {
        this._flag_manager.CheckAndSet.AuxillaryCarry(lhs, rhs);
        this._flag_manager.CheckAndSet.Parity(raw_result);
        this._flag_manager.CheckAndSet.Sign(raw_result);
        this._flag_manager.CheckAndSet.Zero(raw_result);
    }
    
    /**
     * The named register is incremented by 1.
     * 
     * Flags affected: P, Z, AC, S.
     * 
     * @param {char} reg Name of the register to incremement.
     */
    INR_R(reg) {
        const lhs = this.registers[reg];
        const raw_result = lhs + 1;
        this._set_flags_on_inc_dec_op(lhs, 1, raw_result);
        this.registers[reg] = raw_result & 0xFF;
        this.clock += 5;
    }

    /**
     * The memory location specified by the address in register pair HL is
     * incremented by 1.
     *
     * Flags affected: P, Z, AC, S.
     */
    INR_M() {
        const addr = this._get_register_pair_word('H','L');
        const lhs = this.bus.Read(addr);
        const raw_result = lhs + 1;
        this._set_flags_on_inc_dec_op(lhs, 1, raw_result);
        this.bus.Write(raw_result & 0xFF, addr);
        this.clock += 10;
    }

    /**
     * The named register is decremented by 1 (uses two's complement addition).
     * 
     * Flags affected: P, Z, AC, S.
     * 
     * @param {char} reg Name of the register to decrement.
     */
    DCR_R(reg) {
        const lhs = this.registers[reg];
        // 0xFF is the 8-bit two's complement of 1.
        const raw_result = lhs + 0xFF;
        this._set_flags_on_inc_dec_op(lhs, 0xFF, raw_result);
        this.registers[reg] = raw_result & 0xFF;
        this.clock += 5;

    }

    /**
     * The memory location specified by the address in register pair HL is
     * decremented by 1 (uses two's complement addition).
     *
     * Flags affected: P, Z, AC, S.
     */
    DCR_M() {
        const addr = this._get_register_pair_word('H','L');
        const lhs = this.bus.Read(addr);
        // 0xFF is the 8-bit two's complement of 1.
        const raw_result = lhs + 0xFF;
        this._set_flags_on_inc_dec_op(lhs, 0xFF, raw_result);
        this.bus.Write(raw_result & 0xFF, addr);
        this.clock += 10;
    }

    // ACCUMULATOR ROTATE OPERATIONS
   
    /**
     * Rotate Accumulator Left.
     *
     * The Carry bit is set to the MSB of the accumulator, the accumulator value
     * is shifted once left and the MSB bit is copied back to the LSB of the
     * Accumulator.
     */
    RLC() {
        this._flag_manager.ClearFlag(this._flag_manager.FlagType.Carry);
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
    RRC() {
        this._flag_manager.ClearFlag(this._flag_manager.FlagType.Carry);
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
    RAL() {
        const carry_bit = this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0;
        this.registers['A'] & 0x80 ? this._flag_manager.SetFlag(i8080.Carry) : this._flag_manager.ClearFlag(i8080.Carry);
        this.registers['A'] <<= 1;
        this.registers['A'] |= carry_bit & 0x01;
        this.registers['A'] &= 0xFF;
        this.clock += 4;
    }

    RAR() {
        const carry_bit = this._flag_manager.IsSet(this._flag_manager.FlagType.Carry) ? 1 : 0;
        this.registers['A'] & 0x01 ? this._flag_manager.SetFlag(i8080.Carry) : this._flag_manager.ClearFlag(i8080.Carry);
        this.registers['A'] >>= 1;
        this.registers['A'] |= (carry_bit << 7) & 0x80;
        this.registers['A'] &= 0xFF;
        this.clock += 4;
    }

    // CARRY-BIT OPERATIONS

    /**
     * The Carry flag is set to 1.
     */
    STC() {
        this._flag_manager.SetFlag(this._flag_manager.FlagType.Carry);
        this.clock += 4;
    }

    /**
     * Toggle Carry bit: If 1, set to 0 and if 0, set to 1.
     */
    CMC() {
        this._flag_manager.IsSet(i8080.Carry) ? this._flag_manager.ClearFlag(i8080.Carry) : this._flag_manager.SetFlag(i8080.Carry);
        this.clock += 4;
    }

    // SINGLE REGISTER OPERATIONS

    /** 
     * Complement Accumulator
    */
    CMA() {
        this.registers['A'] = ~(this.registers['A']) & 0xFF;
        this.registers['A'] & 0xFF;
        this.clock += 4;
    }

    DAD(high_byte_register, low_byte_register) {
        let result = ((this.registers['H'] << 8 | this.registers['L']) & 0xFFFF) + ((this.registers[high_byte_register] << 8 | this.registers[low_byte_register]) & 0xFFFF);
        (result > 0xFFFF | result < 0) ? this._flag_manager.SetFlag(this._flag_manager.FlagType.Carry) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.Carry);
        result &= 0xFFFF;
        this.registers['H'] = (result >> 8) & 0xFF;
        this.registers['L'] = result & 0xFF;
        this.clock += 10;
    }
    
    DAD_SP() {
        let result = (this.registers['H'] << 8 | this.registers['L']) + this.stack_pointer;
        (result > 0xFFFF | result < 0) ? this._flag_manager.SetFlag(this._flag_manager.FlagType.Carry) : this._flag_manager.ClearFlag(this._flag_manager.FlagType.Carry);
        result &= 0xFFFF;
        this.registers['H'] = (result >> 8) & 0xFF;
        this.registers['L'] = result & 0xFF;
        this.clock += 10
    }

    LDAX(high_byte_register, low_byte_register) {
        this.registers['A'] = this.bus.Read(this.registers[high_byte_register] << 8 | this.registers[low_byte_register] & 0xFF);
        this.clock += 7;
    }

    // RETURN INSTRUCTIONS

    RETURN(expr) {
        if (expr) {
            const addr_low_byte = this.bus.Read(this.stack_pointer++);
            const addr_high_byte = this.bus.Read(this.stack_pointer++);
            this.program_counter = (addr_high_byte << 8) | addr_low_byte;
            this.clock += 11;
            return;
        }
        this.clock +=5;
    }

    JUMP(expr, addr) {
        if (expr) {
            this.program_counter = addr;
            this.clock += 10;
            return;
        }
        this.clock += 3;
    }

    XTHL() {
        const l_addr = this.bus.Read(this.stack_pointer);
        const h_addr = this.bus.Read(this.stack_pointer + 1);

        this.bus.Write(this.registers['L'], this.stack_pointer);
        this.bus.Write(this.registers['H'], this.stack_pointer + 1);

        this.registers['L'] = l_addr;
        this.registers['H'] = h_addr;

        this.clock += 18;
    }

    // PROGRAM EXECUTION

    /**
     * @returns The next 8-bits of memory from the current program counter
     * position, then increments the program counter by 1 byte.
     */
    _get_next_byte() {
        const next_byte = this.bus.Read(this.program_counter);
        this.program_counter++;
        return next_byte;
    }

    /**
    * @returns The next 16-bits of memory from the current program counter
    * position. The first byte forms the lower-byte of the word and the second
    * byte forms the upper-byte (little endian). Program counter is incremented
    * by 2 bytes. 
    */
    _get_next_word() {
        const lower_byte = this.bus.Read(this.program_counter);
        this.program_counter++;
        const upper_byte = this.bus.Read(this.program_counter);
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
    ExecuteNextInstruction() {
        const opcode = this._get_next_byte();
        switch(opcode) {
            case 0x00:
            case 0x08:
            case 0x10:
            case 0x18:
            case 0x20:
            case 0x28:
            case 0x38:
            case 0x30:
                this.NOP();
                break;
            case 0xE3:
                this.XTHL();
                break;
            case 0xC3:
                this.JUMP(true, this._get_next_word());
                break;
            case 0xFA:
                this.JUMP(this._flag_manager.IsSet(this._flag_manager.FlagType.Sign), this._get_next_word());
                break;      
            case 0xEA:
                this.JUMP(this._flag_manager.IsSet(this._flag_manager.FlagType.Parity), this._get_next_word());
                break;
            case 0xCA:
                this.JUMP(this._flag_manager.IsSet(this._flag_manager.FlagType.Zero), this._get_next_word());
                break;
            case 0xDA:
                this.JUMP(this._flag_manager.IsSet(this._flag_manager.FlagType.Carry), this._get_next_word());
                break;                
            case 0xF2:
                this.JUMP(!this._flag_manager.IsSet(this._flag_manager.FlagType.Sign), this._get_next_word());
                break;                
            case 0xE2:
                this.JUMP(!this._flag_manager.IsSet(this._flag_manager.FlagType.Parity), this._get_next_word());
                break;
            case 0xD2:
                this.JUMP(!this._flag_manager.IsSet(this._flag_manager.FlagType.Carry), this._get_next_word());
                break;                
            case 0xC2:
                this.JUMP(!this._flag_manager.IsSet(this._flag_manager.FlagType.Zero), this._get_next_word());
                break;
            case 0xF8:
                this.RETURN(this._flag_manager.IsSet(this._flag_manager.FlagType.Sign))
                break;
            case 0xE8:
                this.RETURN(this._flag_manager.IsSet(this._flag_manager.FlagType.Parity))
                break;
            case 0xD8:
                this.RETURN(this._flag_manager.IsSet(this._flag_manager.FlagType.Carry))
                break;
            case 0xC8:
                this.RETURN(this._flag_manager.IsSet(this._flag_manager.FlagType.Zero))
                break;
            case 0xF0:
                this.RETURN(!this._flag_manager.IsSet(this._flag_manager.FlagType.Sign))
                break;
            case 0xE0:
                this.RETURN(!this._flag_manager.IsSet(this._flag_manager.FlagType.Parity))
                break;
            case 0xC0:
                this.RETURN(!this._flag_manager.IsSet(this._flag_manager.FlagType.Zero));
                break;
            case 0xD0:
                this.RETURN(!this._flag_manager.IsSet(this._flag_manager.FlagType.Carry));
                break;
            case 0xC1:
                this.POP_R('B', 'C');
                break;
            case 0xD1:
                this.POP_R('D', 'E');
                break;
            case 0xE1:
                this.POP_R('H', 'L');
                break;
            case 0xF1:
                this.POP_PSW();
                break;
            case 0xC5:
                this.PUSH_R('B', 'C');
                break;
            case 0xD5:
                this.PUSH_R('D', 'E');
                break;
            case 0xE5:
                this.PUSH_R('H', 'L');
                break;
            case 0xF5:
                this.PUSH_PSW();
                break;
            case 0xB8:
                this.CMP_R('B');
                break;
            case 0xB9:
                this.CMP_R('C');
                break;
            case 0xBA:
                this.CMP_R('D');
                break;
            case 0xBB:
                this.CMP_R('E');
                break;
            case 0xBC:
                this.CMP_R('H');
                break;
            case 0xBD:
                this.CMP_R('L');
                break;
            case 0xBE:
                this.CMP_M();
                break;
            case 0xBF:
                this.CMP_R('A');
                break;
            case 0x3A:
                this.LSA(this._get_next_word());
                break;
            case 0x2A:
                this.LHLD(this._get_next_word());
                break;
            case 0x0A:
                this.LDAX('B', 'C');
                break;
            case 0x1A:
                this.LDAX('D', 'E');
                break;
            case 0x09:
                this.DAD('B', 'C');
                break;
            case 0x19:
                this.DAD('D', 'E');
                break;
            case 0x29:
                this.DAD('H', 'L');
                break;
            case 0x39:
                this.DAD_SP();
                break;
            case 0x2F:
                this.CMA();
                break;
            case 0x37:
                this.STC();
                break;
            case 0x3F:
                this.CMC();
                break;
            case 0x17:
                this.RAL();
                break;
            case 0x1F:
                this.RAR();
                break;
            case 0x07:
                this.RLC();
                break;
            case 0x0F:
                this.RRC();
                break;
            case 0x0B:
                this.DCX_R('B', 'C');
                break;
            case 0x1B:
                this.DCX_R('D', 'E');
                break;
            case 0x2B:
                this.DCX_R('H', 'L');
                break;
            case 0x3B:
                this.DCX_SP();
                break;
            case 0x05:
                this.DCR_R('B');
                break;
            case 0x15:
                this.DCR_R('D');
                break;
            case 0x25:
                this.DCR_R('H');
                break;
            case 0x35:
                this.DCR_M();
                break;
            case 0x0D:
                this.DCR_R('C');
                break;
            case 0x1D:
                this.DCR_R('E');
                break;
            case 0x2D:
                this.DCR_R('L');
                break;
            case 0x3D:
                this.DCR_R('A');
                break;
            case 0x04:
                this.INR_R('B');
                break;
            case 0x14:
                this.INR_R('D');
                break;
            case 0x24:
                this.INR_R('H');
                break;
            case 0x34:
                this.INR_M();
                break;
            case 0x0C:
                this.INR_R('C');
                break;
            case 0x1C:
                this.INR_R('E');
                break;
            case 0x2C:
                this.INR_R('L');
                break;
            case 0x3C:
                this.INR_R('A');
                break;
            case 0x01: 
                this.LXI_R('B', 'C', this._get_next_word());
                break;
            case 0x02:
                this.STAX('B', 'C');
                break;
            case 0x03:
                this.INX_R('B', 'C');
                break;
            case 0x11:
                this.LXI_R('D', 'E', this._get_next_word());
                break;
            case 0x12:
                this.STAX('D', 'E');
                break;
            case 0x13:
                this.INX_R('D', 'E');
                break;
            case 0x21:
                this.LXI_R('H', 'L', this._get_next_word());
                break;
            case 0x0E:
                this.MVI_R('C', this._get_next_byte());
                break;
            case 0x1E:
                this.MVI_R('E', this._get_next_byte());
                break;
            case 0x22:
                this.SHLD(this._get_next_word());
                break;
            case 0x23:
                this.INX_R('H', 'L');
                break;
            case 0x2E:
                this.MVI_R('L', this._get_next_byte());
                break;
            case 0x31:
                this.LXI_SP(this._get_next_word());
                break;
            case 0x32:
                this.STA(this._get_next_word());
                break;
            case 0x33:
                this.INX_SP();
                break;
            case 0x3E:
                this.MVI_R('A', this._get_next_byte());
                break;
            case 0x06:
                this.MVI_R('B', this._get_next_byte());
                break;
            case 0x16:
                this.MVI_R('D', this._get_next_byte());
                break;
            case 0x26:
                this.MVI_R('H', this._get_next_byte());
                break;
            case 0x36:
                this.MVI_TO_MEM(this._get_next_byte());
                break;
            case 0x40:
                this.MOV_R('B', 'B');
                break;
            case 0x41:
                this.MOV_R('B', 'C');
                break;
            case 0x42:
                this.MOV_R('B', 'D');
                break;
            case 0x43:
                this.MOV_R('B', 'E');
                break;
            case 0x44:
                this.MOV_R('B', 'H');
                break;
            case 0x45:
                this.MOV_R('B', 'L');
                break;
            case 0x46:
                this.MOV_FROM_MEM('B');
                break;
            case 0x47:
                this.MOV_R('B', 'A');
                break;
            case 0x48:
                this.MOV_R('C', 'B');
                break;
            case 0x49:
                this.MOV_R('C', 'C');
                break;
            case 0x4A:
                this.MOV_R('C', 'D');
                break;
            case 0x4B:
                this.MOV_R('C', 'E');
                break;
            case 0x4C:
                this.MOV_R('C', 'H');
                break;
            case 0x4D:
                this.MOV_R('C', 'L');
                break;
            case 0x4E:
                this.MOV_FROM_MEM('C');
                break;
            case 0x4F:
                this.MOV_R('C', 'A');
                break;
            case 0x50:
                this.MOV_R('D', 'B');
                break;
            case 0x51:
                this.MOV_R('D', 'C');
                break;
            case 0x52:
                this.MOV_R('D', 'D');
                break;
            case 0x53:
                this.MOV_R('D', 'E');
                break;
            case 0x54:
                this.MOV_R('D', 'H');
                break;
            case 0x55:
                this.MOV_R('D', 'L');
                break;
            case 0x56:
                this.MOV_FROM_MEM('D');
                break;
            case 0x57:
                this.MOV_R('D', 'A');
                break;
            case 0x58:
                this.MOV_R('E', 'B');
                break;
            case 0x59:
                this.MOV_R('E', 'C');
                break;
            case 0x5A:
                this.MOV_R('E', 'D');
                break;
            case 0x5B:
                this.MOV_R('E', 'E');
                break;
            case 0x5C:
                this.MOV_R('E', 'H');
                break;
            case 0x5D:
                this.MOV_R('E', 'L');
                break;
            case 0x5E:
                this.MOV_FROM_MEM('E');
                break;
            case 0x5F:
                this.MOV_R('E', 'A');
                break;
            case 0x60:
                this.MOV_R('H', 'B');
                break;
            case 0x61:
                this.MOV_R('H', 'C');
                break;
            case 0x62:
                this.MOV_R('H', 'D');
                break;
            case 0x63:
                this.MOV_R('H', 'E');
                break;
            case 0x64:
                this.MOV_R('H', 'H');
                break;
            case 0x65:
                this.MOV_R('H', 'L');
                break;
            case 0x66:
                this.MOV_FROM_MEM('H');
                break;
            case 0x67:
                this.MOV_R('H', 'A');
                break;
            case 0x68:
                this.MOV_R('L', 'B');
                break;
            case 0x69:
                this.MOV_R('L', 'C');
                break;
            case 0x6A:
                this.MOV_R('L', 'D');
                break;
            case 0x6B:
                this.MOV_R('L', 'E');
                break;
            case 0x6C:
                this.MOV_R('L', 'H');
                break;
            case 0x6D:
                this.MOV_R('L', 'L');
                break;
            case 0x6E:
                this.MOV_FROM_MEM('L');
                break;
            case 0x6F:
                this.MOV_R('L', 'A');
                break;
            case 0x70:
                this.MOV_TO_MEM('B');
                break;
            case 0x71:
                this.MOV_TO_MEM('C');
                break;
            case 0x72:
                this.MOV_TO_MEM('D');
                break;
            case 0x73:
                this.MOV_TO_MEM('E');
                break;
            case 0x74:
                this.MOV_TO_MEM('H');
                break;
            case 0x75:
                this.MOV_TO_MEM('L');
                break;
            case 0x77:
                this.MOV_TO_MEM('A');
                break;
            case 0x78:
                this.MOV_R('A', 'B');
                break;
            case 0x79:
                this.MOV_R('A', 'C');
                break;
            case 0x7A:
                this.MOV_R('A', 'D');
                break;
            case 0x7B:
                this.MOV_R('A', 'E');
                break;
            case 0x7C:
                this.MOV_R('A', 'H');
                break;
            case 0x7D:
                this.MOV_R('A', 'L');
                break;
            case 0x7E:
                this.MOV_FROM_MEM('A');
                break;
            case 0x7F:
                this.MOV_R('A', 'A');
                break;
            case 0x76:
                this.halt = true;
                this.clock += 7;
                return;
            case 0x80:
                this.ADD_R('B');
                break;
            case 0x81:
                this.ADD_R('C');
                break;
            case 0x82:
                this.ADD_R('D');
                break;
            case 0x83:
                this.ADD_R('E');
                break;
            case 0x84:
                this.ADD_R('H');
                break;
            case 0x85:
                this.ADD_R('L');
                break;
            case 0x86:
                this.ADD_M();
                break;
            case 0x87:
                this.ADD_R('A');
                break;
            case 0x88:
                this.ADC_R('B');
                break;
            case 0x89:
                this.ADC_R('C');
                break;
            case 0x8A:
                this.ADC_R('D');
                break;
            case 0x8B:
                this.ADC_R('E');
                break;
            case 0x8C:
                this.ADC_R('H');
                break;
            case 0x8D:
                this.ADC_R('L');
                break;
            case 0x8E:
                this.ADC_M();
                break;
            case 0x8F:
                this.ADC_R('A');
                break;
            case 0x90:
                this.SUB_R('B');
                break;
            case 0x91:
                this.SUB_R('C');
                break;
            case 0x92:
                this.SUB_R('D');
                break;
            case 0x93:
                this.SUB_R('E');
                break;
            case 0x94:
                this.SUB_R('H');
                break;
            case 0x95:
                this.SUB_R('L');
                break;
            case 0x96:
                this.SUB_M();
                break;
            case 0x97:
                this.SUB_R('A');
                break;
            case 0x98:
                this.SBB_R('B');
                break;
            case 0x99:
                this.SBB_R('C');
                break;
            case 0x9A:
                this.SBB_R('D');
                break;
            case 0x9B:
                this.SBB_R('E');
                break;
            case 0x9C:
                this.SBB_R('H');
                break;
            case 0x9D:
                this.SBB_R('L');
                break;
            case 0x9E:
                this.SBB_M();
                break;
            case 0x9F:
                this.SBB_R('A');
                break;
            case 0xA0:
                this.ANA_R('B');
                break;
            case 0xA1:
                this.ANA_R('C');
                break;
            case 0xA2:
                this.ANA_R('D');
                break;
            case 0xA3:
                this.ANA_R('E');
                break;
            case 0xA4:
                this.ANA_R('H');
                break;
            case 0xA5:
                this.ANA_R('L');
                break;
            case 0xA6:
                this.ANA_M();
                break;
            case 0xA7:
                this.ANA_R('A');
                break;  
            case 0xA8:
                this.XRA_R('B');
                break;
            case 0xA9:
                this.XRA_R('C');
                break;
            case 0xAA:
                this.XRA_R('D');
                break;
            case 0xAB:
                this.XRA_R('E');
                break;
            case 0xAC:
                this.XRA_R('H');
                break;
            case 0xAD:
                this.XRA_R('L');
                break;       
            case 0xAE:
                this.XRA_M();
                break;
            case 0xAF:
                this.XRA_R('A');
                break;              
            case 0xB0:
                this.ORA_R('B');
                break;
            case 0xB1:
                this.ORA_R('C');
                break;
            case 0xB2:
                this.ORA_R('D');
                break;
            case 0xB3:
                this.ORA_R('E');
                break;
            case 0xB4:
                this.ORA_R('H');
                break;
            case 0xB5:
                this.ORA_R('L');
                break;
            case 0xB6:
                this.ORA_M();
                break;
            case 0xB7:
                this.ORA_R('A');
                break;                
            case 0xC6:
                this.ADI(this._get_next_byte());
                break;
            case 0xCE:
                this.ACI(this._get_next_byte());
                break;
            case 0xD6:
                this.SUI(this._get_next_byte());
                break;
            case 0xDE:
                this.SBI(this._get_next_byte());
                break;
            case 0xE6:
                this.ANI(this._get_next_byte());
                break;
            case 0xEE:
                this.XRI(this._get_next_byte());
                break;
            case 0xF6:
                this.ORI(this._get_next_byte());
                break;
        }
    }


}

export { i8080 };