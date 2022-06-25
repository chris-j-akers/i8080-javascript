import config

def generate_cmc(boilerplate, test):
    return boilerplate.format(
                set_carry = "c._cpu.FlagManager.SetFlag(FlagType.Carry);\nassert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), true);\n" 
                    if test['set_carry'] 
                    else "assert.equal(c._cpu.FlagManager.IsSet(FlagType.Carry), false);\n",
                carry=str(test['carry']).lower())
