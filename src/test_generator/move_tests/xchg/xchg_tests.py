def generate_xchg(boilerplate, test):
    return boilerplate.format(h_register=test['h_register'],
                                l_register=test['l_register'],
                                d_register=test['d_register'],
                                e_register=test['e_register'])



