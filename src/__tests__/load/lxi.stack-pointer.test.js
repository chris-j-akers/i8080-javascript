const Computer = require('../../computer');
const i8080 = require('../../i8080');

describe('LXI Stack Pointer', () => {
	it('LXI SP,d16', () => {
		const c = new Computer();
		const max_value_to_test = 4095;
		
		for (let word = 0x0000; word <= max_value_to_test; word++) {
		    c.cpu.lxi('SP', word);
		
		    const word_msb = (word >> 8) & 0x00FF
		    const word_lsb = word & 0x00FF
		
		    const sp_msb = (c.cpu.stack_pointer >> 8) & 0x00FF;
		    const sp_lsb = c.cpu.stack_pointer & 0x00FF;
		
		    expect(sp_msb).toEqual(word_lsb);
		    expect(sp_lsb).toEqual(word_msb);
		}
		});
		
});
