def generate_sbi(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                data=test['data'],
                                accumulator=test['accumulator'],
                                set_carry = "c._cpu._flagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), true);\n" 
                                    if test['set_carry'] 
                                    else "assert.equal(c._cpu._flagManager.IsSet(FlagType.Carry), false);\n",
                                expected_result=test['expected_result'],
                                carry=str(test['carry']).lower(),
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())
