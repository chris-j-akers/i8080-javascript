import { Computer } from "./computer.js";

/**
 * An abstract class which emulates a full Cabinet.
 *
 * A cabinet containes a Computer and a code-set. Code is stored in an array of
 * bytes called `_code`.
 *
 * A cabinet runs the code, but can hook into certain CPU operations and
 * structures to cope with things like OS syscalls etc.
 */
class Cabinet {

    constructor(startaddr) {
        if (new.target === 'Cabinet') {
            throw new TypeError('Cannot construct Cabinet object directly.')
        }
        this.startaddr = startaddr;
        this.computer = null;
    }

    get Code() {
        return this._code;
    }

    get Computer() {
        return this.computer;
    }

    Initialise(ramOutput) {
        this.computer = new Computer();
        this.computer.InjectProgram(this.Code, this.startaddr);
        this.computer.CPUProgramCounter = this.startaddr;

        if(typeof ramOutput != undefined) {
            let str = '';
            for (let i=0; i<(2**16); i++) {
                str += `${i.toString(16).padStart(4,'0')}\t${this.computer.Bus.ReadRAM(i).toString(16).padStart(2,'0')}\n`
            }
            ramOutput.textContent = str;
        }
    }

    ExecuteNextLine() {
        throw new TypeError('ExecuteNextLine() not implemented in empty Cabinet.')
    }
}

export { Cabinet as ArcadeMachine }