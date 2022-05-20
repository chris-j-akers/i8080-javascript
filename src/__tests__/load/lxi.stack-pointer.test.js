const Source = require('../../i8080');
describe('LXI Stack Pointer', () => {
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
