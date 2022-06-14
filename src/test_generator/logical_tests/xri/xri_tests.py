import config

def generate_xri(boilerplate, test):
    return boilerplate.format(data=test['data'],
                        set_carry = "c.cpu._flag_manager.SetFlag(FlagType.Carry);\nassert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), true);\n" 
                            if test['set_carry'] 
                            else "assert.equal(c.cpu._flag_manager.IsSet(FlagType.Carry), false);\n",
                        accumulator=test['accumulator'],
                        expected_result=test['expected_result'],
                        carry=str(test['carry']).lower(),
                        parity=str(test['parity']).lower(),
                        auxillary_carry=str(test['auxillary_carry']).lower(),
                        zero=str(test['zero']).lower(),
                        sign=str(test['sign']).lower())

