'use strict';

/**
 * An Intel 8080 CPU implemented in JavaScript.
 */
class i8080 {

    // INTERNAL DEBUG AND HELPER FUNCTIONS
    // -----------------------------------
     
    /**
     * @returns a formatted string listing each flag and its current value
     */
    _dbgGetFlags() {
        let str = 'F  [';
        for (let flag in this._flagManager.FlagType) {
            str += `${flag}: ${(this._flags & (1 << this._flagManager.FlagType[flag])) ? '1' : '0'}, `
        }
        return str.slice(0,-2) + ']';
    }

    /**
     * @returns {string} a formatted string listing each register and its
     * current value
     */
    _dbgGetRegisters() {
        let str = 'R  [';
        let rval = '';
        for (let register in this._registers) {
            rval = this._registers[register];
            str += `${register}: ${rval}, 0x${rval.toString(16).padStart(4,'0')}, ${this.rval.toString(2).padStart(16,'0')} | `
        }
        return str.slice(0,-3) + ']';
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * stack pointer
     */
    _dbgGetStackPointer() {
        return `SP [${this._stackPointer}, ${this._stackPointer.toString(16).padStart(4,'0')}, ${this._stackPointer.toString(2).padStart(16,'0')}]`;
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * program counter
     */
    _dbgGetProgramCounter() {
        return `PC [${this._programCounter}, ${this._programCounter.toString(16).padStart(4,'0')}, ${this._programCounter.toString(2).padStart(16,'0')}]`;
    }

    /**
     * @returns {string} a formatted string containing the current value of the
     * CPU clock
     */
    _dbgGetClock() {
        return `CL [${this._clock}, ${this._clock.toString(16)}, ${this._clock.toString(2).padStart(16,'0')}]`;
    }

    /**
     * @returns {string} a formatted string containing the state of all CPU
     * registers and flags, plus the values of the clock, stack pointer and
     * program counter.
     */
    _dbgGetState() {
        return `${this._dbgGetRegisters()}\n${this._dbgGetFlags()}\n${this._dbgGetStackPointer()}\n${this._dbgGetProgramCounter()}\n${this._dbgGetClock()}`;
    }

    // INTERNAL METHODS AND PROPERTIES
    // -------------------------------

    /**
     * Reset the CPU, setting all registers, the program counter, clock and
     * stack-pointer to 0. Note, Flags are set to 0x2 because, according to the
     * 8080 Programmers Manual, bit-1 (unused) is always set to 1 as default.
     */
    Reset() {
        this._registers = {A: 0x0, B:0x0, C:0x0, D:0x0, E:0x0, H:0x0, L:0x0};
        this._stackPointer = 0x0;
        this._programCounter = 0x0;
        this._flags = 0x2;
        this._clock = 0x0;
        this._interruptsEnabled = true;
        this._interruptWaiting = false;
        this._halt = false;
    }

    /**
     * Constructor for the i8080 object.
     */
    constructor() {
        this.Reset();
        this._bus = null;
        this._interrupt = null;
    }

    /**
     * Connect a `Bus` object to this CPU. A bus is used to access memory and
     * peripherals.
     * @param {ref} bus 
     */
    ConnectBus(bus) {
        this._bus = bus;
    }

    /**
     * Get internal CPU fields wrapped in an object.
     *
     */
    get State() {
        return {
            ProgramCounter: this._programCounter,
            StackPointer: this._stackPointer,
            Clock: this._clock,
            Halt: this._halt,
            InterruptsEnabled: this._interruptsEnabled,

            Registers: {
                A: this._registers.A,
                B: this._registers.B,
                C: this._registers.C,
                D: this._registers.D,
                E: this._registers.E,
                H: this._registers.H,
                L: this._registers.L,
            },

            Flags: {
                Carry: this._flagManager.IsSet(this._flagManager.FlagType.Carry),
                Parity: this._flagManager.IsSet(this._flagManager.FlagType.Parity),
                AuxillaryCarry: this._flagManager.IsSet(this._flagManager.FlagType.AuxillaryCarry),
                Zero: this._flagManager.IsSet(this._flagManager.FlagType.Zero),
                Sign: this._flagManager.IsSet(this._flagManager.FlagType.Sign),
            }
        }
    }

    /**
     * Set the value of the CPU's internal program_counter. 
     *
     * Usually used to set the address from which to start executing an
     * in-memory program, but also used in the JPM/CALL/RET OpCode functions.
     */
    set ProgramCounter(addr) {
        this._programCounter = addr;
    }

    /**
     * Stop the currently executing program. 
     *
     * NOTE: This just sets the internal `_halt` field of the CPU object.
     */
    Stop() {
        this._halt = true;
    }

    /**
     * Get a 16-bit word stored in a pair of 8-bit registers.
     *
     * @param {character} The register which stores the high-byte of the address 
     * @param {character} The register which stores the low-byte of the address
     * @returns A 16-bit memory address.
     */
    _getRegisterPairWord(reg_highbyte, reg_lowbyte) {
        return ((this._registers[reg_highbyte] << 8) | this._registers[reg_lowbyte]) & 0xFFFF;
    }

    /**
     * Store a 16-bit word into a pair of 8-bit registers.
     *
     * @param {number} addr The address that needs to be loaded
     * @param {character} reg_highbyte The register which will store the
     * high-byte of the address
     * @param {character} reg_lowbyte  The register which will store the
     * low-byte of the address
     */
    _storeWordInRegisterPair(addr, reg_highbyte, reg_lowbyte) {
        this.MVI_R(reg_highbyte,(addr >> 8) & 0xff);
        this.MVI_R(reg_lowbyte,addr & 0xff);
    }


    /**
     * Test whether the number of bits set to `1` in `val` is even. If so, then
     * returns `True`, else returns `False`. 
     * 
     * Used for setting the `Parity` flag.
     * 
     * @param {number} val Value to check
     * @returns `True` if number of bits set is even (or 0) or `False` if odd.
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
    _flagManager = {
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
         * Set specified flag bit in the flag register.
         *
         * @param {number} bit_pos bit position of the flag to set (see `FlagType`
         * object)
         */
        SetFlag: (bit_pos) => {
            this._flags |= (1 << bit_pos);
        },
    
        /**
         * Used to determine whether a specified flag is set.
         * 
         * @param {number} bit_pos of the flag to check (see `FlagType` object))
         * @returns `True` or `False`depending on whether the selected flag is set.
         */
    
        IsSet: (bit_pos) => {
            return (this._flags & (1 << bit_pos)) > 0;
        },
    
        /**
         * Clear (Unset) specified flag bit in the flag register.
         * 
         * @param {number} bit_pos bit position of the flag to clear (see `FlagType`
         * object))
         */
    
        ClearFlag:  (bit_pos) => {
            this._flags &= ~(1 << bit_pos);
        },
    
        /**
        * Object used to set or clear CPU Flags based on the results of various
        * operations.
        *
        * @param {number} result The result of the operation.
        * @param {number} lhs The left-hand side of the operation.
        * @param {number} rhs The right-hand side of the operation.
        *
        */
        CheckAndSet:  {
            Carry: (result) => {
                result > 255 || result < 0 ? this._flagManager.SetFlag(this._flagManager.FlagType.Carry) : this._flagManager.ClearFlag(this._flagManager.FlagType.Carry);
            },
            Parity: (result) => {
                this._parity(result) ? this._flagManager.SetFlag(this._flagManager.FlagType.Parity) : this._flagManager.ClearFlag(this._flagManager.FlagType.Parity);
            },
            AuxillaryCarry: (lhs, rhs) => {
                //
                // Auxillary Carry Flag
                //
                // Add the LSB nibbles of each byte together. If the result
                // includes a bit carried into position 4, then an auxillary (or
                // half) carry will occur during this operation and the flag
                // must be set.
                //
                // In the example below, we can see that adding the two least
                // significant nibbles of numbers 159 and 165 together results
                // in a 1 being carried to bit position 4. This means an
                // auxillary carry (or half-carry) will occur during this add
                // operation and the flag must be set accordingly.
                //
                // +---------------+
                // | 159: 10011111 |
                // |+--------------|
                // | 165: 10100101 |
                // +---------------+
                //
                // Take least significant nibbles only, and sum.
                //
                // +----------+
                // | 00001111 |
                // |+---------|
                // | 00000101 |
                // +==========+
                // | 00010100 |
                // +----------+
                //
                // Result has meant a carry out of bit-3 to bit-4, so we set Aux
                // Carry in this case.
                ((lhs & 0x0f) + (rhs & 0x0f)) & (1 << 4) ? this._flagManager.SetFlag(this._flagManager.FlagType.AuxillaryCarry) : this._flagManager.ClearFlag(this._flagManager.FlagType.AuxillaryCarry);
            },
            Zero: (result) => {
                 (result & 0xFF) === 0 ? this._flagManager.SetFlag(this._flagManager.FlagType.Zero) : this._flagManager.ClearFlag(this._flagManager.FlagType.Zero);
            },
            Sign: (result) => {
                 result & (1 << 7) ? this._flagManager.SetFlag(this._flagManager.FlagType.Sign) : this._flagManager.ClearFlag(this._flagManager.FlagType.Sign)
            }
        }
    }

    // INTERNAL STACK FUNCTIONS
    // -------------------------

    /**
     * Pushes an 8-bit value to the top of the stack and decreases the stack
     * pointer by 1.
     *
     * @param {number} val Value to push
     */
     _pushByteToStack(val) {
        this._bus.WriteRAM(val, --this._stackPointer);
    }

    /**
     * @returns byte from the top of the stack and increases the stack-pointer
     * by 1
     */
    _popByteFromStack() {
        return this._bus.ReadRAM(this._stackPointer++);
    }

    /**
     * Pushes a 16-bit value onto the top of the stack and decreases the stack
     * pointer by 2.
     *
     * @param {val} val 16-bit value to be pushed
     */
    _pushWordToStack(val) {
        this._pushByteToStack(val >> 8 & 0xFF);
        this._pushByteToStack(val & 0xFF);
    }

    /**
     *
     * @returns 16-bit word from the top of the stack and increases the stack
     * pointer by 2.
     */
    _popWordFromStack() {
        const wordLowByte = this._popByteFromStack();
        const wordHighByte = this._popByteFromStack();
        return (wordHighByte << 8 | wordLowByte) & 0xFFFF
    }

    // INTERNAL ARITHMETIC FUNCTIONS
    // ------------------------------

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
        this._setFlagsOnArithmeticOp(lhs, rhs + carry, raw_result);
        return raw_result & 0xFF;
    }

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
     * Sets flags accordingly for the results of an ADD/SUB arithmetic
     * operation.
     *
     * @param {number} lhs Left-hand side of expression used in operation
     * @param {number} rhs Right-hand side of expression used in operation
     * @param {number} rawResult Result of operation (before being &'d to
     * 8-bit)
     */
     _setFlagsOnArithmeticOp(lhs, rhs, rawResult) {
        this._flagManager.CheckAndSet.Carry(rawResult);
        this._flagManager.CheckAndSet.Parity(rawResult);
        this._flagManager.CheckAndSet.AuxillaryCarry(lhs, rhs);
        this._flagManager.CheckAndSet.Sign(rawResult);
        this._flagManager.CheckAndSet.Zero(rawResult & 0xFF);
    }

