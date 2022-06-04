import config

def generate_ana_reg(boilerplate, test):
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

def generate_ana_acc(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                        set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                            if test['set_carry'] 
                            else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
                        expected_result=test['expected_result'],
                        carry=str(test['carry']).lower(),
                        parity=str(test['parity']).lower(),
                        auxillary_carry=str(test['auxillary_carry']).lower(),
                        zero=str(test['zero']).lower(),
                        sign=str(test['sign']).lower())

def generate_ana_mem(boilerplate, test):
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