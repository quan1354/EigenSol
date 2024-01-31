import { FC } from 'react';
import { Button } from '@lidofinance/lido-ui';
import { WithdrawButtonStyle } from './headerStyles';

const HeaderMenu: FC = () => (
  <div>
    <Button size="xs" variant="ghost">
      <WithdrawButtonStyle>
        <div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <g clipPath="url(#prefix__prefix__clip0_13227_1683)">
              <path
                clipRule="evenodd"
                d="M13 18.584l.79-.8a1.004 1.004 0 011.42 1.42l-2.5 2.5a.999.999 0 01-.33.21 1 1 0 01-.76 0 1 1 0 01-.33-.21l-2.5-2.5a1 1 0 010-1.42 1 1 0 011.42 0l.79.8v-4.59a1 1 0 012 0v4.59zm-6.016-1.886A1.018 1.018 0 016 16.434a8.46 8.46 0 1112 0 1.018 1.018 0 11-1.44-1.44 6.45 6.45 0 10-9.12 0 1.018 1.018 0 01-.456 1.704z"
              ></path>
            </g>
            <defs>
              <clipPath id="prefix__prefix__clip0_13227_1683">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div>Stake</div>
      </WithdrawButtonStyle>
    </Button>
    <Button size="xs" variant="ghost">
      <WithdrawButtonStyle>
        <div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <g clipPath="url(#prefix__prefix__clip0_13227_1683)">
              <path
                clipRule="evenodd"
                d="M13 18.584l.79-.8a1.004 1.004 0 011.42 1.42l-2.5 2.5a.999.999 0 01-.33.21 1 1 0 01-.76 0 1 1 0 01-.33-.21l-2.5-2.5a1 1 0 010-1.42 1 1 0 011.42 0l.79.8v-4.59a1 1 0 012 0v4.59zm-6.016-1.886A1.018 1.018 0 016 16.434a8.46 8.46 0 1112 0 1.018 1.018 0 11-1.44-1.44 6.45 6.45 0 10-9.12 0 1.018 1.018 0 01-.456 1.704z"
              ></path>
            </g>
            <defs>
              <clipPath id="prefix__prefix__clip0_13227_1683">
                <path fill="#fff" d="M0 0h24v24H0z"></path>
              </clipPath>
            </defs>
          </svg>
        </div>

        <div>Withdraw</div>
      </WithdrawButtonStyle>
    </Button>
  </div>
);

export default HeaderMenu;