    /**
     * Adjust relevant flags according to the result of an increment or
     * decrement operation.
     *
     * @param {number} lhs Result of the left-hand side of the operation
     * @param {number} rhs Result of the right-hand side of the operatiom
     * @param {number} rawResult Result of the operation
     */
    _setFlagsOnIncDecOp(lhs, rhs, rawResult) {
        this._flagManager.CheckAndSet.AuxillaryCarry(lhs, rhs);
        this._flagManager.CheckAndSet.Parity(rawResult);
        this._flagManager.CheckAndSet.Sign(rawResult);
        this._flagManager.CheckAndSet.Zero(rawResult);
    }
    
    // INTERNAL LOGICAL BITWISE FUNCTIONS
    // ----------------------------------

    /**
     * Adjust relevant flags depending on the result of a logical bit-wise
     * operation.
     *
     * @param {number} raw_result Result of the operation
     */
    _setFlagsOnLogicalOp(raw_result) {
        this._flagManager.ClearFlag(this._flagManager.FlagType.Carry);
        this._flagManager.ClearFlag(this._flagManager.FlagType.AuxillaryCarry);
        this._flagManager.CheckAndSet.Zero(raw_result & 0xFF);
        this._flagManager.CheckAndSet.Sign(raw_result);
        this._flagManager.CheckAndSet.Parity(raw_result);
    }

    // PROGRAM EXECUTION INTERNAL OPERATIONS
    // -------------------------------------

    /**
     * @returns The next 8-bits of memory from the current program counter
     * position. Does not increment the program counter (mainly used for
     * debug/disassembly)
     */
     _peekNextByte() {
        return this._bus.ReadRAM(this._programCounter);
}
    /**
     * @returns The next 8-bits of memory from the current program counter
     * position, then increments the program counter by 1 byte.
     */
    _getNextByte() {
        const nextByte = this._peekNextByte();
        this._programCounter++;
        return nextByte;
    }

    /**
    * @returns The next 16-bits of memory from the current program counter
    * position. The first byte forms the lower-byte of the word and the second
    * byte forms the upper-byte (little endian). Does not increment the program
    * counter (mainly used for debug/disassembly).
    */
    _peekNextWord() {
        const lowByte = this._bus.ReadRAM(this._programCounter);
        const highByte = this._bus.ReadRAM(this._programCounter + 1);
        return (highByte << 8) | lowByte;
    }

    /**
    * @returns The next 16-bits of memory from the current program counter
    * position. The first byte forms the lower-byte of the word and the second
    * byte forms the upper-byte (little endian). Program counter is incremented
    * by 2 bytes (mainly used for debug/disassembly).
    */
    _getNextWord() {
        const lowByte = this._getNextByte();
        const highByte = this._getNextByte();
        return (highByte << 8) | lowByte;
    }

    // INTERRUPT PROCESSING
    // --------------------

    /**
     * Generates an interrput ready for processing by the main loop.
     *
     * Most of the time, interrupts will only ever call an `RST` OpCode, but,
     * according to documentation, the 8080 will actually accept any OpCode
     * raised as an interrupt, so this function takes the mnemonic required as a
     * parameter and calls the neccessary method directly.
     * 
     * @param {text} mnemonic Assembler Mnemonic of OpCode (e.g. 'RST')
     * @param {array} params Array of parameters to be passed to Direct Call
     */
    GenerateInterrupt(mnemonic, params) {
        if (this._interruptsEnabled == true ) {
            this._interrupt = { mnemonic, params };
            this._interruptWaiting = true;
            this._interruptsEnabled = false;
        }
    }

    /**
     * Process the waiting interrupt. The interrupt is stored in the i8080
     * object in the format of:
     * 
     * {
     *      mnemonic,
     *      params[],
     * }
     * 
     * */
    _processInterrupt() {
        this[`${this._interrupt.mnemonic}`](...this._interrupt.params);
        this._interruptWaiting = false;
    }

    // OPCODES
    // -------

    // CARRY BIT OPCODES
    // -----------------

    /**
     * The Carry flag is set to 1.
     * 
     * @returns Number of clock cycles used
     */
    STC() {
        this._flagManager.SetFlag(this._flagManager.FlagType.Carry);
        this._clock += 4;
        return 4;
    }

    /**
     * Toggle Carry bit: If 1, set to 0 and if 0, set to 1.
     * 
     * @returns Number of clock cycles used
     */
    CMC() {
        this._flagManager.IsSet(i8080.Carry) ? this._flagManager.ClearFlag(i8080.Carry) : this._flagManager.SetFlag(i8080.Carry);
        this._clock += 4;
        return 4;
    }

    // SINGLE REGISTER INSTRUCTIONS
    // ----------------------------

   /**
     * The named register is incremented by 1.
     * 
     * Flags affected: P, Z, AC, S.
     * 
     * @param {char} reg Name of the register to incremement.
     * @returns Number of clock cycles used
     */
    INR_R(reg) {
        const lhs = this._registers[reg];
        const rawResult = lhs + 1;
        this._setFlagsOnIncDecOp(lhs, 1, rawResult);
        this._registers[reg] = rawResult & 0xFF;
        this._clock += 5;
        return 5;
    }

    /**
     * The memory location specified by the address in register pair HL is
     * incremented by 1.
     *
     * Flags affected: P, Z, AC, S.
     * 
     * @returns Number of clock cycles used
     */
    INR_M() {
        const addr = this._getRegisterPairWord('H','L');
        const lhs = this._bus.ReadRAM(addr);
        const rawResult = lhs + 1;
        this._setFlagsOnIncDecOp(lhs, 1, rawResult);
        this._bus.WriteRAM(rawResult & 0xFF, addr);
        this._clock += 10;
        return 10;
    }

    /**
     * The named register is decremented by 1 (uses two's complement addition).
     * 
     * Flags affected: P, Z, AC, S.
     * 
     * @param {char} reg Name of the register to decrement.
     * @returns Number of clock cycles used.
     */
    DCR_R(reg) {
        const lhs = this._registers[reg];
        // 0xFF is the 8-bit two's complement of 1.
        const rawResult = lhs + 0xFF;
        this._setFlagsOnIncDecOp(lhs, 0xFF, rawResult);
        this._registers[reg] = rawResult & 0xFF;
        this._clock += 5;
        return 5;

    }

    /**
     * The memory location specified by the address in register pair HL is
     * decremented by 1 (uses two's complement addition).
     *
     * Flags affected: P, Z, AC, S.
     * 
     * @returns Number of clock cycles used.
     */
    DCR_M() {
        const addr = this._getRegisterPairWord('H','L');
        const lhs = this._bus.ReadRAM(addr);
        // 0xFF is the 8-bit two's complement of 1.
        const rawResult = lhs + 0xFF;
        this._setFlagsOnIncDecOp(lhs, 0xFF, rawResult);
        this._bus.WriteRAM(rawResult & 0xFF, addr);
        this._clock += 10;
        return 10;
    }

