def generate_cpi(boilerplate, test):
    return boilerplate.format(data=test['data'],
                            accumulator=test['accumulator'],
                            expected_result=test['expected_result'],
                            carry=str(test['carry']).lower(),
                            parity=str(test['parity']).lower(),
                            auxillary_carry=str(test['auxillary_carry']).lower(),
                            zero=str(test['zero']).lower(),
                            sign=str(test['sign']).lower())

