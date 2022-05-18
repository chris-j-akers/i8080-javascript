const Source = require('../../i8080');

// The full test should run to 0xFFFF, but this can take a while. To start off with, and fix
// any broader bugs, set this to a low value.
const max_mem_addr = 0xFFFF;

describe('MOV', () => {

  test('MOV B,B', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.B = byte;
        c.cpu.mov_reg(c.cpu.scratch_registers.B, c.cpu.scratch_registers.B)
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

  test('MOV B,C', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.C = byte;
        c.cpu.mov_reg('B', 'C')
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

  test('MOV B,D', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.D = byte;
        c.cpu.mov_reg('B', 'D')
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

  test('MOV B,E', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.E = byte;
        c.cpu.mov_reg('B', 'E')
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

  test('MOV B,H', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.H = byte;
        c.cpu.mov_reg('B', 'H')
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

  test('MOV B,L', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.L = byte;
        c.cpu.mov_reg('B', 'L')
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

  test('MOV B,M', () => {
    const c = new Source.Computer();

    const data = 0xFFFF;

    for (let mem_addr = 0x00; mem_addr <= max_mem_addr; mem_addr++) {
        c.bus.write(data, mem_addr);
        c.cpu.scratch_registers.H = (mem_addr >> 8) & 0xff;
        c.cpu.scratch_registers.L = mem_addr & 0xff;
        c.cpu.mov_from_mem('B');

        expect(c.cpu.scratch_registers.B).toEqual(data);
        c.reset();
    }

  });

  test('MOV B,A', () => {
    const c = new Source.Computer();
    for (let byte = 0x00; byte <= 0xFF; byte++) {
        c.cpu.scratch_registers.A = byte;
        c.cpu.mov_reg('B', 'A')
        expect(c.cpu.scratch_registers.B).toEqual(byte);
    }
  });

});