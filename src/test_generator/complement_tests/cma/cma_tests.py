def generate_cma(boilerplate, test):
    return boilerplate.format(
                        accumulator=test['accumulator'],
                        expected_result=test['expected_result'])

