const Code = [
	0xc3,0xab,0x1,0x4d,0x49,0x43,0x52,0x4f,0x43,0x4f,0x53,
	0x4d,0x20,0x41,0x53,0x53,0x4f,0x43,0x49,0x41,0x54,0x45,
	0x53,0x20,0x38,0x30,0x38,0x30,0x2f,0x38,0x30,0x38,0x35,
	0x20,0x43,0x50,0x55,0x20,0x44,0x49,0x41,0x47,0x4e,0x4f,
	0x53,0x54,0x49,0x43,0x20,0x56,0x45,0x52,0x53,0x49,0x4f,
	0x4e,0x20,0x31,0x2e,0x30,0x20,0x28,0x43,0x29,0x20,0x31,
	0x39,0x38,0x30,0xd5,0xeb,0xe,0x9,0xcd,0x5,0x0,0xd1,
	0xc9,0xe,0x2,0xcd,0x5,0x0,0xc9,0xf5,0xcd,0x64,0x1,
	0x5f,0xcd,0x4e,0x1,0xf1,0xcd,0x68,0x1,0x5f,0xc3,0x4e,
	0x1,0xf,0xf,0xf,0xf,0xe6,0xf,0xfe,0xa,0xfa,0x71,
	0x1,0xc6,0x7,0xc6,0x30,0xc9,0xc,0xd,0xa,0x20,0x43,
	0x50,0x55,0x20,0x49,0x53,0x20,0x4f,0x50,0x45,0x52,0x41,
	0x54,0x49,0x4f,0x4e,0x41,0x4c,0x24,0xc,0xd,0xa,0x20,
	0x43,0x50,0x55,0x20,0x48,0x41,0x53,0x20,0x46,0x41,0x49,
	0x4c,0x45,0x44,0x21,0x20,0x45,0x52,0x52,0x4f,0x52,0x20,
	0x45,0x58,0x49,0x54,0x3d,0x24,0x31,0xad,0x7,0xe6,0x0,
	0xca,0xb6,0x1,0xcd,0x89,0x6,0xd2,0xbc,0x1,0xcd,0x89,
	0x6,0xea,0xc2,0x1,0xcd,0x89,0x6,0xf2,0xc8,0x1,0xcd,
	0x89,0x6,0xc2,0xd7,0x1,0xda,0xd7,0x1,0xe2,0xd7,0x1,
	0xfa,0xd7,0x1,0xc3,0xda,0x1,0xcd,0x89,0x6,0xc6,0x6,
	0xc2,0xe2,0x1,0xcd,0x89,0x6,0xda,0xeb,0x1,0xe2,0xeb,
	0x1,0xf2,0xee,0x1,0xcd,0x89,0x6,0xc6,0x70,0xe2,0xf6,
	0x1,0xcd,0x89,0x6,0xfa,0xff,0x1,0xca,0xff,0x1,0xd2,
	0x2,0x2,0xcd,0x89,0x6,0xc6,0x81,0xfa,0xa,0x2,0xcd,
	0x89,0x6,0xca,0x13,0x2,0xda,0x13,0x2,0xe2,0x16,0x2,
	0xcd,0x89,0x6,0xc6,0xfe,0xda,0x1e,0x2,0xcd,0x89,0x6,
	0xca,0x27,0x2,0xe2,0x27,0x2,0xfa,0x2a,0x2,0xcd,0x89,
	0x6,0xfe,0x0,0xda,0x42,0x2,0xca,0x42,0x2,0xfe,0xf5,
	0xda,0x42,0x2,0xc2,0x42,0x2,0xfe,0xff,0xca,0x42,0x2,
	0xda,0x45,0x2,0xcd,0x89,0x6,0xce,0xa,0xce,0xa,0xfe,
	0xb,0xca,0x51,0x2,0xcd,0x89,0x6,0xd6,0xc,0xd6,0xf,
	0xfe,0xf0,0xca,0x5d,0x2,0xcd,0x89,0x6,0xde,0xf1,0xde,
	0xe,0xfe,0xf0,0xca,0x69,0x2,0xcd,0x89,0x6,0xe6,0x55,
	0xfe,0x50,0xca,0x73,0x2,0xcd,0x89,0x6,0xf6,0x3a,0xfe,
	0x7a,0xca,0x7d,0x2,0xcd,0x89,0x6,0xee,0xf,0xfe,0x75,
	0xca,0x87,0x2,0xcd,0x89,0x6,0xe6,0x0,0xdc,0x89,0x6,
	0xe4,0x89,0x6,0xfc,0x89,0x6,0xc4,0x89,0x6,0xfe,0x0,
	0xca,0x9d,0x2,0xcd,0x89,0x6,0xd6,0x77,0xd4,0x89,0x6,
	0xec,0x89,0x6,0xf4,0x89,0x6,0xcc,0x89,0x6,0xfe,0x89,
	0xca,0xb3,0x2,0xcd,0x89,0x6,0xe6,0xff,0xe4,0xc0,0x2,
	0xfe,0xd9,0xca,0x1d,0x3,0xcd,0x89,0x6,0xe8,0xc6,0x10,
	0xec,0xcc,0x2,0xc6,0x2,0xe0,0xcd,0x89,0x6,0xe0,0xc6,
	0x20,0xfc,0xd8,0x2,0xc6,0x4,0xe8,0xcd,0x89,0x6,0xf0,
	0xc6,0x80,0xf4,0xe4,0x2,0xc6,0x80,0xf8,0xcd,0x89,0x6,
	0xf8,0xc6,0x40,0xd4,0xf0,0x2,0xc6,0x40,0xf0,0xcd,0x89,
	0x6,0xd8,0xc6,0x8f,0xdc,0xfc,0x2,0xd6,0x2,0xd0,0xcd,
	0x89,0x6,0xd0,0xc6,0xf7,0xc4,0x8,0x3,0xc6,0xfe,0xd8,
	0xcd,0x89,0x6,0xc8,0xc6,0x1,0xcc,0x14,0x3,0xc6,0xd0,
	0xc0,0xcd,0x89,0x6,0xc0,0xc6,0x47,0xfe,0x47,0xc8,0xcd,
	0x89,0x6,0x3e,0x77,0x3c,0x47,0x4,0x48,0xd,0x51,0x5a,
	0x63,0x6c,0x7d,0x3d,0x4f,0x59,0x6b,0x45,0x50,0x62,0x7c,
	0x57,0x14,0x6a,0x4d,0xc,0x61,0x44,0x5,0x58,0x7b,0x5f,
	0x1c,0x43,0x60,0x24,0x4c,0x69,0x55,0x15,0x7a,0x67,0x25,
	0x54,0x42,0x68,0x2c,0x5d,0x1d,0x4b,0x79,0x6f,0x2d,0x65,
	0x5c,0x53,0x4a,0x41,0x78,0xfe,0x77,0xc4,0x89,0x6,0xaf,
	0x6,0x1,0xe,0x3,0x16,0x7,0x1e,0xf,0x26,0x1f,0x2e,
	0x3f,0x80,0x81,0x82,0x83,0x84,0x85,0x87,0xfe,0xf0,0xc4,
	0x89,0x6,0x90,0x91,0x92,0x93,0x94,0x95,0xfe,0x78,0xc4,
	0x89,0x6,0x97,0xc4,0x89,0x6,0x3e,0x80,0x87,0x6,0x1,
	0xe,0x2,0x16,0x3,0x1e,0x4,0x26,0x5,0x2e,0x6,0x88,
	0x6,0x80,0x80,0x80,0x89,0x80,0x80,0x8a,0x80,0x80,0x8b,
	0x80,0x80,0x8c,0x80,0x80,0x8d,0x80,0x80,0x8f,0xfe,0x37,
	0xc4,0x89,0x6,0x3e,0x80,0x87,0x6,0x1,0x98,0x6,0xff,
	0x80,0x99,0x80,0x9a,0x80,0x9b,0x80,0x9c,0x80,0x9d,0xfe,
	0xe0,0xc4,0x89,0x6,0x3e,0x80,0x87,0x9f,0xfe,0xff,0xc4,
	0x89,0x6,0x3e,0xff,0x6,0xfe,0xe,0xfc,0x16,0xef,0x1e,
	0x7f,0x26,0xf4,0x2e,0xbf,0xa7,0xa1,0xa2,0xa3,0xa4,0xa5,
	0xa7,0xfe,0x24,0xc4,0x89,0x6,0xaf,0x6,0x1,0xe,0x2,
	0x16,0x4,0x1e,0x8,0x26,0x10,0x2e,0x20,0xb0,0xb1,0xb2,
	0xb3,0xb4,0xb5,0xb7,0xfe,0x3f,0xc4,0x89,0x6,0x3e,0x0,
	0x26,0x8f,0x2e,0x4f,0xa8,0xa9,0xaa,0xab,0xac,0xad,0xfe,
	0xcf,0xc4,0x89,0x6,0xaf,0xc4,0x89,0x6,0x6,0x44,0xe,
	0x45,0x16,0x46,0x1e,0x47,0x26,0x6,0x2e,0xa6,0x70,0x6,
	0x0,0x46,0x3e,0x44,0xb8,0xc4,0x89,0x6,0x72,0x16,0x0,
	0x56,0x3e,0x46,0xba,0xc4,0x89,0x6,0x73,0x1e,0x0,0x5e,
	0x3e,0x47,0xbb,0xc4,0x89,0x6,0x74,0x26,0x6,0x2e,0xa6,
	0x66,0x3e,0x6,0xbc,0xc4,0x89,0x6,0x75,0x26,0x6,0x2e,
	0xa6,0x6e,0x3e,0xa6,0xbd,0xc4,0x89,0x6,0x26,0x6,0x2e,
	0xa6,0x3e,0x32,0x77,0xbe,0xc4,0x89,0x6,0x86,0xfe,0x64,
	0xc4,0x89,0x6,0xaf,0x7e,0xfe,0x32,0xc4,0x89,0x6,0x26,
	0x6,0x2e,0xa6,0x7e,0x96,0xc4,0x89,0x6,0x3e,0x80,0x87,
	0x8e,0xfe,0x33,0xc4,0x89,0x6,0x3e,0x80,0x87,0x9e,0xfe,
	0xcd,0xc4,0x89,0x6,0xa6,0xc4,0x89,0x6,0x3e,0x25,0xb6,
	0xfe,0x37,0xc4,0x89,0x6,0xae,0xfe,0x5,0xc4,0x89,0x6,
	0x36,0x55,0x34,0x35,0x86,0xfe,0x5a,0xc4,0x89,0x6,0x1,
	0xff,0x12,0x11,0xff,0x12,0x21,0xff,0x12,0x3,0x13,0x23,
	0x3e,0x13,0xb8,0xc4,0x89,0x6,0xba,0xc4,0x89,0x6,0xbc,
	0xc4,0x89,0x6,0x3e,0x0,0xb9,0xc4,0x89,0x6,0xbb,0xc4,
	0x89,0x6,0xbd,0xc4,0x89,0x6,0xb,0x1b,0x2b,0x3e,0x12,
	0xb8,0xc4,0x89,0x6,0xba,0xc4,0x89,0x6,0xbc,0xc4,0x89,
	0x6,0x3e,0xff,0xb9,0xc4,0x89,0x6,0xbb,0xc4,0x89,0x6,
	0xbd,0xc4,0x89,0x6,0x32,0xa6,0x6,0xaf,0x3a,0xa6,0x6,
	0xfe,0xff,0xc4,0x89,0x6,0x2a,0xa4,0x6,0x22,0xa6,0x6,
	0x3a,0xa4,0x6,0x47,0x3a,0xa6,0x6,0xb8,0xc4,0x89,0x6,
	0x3a,0xa5,0x6,0x47,0x3a,0xa7,0x6,0xb8,0xc4,0x89,0x6,
	0x3e,0xaa,0x32,0xa6,0x6,0x44,0x4d,0xaf,0xa,0xfe,0xaa,
	0xc4,0x89,0x6,0x3c,0x2,0x3a,0xa6,0x6,0xfe,0xab,0xc4,
	0x89,0x6,0x3e,0x77,0x32,0xa6,0x6,0x2a,0xa4,0x6,0x11,
	0x0,0x0,0xeb,0xaf,0x1a,0xfe,0x77,0xc4,0x89,0x6,0xaf,
	0x84,0x85,0xc4,0x89,0x6,0x3e,0xcc,0x12,0x3a,0xa6,0x6,
	0xfe,0xcc,0x12,0x3a,0xa6,0x6,0xfe,0xcc,0xc4,0x89,0x6,
	0x21,0x77,0x77,0x29,0x3e,0xee,0xbc,0xc4,0x89,0x6,0xbd,
	0xc4,0x89,0x6,0x21,0x55,0x55,0x1,0xff,0xff,0x9,0x3e,
	0x55,0xd4,0x89,0x6,0xbc,0xc4,0x89,0x6,0x3e,0x54,0xbd,
	0xc4,0x89,0x6,0x21,0xaa,0xaa,0x11,0x33,0x33,0x19,0x3e,
	0xdd,0xbc,0xc4,0x89,0x6,0xbd,0xc4,0x89,0x6,0x37,0xd4,
	0x89,0x6,0x3f,0xdc,0x89,0x6,0x3e,0xaa,0x2f,0xfe,0x55,
	0xc4,0x89,0x6,0xb7,0x27,0xfe,0x55,0xc4,0x89,0x6,0x3e,
	0x88,0x87,0x27,0xfe,0x76,0xc4,0x89,0x6,0xaf,0x3e,0xaa,
	0x27,0xd4,0x89,0x6,0xfe,0x10,0xc4,0x89,0x6,0xaf,0x3e,
	0x9a,0x27,0xd4,0x89,0x6,0xc4,0x89,0x6,0x37,0x3e,0x42,
	0x7,0xdc,0x89,0x6,0x7,0xd4,0x89,0x6,0xfe,0x9,0xc4,
	0x89,0x6,0xf,0xd4,0x89,0x6,0xf,0xfe,0x42,0xc4,0x89,
	0x6,0x17,0x17,0xd4,0x89,0x6,0xfe,0x8,0xc4,0x89,0x6,
	0x1f,0x1f,0xdc,0x89,0x6,0xfe,0x2,0xc4,0x89,0x6,0x1,
	0x34,0x12,0x11,0xaa,0xaa,0x21,0x55,0x55,0xaf,0xc5,0xd5,
	0xe5,0xf5,0x1,0x0,0x0,0x11,0x0,0x0,0x21,0x0,0x0,
	0x3e,0xc0,0xc6,0xf0,0xf1,0xe1,0xd1,0xc1,0xdc,0x89,0x6,
	0xc4,0x89,0x6,0xe4,0x89,0x6,0xfc,0x89,0x6,0x3e,0x12,
	0xb8,0xc4,0x89,0x6,0x3e,0x34,0xb9,0xc4,0x89,0x6,0x3e,
	0xaa,0xba,0xc4,0x89,0x6,0xbb,0xc4,0x89,0x6,0x3e,0x55,
	0xbc,0xc4,0x89,0x6,0xbd,0xc4,0x89,0x6,0x21,0x0,0x0,
	0x39,0x22,0xab,0x6,0x31,0xaa,0x6,0x3b,0x3b,0x33,0x3b,
	0x3e,0x55,0x32,0xa8,0x6,0x2f,0x32,0xa9,0x6,0xc1,0xb8,
	0xc4,0x89,0x6,0x2f,0xb9,0xc4,0x89,0x6,0x21,0xaa,0x6,
	0xf9,0x21,0x33,0x77,0x3b,0x3b,0xe3,0x3a,0xa9,0x6,0xfe,
	0x77,0xc4,0x89,0x6,0x3a,0xa8,0x6,0xfe,0x33,0xc4,0x89,
	0x6,0x3e,0x55,0xbd,0xc4,0x89,0x6,0x2f,0xbc,0xc4,0x89,
	0x6,0x2a,0xab,0x6,0xf9,0x21,0x9b,0x6,0xe9,0x21,0x8b,
	0x1,0xcd,0x45,0x1,0xe3,0x7c,0xcd,0x54,0x1,0x7d,0xcd,
	0x54,0x1,0xc3,0x0,0x0,0x21,0x74,0x1,0xcd,0x45,0x1,
	0xc3,0x0,0x0,0xa6,0x6,0x0,0x0,0x0,0x0,0x0,0x0,
	0x0,];
export { Code };