def generate_aci(boilerplate, test):
    return boilerplate.format(
            comment=test['comment'],
            data=test['data'],
            accumulator=test['accumulator'],
            set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                if test['set_carry'] 
                else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
            expected_result=test['expected_result'],
            carry=str(test['carry']).lower(),
            parity=str(test['parity']).lower(),
            auxillary_carry=str(test['auxillary_carry']).lower(),
            zero=str(test['zero']).lower(),
            sign=str(test['sign']).lower())

