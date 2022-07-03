class Device {
    constructor() {
        if (this.constructor.name == 'Device') {
            throw new Error('Attempt to instantiate class Device')
        }
    }
    Write = (port, data) => {};
    Read = (port) => {};
}

export { Device }