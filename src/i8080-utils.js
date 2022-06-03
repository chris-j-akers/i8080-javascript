//  ===================================================================================
//  Return a string representation of a byte (8-bits) in binary format
// e.g. 
// 0x10 (16) = '00010000')
//  ===================================================================================
function __util__byte_as_binary(val) {
    var str = '';
    for (let i = 0; i<8; i++) {
        if (val & (1 << i)) {
            str += '1';
        } 
        else {
            str += '0';
        }
    }
    return str.split('').reverse().join('');
}

//  ===================================================================================
//  Return a string representation of a word (16-bits) in binary 
// e.g. 
// 0x2099 (8345) = '0010000010011001')
//  ===================================================================================
function __util__word_as_binary(val) {
    var str = '';
    for (let i = 0; i<16; i++) {
        if (val & (1 << i)) {
            str += '1';
        } 
        else {
            str += '0';
        }
    }
    return str.split('').reverse().join('');
}

export { __util__byte_as_binary, __util__word_as_binary }