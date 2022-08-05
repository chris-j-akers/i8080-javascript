def generate_sphl(boilerplate, test):
                    return boilerplate.format(h_register = test['h_register'],
                                              l_register = test['l_register'])