export type Mailx = {
  "version": "0.1.0",
  "name": "mailx",
  "instructions": [
    {
      "name": "createMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        },
        {
          "name": "key",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "deleteMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "createMailAccountForUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailAccountRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "claimMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailAccountRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "rejectMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccountRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sendMail",
      "accounts": [
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        },
        {
          "name": "to",
          "type": "publicKey"
        },
        {
          "name": "tpp",
          "type": "u8"
        },
        {
          "name": "subject",
          "type": "bytes"
        },
        {
          "name": "body",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "createDeleteMailRequest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailDeletionRequest",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "acceptDeleteMailRequest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailDeletionRequest",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "rejectDeleteMailRequest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailDeletionRequest",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "deleteMail",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "mail",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "to",
            "type": "publicKey"
          },
          {
            "name": "fromCkey",
            "type": "bytes"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "tpp",
            "type": "u8"
          },
          {
            "name": "subject",
            "type": "bytes"
          },
          {
            "name": "body",
            "type": "bytes"
          },
          {
            "name": "metadata",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "mailDeletionRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mail",
            "type": "publicKey"
          },
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "to",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mailAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ckey",
            "type": "bytes"
          },
          {
            "name": "address",
            "type": "bytes"
          },
          {
            "name": "domain",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mailAccountRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "address",
            "type": "bytes"
          },
          {
            "name": "domain",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "DomainAccount",
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
  "errors": [
    {
      "code": 6000,
      "name": "NoPermission"
    },
    {
      "code": 6001,
      "name": "InvalidAddress"
    },
    {
      "code": 6002,
      "name": "TwoFactorDeletionEnabled"
    }
  ]
};

export const IDL: Mailx = {
  "version": "0.1.0",
  "name": "mailx",
  "instructions": [
    {
      "name": "createMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        },
        {
          "name": "key",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "deleteMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "createMailAccountForUser",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "user",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailAccountRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nameAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "claimMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "wallet",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailAccountRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "rejectMailAccount",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccountRequest",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "sendMail",
      "accounts": [
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        },
        {
          "name": "to",
          "type": "publicKey"
        },
        {
          "name": "tpp",
          "type": "u8"
        },
        {
          "name": "subject",
          "type": "bytes"
        },
        {
          "name": "body",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "createDeleteMailRequest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailDeletionRequest",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "acceptDeleteMailRequest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailDeletionRequest",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "rejectDeleteMailRequest",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mailDeletionRequest",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    },
    {
      "name": "deleteMail",
      "accounts": [
        {
          "name": "authority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "mailAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mail",
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
          "name": "address",
          "type": "bytes"
        },
        {
          "name": "domain",
          "type": "bytes"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "mail",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "to",
            "type": "publicKey"
          },
          {
            "name": "fromCkey",
            "type": "bytes"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "tpp",
            "type": "u8"
          },
          {
            "name": "subject",
            "type": "bytes"
          },
          {
            "name": "body",
            "type": "bytes"
          },
          {
            "name": "metadata",
            "type": "bytes"
          }
        ]
      }
    },
    {
      "name": "mailDeletionRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "mail",
            "type": "publicKey"
          },
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "to",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mailAccount",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "publicKey"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "ckey",
            "type": "bytes"
          },
          {
            "name": "address",
            "type": "bytes"
          },
          {
            "name": "domain",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "mailAccountRequest",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "from",
            "type": "publicKey"
          },
          {
            "name": "address",
            "type": "bytes"
          },
          {
            "name": "domain",
            "type": "bytes"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "DomainAccount",
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
  "errors": [
    {
      "code": 6000,
      "name": "NoPermission"
    },
    {
      "code": 6001,
      "name": "InvalidAddress"
    },
    {
      "code": 6002,
      "name": "TwoFactorDeletionEnabled"
    }
  ]
};
