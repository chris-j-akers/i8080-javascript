def generate_sui(boilerplate, test):
    return boilerplate.format(comment=test['comment'],
                                data=test['data'],
                                accumulator=test['accumulator'],
                                expected_result=test['expected_result'],
                                carry=str(test['carry']).lower(),
                                parity=str(test['parity']).lower(),
                                auxillary_carry=str(test['auxillary_carry']).lower(),
                                zero=str(test['zero']).lower(),
                                sign=str(test['sign']).lower())

