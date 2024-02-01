import { Container } from '@lidofinance/lido-ui';
import styled from 'styled-components';

export const HeaderStyle = styled(Container)`
  padding-top: 18px;
  padding-bottom: 18px;
  display: flex;
  align-items: center;
`;

export const HeaderLogoStyle = styled.div`
  overflow: hidden;
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spaceMap.xxl}px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: 14px;
  }
`;

export const HeaderActionsStyle = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  flex-shrink: 1;
  overflow: hidden;
`;

export const WithdrawButtonStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-direction: row;
  color: #646ecb;
  &:hover {
    color: #000000;
  }
`;

// export const CustomButtonStyle = styled(Button)`
//   color: #646ecb;
//   background-color:transparent;
//   :hover {
//     background-color: yellow;
//   }
// `;
