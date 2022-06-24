def generate_aci(boilerplate, test):
    return boilerplate.format(
            comment=test['comment'],
            data=test['data'],
            accumulator=test['accumulator'],
            set_carry = "c.cpu.FlagManager.SetFlag(FlagType.Carry);\nassert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), true);\n" 
                if test['set_carry'] 
                else "assert.equal(c.cpu.FlagManager.IsSet(FlagType.Carry), false);\n",
            expected_result=test['expected_result'],
            carry=str(test['carry']).lower(),
            parity=str(test['parity']).lower(),
            auxillary_carry=str(test['auxillary_carry']).lower(),
            zero=str(test['zero']).lower(),
            sign=str(test['sign']).lower())

