import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
  html,
  body {
    width: 100%;
  }
  body {
    /* background: ${({ theme }) => theme.colors.background}; */
    /* color: ${({ theme }) => theme.colors.text}; */
    color: #000000;
    position: relative;
    box-sizing: border-box;
    font-size: ${({ theme }) => theme.fontSizesMap.xs}px;
    line-height: 1.5em;
    font-weight: 500;
    text-size-adjust: none;
  }
  a {
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      color: ${({ theme }) => theme.colors.primaryHover};
    }

    &:visited {
      color: ${({ theme }) => theme.colors.primaryVisited};
    }
  }
  .wallet-adapter-dropdown {
    width: 100%;
  }
`;

export default GlobalStyle;
