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

    /**
     * @param {number} startAddr Start address of the Slice
     * @param {number} endAddr End address of the Slice
     * @returns A section of the RAM array denoted by `startAddr` and `endAddr`
     */
    GetRAMSlice(startAddr, endAddr) {
        return this._mmu.GetRAMSlice(startAddr, endAddr);
    }

    /**
     * @param {number} port The port number used to read from the device
     * @param {Device} device A reference to the device itself, must implement
     * the `Device` abstract class
     */
    ConnectDeviceToReadPort(port, device) {
        this._readDevices[port] = device;
    }

    /**
     * @param {number} port The port number used to write to the device
     * @param {Device} device A reference to the device itself, must implement
     * the `Device` abstract class
     */
    ConnectDeviceToWritePort(port, device) {
        this._writeDevices[port] = device;
    }

    ConnectMMU(mmu) {
        this._mmu = mmu;
    }

    ConnectCPU(cpu) {
        this._cpu = cpu;
    }

    /**
     * Write a value to an address in RAM
     * 
     * @param {number} val The value to write
     * @param {number} addr The 16bit address to write to
     */
    WriteRAM(val, addr) {
        this._mmu.Write(val, addr);
    }

    /**
     * Read a value from an address in RAM
     * 
     * @param {number} addr The 16bit address to read from
     * @returns The value at address `addr`
     */
    ReadRAM(addr) {
        return this._mmu.Read(addr);
    }

    /**
     * Write a value to a device connected to the bus
     * 
     * @param {number} port The port the device is connected to for writing
     * @param {number} val The value to write
     */
    WriteDevice(port, val) {
        this._writeDevices[port].Write(port, val);
    }

    /**
     * Read a value from a device connected to the bus
     * 
     * @param {number} port The port the device is connected to for reading
     * @returns The value returned from the device
     */
    ReadDevice(port) {
        return this._readDevices[port].Read(port);
    }

}

export { Bus };
