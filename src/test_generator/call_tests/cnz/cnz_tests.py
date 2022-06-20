def generate_cnz(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                                subtract=test['subtract'],
                                stack_pointer=test['stack_pointer'],
                                expected_clock=test['expected_clock'],
                                expected_result=test['expected_result'],
                                expected_stack_pointer=test['expected_stack_pointer'],
                                zero=str(test['zero']).lower());
