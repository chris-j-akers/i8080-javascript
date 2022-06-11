
def generate_dad(boilerplate, test):
    return boilerplate.format(     set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                                        if test['set_carry'] 
                                        else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
                                    high_byte=test['high_byte'],
                                    low_byte=test['low_byte'],
                                    h_reg = test['h_reg'],
                                    l_reg = test['l_reg'],
                                    expected_result=test['expected_result'],
                                    carry=str(test['carry']).lower())


def generate_dad_hl(boilerplate, test):
    return boilerplate.format(     set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                                        if test['set_carry'] 
                                        else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
                                    h_reg = test['h_reg'],
                                    l_reg = test['l_reg'],
                                    expected_result=test['expected_result'],
                                    carry=str(test['carry']).lower())

