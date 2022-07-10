'use strict'

/**
 * The bus links the CPU and other 'peripherals' together. This is usually just
 * memory, but could also be a video display or something similar.
 */
 class Bus {
    constructor() {
        this._mmu = null;
        this._cpu = null;
        this._writeDevices = [];
        this._readDevices = [];
    }

    GetVideoBuffer(startAddr, endAddr) {
        return this._mmu.GetVideoBuffer(startAddr, endAddr);
    }

    ConnectDeviceToReadPort(port, device) {
        this._readDevices[port] = device;
    }

    ConnectDeviceToWritePort(port, device) {
        this._writeDevices[port] = device;
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
            this._writeDevices[port].Write(port, val);
            break;
        }
    }

    ReadDevice(port) {
        switch(port) {
            case 0x01:
                return this._readDevices[port].Read(port);
            case 0x03:
                return this._readDevices[port].Read(port);
            default:
                return 0x0;
        }

    }

}

export { Bus };
