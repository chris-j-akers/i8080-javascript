import { Computer } from './src/computer.js';
import { CpuDiag } from './src/cpudiag.js';

const register_table = {
    A_DEC: document.getElementById('reg_table_A_dec'),
    A_HEX: document.getElementById('reg_table_A_hex'),
    A_BIN: document.getElementById('reg_table_A_bin'),
    B_DEC: document.getElementById('reg_table_B_dec'),
    B_HEX: document.getElementById('reg_table_B_hex'),
    B_BIN: document.getElementById('reg_table_B_bin'),
    C_DEC: document.getElementById('reg_table_C_dec'),
    C_HEX: document.getElementById('reg_table_C_hex'),
    C_BIN: document.getElementById('reg_table_C_bin'),
    D_DEC: document.getElementById('reg_table_D_dec'),
    D_HEX: document.getElementById('reg_table_D_hex'),
    D_BIN: document.getElementById('reg_table_D_bin'),
    E_DEC: document.getElementById('reg_table_E_dec'),
    E_HEX: document.getElementById('reg_table_E_hex'),
    E_BIN: document.getElementById('reg_table_E_bin'),
    H_DEC: document.getElementById('reg_table_H_dec'),
    H_HEX: document.getElementById('reg_table_H_hex'),
    H_BIN: document.getElementById('reg_table_H_bin'),
    L_DEC: document.getElementById('reg_table_L_dec'),
    L_HEX: document.getElementById('reg_table_L_hex'),
    L_BIN: document.getElementById('reg_table_L_bin'),
}

const flags_table = {
    C: document.getElementById('flag_table_C'),
    P: document.getElementById('flag_table_P'),
    A: document.getElementById('flag_table_A'),
    Z: document.getElementById('flag_table_Z'),
    S: document.getElementById('flag_table_S'),
}

const misc_table = {
    PC: document.getElementById('misc_table_PC'),
    SP: document.getElementById('misc_table_SP'),
    C: document.getElementById('misc_table_C'),
    H: document.getElementById('misc_table_H'),
}

const btnNext = document.getElementById('next');
const btnMadness = document.getElementById('madness');
const dis = document.getElementById('disassemble');

btnNext.addEventListener('click', () => {
    dis.textContent += `\n${rom.ExecuteNextLine()}`;
    refreshControls();
});

btnMadness.addEventListener('click', () => {
    for (let i=c.cpu.ProgramCounter; i<c.bus.mmu.ram.length; i++) {
        if (c.cpu.halt == false) {
            exec();
        }
        else {
            return;
        }
    }
});

function refreshControls() {
    register_table.A_DEC.textContent = `${c.cpu.registers['A'].toString().padStart(3,'0')}`
    register_table.A_HEX.textContent = `0x${c.cpu.registers['A'].toString(16).padStart(2,'0)')}`;

    register_table.B_DEC.textContent = `${c.cpu.registers['B'].toString().padStart(3,'0')}`
    register_table.B_HEX.textContent = `0x${c.cpu.registers['B'].toString(16).padStart(2,'0)')}`;

    register_table.C_DEC.textContent = `${c.cpu.registers['C'].toString().padStart(3,'0')}`
    register_table.C_HEX.textContent = `0x${c.cpu.registers['C'].toString(16).padStart(2,'0)')}`;

    register_table.D_DEC.textContent = `${c.cpu.registers['D'].toString().padStart(3,'0')}`
    register_table.D_HEX.textContent = `0x${c.cpu.registers['D'].toString(16).padStart(2,'0)')}`;

    register_table.E_DEC.textContent = `${c.cpu.registers['E'].toString().padStart(3,'0')}`
    register_table.E_HEX.textContent = `0x${c.cpu.registers['E'].toString(16).padStart(2,'0)')}`;

    register_table.H_DEC.textContent = `${c.cpu.registers['H'].toString().padStart(3,'0')}`
    register_table.H_HEX.textContent = `0x${c.cpu.registers['H'].toString(16).padStart(2,'0)')}`;

    register_table.L_DEC.textContent = `${c.cpu.registers['L'].toString().padStart(3,'0')}`
    register_table.L_HEX.textContent = `0x${c.cpu.registers['L'].toString(16).padStart(2,'0)')}`;

    flags_table.C.textContent = `${c.cpu._flag_manager.IsSet(c.cpu._flag_manager.FlagType.Carry) ? '1' : '0'}`;
    flags_table.P.textContent = `${c.cpu._flag_manager.IsSet(c.cpu._flag_manager.FlagType.Parity) ? '1' : '0'}`;
    flags_table.A.textContent = `${c.cpu._flag_manager.IsSet(c.cpu._flag_manager.FlagType.AuxillaryCarry) ? '1' : '0'}`;
    flags_table.Z.textContent = `${c.cpu._flag_manager.IsSet(c.cpu._flag_manager.FlagType.Zero) ? '1' : '0'}`;
    flags_table.S.textContent = `${c.cpu._flag_manager.IsSet(c.cpu._flag_manager.FlagType.Sign) ? '1' : '0'}`;

    misc_table.PC.textContent = `${c.cpu.ProgramCounter.toString(16)}`;
    misc_table.SP.textContent = `${c.cpu.StackPointer.toString(16)}`;
    misc_table.C.textContent = `${c.cpu.Clock.toString(16)}`;
    misc_table.H.textContent = `${c.cpu.Halt ? '1' : '0'}`;
}

const rom = new CpuDiag(0x100);
rom.Initialise();


