import config

def generate_ora_reg(boilerplate, test):
    return boilerplate.format(data=test['data'],
                        set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                            if test['set_carry'] 
                            else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
                        accumulator=test['accumulator'],
                        expected_result=test['expected_result'],
                        carry=str(test['carry']).lower(),
                        parity=str(test['parity']).lower(),
                        auxillary_carry=str(test['auxillary_carry']).lower(),
                        zero=str(test['zero']).lower(),
                        sign=str(test['sign']).lower())

def generate_ora_acc(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                        set_carry = "c.cpu.set_flag(FlagType.Carry);\nexpect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();\n" 
                            if test['set_carry'] 
                            else "expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();\n",
                        expected_result=test['expected_result'],
                        carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                        parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                        auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                        zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                        sign='toBeTruthy' if test['sign'] else 'toBeFalsy')

def generate_ora_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                        data=test['data'],
                        set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                            if test['set_carry'] 
                            else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
                        accumulator=test['accumulator'],
                        expected_result=test['expected_result'],
                        carry=str(test['carry']).lower(),
                        parity=str(test['parity']).lower(),
                        auxillary_carry=str(test['auxillary_carry']).lower(),
                        zero=str(test['zero']).lower(),
                        sign=str(test['sign']).lower())