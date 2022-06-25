def generate_ral(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                set_carry = "c._cpu.FlagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);\n" 
                                    if test['set_carry'] 
                                    else "assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);\n",
                                carry=str(test['carry']).lower(),
                                expected_result=test['expected_result'])

def generate_ral_multishift(boilerplate, test):
    return boilerplate