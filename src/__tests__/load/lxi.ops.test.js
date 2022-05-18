const Source = require('../../i8080');

describe('LXI', () => {
  test('LXI B,d16', () => {

    const c = new Source.Computer();

    for (let word = 0x0000; word <= 0xFFFF; word++) {
        c.cpu.lxi_b(word);
        expect(c.cpu.scratch_registers.B).toEqual(word & 0x00FF);
        expect(c.cpu.scratch_registers.C).toEqual((word >> 8) & 0x00FF);
    }
  });

  test('LXI D,d16', () => {
    const c = new Source.Computer();
    
    for (let word = 0x0000; word <= 0xFFFF; word++) {
        c.cpu.lxi_d(word);
        expect(c.cpu.scratch_registers.D).toEqual(word & 0x00FF);
        expect(c.cpu.scratch_registers.E).toEqual((word >> 8) & 0x00FF);
    }
  });

  test('LXI H,d16', () => {
    const c = new Source.Computer();

    for (let word = 0x0000; word <= 0xFFFF; word++) {
        c.cpu.lxi_h(word);
        expect(c.cpu.scratch_registers.H).toEqual(word & 0x00FF);
        expect(c.cpu.scratch_registers.L).toEqual((word >> 8) & 0x00FF);
    }
  });

  test('LXI SP,d16', () => {
    const c = new Source.Computer();

    for (let word = 0x0000; word <= 0xFFFF; word++) {
        c.cpu.lxi_sp(word);

        const word_msb = (word >> 8) & 0x00FF
        const word_lsb = word & 0x00FF

        const sp_msb = (c.cpu.stack_pointer >> 8) & 0x00FF;
        const sp_lsb = c.cpu.stack_pointer & 0x00FF;

        expect(sp_msb).toEqual(word_lsb);
        expect(sp_lsb).toEqual(word_msb);
    }
  });
});