def generate_rar(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                set_carry = "c.cpu._flag_manager.SetFlag(FlagType.Carry);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);\n" 
                                    if test['set_carry'] 
                                    else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);\n",
                                carry=str(test['carry']).lower(),
                                expected_result=test['expected_result'])

def generate_rar_multishift(boilerplate, test):
    return boilerplate