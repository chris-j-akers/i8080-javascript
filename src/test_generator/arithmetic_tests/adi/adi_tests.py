import config

def generate_adi(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                    accumulator=test['accumulator'],
                                    expected_result=test['expected_result'],
                                    carry='toBeTruthy' if test['carry'] else 'toBeFalsy',
                                    parity='toBeTruthy' if test['parity'] else 'toBeFalsy',
                                    auxillary_carry='toBeTruthy' if test['auxillary_carry'] else 'toBeFalsy',
                                    zero='toBeTruthy' if test['zero'] else 'toBeFalsy',
                                    sign='toBeTruthy' if test['sign'] else 'toBeFalsy')
