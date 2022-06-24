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
const btnInit = document.getElementById('init');
const dis = document.getElementById('disassemble');
dis.textContent = ''
const output = document.getElementById('output');
output.textContent = '';
const ramOutput = document.getElementById('ramOutput');
ramOutput.textContent = '';

const inpUpto = document.getElementById('inpUpto');
const btnUpto = document.getElementById('upto');

btnNext.addEventListener('click', () => {
    dis.textContent += `\n${cabinet.ExecuteNextLine()}`;
    refreshControls();
});

btnMadness.addEventListener('click', () => {
    while (cabinet.Stopped == false) {
        dis.textContent += `\n${cabinet.ExecuteNextLine(output)}`;
        refreshControls();
    }
    return;
});

btnInit.addEventListener('click',() => {
    cabinet.Initialise(ramOutput);
});

btnUpto.addEventListener('click', () => {
    const addr =parseInt(inpUpto.value);
    console.log(addr.toString(16));
    while (cabinet.Stopped == false && cabinet.computer.CPUProgramCounter != addr) {
        dis.textContent += `\n${cabinet.ExecuteNextLine(output)}`;
        refreshControls();
    }

})

function refreshControls() {
    register_table.A_DEC.textContent = `${cabinet.Computer.CPURegisters['A'].toString().padStart(3,'0')}`
    register_table.A_HEX.textContent = `0x${cabinet.Computer.CPURegisters['A'].toString(16).padStart(2,'0)')}`;

    register_table.B_DEC.textContent = `${cabinet.Computer.CPURegisters['B'].toString().padStart(3,'0')}`
    register_table.B_HEX.textContent = `0x${cabinet.Computer.CPURegisters['B'].toString(16).padStart(2,'0)')}`;

    register_table.C_DEC.textContent = `${cabinet.Computer.CPURegisters['C'].toString().padStart(3,'0')}`
    register_table.C_HEX.textContent = `0x${cabinet.Computer.CPURegisters['C'].toString(16).padStart(2,'0)')}`;

    register_table.D_DEC.textContent = `${cabinet.Computer.CPURegisters['D'].toString().padStart(3,'0')}`
    register_table.D_HEX.textContent = `0x${cabinet.Computer.CPURegisters['D'].toString(16).padStart(2,'0)')}`;

    register_table.E_DEC.textContent = `${cabinet.Computer.CPURegisters['E'].toString().padStart(3,'0')}`
    register_table.E_HEX.textContent = `0x${cabinet.Computer.CPURegisters['E'].toString(16).padStart(2,'0)')}`;

    register_table.H_DEC.textContent = `${cabinet.Computer.CPURegisters['H'].toString().padStart(3,'0')}`
    register_table.H_HEX.textContent = `0x${cabinet.Computer.CPURegisters['H'].toString(16).padStart(2,'0)')}`;

    register_table.L_DEC.textContent = `${cabinet.Computer.CPURegisters['L'].toString().padStart(3,'0')}`
    register_table.L_HEX.textContent = `0x${cabinet.Computer.CPURegisters['L'].toString(16).padStart(2,'0)')}`;

    flags_table.C.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Carry) ? '1' : '0'}`;
    flags_table.P.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Parity) ? '1' : '0'}`;
    flags_table.A.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.AuxillaryCarry) ? '1' : '0'}`;
    flags_table.Z.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Zero) ? '1' : '0'}`;
    flags_table.S.textContent = `${cabinet.Computer.CPUFlagManager.IsSet(cabinet.Computer.CPUFlagManager.FlagType.Sign) ? '1' : '0'}`;

    misc_table.PC.textContent = `${cabinet.Computer.CPUProgramCounter.toString(16)}`;
    misc_table.SP.textContent = `${cabinet.Computer.CPUStackPointer.toString(16)}`;
    misc_table.C.textContent = `${cabinet.Computer.CPUClock.toString(16)}`;
    misc_table.H.textContent = `${cabinet.Computer.CPUHalt ? '1' : '0'}`;
}


const cabinet = new CpuDiag(0x100);



