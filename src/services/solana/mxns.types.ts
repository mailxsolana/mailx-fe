export type Mxdns = {
  "version": "0.1.0",
  "name": "mxdns",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rootOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameClass",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tld",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "nameRegistryCreate",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "root",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rootOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameClass",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "domainAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameAccountKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "snsProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "domain",
          "type": "bytes"
        },
        {
          "name": "tld",
          "type": "bytes"
        },
        {
          "name": "hashedName",
          "type": "bytes"
        },
        {
          "name": "balance",
          "type": "u64"
        },
        {
          "name": "space",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "rootOwner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tld",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "nameClass",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "domainAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nameAccount",
            "type": "publicKey"
          },
          {
            "name": "domain",
            "type": "bytes"
          },
          {
            "name": "tld",
            "type": "bytes"
          },
          {
            "name": "metadata",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Domain",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hashedName",
            "type": "bytes"
          },
          {
            "name": "lamports",
            "type": "u64"
          },
          {
            "name": "space",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMint"
    },
    {
      "code": 6001,
      "name": "InvalidDomain"
    },
    {
      "code": 6002,
      "name": "InvalidTLD"
    },
    {
      "code": 6003,
      "name": "DomainAlreadyExists"
    }
  ]
};

export const IDL: Mxdns = {
  "version": "0.1.0",
  "name": "mxdns",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rootOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameClass",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "tld",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "nameRegistryCreate",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "vault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "vaultTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "root",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rootOwner",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameClass",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "domainAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameAccountKey",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "snsProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "domain",
          "type": "bytes"
        },
        {
          "name": "tld",
          "type": "bytes"
        },
        {
          "name": "hashedName",
          "type": "bytes"
        },
        {
          "name": "balance",
          "type": "u64"
        },
        {
          "name": "space",
          "type": "u32"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "vault",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "authority",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "rootOwner",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "tld",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "nameClass",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "domainAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "nameAccount",
            "type": "publicKey"
          },
          {
            "name": "domain",
            "type": "bytes"
          },
          {
            "name": "tld",
            "type": "bytes"
          },
          {
            "name": "metadata",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "Domain",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "hashedName",
            "type": "bytes"
          },
          {
            "name": "lamports",
            "type": "u64"
          },
          {
            "name": "space",
            "type": "u32"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMint"
    },
    {
      "code": 6001,
      "name": "InvalidDomain"
    },
    {
      "code": 6002,
      "name": "InvalidTLD"
    },
    {
      "code": 6003,
      "name": "DomainAlreadyExists"
    }
  ]
};