    /** 
     * Complement Accumulator
     * 
     * @returns Number of clock cycles used.
    */
    CMA() {
        this._registers['A'] = ~(this._registers['A']) & 0xFF;
        this._registers['A'] & 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
     * Decimal Adjust Accumulator
     *
     * This instruction is not used much and many emulators leave it out (along
     * with the Aux Carry flag).
     *
     * Taken directly from the 8080 Programmers Guide:
     *
     * The eight-bit hexadecimal number in the accumulator is adjusted to form
     * two four-bit binary-coded-decimal digits by the following two-step
     * process:
     *
     * (1) If the least significant four bits of the accumulator represents a
     * number greater than 9, or if the Auxiliary Carry bit is equal to one, the
     * accumulator is incremented by six. Otherwise, no incrementing occurs.
     *
     * (2) If the most significant four bits of the accumulator now represent a
     * number greater than 9, or if the normal carry bit is equal to one, the
     * most significant four bits of the accumulator are incremented by six.
     * Otherwise, no incrementing occurs.
     *
     * If a carry out of the least significant four bits occurs during Step (1),
     * the Auxiliary Carry bit is set; otherwise it is reset. Likewise, if a
     * carry out of the most significant four bits occurs during Step (2). the
     * normal Carry bit is set; otherwise, it is unaffected:
     *
     * This instruction is used when adding decimal numbers. It is the only
     * instruction whose operation is affected by the Auxiliary Carry bit.
     *
     * @returns Number of clock cycles used.
     */
    DAA() {
        if ((this._registers['A'] & 0x0F) > 9 || this._flagManager.IsSet(this._flagManager.FlagType.AuxillaryCarry)) {
            const val = this._registers['A'] + 0x06;
            this._flagManager.CheckAndSet.AuxillaryCarry(this._registers['A'], 0x06);
            this._registers['A'] = val & 0xFF;
        }

        if ((this._registers['A'] & 0xF0) > 0x90 || this._flagManager.IsSet(this._flagManager.FlagType.Carry)) {
            const val = this._registers['A'] + 0x60;
            if (val > 255 || val < 0) this._flagManager.SetFlag(this._flagManager.FlagType.Carry);
            this._registers['A'] = val & 0xFF;
        }
        this._clock += 4;
        return 4;
    }


    // NOP OPCODES
    // -----------
    
    /**
     * No Operation
     * 
     * @returns Number of clock cycles used.
     */
     NOP() {
        this._clock += 4;
        return 4;
    }

    // DATA TRANSFER INSTRUCTIONS
    // --------------------------

    /**
     * Move value from one register to another.
     *
     * @param {char} regDestination The name of the destination register
     * (A,B,C,D,E,H,L)
     * @param {*} regSource The name of the source register (A,B,C,D,E,H,L)
     * @returns Number of clock cycles used.
     */
     MOV_R(regDestination, regSource) {
        this._registers[regDestination] = this._registers[regSource];
        this._clock += 5;
        return 5;
    }

    /**
     * Move value from register to location in memory. The 16-bit address of the
     * destination should be loaded into the H and L registers.
     *
     * @param {char} regSource The name of the source register (A,B,C,D,E,H,L)
     * @returns Number of clock cycles used.
     */
    MOV_TO_MEM(regSource) {
        this._bus.WriteRAM(this._registers[regSource], this._getRegisterPairWord('H', 'L'));
        this._clock += 7;
        return 7;
    }

    /**
     * Move value from memory location to register. The 16-bit address of the
     * memory location should be loaded into the H and L registers.
     *
     * @param {char} regDestination The name of the destination register
     * (A,B,C,D,E,H,L)
     * @returns Number of clock cycles used.
     */
    MOV_FROM_MEM(regDestination) {
        this._registers[regDestination] = this._bus.ReadRAM(this._getRegisterPairWord('H', 'L'));
        this._clock += 7;
        return 7;
    }

    /**
     * Store the current value in the Accumulator to a location in memory.
     *
     * @param {char} reg First register of the register pair that holds the
     * relevant memory address. `B` = `B` & `C`, `D` = `D` & `E`. 
     * @returns Number of clock cycles used.
     */
    STAX(high_byte_register, low_byte_register) {
        const addr = this._getRegisterPairWord(high_byte_register, low_byte_register);
        this._bus.WriteRAM(this._registers['A'], addr);
        this._clock += 7;
        return 7;
    }

    /**
     * The contents of the memory location addressed by registers B and C, or by
     * registers D and E, replace the contents of the accumulator.
     *
     * @param {char} highByteRegister Register containing high-byte of number to
     * use
     * @param {*} lowByteRegister 
     * @returns Number of clock cycles used.
     */
    LDAX(highByteRegister, lowByteRegister) {
        this._registers['A'] = this._bus.ReadRAM(this._registers[highByteRegister] << 8 | this._registers[lowByteRegister] & 0xFF);
        this._clock += 7;
        return 7;
    }

    // REGISTER OR MEMORY TO ACCUMULATOR INSTRUCTIONS
    // ----------------------------------------------

    /**
     * Add the value stored in register `register` to the Accumulator.
     *
     * @param {char} register The name of the register which contains the value
     * to be added.
     * @returns Number of clock cycles used.
     */
    ADD_R(register) {
        this._registers['A'] = this._add(this._registers['A'], this._registers[register]);
        this._clock += 4;
        return 4;
    }

    /**
     * Add the value stored in the memory address loaded into register's `H` and
     * `L` to the Accumulator.
     * @returns Number of clock cycles used.
     */
    ADD_M() {
        this._registers['A'] = this._add(this._registers['A'], this._bus.ReadRAM(this._getRegisterPairWord('H','L')));
        this._clock += 7;
        return 7;
    }

    /**
     * Add the value stored in register `register` to the Accumulator, including
     * the Carry bit, if set.
     *
     * @param {char} register The name of the register which contains the value
     * to be added.
     * @returns Number of clock cycles used.
     */
    ADC_R(register) {
        this._registers['A'] = this._add(this._registers['A'], this._registers[register], this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0 );
        this._clock += 4;
        return 4;
    }

    /**
     * Add the value stored in the memory address loaded into register's `H` and
     * `L` to the Accumulator, including the Carry bit, if set.
     * 
     * @returns Number of clock cycles used.
     */
    ADC_M() {
        this._registers['A'] = this._add(this._registers['A'], this._bus.ReadRAM(this._getRegisterPairWord('H','L')), this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0);
        this._clock += 7;
        return 7;
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
     * @returns Number of clock cycles used.
     */
     SUB_R(register) {
        this._registers['A'] = this._sub(this._registers['A'], this._registers[register]);
        this._clock += 4;
        return 4;
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
     * @returns Number of clock cycles used.
     */
    SUB_M() {      
        this._registers['A'] = this._sub(this._registers['A'], this._bus.ReadRAM(this._getRegisterPairWord('H','L')));
        this._clock += 7;
        return 7;
    }

    /**
     *  Subtract value held in register `reg`, plus the value of the Carry bit,
     *  from the current value in the Accumulator.
     *
     * @param {char} register Name of the register which holds the value to
     * subtract.
     * @returns Number of clock cycles used.
     */
    SBB_R(register) {               
        this._registers['A'] = this._sub(this._registers['A'], this._registers[register], this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0);
        this._clock += 4
        return 4;
    }

    /**
     * Subtract value held in the 16-bit memory address currently loaded into
     * registers `H` and `L` plus the value of the Carry bit from the
     * Accumulator.
     * 
     * @returns Number of clock cycles used.
     */
    SBB_M() {
        this._registers['A'] = this._sub(this._registers['A'], this._bus.ReadRAM(this._getRegisterPairWord('H','L')), this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0);
        this._clock += 7;
        return 7;
    }

    /**
     * AND contents of the Accumulator with contents of a register. Result is
     * stored in the accumulator.
     *
     * @param {char} register The register to use.
     * @returns Number of clock cycles used.
     */
    ANA_R(register) {
        const raw_result = this._registers['A'] & this._registers[register];
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
    * AND contents of the accumulator with the contents of a memory location.
    * Result is stored in the accumulator.
    *
    * The 16-bit address of the memory location is loaded from register-pair HL.
    * 
    * @returns Number of clock cycles used.
    */
    ANA_M() {
        const raw_result = this._registers['A'] & this._bus.ReadRAM(this._getRegisterPairWord('H','L'));
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 7;
        return 7;
    }


    /**
     * EXCLUSIVE OR contents of the Accumulator with the contents of a register.
     * Result is stored in the accumulator.
     *
     * @param {char} reg Register to use.
     * @returns Number of clock cycles used.
     */
    XRA_R(reg) {
        const raw_result = this._registers['A'] ^ this._registers[reg];
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
    * EXCLUSIVE OR contents of the accumulator with the contents of a memory
    * location. Result is stored in the accumulator.
    * 
    * The 16-bit address of the memory location is loaded from register-pair
    * HL.
    * 
    * @returns Number of clock cycles used.
    */
    XRA_M() {
        const raw_result = this._registers['A'] ^ this._bus.ReadRAM(this._getRegisterPairWord('H', 'L'));
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 7;
        return 7;
    }

    /**
     * OR contents of a register with the contents of the accumulator. Result is
     * stored in the accumulator.
     *
     * @param {char} register Register to use
     * @returns Number of clock cycles used.
     */
    ORA_R(register) {
        const raw_result = this._registers['A'] | this._registers[register];
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
     * OR contents of the accumulator with the contents of a memory location.
     * Result is stored in the accumulator.
     *
     * The 16-bit address of the memory location is loaded from register-pair
     * HL.
     * 
     * @returns Number of clock cycles used.
     */
    ORA_M() {
        const raw_result = this._registers['A'] | this._bus.ReadRAM(this._getRegisterPairWord('H','L'));
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 7;
        return 7;
    }

    /**
     * Compares value in Accumulator with value in `register`. 
     *
     * Performs a subtract operation and sets flags accordingly, but does not
     * record the result.
     * 
     * @param {char} register The name of the register to use.
     * @returns Number of clock cycles used.
     */
    CMP_R(register) {
        const result = this._sub(this._registers['A'], this._registers[register]);
        this._clock += 4;
        return 4;
    }

    /**
     * Compares value in Accumulator with value at the memory address stored in
     * register's H and L.
     *
     * Performs a subtract operation and sets flags accordingly, but does not
     * record the result.
     * 
     * @returns Number of clock cycles used.
     */
    CMP_M() {
        const result = this._sub(this._registers['A'], this._bus.ReadRAM(this._getRegisterPairWord('H','L')));
        this._clock += 7;
        return 7;
    }

    // ROTATE ACCUMULATOR INSTRUCTIONS

    /**
     * Rotate Accumulator Left.
     *
     * The Carry bit is set to the MSB of the accumulator, the accumulator value
     * is shifted once left and the MSB bit is copied back to the LSB of the
     * Accumulator.
     * 
     * @returns Number of clock cycles used.
     */
    RLC() {
        this._flagManager.ClearFlag(this._flagManager.FlagType.Carry);
        this._flags |= (this._registers['A'] >> 7) & 0x01;
        this._registers['A'] <<= 1;
        this._registers['A'] |= (this._flags & 0x01);
        this._registers['A'] &= 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
     * Rotate Accumulator Right.
     *
     * The Carry bit is set to the LSB of the accumulator, the accumulator is
     * shifted once right and the LSB bit is copied back to the MSB of the
     * accumulator.
     * 
     * @returns Number of clock cycles used.
     */
    RRC() {
        this._flagManager.ClearFlag(this._flagManager.FlagType.Carry);
        this._flags |= this._registers['A'] & 0x01;
        this._registers['A'] >>= 1;
        this._registers['A'] |= (this._flags << 7) & 0x80;
        this._registers['A'] &= 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
     * Rotate Accumulator Left Through Carry.
     *
     * The accumulator is rotated left once with the carry bit being appended to
     * as the LSB and replaced with the MSB.
     * 
     * @returns Number of clock cycles used.
     */
    RAL() {
        const carry_bit = this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0;
        this._registers['A'] & 0x80 ? this._flagManager.SetFlag(i8080.Carry) : this._flagManager.ClearFlag(i8080.Carry);
        this._registers['A'] <<= 1;
        this._registers['A'] |= carry_bit & 0x01;
        this._registers['A'] &= 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
     * Rotae Accumulator Right Through Carry
     * 
     * @returns Number of clock cycles used.
     */
    RAR() {
        const carry_bit = this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0;
        this._registers['A'] & 0x01 ? this._flagManager.SetFlag(i8080.Carry) : this._flagManager.ClearFlag(i8080.Carry);
        this._registers['A'] >>= 1;
        this._registers['A'] |= (carry_bit << 7) & 0x80;
        this._registers['A'] &= 0xFF;
        this._clock += 4;
        return 4;
    }

    // REGISTER PAIR INSTRUCTIONS
    // --------------------------

    /**
    * Push a 16-bit value onto the stack from one of the register pairs (BC, DE,
    * HL).
    *
    * @param {char} highByteRegister Register that contains high-byte of
    * 16-bit value
    * @param {char} lowByteRegister Register that contains low-byte of 16-bit
    * value
    * @returns Number of clock cycles used.
    */
    PUSH_R(highByteRegister, lowByteRegister) {
        this._pushByteToStack(this._registers[highByteRegister]);
        this._pushByteToStack(this._registers[lowByteRegister]);
        this._clock += 11;
        return 11;
    }

    /**
     * Push the contents of the accumulator, followed by the contents of the
     * flags register to the top of the stack.
     * 
     * @returns Number of clock cycles used.
     */
    PUSH_PSW() {
        this._pushByteToStack(this._registers['A']);
        this._pushByteToStack(this._flags);
        this._clock += 11;
        return 11;
    }

    /**
     * Pop 2 bytes from the top of the stack and load them into one of the
     * register pairs (BC, DE, HL). Note the little-endian storage means the
     * first item popped is loaded into the low-byte-register and second item
     * the high-byte-register.
     *
     * @param {char} highByteRegister Register to store the second byte popped
     * from the stack
     * @param {char} lowByteRegister Register to store the first byte popped
     * from the stack
     * @returns Number of clock cycles used.
     */
    POP_R(highByteRegister, lowByteRegister) {
        this._registers[lowByteRegister] = this._bus.ReadRAM(this._stackPointer++);
        this._registers[highByteRegister] = this._bus.ReadRAM(this._stackPointer++);
        this._clock += 10;
        return 10;
    }

    /**
     * Pop 2 bytes from the top of the stack and load the first byte into the
     * flags register and the second byte into the accumulator.
     * 
     * @returns Number of clock cycles used.
     */
    POP_PSW() {
        this._flags = this._bus.ReadRAM(this._stackPointer++);
        this._registers['A'] = this._bus.ReadRAM(this._stackPointer++);
        this._clock += 10;
        return 10;
    }

    /**
     * Add 16-bit number in register pair to 16-bit number in register pair H and L.
     * 
     * @param {char} highByteRegister Register containing high-byte of number to add
     * @param {char} lowByteRegister Registers containing low-byte of number to add
     * @returns Number of clock cycles used.
     */
    DAD(highByteRegister, lowByteRegister) {
        let result = ((this._registers['H'] << 8 | this._registers['L']) & 0xFFFF) + ((this._registers[highByteRegister] << 8 | this._registers[lowByteRegister]) & 0xFFFF);
        (result > 0xFFFF | result < 0) ? this._flagManager.SetFlag(this._flagManager.FlagType.Carry) : this._flagManager.ClearFlag(this._flagManager.FlagType.Carry);
        result &= 0xFFFF;
        this._registers['H'] = (result >> 8) & 0xFF;
        this._registers['L'] = result & 0xFF;
        this._clock += 10;
        return 10;
    }
    
    /**
     * Add Stack Pointer to 16-bit number stored in register pair H and L.
     * 
     * @returns Number of clock cycles used.
     */
    DAD_SP() {
        let result = (this._registers['H'] << 8 | this._registers['L']) + this._stackPointer;
        (result > 0xFFFF | result < 0) ? this._flagManager.SetFlag(this._flagManager.FlagType.Carry) : this._flagManager.ClearFlag(this._flagManager.FlagType.Carry);
        result &= 0xFFFF;
        this._registers['H'] = (result >> 8) & 0xFF;
        this._registers['L'] = result & 0xFF;
        this._clock += 10;
        return 10
    }

    /**
     * The 16-bit number stored in the specified register pair (BC, DE, HL) is
     * incremented by 1.
     * .
     * @param {char} highByteRegister First register of the pair (B, D, H).
     * @returns Number of clock cycles used.
     */
    INX_R(highByteRegister, lowByteRegister) {
        const word = ((this._registers[highByteRegister] << 8) | this._registers[lowByteRegister]) + 1;
        this._registers[highByteRegister] = (word >> 8) & 0xFF;
        this._registers[lowByteRegister] = word & 0xFF;     
        this._clock += 5;   
        return 5;
    }
    
    /**
     * The stack pointer is incremented by 1.
     * 
     * @returns Number of clock cycles used.
     */
    INX_SP() {
        this._stackPointer = (this._stackPointer + 1) & 0xFFFF;
        this._clock += 5;
        return 5;
    }

    /**
     * The 16-bit number stored in the specified register pair (BC, DE, HL) is
     * decremented by 1 (uses two's complement addition).
     * 
     * @param {char} highByteRegister First register of the pair (B, D, H)
     * @param {char} lowByteRegister Second register of the pair (C, E, L)
     * @returns Number of clock cycles used.
     */
    DCX_R(highByteRegister, lowByteRegister) {
        const word = ((this._registers[highByteRegister] << 8) | this._registers[lowByteRegister]) + 0xFFFF;
        this._registers[highByteRegister] = (word >> 8) & 0xFF;
        this._registers[lowByteRegister] = word & 0xFF;
        this._clock += 5;
        return 5;
    }

    /**
    * The stack pointer is decremented by 1 (uses two's complement)
    * 
    * @returns Number of clock cycles used.
    */
    DCX_SP() {
        this._stackPointer = (this._stackPointer + 0xFFFF) & 0xFFFF;
        this._clock += 5;
        return 5;
    }

    /**
     * The 16-bits of data held in the `H` and `L` registers are exchanged with
     * the 16-bits of data held in the `D` and `E` registers.
     *
     * @returns Number of clock cycles used
     */
    XCHG() {
        const highByte = this._registers['H'];
        const lowByte = this._registers['L'];
        
        this._registers['H'] = this._registers['D'];
        this._registers['L'] = this._registers['E'];
        this._registers['D'] = highByte
        this._registers['E'] = lowByte
        
        this._clock += 5;
        return 5;
    }

    /**
     * The contents of the `L` register are exchanged with the contents of the
     * memory byte whose address is held in the Stack Pointer. The contents of
     * the `H` registers are exchanged with the contents of the memory byte
     * whose address is one greater than that held in the Stack Pointer.
     *
     * @returns Number of clock cycles used
     */
    XTHL() {
        const lowByte = this._bus.ReadRAM(this._stackPointer);
        const highByte = this._bus.ReadRAM(this._stackPointer + 1);

        this._bus.WriteRAM(this._registers['L'], this._stackPointer);
        this._bus.WriteRAM(this._registers['H'], this._stackPointer + 1);

        this._registers['L'] = lowByte;
        this._registers['H'] = highByte;

        this._clock += 18;
        return 18;
    }

    /**
     * The 16 bits of data held in the Hand L registers replace the contents of
     * the stack pointer SP. The contents of the Hand L registers are unchanged.
     * 
     * @returns Number of clock cycles used
     */
    SPHL() {
        this._stackPointer = this._getRegisterPairWord('H', 'L');
        this._clock += 5;
        return 5;
    }

    // IMMEDIATE INSTRUCTIONS
    // ----------------------

    /**
     * Load a 16-bit immediate value into one of the register pairs (BC, DE, HL).
     * The first-byte is loaded into the first register of the specified pair, while
     * the second byte is loaded into the second register of the specified pair.
     *
     * @param {char} highByteRegister Name of the first register in the pair (B, D, H)
     * @param {char} lowByteRegister Name of the second register in the pair (C, E, L)
     * @param {number} val 16-bit immediate value to be stored
     * @returns Number of clock cycles used.
     */
    LXI_R(highByteRegister, lowByteRegister, val) {
        this._registers[highByteRegister] = (val >> 8) & 0xFF;
        this._registers[lowByteRegister] = val & 0xFF;
        this._clock += 10;
        return 10;
    }
    
    /**
     * Load a 16-bit immediate value into the stack pointer.
     * 
     * @returns Number of clock cycles used.
     */
    LXI_SP(val) {
        this._stackPointer = val & 0xFFFF;
        this._clock += 10;
        return 10;
    }

    /**
     * Move an immediate 8-bit value into a register.
     *
     * @param {char} regDestination Name of the destination register
     * (A,B,C,D,E,H,L)
     * @param {number} val The 8-bit immediate value to store
     * @returns Number of clock cycles used.
     */
    MVI_R(regDestination, val) {
        this._registers[regDestination] = (val & 0xFF);
        this._clock += 7;
        return 7;
    }

    /**
     * Move an immediate 8-bit value into a memory location. The address of the
     * location is loaded into the H and L registers.
     *
     * @param {number} val The 8-bit immediate value to store
     * @returns Number of clock cycles used.
     */
    MVI_TO_MEM(val) {
        const addr = this._getRegisterPairWord('H', 'L');
        this._bus.WriteRAM(val, addr);
        this._clock += 10;
        return 10;
    }

    /**
     * Add an immediate (8-bit) value to the Accumulator.
     * 
     * @param {number} val The immediate value to add.
     * @returns Number of clock cycles used.
     */
    ADI(val) {
        this._registers['A'] = this._add(this._registers['A'], val);
        this._clock += 7;
        return 7;
    }

    /**
     * Add an immediate (8-bit) value to the Accumulator, including the Carry
     * bit, if set.
     *
     * @param {number} val The immediate value to add.
     * @returns Number of clock cycles used.
     */
    ACI(val) {
        this._registers['A'] = this._add(this._registers['A'], val, this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0);
        this._clock += 7;
        return 7;
    }

    /**
     * Subtract and immediate 8-bit value from the Accumulator.
     * 
     * @param {number} val Immediate value to subtract
     * @returns Number of clock cycles used.
     */
    SUI(val) {
        this._registers['A'] = this._sub(this._registers['A'], val);
        this._clock += 7;
        return 7;        
    }

    /**
     * Subtract and immediate 8-bit value, including the carry bit from the Accumulator.
     *
     * @param {number} val Immediate value to subtract
     * @returns Number of clock cycles used.
     */
    SBI(val) {
        this._registers['A'] = this._sub(this._registers['A'], val, this._flagManager.IsSet(this._flagManager.FlagType.Carry) ? 1 : 0);
        this._clock += 7;
        return 7;
    }

    /**
     * AND contents of the accumulator with an immediate 8-bit value. Result is
     * stored in the accumulator.
     *
     * @param {number} val Immediate value to use.
     * @returns Number of clock cycles used.
     */
    ANI(val) {
        const raw_result = this._registers['A'] & val;
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 4;
        return 4;
    }


    /**
     * EXCLUSIVE OR an immediate 8-bit value with the contents of the
     * accumulator. Result is stored in the accumulator.
     *
     * @param {number} val Immediate value to use.
     * @returns Number of clock cycles used.
     */
    XRI(val) {
        const raw_result = this._registers['A'] ^ val;
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 4;
        return 4;
    }


    /**
     * OR an immediate 8-bit value with the contents of the accumulator. Result
     * is stored in the accumulator.
     *
     * @param {number} val Immediate value to use.
     * @returns Number of clock cycles used.
     */
    ORI(val) {
        const raw_result = this._registers['A'] | val;
        this._setFlagsOnLogicalOp(raw_result);
        this._registers['A'] = raw_result & 0xFF;
        this._clock += 4;
        return 4;
    }

    /**
     * Compares value in accumulator with immediate 8-bit value.
     *
     * Performs a subtract operation and sets flags accordingly, but does not
     * record the result.
     *
     * @param {number} val The 8-bit value to use.
     * @returns Number of clock cycles used.
     */
    CPI(val) {
        const result = this._sub(this._registers['A'], val & 0xFF);
        this._clock += 7;
        return 7;
    }

    // DIRECT ADDRESSING OPCODES
    // --------------------------

    /**
     * Store contents of the accumulator in memory address, `addr`.
     * 
     * @param {number} addr 16-bit memory address of storage location
     * @returns Number of clock cycles used.
     */
    STA(addr) {
        this._bus.WriteRAM(this._registers.A, addr);
        this._clock += 13;
        return 13;
    }
    
    /**
     * Load into accumulator byte from memory location
     * 
     * @param {number} val Address of data to load into Accumulator
     * @returns Number of clock cycles used.
     */
    LDA(addr) {
        this._registers['A'] = this._bus.ReadRAM(addr);
        this._clock += 13;
        return 13;
    }

    /**
     * Store contents of `H` and `L` registers in memory. Contents of `H`
     * register are stored at `addr` and contents of `L` register are stored at
     * the next higher memory address.
     * 
     * @param {number} addr 16-bit memory address of storage location.
     * @returns Number of clock cycles used.
     */
    SHLD(addr) {
        this._bus.WriteRAM(this._registers.L, addr);
        this._bus.WriteRAM(this._registers.H, addr + 1);
        this._clock += 16;
        return 16;
    }

    /**
     * The byte at the memory address replaces the contents of the L register.
     * The byte at the next higher memory address replaces the contents of the H
     * register.
     *
     * @param {number} addr Memory address of data.
     * @returns Number of clock cycles used.
     */
    LHLD(addr) {
        this._registers['L'] = this._bus.ReadRAM(addr);
        this._registers['H'] = this._bus.ReadRAM(addr+1);
        this._clock += 16;
        return 16;
    }


    // JUMP INSTRUCTIONS
    // -----------------

    /**
     * The contents of the H register replace the most significant 8 bits of the
     * program counter, and the contents of the L register replace the least
     * significant 8 bits of the program counter. This causes program execution
     * to continue at the address contained in the Hand L registers.
     *
     * @returns Number of clock cycles used
     */
    PCHL() {
        this._programCounter = this._getRegisterPairWord('H', 'L');
        this._clock += 5;
        return 5;
    }


    /**
     * Program execution continues from memory address `addr`, depending on the
     * `expr` evaluation
     *
     * Used for OpCodes: JMP, JC, JNC, JZ, JNZ, JM, JP, JPO, JPE
     *
     * @param {boolean} expr An expression that evaluates to true/false
     * @param {number} addr Address in memory to jump to
     * @returns Number of clock cycles used
     */
    JUMP(expr, addr) {
        if (expr) {
            this._programCounter = addr;
            this._clock += 10;
            return 10;
        }
        this._clock += 3;
        return 3;
    }

    // CALL SUBROUTINE INSTRUCTIONS
    // ----------------------------

    /**
     * A return address is pushed onto the Stack, then program execution
     * continues from address `addr`.
     *
     * @param {expr} expr An expression that evaluates to true/false
     * @param {addr} addr Address in memory to jump to
     * @returns Number of clock cycles used
     */
    CALL(expr, addr) {
        if (expr) {
            this._pushWordToStack(this._programCounter);
            this._programCounter = addr;
            this._clock += 17;
            return 17;
        }
        this._clock += 11;
        return 11;
    }

    // RETURN FROM SUBROUTINE INSTRUCTIONS
    // -----------------------------------

    /**
     * A return operation is performed unconditionally.
     * 
     * @returns Number of clock cycles used.
     */
    RET() {
        this._programCounter = this._popWordFromStack();
        this._clock += 10;
        return 10;
    }

    /**
     * A return operation is performed if `expr` evaluates to true.
     * 
     * Used for OpCodes: RC, RNC, RZ, RNZ, RM, RP, RPE, RPO 
     * 
     * @param {boolean} expr An expression that evaluates to true/false
     * @returns Number of clock cycles used
     */
    RETURN(expr) {
        if (expr) {
            this._programCounter = this._popWordFromStack();
            this._clock += 11;
            return 11;
        }
        this._clock += 5;
        return 5;
    }

    // RESTART (RST) OPCODES
    // -----------

    /**
     * Special-purpose sub-routine jump that only occupies one byte (usually used for interrupt service routines)
     * 
     * @param {number} vector Address to jump to (depends onf middle-three bits of OpCode)
     * @returns Number of clock cycles used.
     */
    RST(vector) {
        this._pushWordToStack(this._programCounter);
        this._programCounter = vector;
        this._clock += 11;
        return 11;
    }

    // INTERRUPT FLIP-FLOP INSTRUCTIONS
    // --------------------------------

    /**
     * Enable interrupts.
     * 
     * @returns Number of clock cycles used
     */
    EI() {
        this._interruptsEnabled = true;
        ticks += 4;
        return 4;
    }

    /**
     * Disable interrupts.
     * 
     * @returns Number of clock cycles used
     */
    DI() {
        this._interruptsEnabled = false;
        ticks += 4;
        return 4;
    }

    // INPUT/OUTPUT INSTRUCTIONS
    // -------------------------

    /**
     * A byte is read from the input device with id `deviceID` and loaded into
     * the accumulator.
     *
     * @param {number} deviceID Id of device to receive data from
     * @returns 
     */
    IN(deviceID) {
        this._registers.A = this._bus.ReadDevice(deviceID);
        this.clock += 10;
        return 10;
    }

    /**
     * Contents of the accumulator are sent to the output device with id
     * `deviceID`.
     *
     * @param {number} port Id of device to send to
     * @returns 
     */
    OUT(port) {
        this._bus.WriteDevice(port, this._registers.A);
        this._clock += 10;
        return 10;
    }


    // HALT INSTRUCTION
    // ----------------

    /**
     * Sets the CPU's internal `_halt` flag to `True`.
     * 
     * @returns Number of clock cycles used
     */
    HALT() {
        this._halt = true;
        this._clock += 7;
        return 7;
    }

    // PROGRAM EXECUTION
    // -----------------

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

        if (this._interruptWaiting) {
            this._processInterrupt();
        }

        // Diagnostic info to return
        let disassemble;
        let ticks;
        const opcodeAddress = this._programCounter;

        const opcode = this._getNextByte();
        // Get the address of this OpCode so we can return it as part of the
        // diganostic information.
        switch(opcode) {
            case 0x00:
            case 0x08:
            case 0x10:
            case 0x18:
            case 0x20:
            case 0x28:
            case 0x38:
            case 0x30:
                disassemble = `NOP`;
                ticks = this.NOP();
                break;
            case 0xDB:
                disassemble = `IN\t0x${this._peekNextByte().toString(16)}`
                ticks = this.IN(this._getNextByte());
                break;
            case 0xD3:
                disassemble = `OUT\t0x${this._peekNextByte().toString(16)}`
                ticks = this.OUT(this._getNextByte());
                break;
            case 0x27:
                disassemble = `DAA`;
                ticks = this.DAA();
                break;                
            case 0xC7:
            case 0xD7:
            case 0xE7:
            case 0xF7:
            case 0xCF:
            case 0xDF:
            case 0xEF:
            case 0xFF:  
                // Bits 3-5 of the OpCode hold the jump address
                disassemble = `RST\t0x${(opcode & 0x38).toString(16)}`;
                ticks = this.RST(opcode & 0x38);
                break;
            case 0xFE:
                disassemble = `CPI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.CPI(this._getNextByte());
                break;
            case 0xE9:
                disassemble = `PCHL`;
                ticks = this.PCHL();
                break;
            case 0xFB:
                disassemble = `EI`;
                ticks = this._interruptsEnabled = true;
                break;
            case 0xF3:
                disassemble = `DI`
                ticks = this._interruptsEnabled = false;
                break;
            case 0xCD:
            case 0xDD:
            case 0xED:
            case 0xFD:
                disassemble = `CALL\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.CALL(true, this._getNextWord());
                break;
            case 0xFC:
                disassemble = `CM\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.CALL(this._flagManager.IsSet(this._flagManager.FlagType.Sign), this._getNextWord());
                break;
            case 0xEC:
                disassemble = `CPE\t0x${this._peekNextWord().toString(16)}`
                ticks = this.CALL(this._flagManager.IsSet(this._flagManager.FlagType.Parity), this._getNextWord());
                break;
            case 0xDC:
                disassemble = `CC\t0x${this._peekNextWord().toString(16)}`
                ticks = this.CALL(this._flagManager.IsSet(this._flagManager.FlagType.Carry), this._getNextWord());
                break;
            case 0xCC:
                disassemble = `CZ\t0x${this._peekNextWord().toString(16)}`
                ticks = this.CALL(this._flagManager.IsSet(this._flagManager.FlagType.Zero), this._getNextWord());
                break;
            case 0xF4:
                disassemble = `CP\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.CALL(!this._flagManager.IsSet(this._flagManager.FlagType.Sign), this._getNextWord());
                break;
            case 0xE4:
                disassemble = `CPO\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.CALL(!this._flagManager.IsSet(this._flagManager.FlagType.Parity), this._getNextWord());
                break;
            case 0xD4:
                disassemble = `CNC\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.CALL(!this._flagManager.IsSet(this._flagManager.FlagType.Carry), this._getNextWord());
                break;
            case 0xC4:
                disassemble = `CNZ\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.CALL(!this._flagManager.IsSet(this._flagManager.FlagType.Zero), this._getNextWord());
                break;
            case 0xF9:
                disassemble =`SPHL`;
                ticks = this.SPHL();
                break;
            case 0xEB:
                disassemble = `XCHG`;
                ticks = this.XCHG();
                break;
            case 0xE3:
                disassemble = `XTHL`;
                ticks = this.XTHL();
                break;
            case 0xC3:
            case 0xCB:
                disassemble = `JMP\t0x${this._peekNextWord().toString(16)}`
                ticks = this.JUMP(true, this._getNextWord());
                break;
            case 0xFA:
                disassemble = `JM\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(this._flagManager.IsSet(this._flagManager.FlagType.Sign), this._getNextWord());
                break;      
            case 0xEA:
                disassemble = `JPE\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(this._flagManager.IsSet(this._flagManager.FlagType.Parity), this._getNextWord());
                break;
            case 0xCA:
                disassemble = `JZ\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(this._flagManager.IsSet(this._flagManager.FlagType.Zero), this._getNextWord());
                break;
            case 0xDA:
                disassemble = `JC\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(this._flagManager.IsSet(this._flagManager.FlagType.Carry), this._getNextWord());
                break;                
            case 0xF2:
                disassemble = `JP\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(!this._flagManager.IsSet(this._flagManager.FlagType.Sign), this._getNextWord());
                break;                
            case 0xE2:
                disassemble = `JPO\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(!this._flagManager.IsSet(this._flagManager.FlagType.Parity), this._getNextWord());
                break;
            case 0xD2:
                disassemble = `JNC\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(!this._flagManager.IsSet(this._flagManager.FlagType.Carry), this._getNextWord());
                break;                
            case 0xC2:
                disassemble = `JNZ\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.JUMP(!this._flagManager.IsSet(this._flagManager.FlagType.Zero), this._getNextWord());
                break;
            case 0xC9:
            case 0xD9:
                disassemble = `RET`;
                ticks = this.RET();
                break;
            case 0xF8:
                disassemble = `RM`;
                ticks = this.RETURN(this._flagManager.IsSet(this._flagManager.FlagType.Sign))
                break;
            case 0xE8:
                disassemble = `RPE\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.RETURN(this._flagManager.IsSet(this._flagManager.FlagType.Parity))
                break;
            case 0xD8:
                disassemble = `RC`
                ticks = this.RETURN(this._flagManager.IsSet(this._flagManager.FlagType.Carry))
                break;
            case 0xC8:
                disassemble = `RZ`;
                ticks = this.RETURN(this._flagManager.IsSet(this._flagManager.FlagType.Zero))
                break;
            case 0xF0:
                disassemble = `RP`;
                ticks = this.RETURN(!this._flagManager.IsSet(this._flagManager.FlagType.Sign))
                break;
            case 0xE0:
                disassemble = `RPO`;
                ticks = this.RETURN(!this._flagManager.IsSet(this._flagManager.FlagType.Parity))
                break;
            case 0xC0:
                disassemble = `RNZ`;
                ticks = this.RETURN(!this._flagManager.IsSet(this._flagManager.FlagType.Zero));
                break;
            case 0xD0:
                disassemble = `RNC`;
                ticks = this.RETURN(!this._flagManager.IsSet(this._flagManager.FlagType.Carry));
                break;
            case 0xC1:
                disassemble = `POP\tBC`;
                ticks = this.POP_R('B', 'C');
                break;
            case 0xD1:
                disassemble = `POP\tDE`;
                ticks = this.POP_R('D', 'E');
                break;
            case 0xE1:
                disassemble = `POP\tHL`;
                ticks = this.POP_R('H', 'L');
                break;
            case 0xF1:
                disassemble = `POP\tPSW`;
                ticks = this.POP_PSW();
                break;
            case 0xC5:
                disassemble = `PUSH\tBC`;
                ticks = this.PUSH_R('B', 'C');
                break;
            case 0xD5:
                disassemble = `PUSH\tDE`;
                ticks = this.PUSH_R('D', 'E');
                break;
            case 0xE5:
                disassemble = `PUSH\tHL`;
                ticks = this.PUSH_R('H', 'L');
                break;
            case 0xF5:
                disassemble = `PUSH\tPSW`;
                ticks = this.PUSH_PSW();
                break;
            case 0xB8:
                disassemble = `CMP\tB`;
                ticks = this.CMP_R('B');
                break;
            case 0xB9:
                disassemble = `CMP\tC`;
                ticks = this.CMP_R('C');
                break;
            case 0xBA:
                disassemble = `CMP\tD`;
                ticks = this.CMP_R('D');
                break;
            case 0xBB:
                disassemble = `CMP\tE`;
                ticks = this.CMP_R('E');
                break;
            case 0xBC:
                disassemble = `CMP\tH`;
                ticks = this.CMP_R('H');
                break;
            case 0xBD:
                disassemble = `CMP\tL`;
                ticks = this.CMP_R('L');
                break;
            case 0xBE:
                ticks = this.CMP_M();
                disassemble = `CMP\tM`;
                break;
            case 0xBF:
                disassemble = `CMP\tA`;
                ticks = this.CMP_R('A');
                break;
            case 0x3A:
                disassemble = `LDA\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.LDA(this._getNextWord());
                break;
            case 0x2A:
                disassemble = `LHLD\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.LHLD(this._getNextWord());
                break;
            case 0x0A:
                disassemble = `LDAX\tBC`;
                ticks = this.LDAX('B', 'C');
                break;
            case 0x1A:
                disassemble = `LDAX\tDE`;
                ticks = this.LDAX('D', 'E');
                break;
            case 0x09:
                disassemble = `DAD\tBC`;
                ticks = this.DAD('B', 'C');
                break;
            case 0x19:
                disassemble = `DAD\tDE`;
                ticks = this.DAD('D', 'E');
                break;
            case 0x29:
                disassemble = `DAD\tHL`;
                ticks = this.DAD('H', 'L');
                break;
            case 0x39:
                disassemble = `DAD\tSP`;
                ticks = this.DAD_SP();
                break;
            case 0x2F:
                disassemble = `CMA`;
                ticks = this.CMA();
                break;
            case 0x37:
                disassemble = `STC`;
                ticks = this.STC();
                break;
            case 0x3F:
                disassemble = `CMC`;
                ticks = this.CMC();
                break;
            case 0x17:
                disassemble = `RAL`;
                ticks = this.RAL();
                break;
            case 0x1F:
                disassemble = `RAR`;
                ticks = this.RAR();
                break;
            case 0x07:
                disassemble = `RLC`;
                ticks = this.RLC();
                break;
            case 0x0F:
                disassemble = `RRC`;
                ticks = this.RRC();
                break;
            case 0x0B:
                disassemble = `DXC\tBC`;
                ticks = this.DCX_R('B', 'C');
                break;
            case 0x1B:
                disassemble = `DXC\tDE`;
                ticks = this.DCX_R('D', 'E');
                break;
            case 0x2B:
                disassemble = `DXC\tHL`;
                ticks = this.DCX_R('H', 'L');
                break;
            case 0x3B:
                disassemble = `DXC\tSP`;
                ticks = this.DCX_SP();
                break;
            case 0x05:
                disassemble = `DCR\tB`;
                ticks = this.DCR_R('B');
                break;
            case 0x15:
                disassemble = `DCR\tD`;
                ticks = this.DCR_R('D');
                break;
            case 0x25:
                disassemble = `DCR\tH`;
                ticks = this.DCR_R('H');
                break;
            case 0x35:
                disassemble = `DCR\tM`;
                ticks = this.DCR_M();
                break;
            case 0x0D:
                disassemble = `DCR\tC`;
                ticks = this.DCR_R('C');
                break;
            case 0x1D:
                disassemble = `DCR\tE`;
                ticks = this.DCR_R('E');
                break;
            case 0x2D:
                disassemble = `DCR\tL`;
                ticks = this.DCR_R('L');
                break;
            case 0x3D:
                disassemble = `DCR\tA`;
                ticks = this.DCR_R('A');
                break;
            case 0x04:
                disassemble = `INR\tB`;
                ticks = this.INR_R('B');
                break;
            case 0x14:
                disassemble = `INR\tD`;
                ticks = this.INR_R('D');
                break;
            case 0x24:
                disassemble = `INR\tH`;
                ticks = this.INR_R('H');
                break;
            case 0x34:
                disassemble = `INR\tM`;
                ticks = this.INR_M();
                break;
            case 0x0C:
                disassemble = `INR\tC`;
                ticks = this.INR_R('C');
                break;
            case 0x1C:
                disassemble = `INR\tE`;
                ticks = this.INR_R('E');
                break;
            case 0x2C:
                disassemble = `INR\tL`;
                ticks = this.INR_R('L');
                break;
            case 0x3C:
                disassemble = `INR\tA`;
                ticks = this.INR_R('A');
                break;
            case 0x01: 
                disassemble = `LXI\tBC\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.LXI_R('B', 'C', this._getNextWord());
                break;
            case 0x02:
                disassemble = `STAX\tBC`;
                ticks = this.STAX('B', 'C');
                break;
            case 0x03:
                disassemble = `INX\tBC`;
                ticks = this.INX_R('B', 'C');
                break;
            case 0x11:
                disassemble = `LXI\tDE\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.LXI_R('D', 'E', this._getNextWord());
                break;
            case 0x12:
                disassemble = `STAX\tDE`;
                ticks = this.STAX('D', 'E');
                break;
            case 0x13:
                disassemble = `INX\tDE`;
                ticks = this.INX_R('D', 'E');
                break;
            case 0x21:
                disassemble = `LXI\tHL\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.LXI_R('H', 'L', this._getNextWord());
                break;
            case 0x0E:
                disassemble = `MVI\tC\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('C', this._getNextByte());
                break;
            case 0x1E:
                disassemble = `MVI\tE\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('E', this._getNextByte());
                break;
            case 0x22:
                disassemble = `SHLD\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.SHLD(this._getNextWord());
                break;
            case 0x23:
                disassemble = `INX\tHL`;
                ticks = this.INX_R('H', 'L');
                break;
            case 0x2E:
                disassemble = `MVI\tL\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('L', this._getNextByte());
                break;
            case 0x31:
                disassemble = `LXI\tSP\t0x${this._peekNextWord().toString(16)}`;
                ticks = this.LXI_SP(this._getNextWord());
                break;
            case 0x32:
                disassemble = `STA`;
                ticks = this.STA(this._getNextWord());
                break;
            case 0x33:
                disassemble = `INX\tSP`;
                ticks = this.INX_SP();
                break;
            case 0x3E:
                disassemble = `MVI\tA\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('A', this._getNextByte());
                break;
            case 0x06:
                disassemble = `MVI\tB\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('B', this._getNextByte());
                break;
            case 0x16:
                disassemble = `MVI\tD\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('D', this._getNextByte());
                break;
            case 0x26:
                disassemble = `MVI\tH\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_R('H', this._getNextByte());
                break;
            case 0x36:
                disassemble = `MVI\tM\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.MVI_TO_MEM(this._getNextByte());
                break;
            case 0x40:
                disassemble = `MOV\tB,B`;
                ticks = this.MOV_R('B', 'B');
                break;
            case 0x41:
                disassemble = `MOV\tB,C`;
                ticks = this.MOV_R('B', 'C');
                break;
            case 0x42:
                disassemble = `MOV\tB,D`;
                ticks = this.MOV_R('B', 'D');
                break;
            case 0x43:
                disassemble = `MOV\tB,E`;
                ticks = this.MOV_R('B', 'E');
                break;
            case 0x44:
                disassemble = `MOV\tB,H`;
                ticks = this.MOV_R('B', 'H');
                break;
            case 0x45:
                disassemble = `MOV\tB,L`;
                ticks = this.MOV_R('B', 'L');
                break;
            case 0x46:
                disassemble = `MOV\tB,M`;
                ticks = this.MOV_FROM_MEM('B');
                break;
            case 0x47:
                disassemble = `MOV\tB,A`;
                ticks = this.MOV_R('B', 'A');
                break;
            case 0x48:
                disassemble = `MOV\tC,B`;
                ticks = this.MOV_R('C', 'B');
                break;
            case 0x49:
                disassemble = `MOV\tC,C`;
                ticks = this.MOV_R('C', 'C');
                break;
            case 0x4A:
                disassemble = `MOV\tC,D`;
                ticks = this.MOV_R('C', 'D');
                break;
            case 0x4B:
                disassemble = `MOV\tC,E`;
                ticks = this.MOV_R('C', 'E');
                break;
            case 0x4C:
                disassemble = `MOV\tC,H`;
                ticks = this.MOV_R('C', 'H');
                break;
            case 0x4D:
                disassemble = `MOV\tC,L`;
                ticks = this.MOV_R('C', 'L');
                break;
            case 0x4E:
                disassemble = `MOV\tC,M`;
                ticks = this.MOV_FROM_MEM('C');
                break;
            case 0x4F:
                disassemble = `MOV\tC,A`;
                ticks = this.MOV_R('C', 'A');
                break;
            case 0x50:
                disassemble = `MOV\tD,B`;
                ticks = this.MOV_R('D', 'B');
                break;
            case 0x51:
                disassemble = `MOV\tD,C`;
                ticks = this.MOV_R('D', 'C');
                break;
            case 0x52:
                disassemble = `MOV\tD,D`;
                ticks = this.MOV_R('D', 'D');
                break;
            case 0x53:
                disassemble = `MOV\tD,E`;
                ticks = this.MOV_R('D', 'E');
                break;
            case 0x54:
                disassemble = `MOV\tD,H`;
                ticks = this.MOV_R('D', 'H');
                break;
            case 0x55:
                disassemble = `MOV\tD,H`;
                ticks = this.MOV_R('D', 'L');
                break;
            case 0x56:
                disassemble = `MOV\tD,M`;
                ticks = this.MOV_FROM_MEM('D');
                break;
            case 0x57:
                disassemble = `MOV\tD,A`;
                ticks = this.MOV_R('D', 'A');
                break;
            case 0x58:
                disassemble = `MOV\tE,B`;
                ticks = this.MOV_R('E', 'B');
                break;
            case 0x59:
                disassemble = `MOV\tE,C`;
                ticks = this.MOV_R('E', 'C');
                break;
            case 0x5A:
                disassemble = `MOV\tE,D`;
                ticks = this.MOV_R('E', 'D');
                break;
            case 0x5B:
                disassemble = `MOV\tE,E`;
                ticks = this.MOV_R('E', 'E');
                break;
            case 0x5C:
                disassemble = `MOV\tE,H`;
                ticks = this.MOV_R('E', 'H');
                break;
            case 0x5D:
                disassemble = `MOV\tE,L`;
                ticks = this.MOV_R('E', 'L');
                break;
            case 0x5E:
                disassemble = `MOV\tE,M`;
                ticks = this.MOV_FROM_MEM('E');
                break;
            case 0x5F:
                disassemble = `MOV\tE,A`;
                ticks = this.MOV_R('E', 'A');
                break;
            case 0x60:
                disassemble = `MOV\tH,B`;
                ticks = this.MOV_R('H', 'B');
                break;
            case 0x61:
                disassemble = `MOV\tH,C`;
                ticks = this.MOV_R('H', 'C');
                break;
            case 0x62:
                disassemble = `MOV\tH,D`;
                ticks = this.MOV_R('H', 'D');
                break;
            case 0x63:
                disassemble = `MOV\tH,E`;
                ticks = this.MOV_R('H', 'E');
                break;
            case 0x64:
                disassemble = `MOV\tH,H`;
                ticks = this.MOV_R('H', 'H');
                break;
            case 0x65:
                disassemble = `MOV\tH,L`;
                ticks = this.MOV_R('H', 'L');
                break;
            case 0x66:
                disassemble = `MOV\tH,M`;
                ticks = this.MOV_FROM_MEM('H');
                break;
            case 0x67:
                disassemble = `MOV\tH,A`;
                ticks = this.MOV_R('H', 'A');
                break;
            case 0x68:
                disassemble = `MOV\tL,B`;
                ticks = this.MOV_R('L', 'B');
                break;
            case 0x69:
                disassemble = `MOV\tL,C`;
                ticks = this.MOV_R('L', 'C');
                break;
            case 0x6A:
                disassemble = `MOV\tL,D`;
                ticks = this.MOV_R('L', 'D');
                break;
            case 0x6B:
                disassemble = `MOV\tL,E`;
                ticks = this.MOV_R('L', 'E');
                break;
            case 0x6C:
                disassemble = `MOV\tL,H`;
                ticks = this.MOV_R('L', 'H');
                break;
            case 0x6D:
                disassemble = `MOV\tL,L`;
                ticks = this.MOV_R('L', 'L');
                break;
            case 0x6E:
                disassemble = `MOV\tL,M`;
                ticks = this.MOV_FROM_MEM('L');
                break;
            case 0x6F:
                disassemble = `MOV\tL,A`;
                ticks = this.MOV_R('L', 'A');
                break;
            case 0x70:
                disassemble = `MOV\tM,B`;
                ticks = this.MOV_TO_MEM('B');
                break;
            case 0x71:
                disassemble = `MOV\tM,C`;
                ticks = this.MOV_TO_MEM('C');
                break;
            case 0x72:
                disassemble = `MOV\tM,D`;
                ticks = this.MOV_TO_MEM('D');
                break;
            case 0x73:
                disassemble = `MOV\tM,E`;
                ticks = this.MOV_TO_MEM('E');
                break;
            case 0x74:
                disassemble = `MOV\tM,H`;
                ticks = this.MOV_TO_MEM('H');
                break;
            case 0x75:
                disassemble = `MOV\tM,L`;
                ticks = this.MOV_TO_MEM('L');
                break;
            case 0x77:
                disassemble = `MOV\tM,A`;
                ticks = this.MOV_TO_MEM('A');
                break;
            case 0x78:
                disassemble = `MOV\tA,B`;
                ticks = this.MOV_R('A', 'B');
                break;
            case 0x79:
                disassemble = `MOV\tA,C`;
                ticks = this.MOV_R('A', 'C');
                break;
            case 0x7A:
                disassemble = `MOV\tA,D`;
                ticks = this.MOV_R('A', 'D');
                break;
            case 0x7B:
                disassemble = `MOV\tA,E`;
                ticks = this.MOV_R('A', 'E');
                break;
            case 0x7C:
                disassemble = `MOV\tA,H`;
                ticks = this.MOV_R('A', 'H');
                break;
            case 0x7D:
                disassemble = `MOV\tA,L`;
                ticks = this.MOV_R('A', 'L');
                break;
            case 0x7E:
                disassemble = `MOV\tA,M`;
                ticks = this.MOV_FROM_MEM('A');
                break;
            case 0x7F:
                disassemble = `MOV\tA,A`;
                ticks = this.MOV_R('A', 'A');
                break;
            case 0x76:
                disassemble = `HALT`;
                ticks = this.HALT();
                break;
            case 0x80:
                disassemble = `ADD\tB`;
                ticks = this.ADD_R('B');
                break;
            case 0x81:
                disassemble = `ADD\tC`;
                ticks = this.ADD_R('C');
                break;
            case 0x82:
                disassemble = `ADD\tC`;
                ticks = this.ADD_R('D');
                break;
            case 0x83:
                disassemble = `ADD\tE`;
                ticks = this.ADD_R('E');
                break;
            case 0x84:
                disassemble = `ADD\tH`;
                ticks = this.ADD_R('H');
                break;
            case 0x85:
                disassemble = `ADD\tL`;
                ticks = this.ADD_R('L');
                break;
            case 0x86:
                disassemble = `ADD\tM`;
                ticks = this.ADD_M();
                break;
            case 0x87:
                disassemble = `ADD\tA`;
                ticks = this.ADD_R('A');
                break;
            case 0x88:
                disassemble = `ADC\tB`;
                ticks = this.ADC_R('B');
                break;
            case 0x89:
                disassemble = `ADC\tC`;
                ticks = this.ADC_R('C');
                break;
            case 0x8A:
                disassemble = `ADC\tD`;
                ticks = this.ADC_R('D');
                break;
            case 0x8B:
                disassemble = `ADC\tE`;
                ticks = this.ADC_R('E');
                break;
            case 0x8C:
                disassemble = `ADC\tH`;
                ticks = this.ADC_R('H');
                break;
            case 0x8D:
                disassemble = `ADC\tL`;
                ticks = this.ADC_R('L');
                break;
            case 0x8E:
                disassemble = `ADC\tM`;
                ticks = this.ADC_M();
                break;
            case 0x8F:
                disassemble = `ADC\tA`;
                ticks = this.ADC_R('A');
                break;
            case 0x90:
                disassemble = `SUB\tB`;
                ticks = this.SUB_R('B');
                break;
            case 0x91:
                disassemble = `SUB\tC`;
                ticks = this.SUB_R('C');
                break;
            case 0x92:
                disassemble = `SUB\tD`;
                ticks = this.SUB_R('D');
                break;
            case 0x93:
                disassemble = `SUB\tE`;
                ticks = this.SUB_R('E');
                break;
            case 0x94:
                disassemble = `SUB\tH`;
                ticks = this.SUB_R('H');
                break;
            case 0x95:
                disassemble = `SUB\tL`;
                ticks = this.SUB_R('L');
                break;
            case 0x96:
                disassemble = `SUB\tM`;
                ticks = this.SUB_M();
                break;
            case 0x97:
                disassemble = `SUB\tA`;
                ticks = this.SUB_R('A');
                break;
            case 0x98:
                disassemble = `SBB\tB`;
                ticks = this.SBB_R('B');
                break;
            case 0x99:
                disassemble = `SBB\tC`;
                ticks = this.SBB_R('C');
                break;
            case 0x9A:
                disassemble = `SBB\tD`;
                ticks = this.SBB_R('D');
                break;
            case 0x9B:
                disassemble = `SBB\tE`;
                ticks = this.SBB_R('E');
                break;
            case 0x9C:
                disassemble = `SBB\tH`;
                ticks = this.SBB_R('H');
                break;
            case 0x9D:
                disassemble = `SBB\tL`;
                ticks = this.SBB_R('L');
                break;
            case 0x9E:
                disassemble = `SBB\tM`;
                ticks = this.SBB_M();
                break;
            case 0x9F:
                disassemble = `SBB\tA`;
                ticks = this.SBB_R('A');
                break;
            case 0xA0:
                disassemble = `ANA\tB`;
                ticks = this.ANA_R('B');
                break;
            case 0xA1:
                disassemble = `ANA\tC`;
                ticks = this.ANA_R('C');
                break;
            case 0xA2:
                disassemble = `ANA\tD`;
                ticks = this.ANA_R('D');
                break;
            case 0xA3:
                disassemble = `ANA\tE`;
                ticks = this.ANA_R('E');
                break;
            case 0xA4:
                disassemble = `ANA\tH`;
                ticks = this.ANA_R('H');
                break;
            case 0xA5:
                disassemble = `ANA\tL`;
                ticks = this.ANA_R('L');
                break;
            case 0xA6:
                disassemble = `ANA\tM`;
                ticks = this.ANA_M();
                break;
            case 0xA7:
                disassemble = `ANA\tA`;
                ticks = this.ANA_R('A');
                break;  
            case 0xA8:
                disassemble = `XRA\tB`;
                ticks = this.XRA_R('B');
                break;
            case 0xA9:
                disassemble = `XRA\tC`;
                ticks = this.XRA_R('C');
                break;
            case 0xAA:
                disassemble = `XRA\tD`;
                ticks = this.XRA_R('D');
                break;
            case 0xAB:
                disassemble = `XRA\tE`;
                ticks = this.XRA_R('E');
                break;
            case 0xAC:
                disassemble = `XRA\tH`;
                ticks = this.XRA_R('H');
                break;
            case 0xAD:
                disassemble = `XRA\tL`;
                ticks = this.XRA_R('L');
                break;       
            case 0xAE:
                disassemble = `XRA\tM`;
                ticks = this.XRA_M();
                break;
            case 0xAF:
                disassemble = `XRA\tA`;
                ticks = this.XRA_R('A');
                break;              
            case 0xB0:
                disassemble = `ORA\tB`;
                ticks = this.ORA_R('B');
                break;
            case 0xB1:
                disassemble = `ORA\tC`;
                ticks = this.ORA_R('C');
                break;
            case 0xB2:
                disassemble = `ORA\tD`;
                ticks = this.ORA_R('D');
                break;
            case 0xB3:
                disassemble = `ORA\tE`;
                ticks = this.ORA_R('E');
                break;
            case 0xB4:
                disassemble = `ORA\tH`;
                ticks = this.ORA_R('H');
                break;
            case 0xB5:
                disassemble = `ORA\tL`;
                ticks = this.ORA_R('L');
                break;
            case 0xB6:
                disassemble = `ORA\tM`;
                ticks = this.ORA_M();
                break;
            case 0xB7:
                disassemble = `ORA\tA`;
                ticks = this.ORA_R('A');
                break;                
            case 0xC6:
                disassemble = `ADI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.ADI(this._getNextByte());
                break;
            case 0xCE:
                disassemble = `ACI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.ACI(this._getNextByte());
                break;
            case 0xD6:
                disassemble = `SUI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.SUI(this._getNextByte());
                break;
            case 0xDE:
                disassemble = `SBI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.SBI(this._getNextByte());
                break;
            case 0xE6:
                disassemble = `ANI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.ANI(this._getNextByte());
                break;
            case 0xEE:
                disassemble = `XRI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.XRI(this._getNextByte());
                break;
            case 0xF6:
                disassemble = `ORI\t0x${this._peekNextByte().toString(16)}`;
                ticks = this.ORI(this._getNextByte());
                break;
            default:
                throw new Error(`Undefined OpCode ${opcode}`);
        }
        return { LastInstructionDisassembly: disassemble, 
                 LastInstructionTicks: ticks, 
                 LastInstructionAddress: opcodeAddress,
                 CPUState: this.State }; 
    }
}

export { i8080 };