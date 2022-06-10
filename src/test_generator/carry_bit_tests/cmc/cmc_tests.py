import config

def generate_cmc(boilerplate, test):
    return boilerplate.format(
                set_carry = "c.cpu.set_flag(FlagType.Carry);\nassert.equal(c.cpu.flag_set(FlagType.Carry), true);\n" 
                    if test['set_carry'] 
                    else "assert.equal(c.cpu.flag_set(FlagType.Carry), false);\n",
                carry=str(test['carry']).lower())
