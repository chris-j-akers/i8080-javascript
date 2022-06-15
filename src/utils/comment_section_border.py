import sys
string = sys.argv[2]
width = int(sys.argv[1]) # 75 is the usual

print('/*------------------------------------------------------------------------')
print('{0}'.format(string.center(width)))
print('------------------------------------------------------------------------*/')
