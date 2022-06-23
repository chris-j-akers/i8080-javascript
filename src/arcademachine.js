import { Computer } from "./computer.js";

/**
 * An abstract class which emulates the full ArcadeMachine.
 *
 * An ArcadeMachine containes a Computer and a code-set. It executes the code,
 * but can hook into certain CPU operations and structures to cope with things
 * like OS syscalls etc.
 */
class ArcadeMachine {

    constructor(startaddr) {
        if (new.target === 'ArcadeMachine') {
            throw new TypeError('Cannot construct ArcadeMachine object directly.')
        }
        this.startaddr = startaddr;
        this.computer = null;
    }

    get Code() {
        return this.code;
    }

    Initialise() {
        this.computer = new Computer();
        this.computer.InjectProgram(this.code, this.startaddr);
        this.computer.CPUProgramCounter = this.startaddr;
    }

    ExecuteNextLine() {
        throw new TypeError('ExecuteNextLine() not implemented in current ArcadeMachine.')
    }
}

export { ArcadeMachine }