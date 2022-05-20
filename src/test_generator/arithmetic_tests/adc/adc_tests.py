def generate_mov_reg_to_mem(boilerplate, test):
    return boilerplate.format(reg_source = test['reg_source'])

def generate_adc_acc(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()


def generate_adc_mem(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()


def generate_adc_reg(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                    data=test['data'],
                                    accumulator=test['accumulator'],
                                    set_carry = "c.cpu.set_flag(FlagType.Carry);\n" if test['set_carry'] else "",
                                    expected_result=test['expected_result'],
                                    carry=test['carry'],
                                    parity=test['parity'],
                                    auxillary_carry=test['auxillary_carry'],
                                    zero=test['zero'],
                                    sign=test['sign']).lstrip()
