export type Eigensol = {
  version: '0.0.1';
  name: 'eigensol';
  instructions: [
    {
      name: 'createtokenpool';
      accounts: [
        {
          name: 'feePayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenPool';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'stakingToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminStakingWallet';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'token';
          type: 'publicKey';
        },
        {
          name: 'startSlot';
          type: 'u64';
        },
        {
          name: 'endSlot';
          type: 'u64';
        },
      ];
    },
    {
      name: 'stake';
      accounts: [
        {
          name: 'feePayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenPool';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'user';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'admin';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userInfo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userStakingWallet';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminStakingWallet';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakingToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
        {
          name: 'systemProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'stakeAmount';
          type: 'u64';
        },
      ];
    },
    {
      name: 'withdraw';
      accounts: [
        {
          name: 'feePayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenPool';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'user';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'admin';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userInfo';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'userStakingWallet';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'adminStakingWallet';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'stakingToken';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'tokenProgram';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'amount';
          type: 'u32';
        },
      ];
    },
    {
      name: 'addavs';
      accounts: [
        {
          name: 'feePayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenPool';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'validatorAccount';
          type: 'publicKey';
        },
      ];
    },
    {
      name: 'removeavs';
      accounts: [
        {
          name: 'feePayer';
          isMut: true;
          isSigner: true;
        },
        {
          name: 'tokenPool';
          isMut: true;
          isSigner: false;
        },
        {
          name: 'authority';
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: 'validatorAccount';
          type: 'publicKey';
        },
      ];
    },
  ];
  accounts: [
    {
      name: 'poolInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'totalBalance';
            type: 'u32';
          },
          {
            name: 'token';
            type: 'publicKey';
          },
          {
            name: 'startSlot';
            type: 'u64';
          },
          {
            name: 'endSlot';
            type: 'u64';
          },
          {
            name: 'stakerAddress';
            type: {
              vec: 'publicKey';
            };
          },
          {
            name: 'avsList';
            type: {
              vec: 'publicKey';
            };
          },
          {
            name: 'adminAddress';
            type: 'publicKey';
          },
        ];
      };
    },
    {
      name: 'userInfo';
      type: {
        kind: 'struct';
        fields: [
          {
            name: 'stakeAmount';
            type: 'u64';
          },
          {
            name: 'depositSlot';
            type: 'u64';
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: 'InvalidAuthority';
      msg: 'Invalid authority. Only the admin can perform this action.';
    },
    {
      code: 6001;
      name: 'ValidatorAlreadyExists';
      msg: 'Validator already exists in the AVS list.';
    },
  ];
};

export const IDL: Eigensol = {
  version: '0.0.1',
  name: 'eigensol',
  instructions: [
    {
      name: 'createtokenpool',
      accounts: [
        {
          name: 'feePayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenPool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'stakingToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminStakingWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'token',
          type: 'publicKey',
        },
        {
          name: 'startSlot',
          type: 'u64',
        },
        {
          name: 'endSlot',
          type: 'u64',
        },
      ],
    },
    {
      name: 'stake',
      accounts: [
        {
          name: 'feePayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenPool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userInfo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userStakingWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminStakingWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakingToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'stakeAmount',
          type: 'u64',
        },
      ],
    },
    {
      name: 'withdraw',
      accounts: [
        {
          name: 'feePayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenPool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'admin',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userInfo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'userStakingWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'adminStakingWallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'stakingToken',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u32',
        },
      ],
    },
    {
      name: 'addavs',
      accounts: [
        {
          name: 'feePayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenPool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'validatorAccount',
          type: 'publicKey',
        },
      ],
    },
    {
      name: 'removeavs',
      accounts: [
        {
          name: 'feePayer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenPool',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'validatorAccount',
          type: 'publicKey',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'poolInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'totalBalance',
            type: 'u32',
          },
          {
            name: 'token',
            type: 'publicKey',
          },
          {
            name: 'startSlot',
            type: 'u64',
          },
          {
            name: 'endSlot',
            type: 'u64',
          },
          {
            name: 'stakerAddress',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'avsList',
            type: {
              vec: 'publicKey',
            },
          },
          {
            name: 'adminAddress',
            type: 'publicKey',
          },
        ],
      },
    },
    {
      name: 'userInfo',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'stakeAmount',
            type: 'u64',
          },
          {
            name: 'depositSlot',
            type: 'u64',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: 'InvalidAuthority',
      msg: 'Invalid authority. Only the admin can perform this action.',
    },
    {
      code: 6001,
      name: 'ValidatorAlreadyExists',
      msg: 'Validator already exists in the AVS list.',
    },
  ],
};
