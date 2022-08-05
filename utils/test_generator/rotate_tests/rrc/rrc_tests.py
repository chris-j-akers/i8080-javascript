def generate_rrc(boilerplate, test):
    return boilerplate.format(data=test['data'],
                                carry=str(test['carry']).lower(),
                                expected_result=test['expected_result'])

def generate_rrc_multishift(boilerplate, test):
    return boilerplate;