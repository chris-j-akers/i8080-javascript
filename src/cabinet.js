import { Computer } from "./computer.js";

/**
 * An abstract class which emulates a Cabinet.
 *
 * A cabinet containes a Computer, a display and a code-set. Code is stored in
 * an array of bytes called `_code`.
 *
 */
class Cabinet {

    constructor(startAddr) {
        if (new.target === 'Cabinet') {
            throw new TypeError('Cannot construct Cabinet object directly.')
        }
        this._startAddr = startAddr;
        this._computer = null;
        this._code = null;
    }

    get Code() {
        return this._code;
    }

    get Computer() {
        return this._computer;
    }

    Initialise() {
        this._computer = new Computer();
        return this._computer.LoadProgram(this._code, this._startAddr);
    }

    ResetComputer() {
        this._computer.Reset();
    }

    /**
     * Execute the next line of code, according to the location of the Program
     * Counter.
     *
     * This method should call ExecuteNextLine() of the Cabinet's Computer
     * object which, in turn, will call the ExecuteNextLine() of its own CPU
     * object. This gives us a couple of layers of abstraction. The CPU is
     * ignorant of what we're acually using it for.
     *
     * Any extra emulation should be placed here (e.g. OS syscalls)
     *
     * @param {string} output Disassembly of line just executed
     * @returns 
     */
    ExecuteNextInstruction() {
        throw new TypeError('ExecuteNextLine() not implemented in empty Cabinet.')
    }
}

export { Cabinet }