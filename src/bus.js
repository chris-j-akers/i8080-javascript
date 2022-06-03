'use strict'

/**
 * The bus links the CPU and other 'periphials' together. This is usually just
 * memory, but could also be a video display buffer or similar.
 */
 class Bus {
    constructor() {
        this.mmu = null;
        this.cpu = null;
    }

    connect_mmu(mmu) {
        this.mmu = mmu;
    }

    connect_cpu(cpu) {
        this.cpu = cpu;
    }

    write(val, addr) {
        this.mmu.write(val, addr);
    }

    read(addr) {
        return this.mmu.read(addr);
    }
}

export { Bus };
