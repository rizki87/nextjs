import '../styles/globals.css'
import { AuthProvider } from '@/lib/auth'
import { CSSReset, ThemeProvider } from '@chakra-ui/react'
import { Global, css } from '@emotion/react';

import customTheme from '@/styles/theme'

const GlobalStyle = ({ children }) => {
  return (
    <>
      <CSSReset />
      <Global
        styles={css`
          html {
            min-width: 360px;
            scroll-behavior: smooth;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
        `}
      />
      {children}
    </>
  );
};

function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
    <AuthProvider>
      <GlobalStyle />
      <Component {...pageProps} />
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App
