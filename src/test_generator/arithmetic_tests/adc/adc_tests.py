import config

def generate_adc_acc(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c._cpu.FlagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);\n" 
                                        if test['set_carry'] 
                                        else "assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);\n",
                                    expected_result=test['expected_result'],
                                    carry=str(test['carry']).lower(),
                                    parity=str(test['parity']).lower(),
                                    auxillary_carry=str(test['auxillary_carry']).lower(),
                                    zero=str(test['zero']).lower(),
                                    sign=str(test['sign']).lower())


def generate_adc_mem(boilerplate, test):
    return boilerplate.format(max_mem_addr=config.MAX_MEM_ADDR,
                                    comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c._cpu.FlagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);\n" 
                                        if test['set_carry'] 
                                        else "assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);\n",
                                    expected_result=test['expected_result'],
                                    carry=str(test['carry']).lower(),
                                    parity=str(test['parity']).lower(),
                                    auxillary_carry=str(test['auxillary_carry']).lower(),
                                    zero=str(test['zero']).lower(),
                                    sign=str(test['sign']).lower())


def generate_adc_reg(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c._cpu.FlagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);\n" 
                                        if test['set_carry'] 
                                        else "assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);\n",
                                    expected_result=test['expected_result'],
                                    carry=str(test['carry']).lower(),
                                    parity=str(test['parity']).lower(),
                                    auxillary_carry=str(test['auxillary_carry']).lower(),
                                    zero=str(test['zero']).lower(),
                                    sign=str(test['sign']).lower())
