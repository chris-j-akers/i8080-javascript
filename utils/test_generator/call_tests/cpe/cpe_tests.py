def generate_cpe(boilerplate, test):
    return boilerplate.format(accumulator=test['accumulator'],
                                add=test['add'],
                                stack_pointer=test['stack_pointer'],
                                expected_clock=test['expected_clock'],
                                expected_result=test['expected_result'],
                                expected_stack_pointer=test['expected_stack_pointer'],
                                parity=str(test['parity']).lower());
