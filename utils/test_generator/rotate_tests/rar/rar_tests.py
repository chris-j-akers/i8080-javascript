def generate_rar(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                set_carry = "c._cpu._flagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);\n" 
                                    if test['set_carry'] 
                                    else "assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);\n",
                                carry=str(test['carry']).lower(),
                                expected_result=test['expected_result'])

def generate_rar_multishift(boilerplate, test):
    return boilerplate