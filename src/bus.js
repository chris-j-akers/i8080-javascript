'use strict'

/**
 * The bus links the CPU and other 'peripherals' together. This is usually just
 * memory, but could also be a video display or something similar.
 */
 class Bus {
    constructor() {
        this._mmu = null;
        this._cpu = null;
        this._devices = [];
    }

    GetVideoBuffer(startAddr, endAddr) {
        return this._mmu.GetVideoBuffer(startAddr, endAddr);
    }

    ConnectDevice(port, device) {
        this._devices[port] = device;
    }

    ConnectMMU(mmu) {
        this._mmu = mmu;
    }

    ConnectCPU(cpu) {
        this._cpu = cpu;
    }

    WriteRAM(val, addr) {
        this._mmu.Write(val, addr);
    }

    ReadRAM(addr) {
        return this._mmu.Read(addr);
    }

    WriteDevice(port, val) {
        switch(port) {
            case 0x02:
            case 0x04:
            this._devices[port].Write(port, val);
            break;
        }

    }

    ReadDevice(port) {
        switch(port) {
            case 0x03:
                return this._devices[port].Read(port);
                break;
        }

    }

}

export { Bus };
