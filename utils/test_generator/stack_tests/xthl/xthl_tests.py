import config

def generate_xthl(boilerplate, test):
                    return boilerplate.format(mem_addr_high_byte=test['mem_addr_high_byte'],
                                              mem_addr_low_byte=test['mem_addr_low_byte'],
                                              h_register = test['h_register'],
                                              l_register = test['l_register'],
                                              mem_first_byte = test['mem_first_byte'],
                                              mem_second_byte = test['mem_second_byte'])