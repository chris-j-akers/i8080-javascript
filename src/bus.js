'use strict'

/**
 * The bus links the CPU and other 'peripherals' together. This is usually just
 * memory, but could also be a video display or something similar.
 */
 class Bus {
    constructor() {
        this.mmu = null;
        this.cpu = null;
    }

    ConnectMMU(mmu) {
        this.mmu = mmu;
    }

    ConnectCPU(cpu) {
        this.cpu = cpu;
    }

    WriteRAM(val, addr) {
        this.mmu.Write(val, addr);
    }

    ReadRAM(addr) {
        return this.mmu.Read(addr);
    }

    WriteDevice(id, val) {
        
    }
}

export { Bus };
