def generate_aci(boilerplate, test):
    return boilerplate.format(
            comment=test['comment'],
            data=test['data'],
            accumulator=test['accumulator'],
            set_carry = "c.cpu.set_flag(FlagType.Carry);\nexpect(c.cpu.flag_set(FlagType.Carry)).toBeTruthy();\n" 
                if test['set_carry'] 
                else "expect(c.cpu.flag_set(FlagType.Carry)).toBeFalsy();\n",
            expected_result=test['expected_result'],
            carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
            parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
            auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
            zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
            sign='toBeTruthy' if test['sign'] else 'toBeFalsy')
